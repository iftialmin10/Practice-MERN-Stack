import ReactDOM from "react-dom";

import "./Backdrop.css";
import type { BackdropsProps } from "../../../type";

const Backdrop = (props: BackdropsProps) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
