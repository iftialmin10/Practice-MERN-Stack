import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import type { MainNavigationProps } from "../../../type";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";

const MainNavigation = (props: MainNavigationProps) => {
  return (
    <>
      <SideDrawer>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation__title">
          <Link to="/">YourPlace</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
