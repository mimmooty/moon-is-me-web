import suncalc from "suncalc";
import newMoonCal from "./newMoonCalculator";
import nextNewMoonCal from "./nextNewMoonCalculator";
function getDaysBetweenDates(date1: Date, date2: Date) {
  // Convert both dates to milliseconds
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date2Ms - date1Ms);

  // Convert the difference to days
  const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export default function moonPhase30DaysCal(date: Date): Date {
  const newMoon = newMoonCal(date);
  const nextNewMoon = nextNewMoonCal(date);
  // const dayDiff = getDaysBetweenDates(newMoon, nextNewMoon);
  // console.log("dayDiff" + dayDiff);
  // return nextNewMoon;
  return date;
}
