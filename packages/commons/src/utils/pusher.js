import caseConverter from './caseConverter';

export default class Pusher {
  constructor(predefinedChannels = {}, config, authUtils) {
    this.pusher = null;
    this.channels = predefinedChannels;
    this.config = config;
    this.authUtils = authUtils;
  }

  connect = async (authEndpoint = `${this.config.apiUrl}/pusher/auth`, options = { log: true }) => {
    const pusherModule = await import('pusher-js');
    // eslint-disable-next-line no-shadow
    const Pusher = pusherModule.default || pusherModule;
    // Set to true if want to log all Pusher state changes.
    Pusher.logToConsole = !!options.log;
    const accessToken = this.authUtils.getToken();
    this.pusher = new Pusher(this.config.pusherKey, {
      authEndpoint,
      cluster: this.config.pusherCluster,
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    return this.pusher;
  }

  subscribe = (channelType) => {
    let channelName = `${channelType}`;
    channelName += `-${this.config.pusherChannelNamespace}`;
    this.channels[channelType] = this.pusher.subscribe(channelName);
  };

  unsubscribe = (channelType) => {
    const channel = this.channels[channelType];
    if (this.channels[channelType] !== undefined) {
      channel.unbind(); // Remove all handlers on channel
      this.pusher.unsubscribe(channel.name);
      this.channels[channelType] = undefined;
    }
  };

  bindWithCaseConverter = (state, callback) => {
    const newState = caseConverter.snakeCaseToCamelCase(state);
    callback(newState);
  };

  bind = (channelType, eventName, callback) => {
    const channel = this.channels[channelType];
    if (channel) {
      channel.bind(eventName, (state) => {
        this.bindWithCaseConverter(state, callback);
      });
    } else {
      console.log('No channel with type', channelType);
    }
  };

  unbind = (channelType, eventName) => {
    const channel = this.channels[channelType];
    if (channel !== undefined) {
      channel.unbind(eventName);
    }
  };

  disconnect = () => {
    if (this.pusher) {
      Object.keys(this.channels).forEach((channelType) => {
        this.unsubscribe(channelType);
      });
      this.pusher.disconnect();
      this.pusher = null;
    }
  };

  bindStateChangeEvent = (func) => {
    if (this.pusher) { this.pusher.connection.bind('state_change', func); }
  };

  unbindStateChangeEvent = () => {
    if (this.pusher) { this.pusher.connection.unbind('state_change'); }
  };

   bindConnectedEvent = (func) => {
     if (this.pusher) { this.pusher.connection.bind('connected', func); }
   };

   unBindConnectedEvent = (func) => {
     if (this.pusher) { this.pusher.connection.bind('connected', func); }
   };

   sendClientEvent = (channelType, event, data) => {
     const channel = this.channels[channelType];
     if (this.pusher) {
       channel.trigger(`client-${event}`, data);
     }
   };
}
