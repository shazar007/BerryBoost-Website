"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Dots from "../../../../public/assets/mdi_target-variant.png";
import Image from "next/image";
import "../../../../src/components/Itsection/itSection.css";
import { IoArrowForward } from "react-icons/io5";
import { useGlobalContext } from "@/context/globalContext";
import TechInside from "@/components/TechInside";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { getAllBlogs } from "../../../../api/blog";
import { getAllCaseStudy } from "../../../../api/caseStudy";
import { setItem } from "@/utils/localStorageHelper";
import CustomLoader from "@/components/Loader/page";
import ContactForm from "@/components/ContactForm/page";

export default function Service(props: any) {
  const { services } = useGlobalContext();
  const pathname = usePathname();

  const slugTitleMap: any = {
    "custom-software-development": "Custom Software Development",
    "mvp-and-poc-development": "MVP & PoC Development",
    "web-app-development": "Web App Development",
    "mobile-app-development": "Mobile App Development",
    "e-commerce-development": "E-Commerce Development",
    "ai-ml-and-data-engineering": "AI/ML & Data Engineering",
    "product-strategy-consulting": "Product Strategy Consulting",
    "product-support-and-maintenance": "Product Support & Maintenance",
    "cloud-engineering-and-migration": "Cloud Engineering & Migration",
    "devops-and-devsecops": "DevOps & DevSecOps",
    "qa-and-testing": "QA & Testing",

    "ui-ux-design": "UI/UX Design",
    "graphic-design": "Graphic Design",
    "illustration-art": "Illustration Art",
    "3d-animation": "3D Animation",
    "game-design": "Game Design",
    "custom-branding": "Custom Branding",
    "video-editing-and-after-effects": "Video Editing & After Effects",
    "digital-content-production": "Digital Content Production",
    nfts: "NFTs",

    "digital-and-social-ads-experts": "Digital & Social Ads Experts",
    "seo-and-aso-experts": "SEO & ASO Experts",
    "performance-marketing": "Performance Marketing",
    "content-writers": "Content Writers",
    "business-development": "Business Development",

    "customer-support-and-success": "Customer Support & Success",
    "email-and-chat-support": "Email & Chat Support",
    "virtual-agents": "Virtual Agents",
  };

  function getTitleFromPath(path: string) {
    const slug = path.replace(/^\/services\//, "");
    return slugTitleMap[slug] || "Unknown Title";
  }
  const title = getTitleFromPath(pathname);

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [Loader, setLoader] = useState(false);
  const router = useRouter();

  function filterServiceCategories(serviceName: string) {
    const filteredCategories = services.filter((category: any) =>
      category.servicesList.some(
        (service: any) => service?.serviceTitle === serviceName
      )
    );
    const updatedCategories = filteredCategories.map((category: any) => {
      const updatedServicesList = category.servicesList.filter(
        (service: any) => service?.serviceTitle !== serviceName
      );

      return {
        ...category,
        servicesList: updatedServicesList,
      };
    });
    return updatedCategories;
  }

  const filteredServices: any = filterServiceCategories(title);

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

  const { data, refetch } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: () => getAllCaseStudy(),
    staleTime: 5 * 60 * 1000,
  });
  let caseStudy = data?.data?.caseStudies;
  const filteredCaseStudies = caseStudy?.filter((item: any) =>
    item.category?.includes(title)
  );

  useEffect(() => {
    setLoader(false);
  }, [pathname]);

  const handleClickcase = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }

    e?.preventDefault();

    const slug = id
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    const targetPath = `/casestudies/details?id=${encodeURIComponent(slug)}`;

    if (pathname === targetPath) {
      setLoader(false);
      return;
    }

    setLoader(true);
    router.push(targetPath);
  };

  const handleClick = (title: string, e: any) => {
    if (e.button === 2) {
      return;
    }
    e?.preventDefault();
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }
    setLoader(true);
    setItem("title", title);

    const slug = title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    router.push(`/services/${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <head>
        <title>{selectedService?.metaTag}</title>
        <meta name="description" content={selectedService?.metadescription} />
      </head>
      <div>
        <Suspense fallback={<div>Loading services...</div>}>
          <div>
            <section className="relative h-[640px] w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
                style={{
                  backgroundImage: `url(${selectedService.categoryimage})`,
                }}
              ></div>
              <div className="relative z-10  h-full  bg flex flex-col items-start justify-center  lg:px-[80px] px-[24px]">
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
                      className="inline-block"
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
                        <strong className="text-[#1D1D1F]">
                          {item.heading}:
                        </strong>{" "}
                        {item.content}
                      </li>
                    )
                  )}
                </ul>
                <a
                  href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
                >
                  Schedule a Call <IoArrowForward size={16} />
                </a>
              </div>
              <div className="lg:w-[calc(50%-40px)] w-[calc(100%-0px)] flex justify-center">
                <Image
                  src={selectedService?.content?.[1]?.section2?.[2]?.image}
                  alt="firstImage"
                  width={600}
                  height={500}
                  className="rounded-[24px]"
                />
              </div>
            </div>
            <div className="bg-[#00A79E] lg:px-[100px] px-[24px] py-15 md:px-[40px]">
              <div className=" flex items-center gap-2 justify-center">
                <p className="text-center text-[#fff] leading-[100%] text-[30px]  font-[700] lg:text-[48px] ">
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
                            selectedService?.content?.[3]?.section4?.[0]
                              .part1?.[0].title
                          }
                        </p>
                        <p className="text-[#1D1D1F] font-normal lg:text-base text-xs mt-4">
                          {selectedService?.content?.[3]?.section4?.[0]
                            .part1?.[1].content || "Content is not Found"}
                        </p>
                      </div>
                    </div>
                    {filteredCaseStudies?.map((item: any, index: number) => (
                      <a
                        href={`/casestudies/details?id=${encodeURIComponent(
                          item._id
                            .toLowerCase()
                            .replace(/&/g, "and")
                            .replace(/\//g, "-")
                            .replace(/\s+/g, "-")
                            .replace(/[^\w\-]+/g, "")
                        )}`}
                        onClick={(e) => {
                          handleClickcase(item._id, e);
                        }}
                        key={index}
                        className="cursor-pointer w-[550px] h-[400px] block overflow-hidden"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          borderRadius: "8px",
                        }}
                      >
                        <Image
                          src={item.coverPhoto}
                          alt={item.title || "Case Study"}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </a>
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
                      <Image
                        src={Dots}
                        alt="dots"
                        className="h-[24px] w-[24px]"
                      />
                      <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                        Inside berryboost
                      </p>
                    </div>
                    <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                      <span className="font-bold text-[#1D1D1F]">
                        Related Tech
                      </span>{" "}
                      <span className="font-normal text-[#14CCC3]">
                        Insights
                      </span>
                    </p>
                  </div>
                  <a href="/articles" className="inline-block">
                    <button className="flex lg:mt-0 mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                      View All <IoArrowForward size={16} />
                    </button>
                  </a>
                </div>
                <p className="text-[#1D1D1F] lg:w-[75%] w-full text-base font-normal mt-3">
                  Discover valuable perspectives and thought provoking ideas
                  from the heart of BerryBoost. From emerging technologies to
                  real-world digital product strategies, our insights reveal the
                  thought process behind our solutions.
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
              <div className="py-10 grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[24px]">
                {filteredServices[0]?.servicesList?.map(
                  (service: any, index: any) => (
                    <a
                      href={`/services/${encodeURIComponent(
                        service.serviceTitle
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/\//g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, "")
                      )}`}
                      onClick={(e) => handleClick(service.serviceTitle, e)}
                      target="_self"
                      rel="noopener noreferrer"
                      key={index}
                      className="relative cursor-pointer h-[250px] w-full overflow-hidden rounded-lg group"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          backgroundImage: `url(${
                            service.content?.[1]?.section2?.[2]?.image ||
                            "/placeholder.jpg"
                          })`,
                        }}
                      ></div>

                      <div className="absolute inset-0 h-full w-full bg-black/70 flex justify-center items-center transition-opacity duration-300 group-hover:opacity-0">
                        <p className="text-white font-semibold text-[24px] text-center px-4">
                          {service.serviceTitle}
                        </p>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>
            <ContactForm />
            {Loader && (
              <div
                style={{ zIndex: "1111" }}
                className="fixed left-0  top-0 bg-black/70  w-full h-screen flex justify-center items-center"
              >
                <CustomLoader />
              </div>
            )}
          </div>
        </Suspense>{" "}
      </div>
    </>
  );
}
