import type { SideDrawerProps } from "../../../type";
import ReactDom from "react-dom";
import "./SideDrawer.css";

const SideDrawer = (props: SideDrawerProps) => {
  const content = <aside className="side-drawer">{props.children}</aside>;

  return ReactDom.createPortal(
    content,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;
