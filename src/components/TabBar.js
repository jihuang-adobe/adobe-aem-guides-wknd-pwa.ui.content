import { NavLink, useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { CgMenuGridR } from "react-icons/cg";
import { BiNews } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

import { Theme } from "../theme";

export default function TabBar() {

  const tabIconSize = "2rem";
  const location = useLocation();
  const isHomeSelected = location.pathname === "/";
  const isAdventuresSelected = location.pathname === "/adventures";
  const isMagazineSelected = location.pathname === "/magazine";
  const isSettingsSelected = location.pathname === "/settings";

  const getTabStyle = (isSelected) => ({ ...styles.tab, color: isSelected ? Theme.colors.accent : Theme.colors.text });

  return (
    <div style={styles.tabsContainer}>
      <nav style={styles.tabs}>
        <NavLink to="/" style={getTabStyle(isHomeSelected)} className={isActive => isActive ? "active" : ""}>
          <TiHome size={tabIconSize} />
          <span style={styles.tabText}>Home</span>
        </NavLink>
        <NavLink to="/adventures" style={getTabStyle(isAdventuresSelected)} className={isActive => isActive ? "active" : ""}>
          <CgMenuGridR size={tabIconSize} />
          <span style={styles.tabText}>Adventures</span>
        </NavLink>
        <NavLink to="/magazine" style={getTabStyle(isMagazineSelected)} className={isActive => isActive ? "active" : ""}>
          <BiNews size={tabIconSize} />
          <span style={styles.tabText}>Magazine</span>
        </NavLink>
        <NavLink to="/settings" style={getTabStyle(isSettingsSelected)} className={isActive => isActive ? "active" : ""}>
          <FiSettings size={tabIconSize} />
          <span style={styles.tabText}>Settings</span>
        </NavLink>
      </nav>
    </div>
  )
}

const styles = {
  tabsContainer: {
    zIndex: 10,
    backgroundColor: Theme.colors.background,
    height: "6rem",
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    height: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: Theme.colors.text,
    flex: 1,
    textDecoration: "none",
  },
  tabText: {
    fontFamily: "Source Sans Pro",
  }
}