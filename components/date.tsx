import {
  parseISO,
  format,
  differenceInMinutes,
  differenceInHours,
  isYesterday,
  isValid,
} from "date-fns";

const DateFormat = ({ dateString }) => {
  if (!dateString) {
    return null;
  }

  let date;
  try {
    date = parseISO(dateString);
    if (!isValid(date)) {
      throw new Error("Invalid date format");
    }
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return <time>Invalid date</time>; // Return an error message or similar
  }

  const now = new Date();
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  let timeString;

  if (minutesDiff < 5) {
    timeString = "Just now";
  } else if (minutesDiff < 60) {
    timeString = `${minutesDiff} mins ago`;
  } else if (hoursDiff < 24) {
    timeString = `${hoursDiff} hours ago`;
  } else if (isYesterday(date)) {
    timeString = "Yesterday";
  } else {
    timeString = format(date, "dd-MMM-yyyy - HH:mm");
  }

  return <time className="font-mono text-xs" dateTime={date.toISOString()}>{timeString}</time>;
};

export default DateFormat;
