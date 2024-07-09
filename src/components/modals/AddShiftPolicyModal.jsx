import CustomModal from "./Modal";
import { useState } from "react";
import Button from "../buttons/Button";

const AddShiftModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button onClick={openModal}> Add New Shift </Button>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}></CustomModal>
    </div>
  );
};

export default AddShiftModal;
