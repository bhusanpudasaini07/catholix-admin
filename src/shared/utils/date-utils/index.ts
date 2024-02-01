import moment from "moment";

const changeDateToMonthYear = (date: string) => {
  return moment(date).format("Do MMM, YYYY");
};

export { changeDateToMonthYear };
