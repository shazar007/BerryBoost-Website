"use client";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/globalContext";
import { usePathname, useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import CustomLoader from "../Loader/page";

const mobile = [
  { src: "/assets/mobile1.png", alt: "Apple" },
  { src: "/assets/mobile2.png", alt: "Android" },
  { src: "/assets/Frontend1.png", alt: "React Native" },
  { src: "/assets/mobile4.png", alt: "Flutter" },
  { src: "/assets/mobile5.png", alt: "Kotlin" },
];
const Frontend = [
  { src: "/assets/Frontend1.png", alt: "React js" },
  { src: "/assets/Frontend2.png", alt: "Next js" },
  { src: "/assets/Frontend3.png", alt: "Angular js" },
  { src: "/assets/Frontend4.png", alt: "Vue js" },
  { src: "/assets/Frontend5.png", alt: "TypeScript" },
];
const BackEnd = [
  { src: "/assets/BackEnd1.png", alt: "Node js" },
  { src: "/assets/BackEnd2.png", alt: ".NET" },
  { src: "/assets/BackEnd3.png", alt: "Java" },
  { src: "/assets/BackEnd4.png", alt: "Python" },
  { src: "/assets/BackEnd5.png", alt: "Ruby" },
];
export default function Services({ isMobile, onTitleClick }: any) {
  const router = useRouter();
  const [Loader, setLoader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoader(false);
  }, [pathname]);

  const handleClick = (title: string, e?: any) => {
    if (e.button === 2) {
      return;
    }
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }
    e?.preventDefault();
    const slug = title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    const targetPath = `/services/${encodeURIComponent(slug)}`;

    if (pathname === targetPath) {
      setLoader(false);
      onTitleClick();
      return;
    }

    setLoader(true);

    router.push(targetPath);
  };

  const { services } = useGlobalContext();
  let firstTwoService: any = services ? services.slice(0, 2) : [];
  let lastTwoService: any = services ? services.slice(2, 4) : [];
  return (
    <div>
      {" "}
      <div className={`flex ${isMobile ? "flex-wrap" : ""} gap-[40px]`}>
        {firstTwoService?.map((section: any, index: any) => (
          <div
            key={index}
            className={`${isMobile ? "w-full" : "w-[calc(25%-30px)]"}`}
          >
            <div className="gap-2 pl-5 items-center group flex mb-4">
              <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-semibold text-sm">
                {section.serviceCategory}
              </p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>

            {section.servicesList.map((item: any, i: any) => (
              <div key={i} className="relative group flex items-center">
                <div className="opacity-0 transition-all duration-300 group-hover:opacity-100">
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
                </div>
                <a
                  className="text-[#1D1D1F] pl-2 mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-[500]"
                  href={`/services/${encodeURIComponent(
                    item.serviceTitle
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/\//g, "-")
                      .replace(/\s+/g, "-")
                      .replace(/[^\w\-]+/g, "")
                  )}`}
                  onClick={(e) => handleClick(item.serviceTitle, e)}
                  target="_self"
                  rel="noopener noreferrer"
                >
                  {item.serviceTitle}
                </a>
              </div>
            ))}
          </div>
        ))}

        <div
          className={`${
            isMobile ? "w-full" : "w-[calc(25%-30px)]"
          } flex flex-col gap-6`}
        >
          {lastTwoService.map((section: any, index: any) => (
            <div key={index} className={`${isMobile ? "w-full" : "w-auto"}`}>
              <div className="gap-2 items-center group flex mb-4">
                <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-semibold text-sm">
                  {section.serviceCategory}
                </p>
                <MdArrowForwardIos size={12} color="#14CCC3" />
              </div>

              {section.servicesList.map((item: any, i: any) => (
                <div key={i} className="relative group flex items-center">
                  <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                    <svg
                      width="10"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="5.58524"
                        cy="14.9993"
                        r="5.58524"
                        fill="#14CCC3"
                      />
                      <circle
                        cx="3.6593"
                        cy="3.6593"
                        r="3.6593"
                        fill="#17252A"
                      />
                    </svg>
                  </div>
                  <a
                    className="text-[#1D1D1F] pl-2 mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-[500]"
                    href={`/services/${encodeURIComponent(
                      item.serviceTitle
                        .toLowerCase()
                        .replace(/&/g, "and")
                        .replace(/\//g, "-")
                        .replace(/\s+/g, "-")
                        .replace(/[^\w\-]+/g, "")
                    )}`}
                    onClick={(e) => handleClick(item.serviceTitle, e)}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    {item.serviceTitle}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          className={`border-l-[2px] border-[#14CCC3] ${
            isMobile ? "hidden" : ""
          }`}
        ></div>
        <div className={`${isMobile ? "w-full" : "w-[calc(26%-24px)]"}`}>
          <div className="gap-2 items-center group flex">
            <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-[500] text-sm">
              Our Tech Stacks
            </p>
            <MdArrowForwardIos size={12} color="#14CCC3" />
          </div>
          <p className="text-[#1D1D1F] text-base font-[300] mt-4">
            We use various languages and frameworks to ensure your project’s
            smooth delivery.
          </p>
          <div className="mt-10">
            <div className="flex gap-2 items-center">
              <p className="text-[#14CCC3] font-normal text-sm">Frontend</p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>
            <div className="flex gap-4 mt-3 w-full">
              {Frontend.map((item: any, index: any) => (
                <div
                  key={index}
                  className="relative group flex items-center justify-center w-[48px] h-[48px] border-[#0FBAB1] border-[0.5px] bg-[#0FBAB114] rounded-[4px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-[32px] h-[32px]"
                  />

                  <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#14CCC3] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {item.alt}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#14CCC3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex gap-2 items-center">
              <p className="text-[#14CCC3] font-normal text-sm">Backend</p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>
            <div className="flex gap-4 mt-3">
              {BackEnd.map((item: any, index: any) => (
                <div
                  key={index}
                  className="relative group flex items-center justify-center w-[48px] h-[48px] border-[#0FBAB1] border-[0.5px] bg-[#0FBAB114] rounded-[4px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-[32px] h-[32px]"
                  />

                  <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#14CCC3] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {item.alt}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#14CCC3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex gap-2 items-center">
              <p className="text-[#14CCC3] font-normal text-sm">Mobile</p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>
            <div className="flex gap-4 mt-3">
              {mobile.map((item: any, index: any) => (
                <div
                  key={index}
                  className="relative group flex items-center justify-center w-[48px] h-[48px] border-[#0FBAB1] border-[0.5px] bg-[#0FBAB114] rounded-[4px]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-[32px] h-[32px]"
                  />

                  <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#14CCC3] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    {item.alt}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#14CCC3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {Loader && (
        <div
          style={{ zIndex: "1111" }}
          className="fixed left-0  top-0 bg-black/70  w-full h-screen flex justify-center items-center"
        >
          <CustomLoader />
        </div>
      )}
    </div>
  );
}
