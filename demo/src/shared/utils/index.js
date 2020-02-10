// eslint-disable-next-line no-undef
export const ReduxCompose = () => window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const WindowSize = () => ({
  height: window.innerHeight,
  width: window.innerWidth
});

export const $ = selector => document.querySelector(selector);

export const $all = selector => document.querySelectorAll(selector);