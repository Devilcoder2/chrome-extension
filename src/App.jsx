/*global chrome*/
import { useState, useEffect } from "react";

const App = () => {
  const [currentTab, setCurrentTab] = useState(null);
  const [lastTime, setLastTime] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchCurrentTab = async () => {
      try {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        console.log(tab);
        setCurrentTab(tab);
        const time = formatLastAccessed(tab.lastAccessed);
        setLastTime(time);
      } catch (error) {
        console.error("Error fetching current tab:", error);
      }
    };

    const sessionsChrome = async () => {
      const x = chrome.sessions.types;
      console.log(x);
    };

    chrome.tabs.onActivated.addListener((activeInfo) => {
      const tabId = activeInfo.tabId;
      const currentTime = new Date().toISOString();
      chrome.storage.local.set({ [tabId]: currentTime });
    });

    chrome.tabs.onRemoved.addListener((tabId) => {
      chrome.storage.local.remove(tabId.toString());
    });

    function getTabAccessTime(tabId) {
      chrome.storage.local.get(tabId.toString(), (result) => {
        const accessTime = result[tabId.toString()];
        console.log(`Access time of tab ${tabId}: ${accessTime}`);
      });
    }

    sessionsChrome();
    fetchCurrentTab();
  }, []);

  function formatLastAccessed(lastAccessed) {
    const date = new Date(lastAccessed);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }

  return (
    <div>
      {currentTab ? (
        <div>
          <p>Title: {currentTab.title}</p>
          <p>URL: {currentTab.url}</p>
          <h1>LastTime: {lastTime}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
