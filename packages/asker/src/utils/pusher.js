import { CaseConverter } from '@tutoring/commons/utils';
import config from 'configuration';
import auth from './auth';


let pusher = null;
const channels = {
  account: null,
  problem: null,
  config: null,
};


const connect = async () => {
  const pusherModule = await import('pusher-js');
  const Pusher = pusherModule.default || pusherModule;

  // Set to true if want to log all Pusher state changes.
  Pusher.logToConsole = true;

  const accessToken = auth.getToken();
  pusher = new Pusher(config.pusherKey, {
    cluster: config.pusherCluster,
    authEndpoint: `${config.apiUrl}/user/me/pusher/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  return pusher;
};

const subscribe = (channelType, id = null) => {
  let channelName = '';
  if (channelType === 'account') channelName = `presence-user-${id}-${config.pusherNamespace}`;
  else channelName = `presence-question-${id}-${config.pusherNamespace}`;
  channels[channelType] = pusher.subscribe(channelName);
};

const unsubscribe = (channelType) => {
  const channel = channels[channelType];
  if (channels[channelType] === null) return;
  channel.unbind(); // Remove all handlers on channel
  pusher.unsubscribe(channel.name);
  channels[channelType] = null;
};

export const bindWithCaseConverter = (state, callback) => {
  const newState = CaseConverter.snakeCaseToCamelCase(state);
  callback(newState);
};

const bind = (channelType, eventName, callback) => {
  const channel = channels[channelType];
  if (channel === null) return;
  channel.bind(eventName, (state) => {
    bindWithCaseConverter(state, callback);
  });
};

const unbind = (channelType, eventName) => {
  const channel = channels[channelType];
  if (channel === null) return;
  channel.unbind(eventName);
};

const disconnect = () => {
  if (pusher) {
    Object.keys(channels).forEach((channelType) => {
      unsubscribe(channelType);
    });
    pusher.disconnect();
    pusher = null;
  }
};

const sendClientEvent = (event, data, channelType) => {
  const channel = channels[channelType];
  if (pusher) {
    if (channelType === 'account' && channel) {
      channel.trigger(`client-${event}`, data);
    } else if (channelType === 'problem' && channel) {
      channel.trigger(`client-${event}`, data);
    }
  }
};

const bindConnectedEvent = (func) => {
  if (pusher) { pusher.connection.bind('connected', func); }
};

const unBindConnectedEvent = (func) => {
  if (pusher) { pusher.connection.bind('connected', func); }
};

export default {
  connect,
  disconnect,
  subscribe,
  unsubscribe,
  bind,
  unbind,
  sendClientEvent,
  bindConnectedEvent,
  unBindConnectedEvent,
};
