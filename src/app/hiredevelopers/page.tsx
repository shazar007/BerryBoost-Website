"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../components/Itsection/itSection.css";
import Image from "next/image";
import Dots from "../../../public/assets/mdi_target-variant.png";
import ReactImage from "../../../public/assets/materialiconthemereact.png";
import { FaPlay } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useGlobalContext } from "@/context/globalContext";
import { useSearchParams } from "next/navigation";
const featuresHireDev = [
  {
    number: "01",
    title: "Initial Consultation",
    desc: "We begin with a deep dive into your business goals to shape a tailored React development plan.",
  },
  {
    number: "02",
    title: "Team Selection",
    desc: "We handpick top-tier React developers from our expert pool to align with your technical needs.",
  },
  {
    number: "03",
    title: "Project Setup",
    desc: "We set up all development tools, frameworks, and workflows to ensure seamless project execution.",
  },
  {
    number: "04",
    title: "Knowledge Transfer",
    desc: "We provide clear documentation and walkthroughs, ensuring a smooth handover between teams.",
  },
];
const TabDataHireDev = [
  {
    title: "Custom React Solutions",
    description:
      "We craft bespoke React applications aligned with your brand and functional requirements.",
    bullets: [
      "Tailored features built to match your business processes",
      "Modular architecture for easy scalability",
      "Full-stack integration with APIs and third-party tools",
    ],
  },
  {
    title: "Seamless UI/UX Integration",
    description:
      "BerryBoost focuses on intuitive, responsive interfaces that enhance user engagement.",
    bullets: [
      "Pixel-perfect React components for smooth interactions",
      "Mobile-first design for improved accessibility",
      "UI frameworks like Material UI and Tailwind CSS",
    ],
  },
  {
    title: "Cross-Platform Compatibility",
    description:
      "Our React apps run smoothly across various browsers and devices, ensuring a consistent user experience.",
    bullets: [
      "Optimized for desktop, mobile, and tablet platforms",
      "Compatibility with all major browsers",
      "Progressive Web App (PWA) capabilities",
    ],
  },
  {
    title: "Agile Development Process",
    description:
      "We follow agile methodologies to deliver flexible, fast, and on-time solutions within budget.",
    bullets: [
      "Iterative sprints with regular progress updates",
      "Continuous testing and quality assurance",
      "Fast deployment with CI/CD pipelines         ",
    ],
  },
];
export default function HireDevelopers() {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    document.title = "BerryBoost — Hire Developers";
    window.scroll(0, 0);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { hireDev } = useGlobalContext();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
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
    <div className="mt-[72px]">
      <div className="lg:px-[100px] px-[24px] gap-[48px] md:px-[40px] flex items-center flex-wrap py-18">
        <div className="lg:w-[calc(60%-24px)] w-full">
          <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
            <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
            <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
              hire {filteredHireDev?.[0]?.HireDevTitle}
            </p>
          </div>
          <div className="flex gap-3 items-center mt-[24px]">
            <Image
              src={ReactImage}
              alt="ReactImage"
              className="w-[32px] h-[32px]"
            />
            <p className="text-[48px]  text-[#1D1D1F] font-bold leading-[100%] ">
              Hire{" "}
              <span className="text-[#14CCC3]">
                {filteredHireDev?.[0]?.HireDevTitle?.split(" ")
                  .slice(0, -1)
                  .join(" ")}
              </span>{" "}
              Developer
            </p>
          </div>
          <p className="text-[24px] mt-[22px] text-[#1D1D1F] font-normal">
            {filteredHireDev?.[0]?.content?.[0]?.section1}
          </p>{" "}
          <a
            href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex mt-5 items-center justify-center cursor-pointer gap-3 hover:gap-5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[600] text-base w-[220px] h-[56px] transition-all duration-300 ease-in-out">
              Schedule a Call <IoArrowForward size={16} />
            </button>
          </a>
        </div>
        <div className="lg:w-[calc(40%-24px)] w-full">
          <div className="shadow-lg">
            <div className="px-10 py-3 bg-cover bg-center bg-[url('/assets/Rectangle40010.png')] ">
              <p className="text-white text-[24px] font-bold">
                Get {filteredHireDev?.[0]?.HireDevTitle}
              </p>
            </div>
            <div className="px-10 py-4">
              <div>
                <p className="text-xs pl-2 text-[#202020] font-bold">Name</p>
                <input
                  className="p-2 border-[0.5px] focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs pl-2 text-[#202020] font-bold">Email</p>
                <input
                  className="p-2 border-[0.5px] focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
                  placeholder="ABC@email.com"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs pl-2 text-[#202020] font-bold">
                  Share other important details
                </p>
                <textarea
                  style={{ resize: "none" }}
                  className="p-2 border-[0.5px]  focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
                  placeholder="Please share anything that will help prepare for our meeting."
                />
              </div>

              <button className="flex mt-5 items-center justify-center cursor-pointer gap-3  bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[600] text-base w-full h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                Send Message <IoArrowForward size={16} />
              </button>
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
              <p className="font-bold text-[#1D1D1F] text-[48px] leading-[100%]">
                {filteredHireDev?.[0]?.content?.[1]?.section2?.[1]?.part2 ||
                  "no found"}
              </p>

              <div className="border-t-[4px] border-[#14CCC3] w-[120px] mt-2"></div>
            </div>{" "}
            <a
              href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
              target="_blank"
              rel="noopener noreferrer"
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
          <div className="flex items-center lg:gap-[24px] gap-[16px] w-max min-w-full pr-4 ">
            <div className="lg:w-[528px] w-[300px] flex-shrink-0">
              <div className="w-[90%]">
                <p className="text-[#1D1D1F] font-bold lg:text-[48px] text-[24px] leading-[100%]">
                  Hire Dedicated <br />
                  <span className="text-[#14CCC3]">
                    {filteredHireDev?.[0]?.HireDevTitle?.split(" ")
                      .slice(0, -1)
                      .join(" ")}
                  </span>{" "}
                  Developers
                </p>
                <p className="text-[#1D1D1F] font-normal lg:text-base text-xs mt-4">
                  {filteredHireDev?.[0]?.content?.[3]?.section4?.[1]?.content ||
                    "no found"}
                </p>
              </div>
            </div>
            {[
              {
                id: 1,
                image: "/assets/Profilesnqpwq.png",
                heading: "Lewis Hamilton",
                title: "8 Years of Experience",
                tech: ["React js", "Node js", "TypeScript"],
              },
              {
                id: 2,
                image: "/assets/c07f7bc9d3ecd362cf1d9c5d1cbeea9aaa407362.jpg",
                heading: "Lady Ada",
                title: "5 Years of Experience",
                tech: ["React js", "Node js", "TypeScript"],
              },
              {
                id: 3,
                heading: "Lewis Hamilton",
                image: "/assets/933a8383884c5126ab4e852fe78901fe6d58d8ba.jpg",
                title: "8 Years of Experience",
                tech: ["React js", "Node js", "TypeScript"],
              },
            ].map((item) => (
              <div
                key={item.id}
                className="relative lg:w-[528px] group w-[300px] lg:h-[500px] h-[300px] flex-shrink-0 rounded-[8px] overflow-hidden hover:shadow-lg transition-all duration-300 pb-[72px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-[position:center_top] transition-transform duration-200 "
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
                <div
                  className="absolute inset-0 transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) -92.5%, #000000 57.23%)",
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:mb-18 text-white transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <h3 className="font-normal lg:text-2xl text-xl mb-2">
                    {item.heading}
                  </h3>
                  <div className="border-t-[1px] border-[#14CCC3] w-full my-2"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-[calc(100%-60px)]">
                      <p className="font-normal lg:text-base text-sm mb-3">
                        {item.title}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tech?.map((technology, index) => (
                          <div
                            key={index}
                            className="rounded-[4px] px-3 py-1 border-[1px] border-[#14CCC3]  bg-opacity-30 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-opacity-50"
                          >
                            <p className="font-normal text-[#14CCC3] lg:text-sm text-xs">
                              {technology}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-0 w-[48px] group-hover:w-auto group-hover:px-5 h-[48px] rounded-full bg-white transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden">
                      <span className="text-[#1D1D1F] text-sm opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap pl-0 group-hover:pl-3">
                        Watch Testimonial
                      </span>
                      <div className="w-[48px] h-[48px] flex-shrink-0 flex items-center justify-center">
                        <FaPlay
                          size={16}
                          className="text-[#14CCC3] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 h-[72px] flex items-center justify-center px-6 overflow-hidden">
                  <button className="w-full flex items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base h-[56px] hover:gap-3 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] transform translate-y-[72px] group-hover:translate-y-0">
                    {" "}
                    Hire Now
                    <IoArrowForward
                      size={16}
                      className="transition-all duration-300"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
