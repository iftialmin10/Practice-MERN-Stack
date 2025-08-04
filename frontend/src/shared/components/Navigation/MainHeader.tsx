import type { MainHeaderProps } from "../../../type";
import "./MainHeader.css";

const MainHeader = (props: MainHeaderProps) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
