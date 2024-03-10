import suncalc from "suncalc";
import newMoonCal from "./newMoonCalculator";
import nextNewMoonCal from "./nextNewMoonCalculator";
import formatDate from "./formatDate";

interface MoonPhase {
  name: string;
  image_path: string;
  topic1: string;
  topic2: string;
  content1: string;
  content2: string;
  content3: string;
}
export default function calculateMoonPhase(date: Date): MoonPhase {
  // Get current coordinates based on user's location or IP address
  // Calculate moon position and illumination parameters for the given date
  const moonData = suncalc.getMoonIllumination(date);
  const latitude: number = 51.5074;
  const longitude: number = 0.1278;
  const moonData1 = suncalc.getMoonPosition(date, latitude, longitude);

  const moonPhaseNames = [
    { name: "New Moon", image_path: "new moon p1.png" },
    { name: "Waxing Crescent1", image_path: "waxing crescent p1.png" },
    { name: "Waxing Crescent2", image_path: "waxing crescent p1.png" },
    { name: "Waxing Crescent3", image_path: "waxing crescent p1.png" },
    { name: "Waxing Crescent4", image_path: "waxing crescent p1.png" },
    { name: "Waxing Crescent5", image_path: "waxing crescent p1.png" },
    { name: "Waxing Crescent6", image_path: "waxing crescent p1.png" },
    { name: "First Quarter", image_path: "first quarter p1.png" },
    { name: "Waxing Gibbous1", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous2", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous3", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous4", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous5", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous6", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous7", image_path: "waxing gibbous p1.png" },
    { name: "Waxing Gibbous8", image_path: "waxing gibbous p1.png" },
    { name: "Full Moon", image_path: "full moon p1.png" },
    { name: "Waning Gibbous1", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous2", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous3", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous4", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous5", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous6", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous7", image_path: "waning gibbous p1.png" },
    { name: "Waning Gibbous8", image_path: "waning gibbous p1.png" },
    { name: "Last Quarter", image_path: "last quarter p1.png" },
    { name: "Waning Crescent1", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent2", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent3", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent4", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent5", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent6", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent7", image_path: "waning crescent p1.png" },
    { name: "Waning Crescent8", image_path: "waning crescent p1.png" },
  ];

  const illuminationFraction = moonData.phase;
  const phaseIndex = Math.floor(
    (illuminationFraction * moonPhaseNames.length) % moonPhaseNames.length
  );
  const moonPhase: MoonPhase = {
    name: moonPhaseNames[phaseIndex].name,
    image_path: moonPhaseNames[phaseIndex].image_path,
    topic1:
      (moonData.fraction * 100).toFixed(2) + "% | " + moonData.phase.toFixed(2),
    topic2: formatDate(date),
    content1: moonPhaseNames[phaseIndex].name,
    content2: "Fraction\nPhase\nAngle\nPrevious New Moon\nNext new moon",
    content3:
      moonData.fraction +
      "\n" +
      moonData.phase +
      "\n" +
      moonData.angle +
      "\n" +
      newMoonCal(date) +
      "\n" +
      nextNewMoonCal(date),
  };

  return moonPhase;
}
