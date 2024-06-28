import dayjs from "dayjs";
import "dayjs/locale/en";

export const getDate = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const getTime = (date) => {
  return dayjs(date).format("hh:mm A");
};

export const calculateDuration = (start, end) => {
  const difference = end - start;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} hours ${minutes} min`;
};
