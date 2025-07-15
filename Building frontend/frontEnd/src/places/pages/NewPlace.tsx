import "./NewPlace.css";
//import { NewPlaceProps } from "../../type";
import Input from "../../shared/components/FormElements/Input";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="Please enter a valid"
      />
    </form>
  );
};

export default NewPlace;
