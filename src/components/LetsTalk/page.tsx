"use client";
import React, { useState } from "react";
import { FaMinus, FaTimes } from "react-icons/fa";

export default function LetsTalk() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMinimize = (e: any) => {
    e.stopPropagation();
    setIsVisible(false); // Completely hide the widget
  };

  const handleCloseExpanded = (e: any) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 right-5 z-100 bg-center bg-cover border-2 border-[#14CCC3] rounded-lg bg-[url('/assets/8231244ce461e61070e44c3db1d2e13c96b12160.png')] flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isExpanded
          ? "w-[258px] h-[490px] p-4 flex-col justify-between"
          : "w-[180px] h-[260px] hover:scale-[1.1]"
      }`}
      onClick={toggleExpand}
    >
      {/* Close button (only shown in expanded view) */}
      {isExpanded && (
        <div
          className="absolute top-3 right-3 w-6 h-6 bg-[#14CCC3] flex justify-center items-center rounded-full hover:bg-[#0e9c96]"
          onClick={handleCloseExpanded}
        >
          <FaTimes className="text-white text-sm" />
        </div>
      )}

      {/* Content changes based on state */}
      {!isExpanded ? (
        // Small card view
        <>
          <p className="text-[#14CCC3] font-bold text-2xl">Let's Talk</p>
          <div
            className="absolute top-2 right-2 w-6 h-6 bg-[#14CCC3] flex justify-center items-center rounded-sm hover:bg-[#0e9c96]"
            onClick={handleMinimize}
          >
            <FaMinus className="text-white text-xs" />
          </div>
        </>
      ) : (
        // Expanded view
        <>
          <div className="flex-grow"></div>
          <div className="flex flex-col justify-between gap-2 space-x-2 w-full">
            <div className=" bg-opacity-20 bg-[#14CCC35C] p-2  rounded-md w-full h-[48px] flex items-center gap-5 backdrop-blur-sm">
              <div className="bg-[#14CCC3] w-[36px] h-[36px] rounded-[4px] flex items-center justify-center">
                <p className="text-white font-bold text-2xl">A</p>
              </div>{" "}
              <p className="text-white font-normal text-base">
                Explore Our Services
              </p>
            </div>
            <div className=" bg-opacity-20 bg-[#14CCC35C] p-2  rounded-md w-full h-[48px] flex items-center gap-5 backdrop-blur-sm">
              <div className="bg-[#14CCC3] w-[36px] h-[36px] rounded-[4px] flex items-center justify-center">
                <p className="text-white font-bold text-2xl">B</p>
              </div>{" "}
              <p className="text-white font-normal text-base">Estimate Cost</p>
            </div>{" "}
            <div className=" bg-opacity-20 bg-[#14CCC35C] p-2  rounded-md w-full h-[48px] flex items-center gap-5 backdrop-blur-sm">
              <div className="bg-[#14CCC3] w-[36px] h-[36px] rounded-[4px] flex items-center justify-center">
                <p className="text-white font-bold text-2xl">C</p>
              </div>{" "}
              <p className="text-white font-normal text-base">Contact us</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
