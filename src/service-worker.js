/* global process */

// CRA's service worker, just removed excess stuff like console.log

const NOT_FOUND = 404;

const isLocalhost = Boolean(
  window.location.hostname === `localhost`
  || window.location.hostname === `[::1]`
  || window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

const registerValidSW = (swUrl, config) => {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === `installed`) {
            if (navigator.serviceWorker.controller) {
              if (config.onUpdate) {
                config.onUpdate(registration);
              }
            } else if (config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        };
      };
    });
};

const checkValidServiceWorker = (swUrl, config) => {
  fetch(swUrl)
    .then((response) => {
      if (
        response.status === NOT_FOUND ||
        response.headers.get(`content-type`).indexOf(`javascript`) === -1
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
};

export const register = (config) => {
  if (process.env.NODE_ENV === `production` && `serviceWorker` in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener(`load`, () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
};

export const unregister = () => {
  if (`serviceWorker` in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};