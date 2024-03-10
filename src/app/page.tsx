"use client";
import React, { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import homep4 from "../../public/image/home p4.png";
import newmoon from "../../public/image/new moon p1.png";
import star from "../../public/image/Star at night.png";
import "./ZoomAnimationButton.css";

type ResponseData = {
  image: string;
  topic1: string;
  topic2: string;
  content1: string;
  content2: string;
  content3: string;
};

const IndexPage: NextPage = () => {
  const moonSectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showMoonInfo, setShowMoonInfo] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();
  const currentYears = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Note: Month is zero-indexed, so adding 1
  const currentDay = currentDate.getDate();
  const [selectedYear, setSelectedYear] = useState(currentYears.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [selectedDay, setSelectedDay] = useState(currentDay.toString());

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
      setShowMoonInfo(false);
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-myblue-950">
      {/* Section1 */}
      <div className="relative min-h-screen bg-myblue-950 flex flex-col items-center justify-center">
        <Image
          src={star}
          width={600}
          height={600}
          alt="image"
          className={
            (isHovered ? "object-cover zoom-in" : "object-cover zoom-out") +
            " absolute z-1"
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl relative">
          <div className="relative">
            <Image
              src={newmoon}
              width={600}
              height={600}
              alt="Picture of the t-shirt"
              className="object-cover hidden md:block"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Conditionally render homep3 on smaller screens */}
            <Image
              src={homep4}
              width={1200}
              height={1200}
              alt="Picture of the t-shirt"
              className="object-cover md:hidden"
            />
            <Image
              src={homep4}
              width={1200}
              height={1200}
              alt="Picture of the t-shirt"
              className="object-cover hidden md:block"
            />
            <div className="flex flex-wrap justify-center gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                {years}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border border-gray-300 rounded"
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
                className="p-2 border border-gray-300 rounded"
              >
                {dates}
              </select>
              <button
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="px-4 py-2 bg-blue-700 text-white rounded"
              >
                Generate Moon Shape
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section2 */}
      {showMoonInfo && responseData && (
        <div
          ref={moonSectionRef}
          className="relative flex flex-col items-left justify-center min-h-screen text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl relative">
            <div></div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl text-white text-center relative z-10">
                {responseData.topic1}
              </h2>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center relative z-10">
                {responseData.topic2}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl relative">
            <div className="flex justify-center">
              <div className="max-w-xs">
                <Image
                  src={`${responseData.image}`}
                  width={350}
                  height={350}
                  alt="Picture of the moon"
                  className="object-cover w-full h-auto sm:w-150 sm:h-150"
                />
              </div>
            </div>
            <div>
              <p className="text-base md:text-lg lg:text-xl m-4 md:m-6 lg:m-8 relative z-10 ">
                {responseData.content1}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-6xl relative">
                <div>
                  <p className="text-sm md:text-lg lg:text-xl m-4 md:m-6 lg:m-8 relative z-10 !whitespace-pre-line">
                    {responseData.content2}
                  </p>
                </div>
                <div>
                  <p className="text-sm md:text-lg lg:text-xl m-4 md:m-6 lg:m-8 relative z-10 !whitespace-pre-line">
                    {responseData.content3}
                  </p>
                </div>
              </div>
              <button
                onClick={backBtn}
                className="button m-4 md:m-6 lg:m-8 px-4 py-2 bg-blue-700 text-white rounded max-w-xs"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default IndexPage;
