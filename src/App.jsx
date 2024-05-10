/*global chrome*/

import { useEffect, useState } from "react";

const App = () => {
  const [val, setVal] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

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
        console.log(activeTab);
        const domain = getDomain(activeTab);
        setVal(domain);

        setImgSrc(activeTab[0].favIconUrl);
      }
    );
  }, []);

  return (
    <div>
      <h1>{val}</h1>
      {imgSrc && <img src={imgSrc} alt="" />}
    </div>
  );
};

export default App;
