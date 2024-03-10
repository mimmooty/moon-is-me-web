import type { NextApiRequest, NextApiResponse } from "next";
import calculateMoonPhase from "../../utils/moonPhaseCalculator";
import newMoonCal from "@/utils/newMoonCalculator";
import nextNewMoonCal from "@/utils/nextNewMoonCalculator";
import moonPhase30DaysCal from "@/utils/moonPhase30DaysCalculator";
type ResponseData = {
  image: string;
  topic1: string;
  topic2: string;
  content1: string;
  content2: string;
  content3: string;
};
interface MoonPhase {
  name: string;
  image_path: string;
  topic1: string;
  topic2: string;
  content1: string;
  content2: string;
  content3: string;
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
  console.log("newMoonCal " + newMoonCal(dateObject));
  console.log("nextNewMoonCal " + nextNewMoonCal(dateObject));

  console.log("moonPhase30DaysCal " + moonPhase30DaysCal(dateObject));
  // Log the result
  console.log(
    "Lunar phase on " + date + dateObject.toDateString() + ": " + lunarPhase
  );

  // Here, you can perform any necessary processing based on the date
  // For demonstration purposes, we'll return static data
  res.status(200).json({
    image: "/image/" + lunarPhase.image_path,
    topic1: lunarPhase.topic1,
    topic2: lunarPhase.topic2,
    content1: lunarPhase.content1,
    content2: lunarPhase.content2,
    content3: lunarPhase.content3,
  });
}
