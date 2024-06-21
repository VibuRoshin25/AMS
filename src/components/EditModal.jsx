import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const EditModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name || '',
    role: item.role || '',
    Checkin: item.Checkin || '',
    Checkout: item.Checkout || '',
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleTimeChange = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue.format('HH:mm') 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 h-screen" aria-modal="true">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-700">EDIT</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className='font-sans text-2xl text-center'>{formData.name}</p>
            <p className='font-sans text-md text-center'>{formData.role}</p>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex justify-between mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="inDateTime" className="block mb-2">Check In Time</label>
                <TimePicker
                  value={dayjs(`2000-01-01T${formData.Checkin}`)}
                  onChange={(newValue) => handleTimeChange('Checkin', newValue)}
                  renderInput={(params) => <input {...params} className="w-full p-2 border-2 rounded text-sm outline-none border-gray-300" />}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="outDateTime" className="block mb-2">Check Out Time</label>
                <TimePicker
                  value={dayjs(`2000-01-01T${formData.Checkout}`)}
                  onChange={(newValue) => handleTimeChange('Checkout', newValue)}
                  renderInput={(params) => <input {...params} className="w-full p-2 border-2 rounded text-sm outline-none border-gray-300" />}
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
    id: '',
    name: '',
    Checkin: dayjs().toISOString(),
    Checkout: dayjs().toISOString(),
  },
};

export default EditModal;
