/*global chrome*/

import { useEffect, useState } from "react";

const App = () => {
  const [val, setVal] = useState(null);

  const getDomain = (tabLink) => {
    if (tabLink) {
      const url = tabLink[0].url;
      const domain = url.split("/")[2];
      return domain;
    } else {
      return null;
    }
  };

  useEffect(() => {
    chrome.tabs.query(
      { active: true, lastFocusedWindow: true },
      (activeTab) => {
        const domain = getDomain(activeTab);
        setVal(domain);
      }
    );
  }, []);

  return <>{val}</>;
};

export default App;
