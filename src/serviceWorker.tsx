/* global process */

const NOT_FOUND = 404;

const isLocalhost = Boolean(
  window.location.hostname === `localhost` ||
    window.location.hostname === `[::1]` ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

const registerValidSW = async (swUrl: string) => {
  await navigator.serviceWorker.register(swUrl);
};

const checkValidServiceWorker = async (swUrl: string) => {
  const response = await fetch(swUrl);

  if (
    response.status === NOT_FOUND ||
    response.headers.get(`content-type`)!.includes(`javascript`)
  ) {
    const registration = await navigator.serviceWorker.ready;

    await registration.unregister();
    window.location.reload();
  } else {
    registerValidSW(swUrl);
  }
};

export const register = () => {
  if (process.env.NODE_ENV === `production` && `serviceWorker` in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener(`load`, () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
      } else {
        registerValidSW(swUrl);
      }
    });
  }
};
