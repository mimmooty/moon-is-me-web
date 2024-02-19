import suncalc from "suncalc";

export default function calculateMoonPhase(date: Date): string {
  // Get current coordinates based on user's location or IP address
  // Calculate moon position and illumination parameters for the given date
  const moonData = suncalc.getMoonIllumination(date);
  const moonPhaseNames = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent",
  ];
  const illuminationFraction = moonData.fraction;
  const phaseIndex = Math.floor(
    (illuminationFraction * 8) % moonPhaseNames.length
  );
  const moonPhase = moonPhaseNames[phaseIndex];
  /////////////////

  //const phasesPerDay = 0.984352966667; // Average length of lunar cycle in days

  // Calculate the number of days since the most recent New Moon
  //onst daysSinceNewMoon = (date.getTime() - Date.UTC(2000, 0, 6)) / 86400000;

  // Calculate the phase index (0 to 7)
  // const phaseIndex = Math.abs(
  //   Math.floor((daysSinceNewMoon * phasesPerDay) % 8)
  // );
  console.log(">>>>>>>>>> " + moonData.fraction + date + phaseIndex);
  return moonPhase;
}
