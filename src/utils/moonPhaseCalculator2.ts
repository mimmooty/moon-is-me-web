interface MoonPhase {
  name: string;
  image_path: string;
}
export function calculateMoonPhase(date: Date): MoonPhase {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();

  // Step 1: Calculate Julian Date (JD)
  function calculateJulianDate(
    year: number,
    month: number,
    day: number
  ): number {
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    let jd =
      day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
    return jd;
  }

  // Step 2: Calculate number of days since last known new moon (NM)
  // For simplicity, assuming last New Moon occurred on January 1, 2000
  const NM_JD: number = calculateJulianDate(2000, 1, 1);
  const JD: number = calculateJulianDate(year, month, day);
  let T: number = JD - NM_JD;

  // Step 3: Normalize T to the range [0, 29.53]
  T = ((T % 29.53) + 29.53) % 29.53;

  // Step 4: Determine moon phase

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

  const phaseIndex: number = Math.floor((T / 29.53) * 8);
  return moonPhaseNames[phaseIndex];
}
