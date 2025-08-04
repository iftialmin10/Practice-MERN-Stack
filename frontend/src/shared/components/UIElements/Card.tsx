import "./Card.css";
import type { CardProps } from "../../../type";

const Card = (props: CardProps) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
