import suncalc from "suncalc";
import formatDate from "./formatDate";
export default function newMoonCal(date: Date): string {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>newMoonCal");
  const currentDate = new Date(date); // Create a new Date object from the provided date
  let date1 = date.getDate() - 1;
  const nextDate = new Date(currentDate); // Create a new Date object for nextDate
  nextDate.setDate(date1); // Set the day of the month for nextDate
  let mooncurrentDatePhase = 0;
  let moonnextDatePhase = 0;
  let moonnextDatefraction = 0;
  let mooncurrentDatfraction = 0;
  while (true) {
    // Calculate the moon phase for the current date
    mooncurrentDatePhase = suncalc.getMoonIllumination(currentDate).phase;
    mooncurrentDatfraction = suncalc.getMoonIllumination(currentDate).fraction;
    moonnextDatePhase = suncalc.getMoonIllumination(nextDate).phase;
    moonnextDatefraction = suncalc.getMoonIllumination(nextDate).fraction;
    console.log("currentDate" + currentDate);
    console.log("mooncurrentDatePhase" + mooncurrentDatePhase);
    console.log("mooncurrentDatfraction" + mooncurrentDatfraction);
    console.log("moonnextDatefraction" + moonnextDatefraction);
    // Check if the moon phase is approximately 0 (within a small threshold)
    if (Math.abs(mooncurrentDatePhase - moonnextDatePhase) > 0.3) {
      // You can adjust the threshold as needed
      break; // Exit the loop if we found a date with the new moon phase
    }

    // Move to the next day
    nextDate.setDate(nextDate.getDate() - 1);
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return formatDate(currentDate);
}
