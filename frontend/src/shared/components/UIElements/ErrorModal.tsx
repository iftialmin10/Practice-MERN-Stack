import Modal from "./Modal";
import Button from "../FormElements/Button";

interface ErrorModalProps {
  error: string | null;
  onClear: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
