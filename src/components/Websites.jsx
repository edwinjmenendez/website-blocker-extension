/* global chrome */

import React, { useState, useEffect } from 'react';
import Website from './Website';
import AddWebsite from './AddWebsite';

const Websites = () => {
  const [websites, setWebsites] = useState([]);

  const addWebsite = (newWebsite) => {
    const newWebsiteObj = {
      webUrl: newWebsite
    };
    setWebsites((prevWebsites) => [...prevWebsites, newWebsiteObj]);
  };

  const handleDeleteWebsite = (webUrlToDelete) => {
    const updatedWebsites = websites.filter((website) => website.webUrl !== webUrlToDelete);
    setWebsites(updatedWebsites);
    updateLocalStorage(updatedWebsites); // Save the updated websites array to local storage
    updateBackgroundScript(updatedWebsites);
  };

  const updateBackgroundScript = async (updatedWebsites) => {
    console.log(updatedWebsites);
    await chrome.runtime.sendMessage({ action: "updateWebRequestListener", blockedWebsites: updatedWebsites });
  };

  const updateLocalStorage = async (updatedWebsites) => {
    await chrome.storage?.local.set({ blockedWebsites: updatedWebsites });
  };

  useEffect(() => {
    chrome.storage?.local.get({ blockedWebsites: [] }, function (result) {
      setWebsites(result.blockedWebsites);
    });
  }, []);

  return (
    <div className='websites-container'>
      <AddWebsite addWebsite={addWebsite} />
      <div className='websites'>
        <h2>Websites to block while working</h2>
        {websites.map(({ webUrl }) => (
          <Website key={webUrl} webUrl={webUrl} onDelete={handleDeleteWebsite} />
        ))}
      </div>
    </div>
  );
};

export default Websites;
