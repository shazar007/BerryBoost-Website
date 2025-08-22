"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../../components/Itsection/itSection.css";
import Image from "next/image";
import Dots from "../../../../public/assets/mdi_target-variant.png";
import UnionHireDev from "../../../../public/assets/UnionHireDev.png";
import { IoArrowForward } from "react-icons/io5";
import { useGlobalContext } from "@/context/globalContext";
import { usePathname, useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm/page";
import DevForm from "@/components/devForm/page";

export default function HireDevelopersDetail() {
  const [activeTab, setActiveTab] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { hireDev } = useGlobalContext();

  const pathname = usePathname();

  const slugTitleMap: any = {
    "mern-stack-developers": "MERN Stack Developers",
    "mean-stack-developers": "MEAN Stack Developers",
    "nodejs-developers": "Node.js Developers",
    "python-developers": "Python Developers",
    "ruby-on-rails-developers": "Ruby on Rails Developers",
    "net-developers": ".NET Developers",
    "java-developers": "Java Developers",
    "go-developers": "Go Developers",
    "spring-developers": "Spring Developers",
    "ai-ml-developers": "AI/ML Developers",
    "nextjs-developers": "Next.js Developers",
    "laravel-developers": "Laravel Developers",
    "react-developers": "React Developers",
    "typescript-developers": "TypeScript Developers",
    "vuejs-developers": "Vue.js Developers",
    "angular-developers": "Angular Developers",
    "c-developers": "C# Developers",
    "android-developers": "Android Developers",
    "ios-developers": "iOS Developers",
    "react-native-developers": "React Native Developers",
    "flutter-developers": "Flutter Developers",
  };
  function getTitleFromPath(path: string) {
    const slug = path.replace(/^\/hiredevelopers\//, "");
    return slugTitleMap[slug] || "Unknown Title";
  }
  const title = getTitleFromPath(pathname);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  const allHireDevItems = hireDev.flatMap(
    (category: any) => category.HireDevList
  );

  const filteredHireDev = allHireDevItems.filter(
    (item: any) =>
      item.HireDevTitle?.toLowerCase().trim() === title?.toLowerCase().trim()
  );
  const TabDataHireDev =
    filteredHireDev?.[0]?.content?.[1]?.section2?.[0]?.part1?.[1].why;
  return (
    <>
      <head>
        <title>{filteredHireDev?.[0]?.metaTag}</title>
        <meta
          name="description"
          content={filteredHireDev?.[0]?.metadescription}
        />
      </head>
      <div className="mt-[72px]">
        <div className="lg:px-[100px] px-[24px] gap-[48px] md:px-[40px] flex items-center flex-wrap py-18">
          <div className="lg:w-[calc(60%-24px)] w-full">
            <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
              <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
              <p className="text-[#14CCC3] lg:font-base font-sm uppercase font-bold">
                hire {filteredHireDev?.[0]?.HireDevTitle}
              </p>
            </div>
            <div className="flex gap-3 items-start mt-[24px]">
              <Image
                src={filteredHireDev?.[0]?.logo}
                alt="dots"
                height={48}
                width={48}
              />
              <p className="lg:text-[48px] text-[32px]  text-[#1D1D1F] font-bold leading-[100%] ">
                Hire{" "}
                <span className="text-[#14CCC3]">
                  {filteredHireDev?.[0]?.HireDevTitle?.split(" ")
                    .slice(0, -1)
                    .join(" ")}
                </span>{" "}
                Developers
              </p>
            </div>
            <p className="text-[24px] mt-[22px] text-[#1D1D1F] font-normal">
              {filteredHireDev?.[0]?.content?.[0]?.section1}
            </p>{" "}
            <a
              href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="flex mt-5 items-center justify-center cursor-pointer gap-3 hover:gap-5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[600] text-base w-[220px] h-[56px] transition-all duration-300 ease-in-out">
                Schedule a Call <IoArrowForward size={16} />
              </button>
            </a>
          </div>
          <div className="lg:w-[calc(40%-24px)] w-full">
            <div className="w-full">
              <div className="shadow-lg">
                <div className="px-10 py-3 bg-cover bg-center bg-[url('/assets/Rectangle40010.png')] ">
                  <p className="text-white text-[24px] font-bold">
                    Get {filteredHireDev?.[0]?.HireDevTitle}{" "}
                  </p>
                </div>

                <div className="p-7">
                  <DevForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-cover bg-center lg:px-[100px] px-[24px] md:px-[40px] py-18 bg-[url('/assets/73e8832d37e5e0c00e01440fc7be472eea644eff.jpg')] h-auto">
          <div className="bg-white pt-5 pb-15 ">
            {" "}
            <div className="px-5">
              <p className="lg:text-[48px] text-[36px] text-[#1D1D1F] lg:w-[800px] w-full font-bold leading-[100%] pt-5">
                {filteredHireDev?.[0]?.content?.[1]?.section2?.[0]?.part1?.[0]
                  ?.title || "no found"}
              </p>
              <div className="border-t-[1px] border-[#14CCC3] my-8 flex flex-wrap">
                <div className="lg:w-[30%] w-full lg:border-r-[1px] border-r-0 border-[#14CCC3] pt-8 pr-8">
                  {filteredHireDev?.[0]?.content?.[1]?.section2?.[0]?.part1?.[1].why?.map(
                    (tab: any, index: number) => (
                      <div
                        key={index}
                        className={` cursor-pointer flex justify-start px-4 items-center my-4 ${
                          activeTab === index
                            ? "bg-[#14CCC3] text-white py-1 rounded-[8px] bg-opacity-10 "
                            : "text-[#1D1D1F]"
                        }`}
                        onClick={() => setActiveTab(index)}
                      >
                        <div className="flex items-center justify-center">
                          <p
                            className={` font-normal text-[20px] ${
                              activeTab === index ? "text-white" : ""
                            }`}
                          >
                            {tab?.title || "no found"}
                          </p>
                        </div>
                        {index !== TabDataHireDev?.length - 1 && (
                          <div className=" my-3"></div>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="lg:w-[70%] w-full pt-8 pl-8">
                  <p className="text-[#1D1D1F] mt-4">
                    {TabDataHireDev[activeTab]?.content || "no found"}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {TabDataHireDev[activeTab]?.bullets.map(
                      (bullet: any, index: number) => (
                        <div key={index} className="flex items-center gap-2.5">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="24"
                              height="24"
                              rx="12"
                              fill="#B9E9E7"
                              fillOpacity="0.2"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z"
                              fill="#14CCC3"
                            />
                          </svg>
                          <p className="font-normal text-[#1D1D1F] text-sm">
                            {bullet || "no found"}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#B9E9E7] lg:px-[100px] px-[24px] flex flex-wrap items-center justify-between md:px-[40px] py-15">
              <div className="lg:w-[900px] w-full">
                <p className="font-bold text-[#1D1D1F] lg:text-[48px] text-[32px] leading-[100%]">
                  Onboard the Top <span className="text-[#14CCC3]"> 1% </span>{" "}
                  of Deeply Vetted {filteredHireDev?.[0]?.HireDevTitle} with
                  English Proficiency
                </p>

                <div className="border-t-[4px] border-[#14CCC3] w-[120px] mt-2"></div>
              </div>{" "}
              <a
                href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="flex mt-5 items-center justify-center cursor-pointer gap-1.5 bg-white rounded-[4px] text-[#14CCC3] border-white font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                  Let’s Work Together <IoArrowForward size={16} />
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:px-[100px] px-[24px] md:px-[40px] pt-18 bg-[#00A79E]">
          <p className="text-[#fff] leading-[100%]  text-center text-[32px]  font-[700] lg:text-[48px]  w-full">
            <span className="text-[#fff]">
              {filteredHireDev?.[0]?.HireDevTitle?.split(" ")
                .slice(0, -1)
                .join(" ")}
            </span>{" "}
            Onboarding Process
          </p>
          <div className="py-15 flex-wrap flex gap-[24px]">
            {filteredHireDev?.[0]?.content?.[2]?.section3.map(
              (feature: any, index: any) => (
                <div
                  key={index}
                  className="lg:w-[calc(25%-19.2px)] relative md:w-[calc(50%-12px)] w-[calc(100%-0px)]"
                >
                  <div className="w-[61px] absolute left-[-5px] h-[61px] top-[-27px] flex items-center justify-center rounded-full border-t border-r border-dashed border-[#fff]">
                    <p className="text-[#fff] text-[24px] font-normal">
                      {feature?.number || "no found"}
                    </p>
                  </div>

                  <div className="w-[270px] p-[40px] h-[270px] flex items-center justify-center flex-col rounded-full border-t border-r border-dashed border-[#fff]">
                    <p className="text-[#fff] text-[24px] font-normal text-start">
                      {feature?.title || "no found"}
                    </p>
                    <p className="text-[#fff] text-[12px] font-normal text-start mt-2">
                      {feature?.content || "no found"}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="lg:px-[100px] bg-[#F0F0F0] px-[24px] md:px-[40px] py-15 flex flex-wrap items-center justify-between ">
          <div className="lg:w-[calc(50%-50px)] w-full ">
            <div className="w-full 2xl:w-[90%]">
              <p className="text-[#1D1D1F] font-bold lg:text-[48px] text-[32px] leading-[100%]">
                Hire Dedicated <br />
                <span className="text-[#14CCC3]">
                  {filteredHireDev?.[0]?.HireDevTitle?.split(" ")
                    .slice(0, -1)
                    .join(" ")}
                </span>{" "}
                Developers
              </p>
              <p className="text-[#1D1D1F] w-full lg:w-[80%] font-normal lg:text-base text-xs mt-4">
                {filteredHireDev?.[0]?.content?.[3]?.section4?.[1]?.content ||
                  "no found"}
              </p>
            </div>
          </div>

          <div className="lg:w-[calc(50%-50px)] lg:mt-0 mt-5 w-full flex justify-center">
            <Image src={UnionHireDev} alt="" height={300} width={400} />
          </div>
        </div>
        <ContactForm />
      </div>{" "}
    </>
  );
}
