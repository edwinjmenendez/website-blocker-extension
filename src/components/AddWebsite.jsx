/* global chrome */

import React, { useState } from 'react';

const AddWebsite = ({ addWebsite }) => {
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleBlockWebsite = () => {
    if (websiteUrl) {
      chrome.storage?.local.get({ blockedWebsites: [] }, function (result) {
        const blockedWebsites = result.blockedWebsites;

        // Add the new website to the blocked list
        blockedWebsites.push({ webUrl: websiteUrl });

        // Update the blocked websites in storage and inform the background script to update the webRequest listener
        chrome.storage?.local.set({ blockedWebsites }, function () {
          // Clear the input field
          addWebsite(websiteUrl);
          setWebsiteUrl('');
          chrome.runtime.sendMessage({ action: "updateWebRequestListener", blockedWebsites });
        });
      });
    }
  };

  return (
    <div>
      <h3>Enter website to block</h3>
      <div className='input-button' >
        <input
            required
            type="url"
            placeholder="i.e. google.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <button onClick={handleBlockWebsite}>Block Website</button>
      </div>
    </div>
  );
};

export default AddWebsite;
