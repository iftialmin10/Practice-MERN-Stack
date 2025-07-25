import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef, forwardRef } from "react";

import type { ModalProps } from "../../../type";
import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const content = (
    <div ref={ref} className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header} </h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
});

const Modal = (props: ModalProps) => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay ref={nodeRef} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
