import { useState } from "react";
import PropTypes from "prop-types";
import TimeInput from "../TimeInput";
import { updateRecord } from "../../store/recordsFilterSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import CustomModal from "./Modal";
import Button from "../buttons/Button";
import EditButton from "../buttons/EditButton";
import { calculateStatus } from "../../utils/statusMethods";
import { calculateDuration } from "../../utils/dateMethods";

const EditRecordModal = ({ item, selectedDate, disable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name || "",
    role: item.role || "",
    punchin: item.punchin,
    punchout: item.punchout,
  });

  const handleTimeChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const punchIn = dayjs(formData.punchin, "hh:mm A").toDate();
    const punchOut = dayjs(formData.punchout, "hh:mm A").toDate();
    const newDuration = calculateDuration(punchIn, punchOut);
    const data = {
      [selectedDate]: {
        punchin: formData.punchin,
        punchout: formData.punchout,
        duration: newDuration,
        status: calculateStatus(newDuration),
      },
    };
    handleSaveEdit(data);
  };

  const handleSaveEdit = (updatedRecord) => {
    console.log(updateRecord);
    dispatch(updateRecord(updatedRecord));
    setIsModalOpen(false);
  };

  const closeEditRecordModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <EditButton onClick={() => setIsModalOpen(true)} disable={disable} />
      <CustomModal isOpen={isModalOpen} onClose={closeEditRecordModal}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4">
            <p className="font-sans font-bold text-center text-2xl">
              {formData.name}
            </p>
            <p className="text-center text-md">{formData.role}</p>
          </div>
          <div className="flex flex-col justify-center items-center mb-4 w-full">
            <TimeInput
              label="In Time"
              value={dayjs(formData.punchin, "hh:mm A").toDate()}
              onChange={(value) => handleTimeChange("punchin", value)}
            />
            <TimeInput
              label="Out Time"
              value={dayjs(formData.punchout, "hh:mm A").toDate()}
              onChange={(value) => handleTimeChange("punchout", value)}
            />
          </div>
          <div className="flex">
            <Button type="button" onClick={closeEditRecordModal}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

EditRecordModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    punchin: PropTypes.string,
    punchout: PropTypes.string,
  }),
};

export default EditRecordModal;
