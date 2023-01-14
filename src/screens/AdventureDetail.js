import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useGraphQL, adventureDetailQuery } from "../api";
import ErrorScreen from "../screens/Error";
import Image from "../components/Image";
import { Theme } from "../theme";

export default function AdventureDetail() {

  const [hasFetched, setHasFetched] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const _path = query.get("_path");
  const { graphQLData, errors } = useGraphQL(adventureDetailQuery(_path));

  const BackButton = ({ children }) => (
    <Link to="/adventures" style={styles.backButton}>
      <IoChevronBack size="2rem" />
      {children}
    </Link>
  )
  // Error State
  if (errors !== null) {
    setHasFetched(true);
    return <ErrorScreen error={errors} />;

    // Loading State
  } else if (!hasFetched && graphQLData === null) {
    return (
      <div className="content detail-screen" style={styles.container}>
        <div style={styles.headerContainer}>
          <BackButton>
            <div className="loading-skeleton" style={styles.titleSkeleton}></div>
          </BackButton>
        </div>
      </div>
    )

    // Data Error State
  } else if (hasFetched && !graphQLData?.adventureByPath?.item) {
    return <ErrorScreen error="There was an error with the returned graphQLData." />;

    // Default Render view
  } else if (graphQLData !== null) {
    if (!hasFetched) setHasFetched(true);


    const adventure = graphQLData.adventureByPath.item;
    const title = adventure.title || false;
    const descriptionJSON = adventure.description?.json || false;
    let imgSrc = adventure.primaryImage?._path || false;
    const adventureDetails = [];
    if (adventure.activity) adventureDetails.push({ key: "Activity", value: adventure.activity })
    if (adventure.adventureType) adventureDetails.push({ key: "Adventure Type", value: adventure.adventureType })
    if (adventure.tripLength) adventureDetails.push({ key: "Trip Length", value: adventure.tripLength })
    if (adventure.groupSize) adventureDetails.push({ key: "Group Size", value: adventure.groupSize })
    if (adventure.difficulty) adventureDetails.push({ key: "Difficulty", value: adventure.difficulty })
    if (adventure.price) adventureDetails.push({ key: "Activity", value: adventure.price })

    return (
      <div className="content detail-screen" style={styles.container}>
        <div style={styles.headerContainer}>
          <BackButton>
            {!title && <div className="loading-skeleton" style={styles.titleSkeleton}></div>}
            {title && <h1 style={styles.title}>{title}</h1>}
          </BackButton>
        </div>
        <Image imgSrc={imgSrc} alt={title} />
        <div style={styles.description}>
          <div style={styles.adventureDetails}>
            {adventureDetails.map(({ key, value }, index) => (
              <div key={index}>
                <span style={styles.adventureDetailsKey}>{key}</span>
                <p style={styles.adventureDetailsValue}>{value}</p>
              </div>
            ))}
          </div>
          {descriptionJSON && descriptionJSON.map((node, key) => {
            const Element = node.nodeType === "header" ? `${node.style}` : "p";
            return <Element key={key}>{node.content.map(({ value }) => value)}</Element>
          })}
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: ".5rem",
    fontSize: "1.5rem",
    textTransform: "uppercase",
    maxWidth: "100%",
    margin: 0,
  },
  description: {
    padding: "1rem",
    backgroundColor: Theme.colors.detailBackground,
    color: Theme.colors.detailText,
    flex: 1
  },
  titleSkeleton: {
    height: "2.5rem",
    width: "85%",
    margin: "1rem"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem 0",
    alignItems: "center",
  },
  adventureDetails: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(3, 1fr)",
    marginBottom: "1rem",
  },
  adventureDetailsKey: {
    fontSize: ".75rem"
  },
  adventureDetailsValue: {
    fontWeight: "700"
  },
  backButton: {
    color: Theme.colors.text,
    display: "inline-flex",
    textDecoration: "none",
    alignItems: "center",
  }
}