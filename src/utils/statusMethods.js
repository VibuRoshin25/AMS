export const calculateStatus = (durationInHours) => {
  if (durationInHours >= 8) {
    return "Full Day";
  } else if (durationInHours >= 4) {
    return "Half Day";
  }
};
