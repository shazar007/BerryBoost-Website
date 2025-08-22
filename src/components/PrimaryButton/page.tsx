import React, { useState } from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  width?: any;
  scroll?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function PrimaryButton({
  text,
  scroll,
  onClick,
  onMouseEnter,
  onMouseLeave,
  width,
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{ width: width ? width : "174px" }}
      onMouseEnter={(e: any) => {
        setIsHovered(true);
        onMouseEnter && onMouseEnter();
      }}
      onMouseLeave={(e: any) => {
        setIsHovered(false);
        onMouseLeave && onMouseLeave();
      }}
      className={`relative cursor-pointer overflow-hidden h-[40px] rounded-[4px] border flex items-center justify-center gap-0 z-10 bg-transparent ${
        scroll || isHovered
          ? "border-[#14CCC3] "
          : "lg:border-white border-[#14CCC3]"
      }`}
    >
      <svg
        viewBox="0 0 176 40"
        className="absolute top-0 left-0 w-full h-full z-0"
        preserveAspectRatio="none"
      >
        <circle
          cx="26"
          cy="25"
          r={isHovered ? 300 : 0}
          fill="#14CCC3"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <div className="flex items-center gap-2 z-10 relative">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-700"
        >
          <circle cx="5.5" cy="14.5" r="5.5" fill="#14CCC3" />
          <circle
            cx="3.5"
            cy="3.5"
            r="3.5"
            fill={scroll ? (isHovered ? "white" : "#000") : "white"}
            className="transition-all duration-700"
          />
        </svg>
        <span
          className={`text-[14px] font-normal transition-colors duration-700 ${
            scroll
              ? isHovered
                ? "lg:text-white text-[#14CCC3]"
                : "text-[#000]"
              : isHovered
              ? "lg:text-white text-[#14CCC3]"
              : "lg:text-white text-[#14CCC3]"
          }`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
