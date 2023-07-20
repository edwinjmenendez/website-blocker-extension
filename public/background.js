/* global chrome */

let urlPatterns = [];

const updateWebRequestListener = async (blockedWebsites) => {
  console.log({ blockedWebsites });
  urlPatterns = blockedWebsites?.map(({ webUrl }) => `*://*.${webUrl}/*`);

  const webRequestListener = (details) => {
    // Check if the requested website is in the blocked list
    if (urlPatterns.length > 0) {
      return { cancel: true };
    }
  };

  // Add event listener for webRequest events
  if (urlPatterns.length > 0) {
    chrome.webRequest.onBeforeRequest.addListener(
      webRequestListener,
      { urls: urlPatterns },
      ["blocking"]
    );
  };
  }

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
