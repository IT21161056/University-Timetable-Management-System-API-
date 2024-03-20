import { DAYS } from "../constants/constants.js";

export const getDayOfWeek = (date) => {
  return DAYS[new Date(date).getDay()];
};
