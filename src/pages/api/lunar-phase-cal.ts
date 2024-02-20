import type { NextApiRequest, NextApiResponse } from "next";
import calculateMoonPhase from "../../utils/moonPhaseCalculator";
type ResponseData = {
  image: string;
  topic: string;
  content: string;
};
interface MoonPhase {
  name: string;
  image_path: string;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { date } = req.body;

  if (!date) {
    res.status(400).end();
    return;
  }
  const [day, month, year] = date.split("-");

  // Month is 0-indexed in JavaScript Date, so subtract 1 from the month
  const dateObject = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
  const lunarPhase: MoonPhase = calculateMoonPhase(dateObject);

  // Log the result
  console.log(
    "Lunar phase on " + date + dateObject.toDateString() + ": " + lunarPhase
  );

  // Here, you can perform any necessary processing based on the date
  // For demonstration purposes, we'll return static data
  res.status(200).json({
    image: "/image/" + lunarPhase.image_path,
    topic: lunarPhase.name,
    content:
      "At this point in its lunar cycle, the moon was 10.7 days old and appeared 82.91% illuminated. Its tilt was 155.469° and its distance from Earth was about 363,511.88 km. Astrologically, the moon was in the sign of Libra on this day.",
  });
}
