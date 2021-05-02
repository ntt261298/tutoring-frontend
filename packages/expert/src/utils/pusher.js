import invariant from 'invariant';
import Pusher from 'pusher-js';
import config from 'configuration';
import auth from './auth';

let pusher = null;
let accountChannel = null;
let questionChannel = null;
let subscribedChannels = [];

const CHANNEL = {
  ACCOUNT: 'account',
  QUESTION: 'question',
};

const connect = () => {
  const accessToken = auth.getToken();
  pusher = new Pusher(config.pusherKey, {
    cluster: config.pusherCluster,
    authEndpoint: `${config.apiUrl}/expert/me/pusher/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  accountChannel = null;
  questionChannel = null;
  subscribedChannels = [];
  return pusher;
};

const disconnect = () => {
  invariant(pusher, 'PusherAPI is disconnected');
  if (pusher) {
    pusher.disconnect();
    pusher = null;
    accountChannel = null;
    questionChannel = null;
    subscribedChannels = [];
  }
};

const onSubscribeSucceeded = channelType => subscribedChannels.push(channelType);

const subscribe = (channelType, params) => {
  invariant(pusher, 'PusherAPI is disconnected');
  invariant(
    Object.values(CHANNEL).includes(channelType),
    'PusherAPI invalid channel type',
  );
  if (channelType === CHANNEL.ACCOUNT) {
    invariant(!accountChannel, 'PusherAPI account channel is subscribed');
    accountChannel = pusher.subscribe([
      'presence',
      params.accountType,
      params.accountId,
      config.pusherNamespace,
    ].join('-'));
    accountChannel.bind('pusher_internal:subscription_succeeded', onSubscribeSucceeded(channelType));
  } else if (channelType === CHANNEL.QUESTION) {
    invariant(!questionChannel, 'PusherAPI question channel is subscribed');
    questionChannel = pusher.subscribe([
      'presence',
      'question',
      params.id,
      config.pusherNamespace,
    ].join('-'));
    questionChannel.bind('pusher_internal:subscription_succeeded', onSubscribeSucceeded(channelType));
  }
};

const unsubscribe = (channelType) => {
  invariant(
    Object.values(CHANNEL).includes(channelType),
    'PusherAPI invalid channel type',
  );
  if ((channelType === CHANNEL.ACCOUNT) && pusher && accountChannel) {
    pusher.unsubscribe(accountChannel.name);
    accountChannel = null;
  } else if ((channelType === CHANNEL.QUESTION) && pusher && questionChannel) {
    pusher.unsubscribe(questionChannel.name);
    questionChannel = null;
  }
  subscribedChannels = subscribedChannels.filter(channel => channel !== channelType);
};

const bind = (channelType, eventName, callback) => {
  invariant(pusher, 'PusherAPI is disconnected');
  invariant(
    Object.values(CHANNEL).includes(channelType),
    'PusherAPI invalid channel type',
  );
  if (channelType === 'account') {
    invariant(accountChannel, 'PusherAPI account channel is not subscribed');
    accountChannel.bind(eventName, callback);
  } else if (channelType === 'question') {
    invariant(questionChannel, 'PusherAPI question channel is not subscribed');
    questionChannel.bind(eventName, callback);
  }
};

const unbind = (channelType, eventName, callback) => {
  invariant(
    Object.values(CHANNEL).includes(channelType),
    'PusherAPI invalid channel type',
  );
  if ((channelType === CHANNEL.ACCOUNT) && accountChannel) {
    accountChannel.unbind(eventName, callback);
  } else if ((channelType === CHANNEL.QUESTION) && questionChannel) {
    questionChannel.unbind(eventName, callback);
  }
};

const bindConnectionState = (callback) => {
  if (pusher) {
    pusher.connection.bind('state_change', callback);
  }
};

const unbindConnectionState = () => {
  if (pusher) {
    pusher.connection.unbind('state_change');
  }
};

const bindSubscriptionSucceeded = (channelType, callback) => {
  if (subscribedChannels.includes(channelType)) {
    invariant(pusher, 'PusherAPI is disconnected');
    if (channelType === 'account') {
      invariant(accountChannel, 'PusherAPI account channel is not subscribed');
    } else if (channelType === 'question') {
      invariant(questionChannel, 'PusherAPI question channel is not subscribed');
    }
    callback();
  } else {
    bind(channelType, 'pusher_internal:subscription_succeeded', callback);
  }
};

const sendClientEvent = (event, data, channelType) => {
  if (pusher) {
    if (channelType === 'account' && accountChannel) {
      accountChannel.trigger(`client-${event}`, data);
    } else if (channelType === 'question' && questionChannel) {
      questionChannel.trigger(`client-${event}`, data);
    }
  }
};

export default {
  connect,
  disconnect,
  subscribe,
  unsubscribe,
  bindSubscriptionSucceeded,
  bind,
  unbind,
  bindConnectionState,
  unbindConnectionState,
  sendClientEvent,
};
