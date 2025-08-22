"use client";
import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useGlobalContext } from "@/context/globalContext";
import { usePathname, useRouter } from "next/navigation";
import NavCaseStudy from "../navCaseStudy/page";
import CustomLoader from "../Loader/page";

export default function Solutions({ isMobile, onTitleClick }: any) {
  const { solution } = useGlobalContext();
  const [Loader, setLoader] = useState(false);
  const router = useRouter();
  const safeSolution = solution;
  const pathname = usePathname();

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

    const targetPath = `/solutions/${encodeURIComponent(slug)}`;

    if (pathname === targetPath) {
      setLoader(false);
      onTitleClick();
      return;
    }

    setLoader(true);

    router.push(targetPath);
  };

  return (
    <div>
      <div className={`flex ${isMobile ? "flex-wrap" : ""} gap-[40px]`}>
        <div className={`${isMobile ? "w-full" : "w-[calc(55%-40px)]"}`}>
          <div className="flex flex-wrap lg:gap-[60px] gap-[30px]">
            {safeSolution?.map((section: any, index: any) => (
              <div key={index} className="lg:w-[calc(50%-30px)] w-full">
                <div className="gap-2 pl-5 items-center group flex mb-4 ">
                  <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-[500] text-sm">
                    {section?.solutionCategory}
                  </p>
                  <MdArrowForwardIos size={12} color="#14CCC3" />
                </div>

                {section?.solutionList.map((item: any, i: any) => (
                  <div
                    key={i}
                    className="relative group gap-2 flex items-center"
                  >
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
                        <circle
                          cx="3.6593"
                          cy="3.6593"
                          r="3.6593"
                          fill="#17252A"
                        />
                      </svg>
                    </div>
                    <a
                      href={`/solutions/${encodeURIComponent(
                        item?.solutionTitle
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/\//g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, "")
                      )}`}
                      onClick={(e: any) => handleClick(item.solutionTitle, e)}
                      target="_self"
                      rel="noopener noreferrer"
                      className="text-[#1D1D1F] mt-1  text-base leading-[24px] font-[300] cursor-pointer group-hover:font-[500]"
                    >
                      {item?.solutionTitle}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={`${isMobile ? "w-full" : "w-[calc(55%-40px)]"}`}>
          <div className="gap-2 items-center group flex w-auto">
            <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-[500] text-sm">
              Case Studies
            </p>
            <MdArrowForwardIos size={12} color="#14CCC3" />
          </div>
          <div className="bg-[#14CCC3] mt-7 w-full p-[8px] rounded-[8px] ">
            <NavCaseStudy onTitleClick={onTitleClick} />
          </div>
        </div>
      </div>{" "}
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
