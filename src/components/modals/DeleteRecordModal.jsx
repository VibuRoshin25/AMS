import Button from "../buttons/Button";
import DeleteButton from "../buttons/DeleteButton";
import CustomModal from "./Modal";

const DeleteRecordModal = () => {
  return (
    <div>
      <DeleteButton />
      <CustomModal>
        <p>Confirm Delete?</p>
        <Button type="button">Yes</Button>
        <Button type="button">Cancel</Button>
      </CustomModal>
    </div>
  );
};

export default DeleteRecordModal;
