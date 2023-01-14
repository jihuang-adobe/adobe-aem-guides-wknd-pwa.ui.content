import { Link } from "react-router-dom";
import { V2Image, V2Title, } from "../components/aem";
import { Theme } from "../theme";
import { contentPath, initModelManager } from "../utils";
import "./Index.css";

export default function Index() {

  const pagePath = contentPath;

  initModelManager(pagePath)

  return (
    <div className="content" style={styles.container}>
      <Link to="/adventures" style={styles.homepageHero}>
        <div style={styles.homepageHeroImage} className="homepage-hero-image-wrapper">
          <V2Image key="search-image" styles={styles.homepageHeroImage} pagePath={pagePath} itemPath="root/image" />
        </div>
        <div style={styles.homepageHeroTitleSearch}>
          <div style={styles.homepageHeroTitle}>
            <V2Title key="search-title" styles={styles.homepageHeroTitle} pagePath={pagePath} itemPath="root/title" />
          </div>
          <input style={styles.homepageHeroSearch} placeholder="Find Adventures Near You" />
        </div>
      </Link>
      <Link to="/magazine" style={styles.homepageHero}>
        <div style={styles.homepageHeroImage} className="homepage-hero-image-wrapper">
          <V2Image key="featured-article-image" styles={styles.homepageHeroImage} pagePath={pagePath} itemPath="root/image-featured-articles" />
        </div>
        <div style={styles.homepageHeroTitleSearch}>
          <div style={{ ...styles.homepageHeroTitle, textAlign: "left", paddingLeft: "1rem" }}>
            <V2Title key="featured-article-title" styles={styles.homepageHeroTitle} pagePath={pagePath} itemPath="root/title-featured-articles" />
          </div>
        </div>
      </Link>
    </div>
  );
}

const styles = {
  container: {
  },
  homepageHero: {
    flex: 1,
    position: "relative",
  },
  homepageHeroTitleSearch: {
    position: "absolute",
    top: ".5rem",
    left: 0,
    right: 0,
    marginTop: ".5rem",
    textAlign: "center",
    zIndex: 10,
  },
  homepageHeroTitle: {
    color: Theme.colors.background,
  },
  homepageHeroImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  homepageHeroSearch: {
    gridArea: "overlay",
    alignSelf: "flex-start",
    justifySelf: "center",
    padding: ".5rem 1rem",
    marginTop: ".25rem",
    borderRadius: "5rem",
    border: "none",
    boxShadow: "0 0 5px rgba(0,0,0,.1)",
    width: "14rem",
    textAlign: "center"
  },
  adventureListContainer: {
    overflow: "hidden",
    flex: 1,
  },
  adventureList: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto"
  },
}
