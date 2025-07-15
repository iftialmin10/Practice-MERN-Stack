import "./Input.css";
import type { InputProps } from "../../../type";

const Input = (props: InputProps) => {
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label} </label>
      {element}
    </div>
  );
};

export default Input;
