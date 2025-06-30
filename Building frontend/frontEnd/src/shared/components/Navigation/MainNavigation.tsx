import MainHeader from "./MainHeader";
import type { MainNavigationProps } from "../../../type";
import "./MainNavigation.css";
import { Link } from "react-router-dom";

const MainNavigation = (props: MainNavigationProps) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>

      <h1 className="main-navigation__title">
        <Link to="/">YourPlace</Link>
      </h1>
      <nav>...</nav>
    </MainHeader>
  );
};

export default MainNavigation;
