"use client";

import Image from "next/image";
import theSunPic from "../../public/image/moon.png";
const MoonPage: React.FC = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-indigo-950">
      <Image
        src={theSunPic}
        width={300}
        height={300}
        alt="Picture of the author"
        className="absolute object-cover"
      />

      <nav className="absolute top-0 right-0 m-4">
        {/* Add your menu items here */}
      </nav>
      <div className="min-h-20"></div>
      <div className="min-h-10"></div>
      <div className="min-h-10"></div>
      <div className="min-h-10"></div>
      <h1 className="text-8xl font-bold mb-8 text-violet-600 font-pacifico relative z-10">
        Waxing Gibbous Phase.
      </h1>
      <h5 className="text-2xl font-bold mb-8 text-violet-200 relative z-10">
        At this point in its lunar cycle, the moon was 10.7 days old and
        appeared 82.91% illuminated. Its tilt was 155.469° and its distance from
        Earth was about 363,511.88 km. Astrologically, the moon was in the sign
        of Libra on this day.
      </h5>
      <div className="min-h-10"></div>
      <div className="min-h-10"></div>
      <div className="flex">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-700 text-white rounded relative z-10"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MoonPage;
