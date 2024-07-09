import { toast } from "react-toastify";

const showToast = (message, type = "default") => {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};

export const showSuccessToast = (message) => showToast(message, "success");
export const showErrorToast = (message) => showToast(message, "error");
export const showInfoToast = (message) => showToast(message, "info");
export const showWarnToast = (message) => showToast(message, "warn");
