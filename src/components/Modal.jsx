import Modal from "react-modal";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black-100 bg-white-100  rounded-full w-8 h-8 flex items-center justify-center"
        >
          &times;
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
