import type { SideDrawerProps } from "../../../type";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

import "./SideDrawer.css";

const SideDrawer = (props: SideDrawerProps) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside className="side-drawer" onClick={props.onClick} ref={nodeRef}>
        {props.children}{" "}
      </aside>
    </CSSTransition>
  );
  return ReactDom.createPortal(
    content,
    document.getElementById("drawer-hook")!
  );
};

export default SideDrawer;
