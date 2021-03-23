const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const $ = require('jquery');

// Setup enzyme
configure({ adapter: new Adapter() });

window.scrollTo = jest.fn();
window.open = jest.fn();
window.alert = jest.fn();

// fetch
global.fetch = require('jest-fetch-mock');

window.$ = window.jQuery = $;

window.flushPromises = () => new Promise((resolve) => {
  setImmediate(resolve);
});
