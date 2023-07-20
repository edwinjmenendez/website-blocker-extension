/* global chrome */

let urlPatterns = [];

const updateWebRequestListener = async (blockedWebsites) => {
  urlPatterns = blockedWebsites.map(({ webUrl }) => `*://*.${webUrl}/*`);

  const webRequestListener = (details) => {
    if (urlPatterns.length > 0) {
      return { cancel: true };
    }
  };

  if (urlPatterns.length > 0) {
    chrome.webRequest.onBeforeRequest.addListener(
      webRequestListener,
      { urls: urlPatterns },
      ["blocking"]
    );
  }
};

const getBlockedWebsitesFromStorage = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get({ blockedWebsites: [] }, function (result) {
      const blockedWebsites = result.blockedWebsites;
      resolve(blockedWebsites);
    });
  });
};

chrome.runtime.onMessage.addListener(async function (message) {
  if (message.action === "updateWebRequestListener") {
    const blockedWebsites = message.blockedWebsites;
    await updateWebRequestListener(blockedWebsites);
  }
});

(async function init() {
  const blockedWebsites = await getBlockedWebsitesFromStorage();
  await updateWebRequestListener(blockedWebsites);
})();
