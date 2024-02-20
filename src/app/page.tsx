"use client";
import React, { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import moon from "../../public/image/full_moon.png";
import vivid from "../../public/image/vivid.png";
import star from "../../public/image/Star at night.png";
import "./ZoomAnimationButton.css";

type ResponseData = {
  image: string;
  topic: string;
  content: string;
};

const IndexPage: NextPage = () => {
  const moonSectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showMoonInfo, setShowMoonInfo] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    // Check if the ref is assigned before accessing its current property
    if (showMoonInfo && moonSectionRef.current) {
      moonSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showMoonInfo]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = async () => {
    try {
      console.log("Selected year:", selectedYear);
      console.log("Selected month:", selectedMonth);
      console.log("Selected day:", selectedDay);
      const response = await fetch("/api/lunar-phase-cal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDay + "-" + selectedMonth + "-" + selectedYear,
        }), // Change the date as needed
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: ResponseData = await response.json();
      setResponseData(data);
      setShowMoonInfo(true);
    } catch (error) {
      // setError(error.message as string);
    }
    // window.location.href = "/moonresult";
  };
  const backBtn = () => {
    setShowMoonInfo(false);
    // window.location.href = "/moonresult";
  };

  const currentYear = new Date().getFullYear();
  const years = [];

  // Generate options for the last 10 years
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const daysInMonth = 31; // You can adjust this dynamically based on the selected month
  const dates = [];

  // Generate options for the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(
      <option key={day} value={day}>
        {day}
      </option>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-indigo-950">
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-indigo-950">
        <Image
          src={star}
          width={600}
          height={600}
          alt="image"
          className={
            isHovered
              ? "absolute object-cover zoom-in"
              : "absolute object-cover zoom-out"
          }
        />
        <Image
          src={moon}
          width={400}
          height={400}
          alt="Picture of the author"
          className="absolute object-cover"
        />
        <Image
          src={vivid}
          width={150}
          height={150}
          alt="Picture of the author"
          className="absolute top-1 m-4"
        />
        <nav className="absolute top-0 right-0 m-4">
          {/* Add your menu items here */}
        </nav>
        <div className="min-h-20"></div>
        <div className="min-h-10"></div>
        <div className="min-h-10"></div>
        <div className="min-h-10"></div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 lg:mb-8 text-violet-600 font-pacifico relative z-10">
          Moon is Me
        </h1>
        <h5 className="text-base md:text-lg lg:text-xl font-bold mb-4 md:mb-6 lg:mb-8 text-violet-200 relative z-10">
          Discover Your Birthday Moon Shape
        </h5>
        <div className="min-h-10"></div>
        <div className="min-h-10"></div>
        <div className="flex">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded relative z-10"
          >
            {years}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded relative z-10"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded relative z-10"
          >
            {dates}
          </select>
        </div>
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="button m-4 md:m-6 lg:m-8 px-4 py-2 bg-blue-700 text-white rounded relative z-10"
        >
          click me
        </button>
      </div>
      {showMoonInfo && responseData && (
        <div
          ref={moonSectionRef}
          className="relative flex flex-col items-left justify-center min-h-screen bg-gray-800 text-white"
        >
          <Image
            src={`${responseData.image}`}
            width={350}
            height={350}
            alt="Picture of the author"
          />
          <h2 className="text-base md:text-lg lg:text-xl font-bold m-4 md:m-6 lg:m-8text-violet-200 relative z-10">
            {responseData.topic}
          </h2>
          <p className="text-base md:text-lg lg:text-xl m-4 md:m-6 lg:m-8 relative z-10">
            {responseData.content}
          </p>
          <button
            onClick={backBtn}
            className="button m-4 md:m-6 lg:m-8 px-4 py-2 bg-blue-700 text-white rounded max-w-xs"
          >
            Go Back
          </button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default IndexPage;
