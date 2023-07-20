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

                // Update the blocked websites in storage
                chrome.storage?.local.set({ blockedWebsites: blockedWebsites }, function () {
                    // Clear the input field
                    
                    // Inform the background script to update the webRequest listener
                    chrome.runtime.sendMessage({ action: "updateWebRequestListener", blockedWebsites });
                });
            });
            addWebsite(websiteUrl);
            setWebsiteUrl('');
        }
    };

    return (
        <div>
            <h2>Enter website to block</h2>
            <input
                required
                type="url"
                placeholder="i.e. google.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
            />
            <button onClick={handleBlockWebsite}>Block Website</button>
        </div>
    );
};

export default AddWebsite;
