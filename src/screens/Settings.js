import { useState, useEffect } from "react";
import { site, contentPathSuffix, getRemoteSite } from "../utils";

export default function Settings() {

  const placeholder = "--select-site--";
  const [fetchedSpaSites, setFetchedSpaSites] = useState(false);
  const [currentSite, setCurrentSite] = useState(site || placeholder);
  const [spaSites, setSpaSites] = useState([site]);
  const [contentPath] = useState(contentPathSuffix);

  useEffect(() => {
    async function getData() {
      setSpaSites([placeholder, ...await getRemoteSite()]);
      console.log("spaSites", spaSites);
    }

    if (!fetchedSpaSites) {
      getData();
      setFetchedSpaSites(true);
    }
  }, [fetchedSpaSites, spaSites]);

  const getContentPath = (site) => `/content/${site}${contentPath}`;
  const onChangeHandler = (e) => {
    const site = e.target.value;
    if (site !== localStorage.getItem("aemGuidesWkndPwa.site")) {
      window.localStorage.setItem("aemGuidesWkndPwa.contentPath", getContentPath(site))
      window.localStorage.setItem("aemGuidesWkndPwa.site", site)
      setCurrentSite(site);
      window.location.reload();
    }
  }

  return (
    <div className="content" style={styles.container}>
      <div>
        <h1>Settings</h1>
        <div style={styles.selectContainer}>
          <strong>Site to Render</strong>
          <select style={styles.select} value={currentSite} onChange={onChangeHandler}>
            {spaSites.map((site, key) => <option key={key} value={site}>{site}</option>)}
          </select>
        </div>
        <dl>
          <dt><strong>Connected Site</strong></dt>
          <dd>/content/{currentSite}</dd>
          <dt><strong>Root Page</strong></dt>
          <dd>{getContentPath(currentSite)}</dd>
        </dl>
      </div>
      <em style={styles.explanation}>If no content appears on the Home Screen, ensure that you have created a site using the WKND SPA Site template. The default name is WKND-App, but you can select any name and configure it here.</em>
    </div>
  )
}

const styles = {
  container: {
    padding: "1rem",
    justifyContent: "space-between",
  },
  selectContainer: {
    margin: "1rem 0",
  },
  select: {
    marginTop: ".5rem",
    padding: ".5rem",
    borderRadius: "5px",
    backgroundColor: "#999",
    fontWeight: 700,
    display: "block",
    width: "100%",
  },
  explanation: {
    marginBottom: "2rem"
  }
}