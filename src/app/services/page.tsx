"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Dots from "../../../public/assets/mdi_target-variant.png";
import Image from "next/image";
import "../../../src/components/Itsection/itSection.css";
import { IoArrowForward } from "react-icons/io5";
import { useGlobalContext } from "@/context/globalContext";
import { useSearchParams } from "next/navigation";
import TechInside from "@/components/TechInside";
import { useQuery } from "@tanstack/react-query";
import { getAllCaseStudy } from "../../../api/caseStudy";
import { getAllBlogs } from "../../../api/blog";
import { useRouter } from "next/navigation";

const servicesTwo = [
  {
    title: "MVP & PoC Development",
    text: "Launching a new offering in the market? We assist both new businesses and large companies transform innovative concepts into measurable outcomes—swiftly. If you are validating an idea or launching a mini version of your product, our MVP and POC Development Services aim at reducing risks while maximizing learning for all stakeholders involved.",
    bg: "/assets/BB.png",
  },
  {
    title: "Web App Development",
    text: "BerryBoost creates powerful, custom web applications that streamline your business operations. Our scalable, secure, and responsive web solutions are built to deliver seamless user experiences across all devices.",
    bg: "/assets/CC.png",
  },
  {
    title: "Mobile App Development",
    text: "BerryBoost builds high-performance mobile apps tailored to your business needs. From startups to enterprises, we deliver scalable, user-friendly, and innovative digital solutions.",
    bg: "/assets/DD.png",
  },
  {
    title: "E-Commerce App Development",
    text: "At BerryBoost, we build intelligent, scalable, and conversion-focused e-commerce app development solutions designed to grow your online business. Whether you're launching a new digital store or upgrading an existing one, we develop apps that deliver seamless shopping experiences and drive customer retention.",
    bg: "/assets/DD.png",
  },
  {
    title: "AI/ML & Data Engineering",
    text: "At BerryBoost, we help businesses get smarter with AI/ML and Data Engineering solutions. Our goal is to drive automation, improve analytics, and foster innovation. Our experts empower you to leverage artificial intelligence, machine learning, and data, leading to better decisions and digital experiences ready for the future.",
    bg: "/assets/EE.png",
  },
  {
    title: "Product Strategy Consulting",
    text: "Bringing a great product to life is about so much more than just a brilliant idea. It's about having a clear plan, knowing exactly where you're headed, and truly understanding the people who will use what you build. That's precisely where our Product Strategy Consulting comes in.",
    bg: "/assets/FF.png",
  },
  {
    title: "Product Support & Maintenance",
    text: "We know that launching a product is only the first step — keeping it running smoothly is what truly defines success. Our expert Product Support & Maintenance services are designed to ensure your digital products remain secure, stable, and optimized long after deployment.",
    bg: "/assets/NN.png",
  },
  {
    title: "Cloud Engineering & Migration",
    text: "We help businesses move faster, scale smarter, and operate more securely through expert cloud engineering and migration services. Whether you're moving from legacy systems or optimizing your existing cloud setup, our team ensures a seamless, secure, and future-ready transformation.",
    bg: "/assets/HH.png",
  },
  {
    title: "DevOps & DevSecOps",
    text: "We help businesses move faster, build better, and stay secure with our expert DevOps & DevSecOps solutions. Whether you're launching new applications or modernizing existing infrastructure, we bring automation, agility, and security into every step of your software delivery process.",
    bg: "/assets/SS.png",
  },
  {
    title: "QA & Testing",
    text: "We believe a great product is more than just good design and powerful features — it works flawlessly. That's where our QA & Testing services come in. We help you catch bugs before your users do, ensuring your product performs exactly as intended — across all platforms, devices, and user scenarios.",
    bg: "/assets/JJ.png",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { services } = useGlobalContext();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5 * 60 * 1000,
  });
  let articlesData = blogs?.data?.blogs;
  const filteredBlogs = articlesData?.filter((item: any) =>
    item.category?.includes(title)
  );

  const allServiceItems = services.flatMap((category: any) =>
    category?.servicesList.map((service: any) => ({
      ...service,
      category: category.serviceCategory,
      categoryimage: category.servicsCategoryImage,
    }))
  );

  const selectedService = allServiceItems.find(
    (service) => service.serviceTitle === title
  );

  if (!selectedService) {
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
  const handleClick = (title: string) => {
    router.push(`/services?title=${encodeURIComponent(title)}`);
  };
  const handleClickCase = (heading: string) => {
    router.push(`/casestudies/details?heading=${encodeURIComponent(heading)}`);
  };
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <div>
        <section className="relative h-[640px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
            style={{
              backgroundImage: `url(${selectedService?.categoryimage})`,
            }}
          ></div>

          <div className="relative z-10  h-full  mt-10 bg flex flex-col items-start justify-center  lg:px-[80px] px-[24px]">
            <div className="lg:py-[35px] py-[16px] w-full lg:w-[90%] lg:px-[42px] px-[16px] bg-transparent backdrop-blur-xl  rounded-[24px]">
              <div className="w-full lg:w-[70%]">
                <p className="text-white uppercase leadings-[100%] text-start text-[24px] font-[700]">
                  {selectedService?.category || "Content is not Found"}
                </p>{" "}
                <h1 className="text-start text-white lg:text-[48px] text-[36px] font-[700]  lg:leading-[56px] leading-[46px] mb-6">
                  {selectedService?.serviceTitle || "Content is not Found"}
                </h1>
                <p className="text-white lg:text-[24px] text-base font-[400] leading-[110%]">
                  {selectedService?.content?.[0]?.section1 ||
                    "Content is not Found"}
                </p>
                <a
                  href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                    Let’s Connect <IoArrowForward size={16} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="lg:px-[100px] px-[24px] md:px-[40px] py-15 items-center flex-wrap flex gap-[80px]">
          <div className="lg:w-[calc(50%-40px)] w-[calc(100%-0px)]">
            <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
              <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
              <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                Overview
              </p>
            </div>
            <p className="text-[#1D1D1F] text-base font-normal mt-[8px]">
              {selectedService?.content?.[1]?.section2?.[0]?.overview}
            </p>
            <p className="text-[#1D1D1F] text-[24px] font-[700] mt-[24px]">
              What We Do:
            </p>
            <ul className="mt-[24px] pl-[20px] list-disc marker:text-black ">
              {selectedService?.content?.[1]?.section2?.[1]?.whatWeDo?.map(
                (item: any, index: number) => (
                  <li
                    key={index}
                    className="text-[#1D1D1F] text-base font-normal"
                  >
                    <strong className="text-[#1D1D1F]">{item.heading}:</strong>{" "}
                    {item.content}
                  </li>
                )
              )}
            </ul>
            <a
              href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                Schedule a Call <IoArrowForward size={16} />
              </button>
            </a>
          </div>
          <div className="lg:w-[calc(50%-40px)] w-[calc(100%-0px)] flex justify-center">
            <Image
              src={selectedService?.content?.[1]?.section2?.[2]?.image}
              alt="firstImage"
              width={600}
              height={500}
              className="rounded-[8px]"
            />
          </div>
        </div>
        <div className="bg-[#00A79E] lg:px-[100px] px-[24px] py-15 md:px-[40px]">
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
          <div className="pt-15 flex-wrap flex gap-[24px]">
            {selectedService?.content?.[2]?.section3?.map(
              (feature: any, index: any) => (
                <div
                  key={index}
                  className="lg:w-[calc(25%-19.2px)] relative md:w-[calc(50%-12px)] w-[calc(100%-0px)]"
                >
                  <div className="w-[61px] absolute left-[-5px] h-[61px] top-[-45px] flex items-center justify-center rounded-full border-t border-r border-dashed border-[#fff]">
                    <p className="text-[#fff] text-[24px] font-normal">
                      {feature.number}
                    </p>
                  </div>

                  <div className="w-[250px] p-[40px] h-[250px] flex items-center justify-center flex-col rounded-full border-t border-r border-dashed border-[#fff]">
                    <p className="text-[#fff] text-[24px] font-normal text-start">
                      {feature.title || "Content is not Found"}
                    </p>
                    <p className="text-[#fff] text-[12px] font-[400] text-start mt-2">
                      {feature.content || "Content is not Found"}
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
                    <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                      <Image
                        src={Dots}
                        alt="dots"
                        className="h-[24px] w-[24px]"
                      />
                      <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                        {selectedService?.serviceTitle} case studies
                      </p>
                    </div>
                    <p className="text-[#1D1D1F] mt-[8px] font-bold lg:text-[48px] text-[24px] leading-[100%]">
                      {
                        selectedService?.content?.[3]?.section4?.[0].part1?.[0]
                          .title
                      }
                    </p>
                    <p className="text-[#1D1D1F] font-normal lg:text-base text-xs mt-4">
                      {selectedService?.content?.[3]?.section4?.[0].part1?.[1]
                        .content || "Content is not Found"}
                    </p>
                  </div>
                </div>
                {filteredCaseStudies?.map((item: any, index: number) => (
                  <div
                    onClick={() => {
                      handleClickCase(item.heading);
                    }}
                    key={index}
                    className="cursor-pointer"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
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
        {filteredBlogs?.length > 0 && (
          <div className="w-full bg-[#EDFCFC] lg:px-[100px] px-[24px] md:px-[40px] py-15">
            <div className="flex flex-wrap justify-between">
              <div>
                <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                  <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                  <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                    Inside berryboost
                  </p>
                </div>
                <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                  <span className="font-bold text-[#1D1D1F]">Related Tech</span>{" "}
                  <span className="font-normal text-[#14CCC3]">Insights</span>
                </p>
              </div>
              <a href="/articles">
                <button className="flex lg:mt-0 mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                  View All <IoArrowForward size={16} />
                </button>
              </a>
            </div>
            <p className="text-[#1D1D1F] lg:w-[75%] w-full text-base font-normal mt-3">
              Discover valuable perspectives and thought provoking ideas from
              the heart of BerryBoost. From emerging technologies to real-world
              digital product strategies, our insights reveal the thought
              process behind our solutions.
            </p>
            <TechInside title={title} data={filteredBlogs} />
          </div>
        )}
        <div className="lg:px-[100px] py-15 px-[24px] md:px-[40px]">
          <div className=" flex justify-center">
            <p className="text-center text-[#1D1D1F] font-[700] lg:text-[48px] text-[32px] lg:w-[765px] w-full">
              Related Services
            </p>
          </div>
          <div className="py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]">
            {servicesTwo.map((service: any, index: any) => (
              <div
                key={index}
                className="relative  h-[452px] w-full overflow-hidden rounded-lg group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    backgroundImage: `url(${service.bg})`,
                    transform:
                      hoveredIndex === index ? "scale(16)" : "scale(1)",
                    filter:
                      hoveredIndex === index
                        ? "brightness(0.7)"
                        : "brightness(1)",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-between p-[32px]">
                  <div>
                    <p className="text-white font-semibold text-[24px] transition-all duration-300 group-hover:translate-y-2">
                      {service.title}
                    </p>
                    <div className="mt-4 overflow-hidden">
                      <div
                        className="transition-all duration-500 ease-in-out"
                        style={{
                          maxHeight: hoveredIndex === index ? "200px" : "0px",
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        <p className="text-white text-[16px] leading-[160%] font-[300]">
                          {service.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        handleClick(service.title);
                      }}
                      className="bg-[#14CCC3] cursor-pointer mt-6 w-[220px] flex items-center justify-center gap-2 text-[16px] text-white px-6 py-3 rounded-[4px] h-[64px] font-normal transition-all duration-300 hover:gap-3 hover:bg-[#0fa8a0]"
                      style={{
                        transform:
                          hoveredIndex === index
                            ? "translateY(0)"
                            : "translateY(20px)",
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                    >
                      Find Out
                      <HiArrowLongRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  flex flex-wrap lg:px-[100px] gap-[48px] px-[24px] md:px-[40px] pb-15">
          <div className="lg:w-[calc(60%-24px)] w-full">
            <div className="flex flex-wrap justify-between">
              <div>
                <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]   gap-2">
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
    </Suspense>
  );
}
