import CustomModal from "./Modal";
import { useState } from "react";
import Button from "../Button";

const AddHolidayModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button onClick={openModal}> Add Holiday </Button>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}></CustomModal>
    </div>
  );
};

export default AddHolidayModal;
