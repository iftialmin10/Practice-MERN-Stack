import type { SideDrawerProps } from "../../../type";
import "./SideDrawer.css";

const SideDrawer = (props: SideDrawerProps) => {
  return <aside className="side-drawer">{props.children}</aside>;
};

export default SideDrawer;
