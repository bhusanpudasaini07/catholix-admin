import { differenceInCalendarDays } from "date-fns";
import { AlertCircle, CheckCircle, CircleDot } from "lucide-react";

/**
 *  to show deadline remaining in projects or other modules
 * @param date comes from api/ is passed as props
 * @returns how many days remaining
 */
const showDeadline = (date: string) => {
  if (date === "") {
    return { statusText: "Not started", daysValue: null };
  }

  const deadlineDate = new Date(date);
  const currentDate = new Date();
  const remainingDays = differenceInCalendarDays(deadlineDate, currentDate);
  let statusText = "";
  let daysValue = null;
  let leftText = "";

  if (remainingDays < 0) {
    statusText = "Deadline exceeded";
    daysValue = remainingDays;
    leftText = "Exceeded";
  } else {
    statusText = `${remainingDays} days remaining`;
    leftText = `${remainingDays} days Left`;
    daysValue = remainingDays;
  }

  return { statusText, daysValue, leftText };
};

/**
 * Calculates the total days between start date and deadline, then returns a value (1 to 100) after converting it to percent.
 * @param startDate start date of the project
 * @param deadline deadline of the project
 * @returns a value between 1 to 100 based on the percent calculation
 */
const calculateDeadlinePercentValue = (startDate: string, deadline: string) => {
  const startDateObj = new Date(startDate);
  const deadlineObj = new Date(deadline);
  const currentDate = new Date();

  const totalDays = differenceInCalendarDays(deadlineObj, startDateObj);
  const daysPassed = differenceInCalendarDays(currentDate, startDateObj);
  const percent = (daysPassed / totalDays) * 100;

  // Inverting the percent to get a higher value for lower percentages and vice versa
  let value = 100 - percent;

  // Ensuring the value is within the 1 to 100 range
  // value = Math.max(1, Math.min(value, 100));

  return { totalDays, value };
};

/**
 *  changing the date to yesterday,today, days ago and years ago
 * @param date comes from api/ is passed as props
 * @returns changed date
 */
const changeDateDisplay = (date: string) => {
  const lastLogDate = new Date(date);
  const daysDifference = differenceInCalendarDays(new Date(), lastLogDate);

  if (!date) {
    return "-";
  } else if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else if (daysDifference > 365) {
    const years = Math.floor(daysDifference / 365);
    const months = Math.floor((daysDifference % 365) / 30);
    return `${years} ${years > 1 ? "years" : "year"} ${months} ${
      months > 1 ? "months" : "month"
    } ago`;
  } else {
    return `${daysDifference} days ago`;
  }
};

/**
 * @param riskStatus comes either low, high or medium,
 * @returns bg-color according to risk
 */
const getRiskStatusBgColor = (riskStatus: string) => {
  switch (riskStatus) {
    case "Low":
      return "bg-green-300";
    case "High":
      return "bg-red-300";
    default:
      return "bg-yellow-300";
  }
};

/**
 * Calculates the sum of approved and unapproved RP and determines the color based on conditions
 * @param approvedRp number of approved RP
 * @param unapprovedRp number of unapproved RP
 * @returns an object containing the sum , color code and icon
 */
const calculateRpSumAndColor = (approvedRp: number, unapprovedRp: number) => {
  const sum = approvedRp + unapprovedRp;
  let color = "text-zinc-500"; // Default color
  let icon = <CircleDot size={16} />;

  if (sum > 0) {
    if (unapprovedRp > 0) {
      color = "text-orange-500";
      icon = <AlertCircle size={16} />;
    } else if (sum > 1 && unapprovedRp === 0) {
      color = "text-green-500";
      icon = <CheckCircle size={16} />;
    }
  }

  return { sum, color, icon };
};

/**
 * Calculates the percentage of RP left based on used and approved RP and determines the color based on the percentage left
 * @param usedRp number of used RP
 * @param approvedRp number of approved RP
 * @returns an object containing the percentage of RP left as a string and the color code
 */
const calculateRpLeft = (usedRp: number, approvedRp: number) => {
  if (approvedRp <= 0) {
    return { percentageLeft: "N/A", color: "text-red-500" };
  }
  const rpLeft = approvedRp - usedRp;
  const percentageLeft = (rpLeft / approvedRp) * 100;
  let color = "text-green-500"; // Default color for 50% and above

  if (percentageLeft <= 0) {
    return { percentageLeft: "N/A", color: "text-red-500" };
  } else if (percentageLeft < 10) {
    color = "text-red-500";
  } else if (percentageLeft < 50) {
    color = "text-orange-500";
  }

  return { percentageLeft: `${percentageLeft.toFixed(2)}% Left`, color };
};

/**
 * Calculates the percentage of used and unused RP based on sales RP and used RP
 * @param salesRp number of sales RP
 * @param usedRp number of used RP
 * @returns an object containing the numerical percentage of used and unused RP
 */
const calculateUsedAndUnusedRpPercentage = (
  salesRp: number | null,
  usedRp: number | null
) => {
  if (salesRp === null || usedRp === null || salesRp === 0) {
    return { usedPercentage: 0, unusedPercentage: 0 };
  }
  const usedPercentage = (usedRp / salesRp) * 100;
  const unusedPercentage = 100 - usedPercentage;

  return {
    usedPercentage: Math.round(usedPercentage),
    unusedPercentage: Math.round(unusedPercentage),
  };
};

// For hours and minutes
const calculateTimeLog = (time: number) => {
  const timeInSeconds = time;
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  return { hours, minutes };
};

const timeFormatter = (time: number) => {
  const timeInSeconds = time;
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  if (minutes === 0) {
    return `${hours}H`;
  } else {
    return `${hours}H ${minutes}M`;
  }
};

const hourTimeFormatter = (time: number) => {
  const timeInSeconds = time;
  const hours = Math.floor(timeInSeconds / 3600);
  // const minutes = Math.floor((timeInSeconds % 3600) / 60);

  return `${hours}H`;
};

const hoursMinuteFormatter = (time: number) => {
  const timeInSeconds = time;
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes}M`;
  } else {
    return `${hours}H ${minutes}M`;
  }
};

//For rounded hours
const calculateTime = (time: number) => {
  const totalHours = time / 3600;
  return Math.round(totalHours);
};

const changeNumberFormat = (num: number) => {
  const changedValue = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);

  return changedValue;
};

const calculatePercentage = (value: number, total: number) => {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
};

export {
  showDeadline,
  changeDateDisplay,
  getRiskStatusBgColor,
  calculateRpSumAndColor,
  calculateRpLeft,
  calculateDeadlinePercentValue,
  calculateUsedAndUnusedRpPercentage,
  calculateTimeLog,
  changeNumberFormat,
  calculateTime,
  timeFormatter,
  calculatePercentage,
  hoursMinuteFormatter,
  hourTimeFormatter,
};
