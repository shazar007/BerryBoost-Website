import React from "react";
import Location from "../../../public/assets/Dotted Map.webp";
import USA from "../../../public/assets/usa.png";
import UK from "../../../public/assets/uk.png";
import CANADA from "../../../public/assets/canada.png";
import PAK from "../../../public/assets/pak.png";
import Image from "next/image";
const flags = [
  {
    alt: "USA",
    tooltip: "37 Alexander Avenue Staten Island, NY, 10312, USA",
    top: { mobile: "30%", desktop: "40%" },
    left: { mobile: "13%", desktop: "10%" },
    src: USA,
  },
  {
    alt: "Canada",
    tooltip: "181 Dundas Street East, Toronto Ontario M5A 0N5, Canada",
    top: { mobile: "8%", desktop: "5%" },
    left: { mobile: "5%", desktop: "0%" },
    src: CANADA,
  },
  {
    alt: "UK",
    tooltip:
      "Warlies Park House, Upshire, Waltham Abbey EN9 3SL, United Kingdom",
    top: { mobile: "15%", desktop: "7%" },
    left: { mobile: "45%", desktop: "40%" },
    src: UK,
  },
  {
    alt: "Pakistan",
    tooltip: "154-D Architects Society Lahore, Punjab, Pakistan",
    top: { mobile: "40%", desktop: "35%" },
    left: { mobile: "60%", desktop: "50%" },
    src: PAK,
  },
];
export default function AboutNav({ isMobile, getKey, link }: any) {
  return (
    <div>
      <div
        className={`flex ${
          isMobile ? "flex-wrap" : ""
        } justify-between lg:gap-[60px] gap-[0px]`}
        key={getKey("container")}
      >
        <div className={`${isMobile ? "w-full" : "w-[calc(70%-30px)]"}`}>
          <p className="text-[#fff] text-lg font-bold bg-[#14CCC3] px-4 py-1 rounded-xs w-fit">
            {link.content.title}
          </p>

          <div className="flex flex-wrap gap-[60px] mt-4">
            <div
              className={`${isMobile ? "w-full" : "w-[calc(50%-30px)]"}`}
              key={getKey("left-section")}
            >
              <div className="flex gap-5 ">
                <div>
                  {" "}
                  <div className="relative group flex items-center">
                    <p className="text-[#14CCC3] font-[500] text-sm">
                      Who we are
                    </p>
                  </div>
                  <div className="flex gap-3 mt-5 ">
                    <div className="border-l-[2px] border-[#14CCC3]"></div>
                    <p className="text-[#1D1D1F]  text-base font-[300] ">
                      {link.content.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${isMobile ? "w-full" : "w-[calc(50%-30px)]"}`}>
              {link.content.sections.map((section: any, index: any) => (
                <div key={index}>
                  <div className="relative group flex items-center">
                    {/* <div className="opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <svg
                    width="10"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-hover:translate-x-0 -translate-x-full"
                  >
                    <circle
                      cx="5.58524"
                      cy="14.9993"
                      r="5.58524"
                      fill="#14CCC3"
                    />
                    <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                  </svg>
                </div> */}
                    <p className="text-[#14CCC3] font-[500] text-sm">
                      {section.title}
                    </p>
                  </div>
                  <p className="text-[#1D1D1F] text-base font-[300] mb-5 mt-3">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-l-[2px] border-[#14CCC3]"></div>

        <div
          className={`lg:mt-13 mt-5 ${
            isMobile ? "w-full" : "w-[calc(30%-30px)]"
          }`}
        >
          <div className="relative group flex items-center">
            <p className="text-[#14CCC3] font-[500] text-sm">
              {link.content.rightSection.title}
            </p>
          </div>
          <p className="text-[#1D1D1F] text-base font-[300]  mt-3">
            {link.content.rightSection.content}
          </p>
          <div className="mt-5 relative">
            <Image src={Location} alt="" className="w-full h-[200px]" />
            {flags.map((flag, index) => (
              <div
                key={index}
                className="absolute group cursor-pointer"
                style={{
                  top: isMobile ? flag.top.mobile : flag.top.desktop,
                  left: isMobile ? flag.left.mobile : flag.left.desktop,
                }}
              >
                <Image
                  src={flag.src}
                  alt={flag.alt}
                  width={isMobile ? 50 : 91}
                  height={isMobile ? 35 : 62}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="relative font-normal text-white text-xs px-2 py-2 rounded shadow-lg w-[150px] text-center break-words leading-[14px] bg-[#14CCC3]">
                    {flag.tooltip}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#14CCC3]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
