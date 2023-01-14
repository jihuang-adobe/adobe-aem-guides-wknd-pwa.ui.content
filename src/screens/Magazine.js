import { contentPath, initModelManager } from "../utils";
import { AEMResponsiveGrid, V2Title } from "../components/aem";

export default function Magazine() {

  const pagePath = `${contentPath}/magazine`;
  initModelManager(pagePath);

  return (
    <div className="content" style={styles.container}>
      <div style={styles.pageTitle}>
        <V2Title key="title" pagePath={pagePath} itemPath="root/title" />
      </div>
      <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" />
    </div>
  )
}

const styles = {
  container: {},
  pageTitle: {
    padding: "1rem",
  },
  adventureCard: {
    padding: "1rem",
  }
}
