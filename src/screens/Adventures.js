import React from "react"
import { Theme } from "../theme";
import { V2Image, V2Title } from "../components/aem";
import SearchByCategory from "../components/SearchByCategory";
import { contentPath, initModelManager } from "../utils";


export default function Adventures() {

  const pagePath = `${contentPath}/adventures`;
  initModelManager(pagePath);

  return (
    <div className="content" style={styles.container}>
      <div style={styles.searchBox}>
        <div style={styles.homepageHeroImage} className="homepage-hero-image-wrapper">
          <V2Image key="search-image" styles={styles.homepageHeroImage} pagePath={pagePath} itemPath="root/image" />
        </div>
        <div style={styles.homepageHeroTitleSearch}>
          <div style={styles.homepageHeroTitle}>
            <V2Title key="search-title" styles={styles.homepageHeroTitle} pagePath={pagePath} itemPath="root/title" />
          </div>
          <input style={styles.homepageHeroSearch} placeholder="Find Your Next Adventure" />
        </div>
      </div>
      <div style={styles.searchByCategory}>
        <V2Title key="search-title-categories" styles={styles.homepageHeroTitle} pagePath={pagePath} itemPath="root/title-categories" />
        <SearchByCategory />
      </div>
    </div>
  )
}

const styles = {
  container: {},
  searchBox: {
    height: "10rem",
    minHeight: "10rem",
    position: "relative",
    overflow: "hidden"
  },
  searchResults: {
    padding: "1rem"
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
  },
  searchByCategory: {
    padding: "1rem",
  }
}