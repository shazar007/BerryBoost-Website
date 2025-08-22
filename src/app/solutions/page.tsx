"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../components/Itsection/itSection.css";
import Dots from "../../../public/assets/mdi_target-variant.png";
import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCaseStudy } from "../../../api/caseStudy";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "@/utils/localStorageHelper";

const TabData = [
  {
    title: "Custom Healthcare",
    description:
      "We develop tailored healthcare software solutions designed to improve clinical workflows and patient care. Our custom apps enhance efficiency and patient engagement across various healthcare environments.",
    bullets: [
      "Electronic Health Records (EHR) Development",
      "Custom Medical App Development",
      "Workflow Automation Tools",
    ],
  },
  {
    title: "Telehealth Platforms",
    description:
      "Connect patients and providers with secure telehealth software for virtual consultations and remote monitoring. Our telemedicine solutions support seamless communication and real-time healthcare delivery.",
    bullets: [
      "Telemedicine App Development",
      "Remote Patient Monitoring Solutions",
      "Video Consultation Integration",
    ],
  },
  {
    title: "Patient Management",
    description:
      "Optimize patient scheduling, records, and data management with our advanced healthcare software systems. These solutions enhance care coordination and ensure the availability of accurate, accessible patient information.",
    bullets: [
      "Appointment Booking Systems",
      "Patient Data Management",
      "Integrated Health Portals",
    ],
  },
  {
    title: "Healthcare Security",
    description:
      "Ensure compliance and safeguard sensitive patient data with robust healthcare IT security solutions. Our software prioritizes data privacy while enabling secure information exchange within your network.",
    bullets: [
      "Secure Data Encryption",
      "Role-Based Access Control",
      "Healthcare Compliance Solutions",
    ],
  },
];
export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0);
  const { solution } = useGlobalContext();
  const searchParams = useSearchParams();
  // const title = searchParams.get("title");
  const title = getItem<string>("title");

  const allServiceItems = solution.flatMap((category: any) =>
    category?.solutionList.map((solution: any) => ({
      ...solution,
      category: category.solutionCategory,
    }))
  );
  const selectedSolution = allServiceItems.find(
    (solution) => solution.solutionTitle === title
  );

  if (!selectedSolution) {
    return <p>Service not found.</p>;
  }

  useEffect(() => {
    document.title = "BerryBoost — Services";
    window.scroll(0, 0);
  }, []);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    scrollContainerRef.current.style.cursor = "grabbing";
    scrollContainerRef.current.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    if (!scrollContainerRef.current) return;

    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
    scrollContainerRef.current.style.removeProperty("user-select");
  };

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return;

    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
    scrollContainerRef.current.style.removeProperty("user-select");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: () => getAllCaseStudy(),
    staleTime: 5 * 60 * 1000,
  });
  let caseStudy = data?.data?.caseStudies;
  const filteredCaseStudies = caseStudy?.filter((item: any) =>
    item.category?.includes(title)
  );
  const router = useRouter();
  const handleClick = (heading: string) => {
    router.push(`/casestudies/details?heading=${encodeURIComponent(heading)}`);
  };
  return (
    <div className="mt-[72px]">
      <div className="lg:px-[100px] px-[24px] md:px-[40px] py-15">
        <div className="lg:w-[1085px] w-full">
          <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
            <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
            <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
              {selectedSolution?.category || "Content is not Found"}
            </p>
          </div>
          <p className="lg:text-[48px] text-[36px] mt-[8px] text-[#1D1D1F] font-bold leading-[100%] ">
            {selectedSolution?.solutionTitle || "Content is not Found"}
          </p>
          <p className="lg:text-[24px] text-[18px] mt-[22px] text-[#1D1D1F] font-normal">
            {selectedSolution?.content?.[0]?.section1}
          </p>{" "}
          <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
            Schedule a Call <IoArrowForward size={16} />
          </button>
        </div>
      </div>

      <div
        className="h-[500px] w-full bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${selectedSolution.content[1].section2})`,
        }}
      ></div>
      <div className="lg:px-[100px] px-[24px] md:px-[40px] py-15 ">
        <p className="lg:text-[48px] text-[36px]  text-[#1D1D1F] font-bold leading-[100%]">
          {selectedSolution?.solutionTitle} Solutions
        </p>
        <div className="border-t-[1px] border-[#14CCC3] my-8 flex flex-wrap">
          <div className="lg:w-[30%] w-full lg:border-r-[1px] border-r-0 border-[#14CCC3] pt-8 pr-8">
            {selectedSolution?.content?.[2]?.section3.map(
              (tab: any, index: any) => (
                <div
                  key={index}
                  className={` cursor-pointer p-1 flex justify-start px-3 items-center my-2 ${
                    activeTab === index
                      ? "bg-[#14CCC3] text-white bg-opacity-10 border-[1px] rounded-[8px]"
                      : "text-[#1D1D1F]"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-center justify-center">
                    <p
                      className={` font-normal text-[22px] ${
                        activeTab === index ? "text-white" : ""
                      }`}
                    >
                      {tab.title}
                    </p>
                  </div>
                  {index !== TabData.length - 1 && (
                    <div className=" my-3"></div>
                  )}
                </div>
              )
            )}
          </div>
          <div className="lg:w-[70%] w-full pt-8 pl-8">
            <p className="text-[#1D1D1F]">{TabData[activeTab].description}</p>

            <div className="mt-5 space-y-2.5">
              {TabData[activeTab].bullets.map((bullet, index) => (
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
                  <p className="font-normal text-[#1D1D1F] text-sm">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00A79E] lg:px-[100px] px-[24px] md:px-[40px] pt-15">
        <div className=" flex items-center gap-2 justify-center">
          <p className="text-center text-[#fff] leading-[100%] text-[24px]  font-[700] lg:text-[48px] ">
            Why Choose BerryBoost
          </p>
          <svg
            width="15"
            height="29"
            viewBox="0 0 15 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.44699" cy="20.6657" r="7.44699" fill="white" />
            <circle cx="4.87906" cy="5.54508" r="4.87906" fill="white" />
          </svg>
        </div>
        <div className="py-15 flex-wrap flex gap-[24px]">
          {selectedSolution?.content?.[3]?.section4.map(
            (feature: any, index: any) => (
              <div
                key={index}
                className="lg:w-[calc(25%-19.2px)] relative md:w-[calc(50%-12px)] w-[calc(100%-0px)]"
              >
                <div className="w-[61px] absolute left-[-5px] h-[61px] top-[-35px] flex items-center justify-center rounded-full border-t border-r border-dashed border-[#fff]">
                  <p className="text-[#fff] text-[24px] font-normal">
                    {feature.number}
                  </p>
                </div>

                <div className="w-[240px] p-[40px] h-[240px] flex items-center justify-center flex-col rounded-full border-t border-r border-dashed border-[#fff]">
                  <p className="text-[#fff] text-[24px] font-normal text-start">
                    {feature.title}
                  </p>
                  <p className="text-[#fff] text-[12px] font-normal text-start mt-2">
                    {feature.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {filteredCaseStudies?.length > 0 && (
        <div className="lg:pl-[100px] pl-[24px] md:pl-[40px] py-18">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="flex items-center lg:gap-[24px] gap-[16px] py-3 w-max min-w-full">
              <div className="lg:w-[528px] w-[300px] flex-shrink-0">
                <div className="w-[90%]">
                  <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                    <Image
                      src={Dots}
                      alt="dots"
                      className="h-[24px] w-[24px]"
                    />
                    <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                      {selectedSolution?.solutionTitle ||
                        "Content is not Found"}{" "}
                      Case Studies
                    </p>
                  </div>
                  <p className="text-[#1D1D1F] mt-[8px] font-bold lg:text-[48px] text-[24px] leading-[100%]">
                    {selectedSolution?.content?.[4]?.section5?.[0].title}
                  </p>
                  <p className="text-[#1D1D1F] font-normal lg:text-base text-xs mt-4">
                    {" "}
                    {selectedSolution?.content?.[4]?.section5?.[1].content}
                  </p>
                </div>
              </div>
              {filteredCaseStudies?.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    handleClick(item.heading);
                  }}
                  key={index}
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  className="cursor-pointer"
                >
                  <Image
                    src={item.coverPhoto}
                    alt="sdsqdwqd"
                    className=""
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#EDFCFC] lg:px-[100px] px-[24px] flex flex-wrap items-center justify-between md:px-[40px] py-15">
        <div>
          <p className="font-bold text-[#1D1D1F] text-[48px] leading-[100%]">
            We’re <span className="text-[#14CCC3]">BerryBoost</span> ready
          </p>
          <p className="font-bold text-[#1D1D1F] text-[42px] leading-[100%]">
            to help you with {selectedSolution?.solutionTitle} <br /> solutions
          </p>
          <div className="border-t-[4px] mt-3 border-[#14CCC3] w-[120px]"></div>
        </div>{" "}
        <a
          href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
            Let’s Work Together <IoArrowForward size={16} />
          </button>
        </a>
      </div>
      <div className="w-full  flex flex-wrap lg:px-[100px] gap-[48px] px-[24px] md:px-[40px] py-15">
        <div className="lg:w-[calc(60%-24px)] w-full">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  let’s get started today!
                </p>
              </div>
              <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                <span className="font-bold text-[#1D1D1F]">
                  Accelerate Your Product <br /> Development With Our
                </span>{" "}
                <br />
                <span className="font-normal text-[#14CCC3]">
                  Offshore Tech Talent
                </span>
              </p>
            </div>
          </div>
          <p className="text-[#1D1D1F] text-base font-normal lg:w-[80%] w-full mt-3">
            <strong className="text-[#14CCC3]">BB</strong> offers a full-range
            of services from Engineering Innovation to Custom Software
            Development, from Graphic Design to 3D Animations, from Digital to
            AI Marketing, and world class BPO facilities. At BerryBoost, we
            ensure that our teams work exactly in accordance with your job
            requirements, matching time zones, and with English proficiency.
          </p>
        </div>
        <div className="lg:w-[calc(40%-24px)] w-full">
          <input
            placeholder="FULL NAME*"
            className="w-full p-[20px] h-[59px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
          />
          <input
            placeholder="WORK EMAIL*"
            className="w-full mt-4 p-[20px] h-[59px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
          />
          <div className="flex gap-[24px] items-center">
            <div className="lg:w-[calc(20%-12px)] w-[calc(30%-12px)]">
              {" "}
              <input
                placeholder="
                +1"
                className="w-full mt-4 p-[20px] h-[59px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
              />
            </div>
            <div className="lg:w-[calc(80%-12px)] w-[calc(80%-12px)]">
              {" "}
              <input
                placeholder="PHONE NUMBER"
                className="w-full mt-4 p-[20px] h-[59px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
              />
            </div>
          </div>
          <input
            placeholder="REQUIRED SERVICE*"
            className="w-full mt-4 p-[20px] h-[59px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
          />
          <textarea
            placeholder="PRODUCT DETAIL"
            style={{ resize: "none" }}
            className="w-full mt-4 p-[20px] h-[93px] placeholder:text-[#5F5F5F] focus:outline-0 bg-[#EDFCFC]"
          />
          <button className="flex text-[20px] items-center mt-[24px] justify-center cursor-pointer gap-3 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[700] text-base w-full h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
