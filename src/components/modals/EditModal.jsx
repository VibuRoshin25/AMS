import { useState } from "react";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const EditModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name || "",
    role: item.role || "",
    Checkin: item.Checkin || "",
    Checkout: item.Checkout || "",
  });

  const handleTimeChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue.format("HH:mm"),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-700">
          Request to Edit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="font-sans font-bold text-center text-2xl">
              {formData.name}
            </p>
            <p className="text-center text-md">{formData.role}</p>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="inDateTime" className="block mb-2">
                  In Time
                </label>
                <TimePicker
                  value={formData.inDateTime}
                  onChange={(newValue) =>
                    handleTimeChange("inDateTime", newValue)
                  }
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full p-2 border-2 rounded text-sm outline-none border-gray-300"
                    />
                  )}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="outDateTime" className="block mb-2">
                  Out Time
                </label>
                <TimePicker
                  value={formData.outDateTime}
                  onChange={(newValue) =>
                    handleTimeChange("outDateTime", newValue)
                  }
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="w-full p-2 border-2 rounded text-sm outline-none border-gray-300"
                    />
                  )}
                />
              </div>
            </div>
          </LocalizationProvider>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    Checkin: PropTypes.string,
    Checkout: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditModal.defaultProps = {
  item: {
    name: "",
    inDateTime: dayjs().toISOString(),
    outDateTime: dayjs().toISOString(),
  },
};

export default EditModal;
