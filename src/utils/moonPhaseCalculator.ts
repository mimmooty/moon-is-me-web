import suncalc from "suncalc";
interface MoonPhase {
  name: string;
  image_path: string;
}
export default function calculateMoonPhase(date: Date): MoonPhase {
  // Get current coordinates based on user's location or IP address
  // Calculate moon position and illumination parameters for the given date
  const moonData = suncalc.getMoonIllumination(date);

  const moonPhaseNames = [
    { name: "New Moon", image_path: "new_moon.png" },
    { name: "Waxing Crescent", image_path: "waxing_crescent.png" },
    { name: "First Quarter", image_path: "first_quarter.png" },
    { name: "Waxing Gibbous", image_path: "waxing_gibbous.png" },
    { name: "Full Moon", image_path: "full_moon.png" },
    { name: "Waning Gibbous", image_path: "waning_gibbous.png" },
    { name: "Last Quarter", image_path: "last_quarter.png" },
    { name: "Waning Crescent", image_path: "waning_crescent.png" },
  ];

  const illuminationFraction = moonData.fraction;
  const phaseIndex = Math.floor(
    (illuminationFraction * 8) % moonPhaseNames.length
  );
  const moonPhase = moonPhaseNames[phaseIndex];
  console.log(">>>>>>>>>> " + moonData.fraction + date + phaseIndex);
  return moonPhase;
}
