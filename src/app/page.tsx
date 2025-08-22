"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import video from "../../public/assets/Frame 1597883995 (1).png";
import WebDevelopement from "../../public/assets/engineeringservices.jpg";
import WebDevelopementIcon from "../../public/assets/carbon_development.png";
import DigitalAI from "../../public/assets/digitalMarketing.jpg";
import SoftwareServicesIcon from "../../public/assets/eos-icons_software.png";
import Creative from "../../public/assets/creativedesign.jpg";
import UIUXIcon from "../../public/assets/iconoir_design-nib.png";
import BOP from "../../public/assets/bposervices.jpg";
import BUssinessIcon from "../../public/assets/streamlinemoneygraphanalyticsbusinessproductgraphdatachartanalysis.png";
import Dots from "../../public/assets/mdi_target-variant.png";
import "../../src/components/Itsection/itSection.css";
import ViewDetails from "../../public/assets/xzcdwcwec.png";
import { FaPlay } from "react-icons/fa";
import HomeSlider from "@/components/HomeSlider/page";
import CaseStudySlider from "@/components/AutoSlider/page";
import { IoArrowForward, IoClose } from "react-icons/io5";
import TechInside from "@/components/TechInside";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../api/blog";
import { useRouter } from "next/navigation";
import { setItem } from "@/utils/localStorageHelper";
import ContactForm from "@/components/ContactForm/page";
import { useGlobalContext } from "@/context/globalContext";
import CustomLoader from "@/components/Loader/page";
import Link from "next/link";
import CalendlySection from "@/components/calendly/page";
import EngagementPop from "@/components/engagementPop/page";

const steps = [
  {
    title: "Fixed Price Projects",
    content:
      "It is ideal for projects with clearly defined requirements, designs and budgets. We handle the entire development lifecycle, ensuring on-time delivery with no surprises. You get complete visibility, quality assurance, and a result-driven team at every step.",
  },
  {
    title: "IT Staff Augmentation",
    content:
      "Boost your in-house capabilities by hiring our pre-vetted developers on demand. Ideal for short-term needs or filling skill gaps, our developers integrate seamlessly with your existing teams to accelerate your development cycle.",
  },
  {
    title: "Dedicated Teams",
    content:
      "Get a fully committed, cross-functional team that works exclusively on your project. Enjoy the benefits of flexibility, long-term alignment, and deep domain expertise—like your own offshore product engineering team.",
  },
  {
    title: "Offshore Development Center",
    content:
      "Set up your offshore development center with BerryBoost. From talent acquisition to infrastructure and daily operations, we manage it all so you can focus on scaling your business while reducing costs.",
  },
];

const servicesData = [
  {
    title: "Engineering Services",
    description:
      "We offer comprehensive engineering services, including custom software development",
    image: WebDevelopement,
    icon: WebDevelopementIcon,
  },
  {
    title: "Creative & Design Services",
    description:
      "It is both art & science, and our team of experts can make sure you get it right",
    image: Creative,
    icon: UIUXIcon,
  },
  {
    title: "Digital & AI Marketing Services",
    description:
      "In-house team of digital marketers, social strategists, SEO & content strategists",
    image: DigitalAI,
    icon: SoftwareServicesIcon,
  },
  {
    title: "BPO Services",
    description:
      "We provide BPO services focused on enhancing customer success, email & chat support",
    image: BOP,
    icon: BUssinessIcon,
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { services } = useGlobalContext();
  const [formModel, setFormModel] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const targetOffset = useRef(0);
  const animationFrame = useRef(0);
  const firstCategory = services?.[0];

  const serviceCards =
    firstCategory?.servicesList?.map((service) => {
      const section2Array = service?.content?.find(
        (item) => item.section2
      )?.section2;
      const imageObject = section2Array?.find((item) => item.image);

      return {
        title: service?.serviceTitle || "",
        image: imageObject?.image || "",
      };
    }) || [];

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5 * 60 * 1000,
  });
  let articlesData = blogs?.data?.blogs;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  const router = useRouter();

  const handleClickSolutions = (title: string, e: any) => {
    if (e.button === 2) {
      return;
    }
    e?.preventDefault();
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }
    setLoading(true);
    true;
    setItem("title", title);

    const slug = title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    router.push(`/solutions/${encodeURIComponent(slug)}`);
  };

  const handleClickServices = (title: string, e: any) => {
    if (e.button === 2) {
      return;
    }
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }
    e?.preventDefault();
    setLoading(true);
    setItem("title", title);

    const slug = title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    router.push(`/services/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      const offset = sectionCenter - viewportCenter;
      const clamped = Math.max(-40, Math.min(40, offset / 6));
      targetOffset.current = clamped;
    };

    const animate = () => {
      setScrollOffset((prev) => {
        const diff = targetOffset.current - prev;
        const eased = prev + diff * 0.1;
        return eased;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);
  const handleClickall = (path: string) => {
    setLoading(true);
    router.push(path);
  };
  const handlSolutions = (path: string, type: string) => {
    setLoading(true);
    router.push(`${path}?type=${type}`);
  };

  return (
    <div>
      <head>
        <title>Home — BerryBoost</title>
        <meta title="BerryBoost - Custom Software Development company in USA" />
        <meta
          name="description"
          content="Looking for custom software development, MVP development and dedicated developers in the USA? BerryBoost offers a full-range of services from Engineering Innovation to custom software development, Graphic Design to 3D Animations, from Digital to AI Marketing, and world class BPO facilities."
        />
        <meta property="og:title" content="Berry Boost" />
        <meta
          property="og:description"
          content="Looking for custom software development, MVP development and dedicated developers in the USA? BerryBoost offers a full-range of services from Engineering Innovation to custom software development, Graphic Design to 3D Animations, from Digital to AI Marketing, and world class BPO facilities."
        />
        <meta
          property="og:image"
          content="https://https://berryboost.us/assets/logo.png"
        />
        <meta property="og:url" content="https://berryboost.us/" />
        <meta property="og:site_name" content="Berry Boost" />
      </head>

      <div>
        <HomeSlider />
        <div>
          <div className="py-10">
            <div className="flex items-center flex-col">
              <p className="text-[#1D1D1F] font-[400] text-[36px]  mx-6 text-center mt-3">
                Driving Innovation and creating Impact
                <span className="text-[#14CCC3]"> through technology</span>
              </p>
            </div>
            <div className="logo-slider mt-8">
              <div className="logo-track">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      "/assets/SIMES-event-planers-graysclae-logo-1.png",
                      "/assets/Metropolitan-steel-3.png",
                      "/assets/Ken-lubes-2.png",
                      "/assets/zainab-chottani-grayscale-logo-1.png",
                      "/assets/OctaGeni.png",
                      "/assets/North Node.png",
                      "/assets/Resize 4.png",
                      "/assets/ng-removebg-preview 1.png",
                      "/assets/Kurative_Green_Logo_Alpha 1.png",
                      "/assets/chapal-1.png",
                      "/assets/KATI-2.png",
                      "/assets/Karachi-medical-and-dental-collage-2.png",
                      "/assets/brands-logos-1.png",
                      "/assets/brands-logos-2.png",
                      "/assets/engro-2.png",
                      "/assets/Grace-fabric-1.png",
                      "/assets/GRAND-1.png",
                      "/assets/rajby.png",
                      "/assets/singer-color.png",
                      "/assets/Saima-packages-2.png",
                      "/assets/saleem-fabrics-grayscale-logo-1.png",
                      "/assets/zainab-chottani-grayscale-logo-1.png",
                      "/assets/habib-insurance-grayscale-logo-3.png",
                    ].map((src, index: number) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Logo ${index + 1}`}
                        className="logo-img"
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="py-15 bg-cover lg:bg-[url('/assets/NextGenBG.png')]  bg-center bg-black md:px-[40px] lg:px-[100px] px-[24px] items-center h-auto flex xl:flex-row md:flex-col flex-col gap-[31px]">
            {" "}
            <div className="xl:w-[calc(45%-20px)]  md:w-[calc(100%-0px)] w-[calc(100%-0px)] ">
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                <svg
                  width="12"
                  height="21"
                  viewBox="0 0 12 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#fff" />
                </svg>

                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  Nextgen it services & solutions
                </p>
              </div>
              <div className="mt-[8px]">
                <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px]">
                  <span className="font-bold text-white">
                    Transforming Your <br />
                    Business With NextGen
                    <br />
                  </span>{" "}
                  <span className="font-normal text-[#14CCC3]">
                    Engineering Services
                  </span>
                </p>
                <div className="mt-2 h-[4px] bg-[#14CCC3] w-[110px]"></div>
              </div>
              <p className="text-base text-white mt-[24px] 2xl:w-[75%] w-full ">
                We provide world class technology development outsourcing
                services to help global businesses. Our domain experts handle
                everything from design, strategy to execution with precision and
                care. Whether you're launching a startup or scaling-up an
                enterprise, we've got you covered. Partner with us to bring your
                idea from inception to an impactful digital reality.
              </p>
              <div className="flex gap-3 items-center mt-[24px] ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#14CCC3" />

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z"
                    fill="#FFFFFF"
                  />
                </svg>

                <p className="font-normal text-white text-sm">
                  We combine innovation, technology, and experience to deliver
                  results that matter
                </p>
              </div>{" "}
              <div className="flex gap-3 items-center mt-[12px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#14CCC3" />

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z"
                    fill="#FFFFFF"
                  />
                </svg>

                <p className="font-normal text-white text-sm">
                  BerryBoost solutions are tailored to meet your unique business
                  challenges and goals
                </p>
              </div>{" "}
              <div className="flex gap-3 items-center mt-[12px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#14CCC3" />

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z"
                    fill="#FFFFFF"
                  />
                </svg>

                <p className="font-normal text-white text-sm">
                  Seamless support, reliable performance, and scalable
                  technology with BerryBoost
                </p>
              </div>
              <Link
                href="/services-and-solutions"
                passHref
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return;
                  }

                  e.preventDefault();
                  handleClickall("/services-and-solutions");
                }}
                className="flex items-center mt-15 justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
              >
                Find Out <IoArrowForward size={16} />
              </Link>
            </div>{" "}
            <div
              ref={sectionRef}
              className="xl:w-[calc(55%-20px)] bg-right py-15 md:w-[calc(100%-0px)]  w-[calc(100%-0px)] relative flex lg:justify-end justify-center"
            >
              <div className="flex justify-center items-start gap-4 h-[500px] md:h-[680px] 2xl:h-[1100px]">
                <div
                  style={{
                    transform: `translateY(${scrollOffset}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                  className="flex flex-col gap-4 transition-transform duration-1000 mt-[150px]"
                >
                  {serviceCards.slice(8, 10).map((card: any, index: number) => (
                    <a
                      href={`/services/${encodeURIComponent(
                        card.title
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/\//g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, "")
                      )}`}
                      onClick={(e) => handleClickServices(card.title, e)}
                      target="_self"
                      rel="noopener noreferrer"
                      key={index}
                      className="group relative cursor-pointer rounded-[8px] overflow-hidden shadow 
                    w-[80px] h-[80px] 
                    sm:w-[140px] sm:h-[140px]
                    md:w-[160px] md:h-[160px] 
                    2xl:w-[262px] 2xl:h-[262px]"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-500 scale-100 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center px-2 lg:text-[16px] text-[12px] font-semibold transition-opacity duration-300 group-hover:opacity-0">
                        {card.title}
                      </div>
                    </a>
                  ))}
                </div>

                <div
                  style={{
                    transform: `translateY(${scrollOffset}px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                  className="flex flex-col gap-4 transition-transform duration-1000 mt-[60px]"
                >
                  {serviceCards.slice(5, 8).map((card: any, index: number) => (
                    <a
                      href={`/services/${encodeURIComponent(
                        card.title
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/\//g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, "")
                      )}`}
                      onClick={(e) => handleClickServices(card.title, e)}
                      target="_self"
                      rel="noopener noreferrer"
                      key={index}
                      className="group relative cursor-pointer rounded-[8px] overflow-hidden shadow 
               w-[80px] h-[80px] 
                    sm:w-[140px] sm:h-[140px]
                    md:w-[160px] md:h-[160px] 
                    2xl:w-[262px] 2xl:h-[262px]"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-500 scale-100 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center px-2 lg:text-[16px] text-[12px] font-semibold transition-opacity duration-300 group-hover:opacity-0">
                        {card.title}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex flex-col  h-full gap-4">
                  {serviceCards.slice(0, 4).map((card: any, index: number) => (
                    <a
                      href={`/services/${encodeURIComponent(
                        card.title
                          .toLowerCase()
                          .replace(/&/g, "and")
                          .replace(/\//g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, "")
                      )}`}
                      onClick={(e) => handleClickServices(card.title, e)}
                      target="_self"
                      rel="noopener noreferrer"
                      key={index}
                      className="group relative cursor-pointer rounded-[8px] overflow-hidden shadow 
                   w-[80px] h-[80px] 
                    sm:w-[140px] sm:h-[140px]
                    md:w-[160px] md:h-[160px] 
                    2xl:w-[262px] 2xl:h-[262px]"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-500 scale-100 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center px-2 lg:text-[16px] text-[12px] font-semibold transition-opacity duration-300 group-hover:opacity-0">
                        {card.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="py-15 lg:px-[100px] px-[24px] md:px-[40px]"
          style={{
            background: "#00A79E",
          }}
        >
          <div className="w-full relative  items-start flex flex-wrap justify-between">
            <div className="lg:w-[75%] w-full">
              <div className="flex items-center gap-2">
                <p className="lg:text-[45px] text-[31px] font-bold text-white lg:leading-[56px] leading-[40px]">
                  Why BerryBoost
                </p>
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5.58524" cy="14.9993" r="5.58524" fill="#fff" />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#fff" />
                </svg>
              </div>
              <p className="lg:text-[40px] text-[28px] font-bold text-white lg:leading-[56px] leading-[40px]">
                Your Ultimate Technology Partner
              </p>
              <div className=" border-t-[4px]  border-white w-[281px] "></div>
              <p className="text-base font-[400] w text-[#fff] mt-[24px]">
                We’re a global IT consulting, custom software development and
                enterprise software solutions company. Headquartered in United
                States with regional offices in Canada, United Kingdom, and a
                global offshore development & delivery center in Lahore,
                Pakistan. BerryBoost provides a full-range of services from
                engineering innovation to bespoke software development using
                cutting-edge technology. With a growing global presence, we
                continue to help clients worldwide.
              </p>
            </div>

            <button
              onClick={() => {
                setFormModel(true);
              }}
              className="flex  mt-5 items-center justify-center cursor-pointer gap-1.5 bg-white rounded-[4px] text-[#14CCC3] border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
            >
              Let’s Work Together
              <IoArrowForward size={16} />
            </button>
          </div>{" "}
          <div className="flex flex-wrap lg:gap-0 gap-5 items-center mt-5 justify-between">
            <div className="lg:w-[20%] w-[40%] ">
              <p className="text-[48px] font-[700] text-[#fff] text-center">
                15+
              </p>
              <p className="text-base font-[500] text-[#fff] text-center">
                Products Delivered
              </p>
            </div>
            <div className="lg:w-[20%] w-[40%] ">
              <p className="text-[48px] font-[700] text-[#fff] text-center">
                95%
              </p>
              <p className="text-base font-[500] text-[#fff] text-center">
                Client’s Satisfaction
              </p>
            </div>
            <div className="lg:w-[20%] w-[40%] ">
              {" "}
              <p className="text-[48px] font-[700] text-[#fff] text-center">
                05+
              </p>
              <p className="text-base font-[500] text-[#fff] text-center">
                Industries Served
              </p>
            </div>
            <div className="lg:w-[20%] w-[40%] ">
              <p className="text-[48px] font-[700] text-[#fff] text-center">
                4
              </p>
              <p className="text-base font-[500] text-[#fff] text-center">
                Office Locations Globally
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
          <div className="flex flex-wrap pb-5 items-start justify-between">
            <div>
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  Berryboost services
                </p>
              </div>
              <p className="lg:text-[40px] mt-[8px] text-[28px] font-bold text-[#1D1D1F] lg:leading-[56px] leading-[40px]">
                Delivering{" "}
                <span style={{ color: "#14CCC3" }}>Best-in-Class</span> Tech
                <br /> Services to
                <span style={{ fontWeight: "400", color: "#14CCC3" }}>
                  {" "}
                  Boost Your Business
                </span>
              </p>
            </div>
            <Link
              href="/services-and-solutions"
              passHref
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                  return;
                }

                e.preventDefault();
                handleClickall("/services-and-solutions");
              }}
              className="flex items-center lg:mt-0 mt-5 justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
            >
              View All Services <IoArrowForward size={16} />
            </Link>
          </div>
          <div className="pt-5 flex flex-wrap items-center gap-[24px]">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="group lg:w-[calc(25%-18px)] w-full md:w-[calc(50%-12px)] sm:w-[calc(100%-0px)] rounded-[8px] relative overflow-hidden"
                style={{ boxShadow: "0px 2px 12px 0px #0000003D" }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  className="h-[185px] w-full rounded-t-[8px] object-cover          "
                />
                <div
                  className="
        bg-white h-[24px] w-[24px] absolute rounded-full left-1/2 
        -translate-x-[130%] -translate-y-1/2 z-0 
        transition-all duration-500 
        group-hover:-translate-y-[270%]"
                ></div>

                <div className="h-[76px] z-10 w-[76px] flex items-center justify-center bg-white absolute rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:bg-[#14CCC3]">
                  <Image
                    src={service.icon}
                    alt={`${service.title} Icon`}
                    className="transition-all duration-500 group-hover:scale-x-[-1] group-hover:invert group-hover:brightness-0"
                  />
                </div>

                <div className="group group-hover:bg-[#14CCC3] relative rounded-b-[8px] overflow-hidden w-full h-[200px] shadow-md">
                  <div
                    className="
          absolute inset-0 z-10 origin-bottom scale-y-0
          transition-transform duration-700 ease-in-out
          group-hover:scale-y-100"
                  >
                    <div className="w-full h-full bg-[url('/assets/_x35_6.png')] bg-cover bg-no-repeat bg-bottom"></div>
                  </div>

                  <div className="relative w-full z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-500 group-hover:text-white">
                    <p className="text-[#1D1D1F] text-[18px] font-bold leading-[32px] group-hover:text-white transition-colors duration-500 w-2xs">
                      {service.title}
                    </p>
                    <p className="text-[#1D1D1F] text-[14px] font-medium group-hover:text-white transition-colors duration-500 mt-2 w-[212px]">
                      {service.description}
                    </p>

                    <Link
                      href="/services-and-solutions"
                      passHref
                      onClick={(e) => {
                        if (
                          e.ctrlKey ||
                          e.metaKey ||
                          e.shiftKey ||
                          e.button === 1
                        ) {
                          return;
                        }

                        e.preventDefault();
                        handleClickall("/services-and-solutions");
                      }}
                      className="cursor-pointer text-[14px] text-[#14CCC3] font-bold mt-4 underline group-hover:text-white transition-colors duration-500"
                    >
                      Find Out
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="w-full bg-[#EDFCFC] lg:px-[100px] px-[24px] md:px-[40px] py-15 justify-between flex flex-wrap items-center ">
            <div className="lg:w-[53%] md:w-[100%] w-[100%]">
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  Your engineering innovation partner
                </p>
              </div>
              <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                <span className="font-bold text-[#1D1D1F]">We</span>{" "}
                <span className="font-normal text-[#14CCC3]">Digitalize </span>
                <span className="font-bold text-[#1D1D1F]">
                  Every Small, <br /> Medium &
                </span>{" "}
                <span className="font-normal text-[#14CCC3]">
                  Large Business
                </span>
              </p>
              <p className="font-normal lg:w-[90%] w-full text-base text-[#1D1D1F] mt-[24px]">
                BerryBoost helps early-stage startups, small-medium, and large
                corporations with technology development outsourcing, all
                conveniently and affordably.{" "}
                <strong className="font-bold text-[#14CCC3] ">BB</strong> not
                only boosts your engineering operations but also guides you with
                expert product design, strategy, and technical
                feasibility—turning great ideas into scalable digital products.
              </p>
            </div>
            <div className="relative lg:w-[45%] w-full md:w-full lg:mt-0 md:mt-10 mt-10 ">
              <Image
                src={video}
                alt="video"
                className="w-full h-auto rounded-lg"
              />

              <button
                onClick={() => setIsOpen(true)}
                className="absolute top-1/2 mt-11 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#14CCC3] rounded-full w-[56px] h-[56px] flex items-center justify-center white-beat z-10"
              >
                <FaPlay size={16} />
              </button>

              {isOpen && (
                <div
                  className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50"
                  style={{ background: "rgba(0, 0, 0, 0.7) " }}
                >
                  <div
                    className="relative w-[90%] max-w-[800px] aspect-video  rounded-lg overflow-hidden"
                    style={{ background: "rgba(0, 0, 0, 0.7) " }}
                  >
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover object-right"
                      src="https://www.youtube.com/embed/3A5VgkyeC5M?autoplay=1&mute=1&loop=1&playlist=3A5VgkyeC5M&controls=1"
                      title="YouTube video player"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-2 right-2 text-white cursor-pointer text-[12px] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
          <div className="flex flex-wrap justify-between pb-5">
            <div>
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  partner in digital transformation
                </p>
              </div>
              <p className="lg:text-[45px] w-full lg:w-[60%] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                <span className="font-bold text-[#1D1D1F]">
                  BerryBoost Enterprise &
                </span>{" "}
                <span className="font-normal text-[#14CCC3]">
                  Industrial Solutions
                </span>
              </p>
            </div>
            <Link
              href="/services-and-solutions?type=solutions"
              passHref
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                  return;
                }

                e.preventDefault();
                handlSolutions("/services-and-solutions", "solutions");
              }}
              className="flex items-center lg:mt-0 mt-5 justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
            >
              View All Solutions <IoArrowForward size={16} />
            </Link>
          </div>
          <p className="text-[#1D1D1F] w-full lg:w-[50%]   text-base font-normal">
            BerryBoost is a leading ERP solution provider on a mission to help
            all global industries and businesses on their journey towards
            digital transformation.
          </p>
          <div className="mt-8 space-y-4 ">
            <div className="flex flex-wrap gap-4">
              <a
                href={`/solutions/${encodeURIComponent(
                  "Healthcare"
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                )}`}
                onClick={(e) => handleClickSolutions("Healthcare", e)}
                target="_self"
                rel="noopener noreferrer"
                style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
                className="relative cursor-pointer group md:w-[calc(55%-8px)] w-full h-[222px] rounded-[8px] overflow-hidden bg-[url('/assets/Rectangle40082444.png')] bg-cover bg-center"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-[8px] bg-[#000000]/60 group-hover:scale-0 scale-100 transition-transform duration-700 ease-in-out w-full h-full origin-center  outline-white outline-[1px] outline-offset-[-20px]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="group-hover:opacity-0 scale-90 opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out text-white text-xl font-bold z-10 text-center">
                    <Image
                      src={ViewDetails}
                      alt="ViewDetails"
                      className="mx-auto mb-2"
                    />
                    <p className="text-[24px] font-bold">Healthcare</p>
                  </div>
                </div>
              </a>
              <a
                href={`/solutions/${encodeURIComponent(
                  "travel-and-hospitality"
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                )}`}
                onClick={(e) => handleClickSolutions("Travel & Hospitality", e)}
                target="_self"
                rel="noopener noreferrer"
                style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
                className="relative cursor-pointer group  md:mt-0 mt-4  md:w-[calc(45%-8px)] w-full h-[222px] rounded-[8px] overflow-hidden bg-[url('/assets/Frame1597884159sdpqw.png')] bg-cover bg-center"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-[8px] bg-[#000000]/60 group-hover:scale-0 scale-100 transition-transform duration-700 ease-in-out w-full h-full origin-center outline-white outline-[1px] outline-offset-[-20px]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="group-hover:opacity-0 scale-90 opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out text-white text-xl font-bold z-10 text-center">
                    <Image
                      src={ViewDetails}
                      alt="ViewDetails"
                      className="mx-auto mb-2"
                    />
                    <p className="text-[24px] font-bold">
                      Travel & Hospitality
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`/solutions/${encodeURIComponent(
                  "WooCommerce"
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                )}`}
                onClick={(e) => handleClickSolutions("WooCommerce", e)}
                target="_self"
                rel="noopener noreferrer"
                style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
                className="relative cursor-pointer group  md:mt-0 mt-4 md:w-[calc(45%-8px)] w-full h-[222px] rounded-[8px] overflow-hidden bg-[url('/assets/WooCommerceHome.png')] bg-cover bg-center"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-[8px] bg-[#000000]/60 group-hover:scale-0 scale-100 transition-transform duration-700 ease-in-out w-full h-full origin-center outline-white outline-[1px] outline-offset-[-20px]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="group-hover:opacity-0 scale-90 opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out text-white text-xl font-bold z-10 text-center">
                    <Image
                      src={ViewDetails}
                      alt="ViewDetails"
                      className="mx-auto mb-2"
                    />
                    <p className="text-[24px] font-bold"> WooCommerce</p>
                  </div>
                </div>
              </a>
              <a
                href={`/solutions/${encodeURIComponent(
                  "Shopify"
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                )}`}
                onClick={(e) => handleClickSolutions("Shopify", e)}
                target="_self"
                rel="noopener noreferrer"
                style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
                className="relative cursor-pointer group md:w-[calc(55%-8px)] w-full h-[222px] rounded-[8px] overflow-hidden bg-[url('/assets/shopifyHome.png')] bg-cover bg-center"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-[8px] bg-[#000000]/60 group-hover:scale-0 scale-100 transition-transform duration-700 ease-in-out w-full h-full origin-center outline-white outline-[1px] outline-offset-[-20px]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="group-hover:opacity-0 scale-90 opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out text-white text-xl font-bold z-10 text-center">
                    <Image
                      src={ViewDetails}
                      alt="ViewDetails"
                      className="mx-auto mb-2"
                    />
                    <p className="text-[24px] font-bold"> Shopify</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-wrap gap-[16px]">
              <a
                href={`/solutions/${encodeURIComponent(
                  "Startups"
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/\//g, "-")
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                )}`}
                onClick={(e) => handleClickSolutions("Startups", e)}
                target="_self"
                rel="noopener noreferrer"
                style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
                className="relative cursor-pointer group md:w-[calc(55%-8px)] w-full h-[222px] rounded-[8px] overflow-hidden bg-[url('/assets/startUpHome.png')] bg-cover bg-center"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-[8px] bg-[#000000]/60 group-hover:scale-0 scale-100 transition-transform duration-700 ease-in-out w-full h-full origin-center outline-white outline-[1px] outline-offset-[-20px]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="group-hover:opacity-0 scale-90 opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out text-white text-xl font-bold z-10 text-center">
                    <Image
                      src={ViewDetails}
                      alt="ViewDetails"
                      className="mx-auto mb-2"
                    />
                    <p className="text-[24px] font-bold">Startups</p>
                  </div>
                </div>
              </a>

              <Link
                href="/services-and-solutions?type=solutions"
                passHref
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return;
                  }

                  e.preventDefault();
                  handlSolutions("/services-and-solutions", "solutions");
                }}
                className="md:w-[calc(45%-8px)] w-full cursor-pointer  md:h-[222px] h-auto rounded-[8px] bg-[#14CCC3] p-5 flex justify-between"
              >
                <div className="w-[100%] flex lg:flex-row flex-col justify-between">
                  <p className="text-white text-base font-[700]">
                    View All <br /> Solutions
                  </p>
                  <div className="flex items-center   lg:justify-start justify-center">
                    <svg
                      width="280"
                      height="73"
                      viewBox="0 0 280 73"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2282_8919)">
                        <path
                          d="M5.52337 66.3484L0.982376 59.4953H2.79545L6.45485 65.1008H5.6398L9.31584 59.4953H11.0956L6.52139 66.3484H5.52337ZM5.25723 71.0391V65.3171H6.82079V71.0391H5.25723ZM13.4839 71.2054C12.7076 71.2054 12.009 71.0224 11.388 70.6565C10.767 70.2905 10.2736 69.7971 9.90764 69.1761C9.5417 68.544 9.35873 67.8399 9.35873 67.0636C9.35873 66.2985 9.5417 65.6109 9.90764 65.001C10.2736 64.3801 10.767 63.8866 11.388 63.5206C12.009 63.1547 12.7076 62.9717 13.4839 62.9717C14.249 62.9717 14.9421 63.1547 15.5631 63.5206C16.1952 63.8755 16.6942 64.3634 17.0601 64.9844C17.4261 65.6054 17.609 66.2985 17.609 67.0636C17.609 67.8399 17.4261 68.544 17.0601 69.1761C16.6942 69.7971 16.1952 70.2905 15.5631 70.6565C14.9421 71.0224 14.249 71.2054 13.4839 71.2054ZM13.4839 69.7583C13.9829 69.7583 14.4264 69.6418 14.8146 69.409C15.2027 69.1761 15.5076 68.8601 15.7294 68.4608C15.9512 68.0505 16.0621 67.5848 16.0621 67.0636C16.0621 66.5535 15.9457 66.0989 15.7128 65.6997C15.491 65.3004 15.1861 64.99 14.7979 64.7682C14.4209 64.5353 13.9829 64.4189 13.4839 64.4189C12.9849 64.4189 12.5413 64.5353 12.1532 64.7682C11.7651 64.99 11.4601 65.3004 11.2383 65.6997C11.0165 66.0989 10.9057 66.5535 10.9057 67.0636C10.9057 67.5848 11.0165 68.0505 11.2383 68.4608C11.4601 68.8601 11.7651 69.1761 12.1532 69.409C12.5413 69.6418 12.9849 69.7583 13.4839 69.7583ZM22.1401 71.2054C21.497 71.2054 20.9148 71.0612 20.3936 70.7729C19.8835 70.4735 19.4843 70.0632 19.196 69.542C18.9077 69.0208 18.7635 68.4165 18.7635 67.729V63.1381H20.2605V67.6624C20.2605 68.0949 20.3326 68.4719 20.4768 68.7935C20.632 69.104 20.8538 69.3424 21.1421 69.5088C21.4304 69.6751 21.7687 69.7583 22.1568 69.7583C22.7445 69.7583 23.2047 69.5753 23.5374 69.2094C23.87 68.8323 24.0364 68.3167 24.0364 67.6624V63.1381H25.5334V67.729C25.5334 68.4165 25.3892 69.0208 25.1009 69.542C24.8126 70.0632 24.4134 70.4735 23.9033 70.7729C23.4043 71.0612 22.8166 71.2054 22.1401 71.2054ZM27.2072 71.0391V63.1381H28.7042V71.0391H27.2072ZM28.7042 66.5313L28.1387 66.2818C28.1387 65.2727 28.3715 64.4688 28.8373 63.87C29.303 63.2711 29.9739 62.9717 30.8499 62.9717C31.2491 62.9717 31.6095 63.0438 31.9311 63.188C32.2527 63.321 32.5521 63.5484 32.8293 63.87L31.848 64.8846C31.6816 64.7072 31.4987 64.5797 31.299 64.502C31.0994 64.4244 30.8666 64.3856 30.6004 64.3856C30.046 64.3856 29.5913 64.563 29.2365 64.9179C28.8816 65.2727 28.7042 65.8105 28.7042 66.5313ZM37.2365 71.0391V59.4953H38.8V71.0391H37.2365ZM38.301 71.0391V69.6086H44.9212V71.0391H38.301ZM38.301 65.8161V64.4521H44.3723V65.8161H38.301ZM38.301 60.9258V59.4953H44.8381V60.9258H38.301ZM52.0378 71.0391V66.4315C52.0378 65.8327 51.8493 65.3393 51.4723 64.9511C51.0953 64.563 50.6074 64.369 50.0085 64.369C49.6093 64.369 49.2545 64.4577 48.944 64.6351C48.6335 64.8125 48.3895 65.0565 48.2121 65.367C48.0347 65.6775 47.946 66.0323 47.946 66.4315L47.3305 66.0822C47.3305 65.4834 47.4636 64.9511 47.7297 64.4854C47.9959 64.0197 48.3674 63.6537 48.8442 63.3876C49.321 63.1103 49.8588 62.9717 50.4576 62.9717C51.0565 62.9717 51.5832 63.1214 52.0378 63.4208C52.5036 63.7203 52.8695 64.1139 53.1357 64.6018C53.4018 65.0787 53.5349 65.5888 53.5349 66.1321V71.0391H52.0378ZM46.4489 71.0391V63.1381H47.946V71.0391H46.4489ZM58.5059 74.5155C57.6964 74.5155 56.9756 74.3658 56.3435 74.0664C55.7225 73.767 55.2235 73.3456 54.8465 72.8022L55.8112 71.8208C56.1328 72.2311 56.5154 72.5416 56.9589 72.7523C57.4025 72.9741 57.9292 73.085 58.5391 73.085C59.3486 73.085 59.9863 72.8688 60.452 72.4363C60.9288 72.0149 61.1673 71.4438 61.1673 70.723V68.7603L61.4334 66.9804L61.1673 65.2173V63.1381H62.6643V70.723C62.6643 71.4771 62.4869 72.1369 62.132 72.7024C61.7882 73.268 61.3003 73.7115 60.6682 74.0331C60.0473 74.3547 59.3265 74.5155 58.5059 74.5155ZM58.5059 70.906C57.7851 70.906 57.1364 70.7341 56.5597 70.3903C55.9942 70.0466 55.5451 69.5753 55.2124 68.9765C54.8797 68.3666 54.7134 67.6846 54.7134 66.9305C54.7134 66.1765 54.8797 65.5056 55.2124 64.9179C55.5451 64.3191 55.9942 63.8478 56.5597 63.504C57.1364 63.1492 57.7851 62.9717 58.5059 62.9717C59.1269 62.9717 59.6758 63.0937 60.1526 63.3377C60.6294 63.5816 61.0065 63.9254 61.2837 64.369C61.572 64.8014 61.7273 65.3115 61.7494 65.8993V67.9951C61.7162 68.5717 61.5554 69.0818 61.2671 69.5254C60.9898 69.9579 60.6128 70.2961 60.136 70.5401C59.6591 70.784 59.1158 70.906 58.5059 70.906ZM58.8053 69.4921C59.2932 69.4921 59.7201 69.3868 60.0861 69.1761C60.4631 68.9654 60.7514 68.6715 60.951 68.2945C61.1506 67.9064 61.2504 67.4573 61.2504 66.9472C61.2504 66.4371 61.1451 65.9935 60.9344 65.6165C60.7348 65.2284 60.452 64.929 60.0861 64.7183C59.7201 64.4965 59.2877 64.3856 58.7886 64.3856C58.2896 64.3856 57.8516 64.4965 57.4746 64.7183C57.0976 64.929 56.7981 65.2284 56.5764 65.6165C56.3657 65.9935 56.2603 66.4315 56.2603 66.9305C56.2603 67.4296 56.3657 67.8731 56.5764 68.2612C56.7981 68.6494 57.0976 68.9543 57.4746 69.1761C57.8627 69.3868 58.3063 69.4921 58.8053 69.4921ZM64.5456 71.0391V63.1381H66.0426V71.0391H64.5456ZM65.2941 61.5579C65.0169 61.5579 64.7895 61.4692 64.6121 61.2917C64.4347 61.1032 64.346 60.8703 64.346 60.5931C64.346 60.327 64.4347 60.1052 64.6121 59.9278C64.7895 59.7393 65.0169 59.645 65.2941 59.645C65.5713 59.645 65.7987 59.7393 65.9761 59.9278C66.1535 60.1052 66.2422 60.327 66.2422 60.5931C66.2422 60.8703 66.1535 61.1032 65.9761 61.2917C65.7987 61.4692 65.5713 61.5579 65.2941 61.5579ZM73.505 71.0391V66.4315C73.505 65.8327 73.3165 65.3393 72.9395 64.9511C72.5624 64.563 72.0745 64.369 71.4757 64.369C71.0765 64.369 70.7216 64.4577 70.4112 64.6351C70.1007 64.8125 69.8567 65.0565 69.6793 65.367C69.5018 65.6775 69.4131 66.0323 69.4131 66.4315L68.7977 66.0822C68.7977 65.4834 68.9308 64.9511 69.1969 64.4854C69.463 64.0197 69.8345 63.6537 70.3114 63.3876C70.7882 63.1103 71.326 62.9717 71.9248 62.9717C72.5236 62.9717 73.0504 63.1214 73.505 63.4208C73.9708 63.7203 74.3367 64.1139 74.6028 64.6018C74.869 65.0787 75.002 65.5888 75.002 66.1321V71.0391H73.505ZM67.9161 71.0391V63.1381H69.4131V71.0391H67.9161ZM80.3556 71.2054C79.5683 71.2054 78.8586 71.028 78.2265 70.6731C77.5944 70.3072 77.0954 69.8137 76.7295 69.1927C76.3635 68.5717 76.1806 67.8676 76.1806 67.0803C76.1806 66.304 76.358 65.6054 76.7128 64.9844C77.0788 64.3634 77.5667 63.8755 78.1766 63.5206C78.7976 63.1547 79.4907 62.9717 80.2558 62.9717C80.9877 62.9717 81.6309 63.1381 82.1853 63.4707C82.7509 63.8034 83.1889 64.2636 83.4994 64.8513C83.821 65.4391 83.9818 66.1044 83.9818 66.8474C83.9818 66.9583 83.9762 67.0803 83.9651 67.2133C83.954 67.3353 83.9319 67.4795 83.8986 67.6458H77.2285V66.3983H83.1002L82.5513 66.8806C82.5513 66.3484 82.457 65.8993 82.2685 65.5333C82.08 65.1563 81.8138 64.868 81.4701 64.6684C81.1263 64.4577 80.7105 64.3523 80.2225 64.3523C79.7124 64.3523 79.2633 64.4632 78.8752 64.685C78.4871 64.9068 78.1877 65.2173 77.977 65.6165C77.7663 66.0157 77.661 66.487 77.661 67.0303C77.661 67.5848 77.7719 68.0727 77.9936 68.4941C78.2154 68.9044 78.5315 69.226 78.9418 69.4589C79.3521 69.6806 79.8233 69.7915 80.3556 69.7915C80.7992 69.7915 81.2039 69.7139 81.5699 69.5587C81.9469 69.4034 82.2685 69.1705 82.5346 68.8601L83.4994 69.8414C83.1223 70.285 82.6566 70.6232 82.1022 70.8561C81.5588 71.089 80.9766 71.2054 80.3556 71.2054ZM88.9408 71.2054C88.1535 71.2054 87.4438 71.028 86.8117 70.6731C86.1796 70.3072 85.6806 69.8137 85.3147 69.1927C84.9487 68.5717 84.7657 67.8676 84.7657 67.0803C84.7657 66.304 84.9432 65.6054 85.298 64.9844C85.664 64.3634 86.1519 63.8755 86.7618 63.5206C87.3828 63.1547 88.0758 62.9717 88.841 62.9717C89.5729 62.9717 90.216 63.1381 90.7705 63.4707C91.336 63.8034 91.7741 64.2636 92.0846 64.8513C92.4061 65.4391 92.5669 66.1044 92.5669 66.8474C92.5669 66.9583 92.5614 67.0803 92.5503 67.2133C92.5392 67.3353 92.517 67.4795 92.4838 67.6458H85.8137V66.3983H91.6854L91.1364 66.8806C91.1364 66.3484 91.0422 65.8993 90.8537 65.5333C90.6652 65.1563 90.399 64.868 90.0553 64.6684C89.7115 64.4577 89.2957 64.3523 88.8077 64.3523C88.2976 64.3523 87.8485 64.4632 87.4604 64.685C87.0723 64.9068 86.7729 65.2173 86.5622 65.6165C86.3515 66.0157 86.2461 66.487 86.2461 67.0303C86.2461 67.5848 86.357 68.0727 86.5788 68.4941C86.8006 68.9044 87.1166 69.226 87.5269 69.4589C87.9372 69.6806 88.4085 69.7915 88.9408 69.7915C89.3844 69.7915 89.7891 69.7139 90.1551 69.5587C90.5321 69.4034 90.8537 69.1705 91.1198 68.8601L92.0846 69.8414C91.7075 70.285 91.2418 70.6232 90.6873 70.8561C90.144 71.089 89.5618 71.2054 88.9408 71.2054ZM93.8666 71.0391V63.1381H95.3636V71.0391H93.8666ZM95.3636 66.5313L94.7981 66.2818C94.7981 65.2727 95.0309 64.4688 95.4967 63.87C95.9624 63.2711 96.6333 62.9717 97.5093 62.9717C97.9086 62.9717 98.269 63.0438 98.5905 63.188C98.9121 63.321 99.2115 63.5484 99.4888 63.87L98.5074 64.8846C98.341 64.7072 98.1581 64.5797 97.9585 64.502C97.7589 64.4244 97.526 64.3856 97.2598 64.3856C96.7054 64.3856 96.2507 64.563 95.8959 64.9179C95.541 65.2727 95.3636 65.8105 95.3636 66.5313ZM100.227 71.0391V63.1381H101.724V71.0391H100.227ZM100.975 61.5579C100.698 61.5579 100.471 61.4692 100.293 61.2917C100.116 61.1032 100.027 60.8703 100.027 60.5931C100.027 60.327 100.116 60.1052 100.293 59.9278C100.471 59.7393 100.698 59.645 100.975 59.645C101.252 59.645 101.48 59.7393 101.657 59.9278C101.835 60.1052 101.923 60.327 101.923 60.5931C101.923 60.8703 101.835 61.1032 101.657 61.2917C101.48 61.4692 101.252 61.5579 100.975 61.5579ZM109.186 71.0391V66.4315C109.186 65.8327 108.998 65.3393 108.621 64.9511C108.244 64.563 107.756 64.369 107.157 64.369C106.758 64.369 106.403 64.4577 106.092 64.6351C105.782 64.8125 105.538 65.0565 105.36 65.367C105.183 65.6775 105.094 66.0323 105.094 66.4315L104.479 66.0822C104.479 65.4834 104.612 64.9511 104.878 64.4854C105.144 64.0197 105.516 63.6537 105.993 63.3876C106.469 63.1103 107.007 62.9717 107.606 62.9717C108.205 62.9717 108.732 63.1214 109.186 63.4208C109.652 63.7203 110.018 64.1139 110.284 64.6018C110.55 65.0787 110.683 65.5888 110.683 66.1321V71.0391H109.186ZM103.597 71.0391V63.1381H105.094V71.0391H103.597ZM115.654 74.5155C114.845 74.5155 114.124 74.3658 113.492 74.0664C112.871 73.767 112.372 73.3456 111.995 72.8022L112.96 71.8208C113.281 72.2311 113.664 72.5416 114.107 72.7523C114.551 72.9741 115.078 73.085 115.687 73.085C116.497 73.085 117.135 72.8688 117.6 72.4363C118.077 72.0149 118.316 71.4438 118.316 70.723V68.7603L118.582 66.9804L118.316 65.2173V63.1381H119.813V70.723C119.813 71.4771 119.635 72.1369 119.28 72.7024C118.937 73.268 118.449 73.7115 117.817 74.0331C117.196 74.3547 116.475 74.5155 115.654 74.5155ZM115.654 70.906C114.933 70.906 114.285 70.7341 113.708 70.3903C113.143 70.0466 112.693 69.5753 112.361 68.9765C112.028 68.3666 111.862 67.6846 111.862 66.9305C111.862 66.1765 112.028 65.5056 112.361 64.9179C112.693 64.3191 113.143 63.8478 113.708 63.504C114.285 63.1492 114.933 62.9717 115.654 62.9717C116.275 62.9717 116.824 63.0937 117.301 63.3377C117.778 63.5816 118.155 63.9254 118.432 64.369C118.72 64.8014 118.876 65.3115 118.898 65.8993V67.9951C118.864 68.5717 118.704 69.0818 118.415 69.5254C118.138 69.9579 117.761 70.2961 117.284 70.5401C116.807 70.784 116.264 70.906 115.654 70.906ZM115.954 69.4921C116.442 69.4921 116.868 69.3868 117.234 69.1761C117.611 68.9654 117.9 68.6715 118.099 68.2945C118.299 67.9064 118.399 67.4573 118.399 66.9472C118.399 66.4371 118.293 65.9935 118.083 65.6165C117.883 65.2284 117.6 64.929 117.234 64.7183C116.868 64.4965 116.436 64.3856 115.937 64.3856C115.438 64.3856 115 64.4965 114.623 64.7183C114.246 64.929 113.946 65.2284 113.725 65.6165C113.514 65.9935 113.409 66.4315 113.409 66.9305C113.409 67.4296 113.514 67.8731 113.725 68.2612C113.946 68.6494 114.246 68.9543 114.623 69.1761C115.011 69.3868 115.455 69.4921 115.954 69.4921ZM125.071 71.0391V59.4953H126.634V71.0391H125.071ZM134.349 71.0391V66.4315C134.349 65.8327 134.161 65.3393 133.784 64.9511C133.407 64.563 132.919 64.369 132.32 64.369C131.921 64.369 131.566 64.4577 131.255 64.6351C130.945 64.8125 130.701 65.0565 130.523 65.367C130.346 65.6775 130.257 66.0323 130.257 66.4315L129.642 66.0822C129.642 65.4834 129.775 64.9511 130.041 64.4854C130.307 64.0197 130.679 63.6537 131.155 63.3876C131.632 63.1103 132.17 62.9717 132.769 62.9717C133.368 62.9717 133.894 63.1214 134.349 63.4208C134.815 63.7203 135.181 64.1139 135.447 64.6018C135.713 65.0787 135.846 65.5888 135.846 66.1321V71.0391H134.349ZM128.76 71.0391V63.1381H130.257V71.0391H128.76ZM143.129 71.0391V66.4315C143.129 65.8327 142.941 65.3393 142.564 64.9511C142.187 64.563 141.699 64.369 141.1 64.369C140.701 64.369 140.346 64.4577 140.035 64.6351C139.725 64.8125 139.481 65.0565 139.303 65.367C139.126 65.6775 139.037 66.0323 139.037 66.4315L138.422 66.0822C138.422 65.4834 138.555 64.9511 138.821 64.4854C139.087 64.0197 139.459 63.6537 139.936 63.3876C140.412 63.1103 140.95 62.9717 141.549 62.9717C142.148 62.9717 142.675 63.1214 143.129 63.4208C143.595 63.7203 143.961 64.1139 144.227 64.6018C144.493 65.0787 144.626 65.5888 144.626 66.1321V71.0391H143.129ZM137.54 71.0391V63.1381H139.037V71.0391H137.54ZM149.93 71.2054C149.154 71.2054 148.455 71.0224 147.834 70.6565C147.213 70.2905 146.72 69.7971 146.354 69.1761C145.988 68.544 145.805 67.8399 145.805 67.0636C145.805 66.2985 145.988 65.6109 146.354 65.001C146.72 64.3801 147.213 63.8866 147.834 63.5206C148.455 63.1547 149.154 62.9717 149.93 62.9717C150.695 62.9717 151.388 63.1547 152.009 63.5206C152.641 63.8755 153.14 64.3634 153.506 64.9844C153.872 65.6054 154.055 66.2985 154.055 67.0636C154.055 67.8399 153.872 68.544 153.506 69.1761C153.14 69.7971 152.641 70.2905 152.009 70.6565C151.388 71.0224 150.695 71.2054 149.93 71.2054ZM149.93 69.7583C150.429 69.7583 150.873 69.6418 151.261 69.409C151.649 69.1761 151.954 68.8601 152.175 68.4608C152.397 68.0505 152.508 67.5848 152.508 67.0636C152.508 66.5535 152.392 66.0989 152.159 65.6997C151.937 65.3004 151.632 64.99 151.244 64.7682C150.867 64.5353 150.429 64.4189 149.93 64.4189C149.431 64.4189 148.987 64.5353 148.599 64.7682C148.211 64.99 147.906 65.3004 147.684 65.6997C147.463 66.0989 147.352 66.5535 147.352 67.0636C147.352 67.5848 147.463 68.0505 147.684 68.4608C147.906 68.8601 148.211 69.1761 148.599 69.409C148.987 69.6418 149.431 69.7583 149.93 69.7583ZM157.812 71.0391L154.186 63.1381H155.849L158.76 69.8082H157.795L160.723 63.1381H162.32L158.693 71.0391H157.812ZM166.315 71.2054C165.594 71.2054 164.94 71.028 164.352 70.6731C163.764 70.3072 163.299 69.8137 162.955 69.1927C162.622 68.5717 162.456 67.8731 162.456 67.0969C162.456 66.3206 162.622 65.622 162.955 65.001C163.299 64.3801 163.759 63.8866 164.335 63.5206C164.923 63.1547 165.583 62.9717 166.315 62.9717C166.914 62.9717 167.446 63.0993 167.912 63.3543C168.388 63.5983 168.771 63.942 169.059 64.3856C169.348 64.8181 169.508 65.3226 169.542 65.8993V68.2779C169.508 68.8434 169.348 69.348 169.059 69.7915C168.782 70.2351 168.405 70.5844 167.928 70.8395C167.462 71.0834 166.925 71.2054 166.315 71.2054ZM166.564 69.7915C167.307 69.7915 167.906 69.542 168.361 69.043C168.815 68.5329 169.043 67.8842 169.043 67.0969C169.043 66.5535 168.937 66.0822 168.727 65.683C168.527 65.2727 168.239 64.9567 167.862 64.7349C167.485 64.502 167.047 64.3856 166.548 64.3856C166.049 64.3856 165.605 64.502 165.217 64.7349C164.84 64.9678 164.54 65.2894 164.319 65.6997C164.108 66.0989 164.003 66.5591 164.003 67.0803C164.003 67.6125 164.108 68.0838 164.319 68.4941C164.54 68.8933 164.845 69.2094 165.234 69.4422C165.622 69.6751 166.065 69.7915 166.564 69.7915ZM168.943 71.0391V68.91L169.226 66.9804L168.943 65.0676V63.1381H170.457V71.0391H168.943ZM173.485 71.0391V59.828H174.982V71.0391H173.485ZM171.539 64.502V63.1381H176.928V64.502H171.539ZM178.079 71.0391V63.1381H179.576V71.0391H178.079ZM178.827 61.5579C178.55 61.5579 178.323 61.4692 178.145 61.2917C177.968 61.1032 177.879 60.8703 177.879 60.5931C177.879 60.327 177.968 60.1052 178.145 59.9278C178.323 59.7393 178.55 59.645 178.827 59.645C179.105 59.645 179.332 59.7393 179.509 59.9278C179.687 60.1052 179.775 60.327 179.775 60.5931C179.775 60.8703 179.687 61.1032 179.509 61.2917C179.332 61.4692 179.105 61.5579 178.827 61.5579ZM185.059 71.2054C184.283 71.2054 183.584 71.0224 182.963 70.6565C182.342 70.2905 181.849 69.7971 181.483 69.1761C181.117 68.544 180.934 67.8399 180.934 67.0636C180.934 66.2985 181.117 65.6109 181.483 65.001C181.849 64.3801 182.342 63.8866 182.963 63.5206C183.584 63.1547 184.283 62.9717 185.059 62.9717C185.824 62.9717 186.517 63.1547 187.138 63.5206C187.77 63.8755 188.269 64.3634 188.635 64.9844C189.001 65.6054 189.184 66.2985 189.184 67.0636C189.184 67.8399 189.001 68.544 188.635 69.1761C188.269 69.7971 187.77 70.2905 187.138 70.6565C186.517 71.0224 185.824 71.2054 185.059 71.2054ZM185.059 69.7583C185.558 69.7583 186.001 69.6418 186.39 69.409C186.778 69.1761 187.083 68.8601 187.304 68.4608C187.526 68.0505 187.637 67.5848 187.637 67.0636C187.637 66.5535 187.521 66.0989 187.288 65.6997C187.066 65.3004 186.761 64.99 186.373 64.7682C185.996 64.5353 185.558 64.4189 185.059 64.4189C184.56 64.4189 184.116 64.5353 183.728 64.7682C183.34 64.99 183.035 65.3004 182.813 65.6997C182.591 66.0989 182.481 66.5535 182.481 67.0636C182.481 67.5848 182.591 68.0505 182.813 68.4608C183.035 68.8601 183.34 69.1761 183.728 69.409C184.116 69.6418 184.56 69.7583 185.059 69.7583ZM196.127 71.0391V66.4315C196.127 65.8327 195.938 65.3393 195.561 64.9511C195.184 64.563 194.696 64.369 194.098 64.369C193.698 64.369 193.344 64.4577 193.033 64.6351C192.723 64.8125 192.479 65.0565 192.301 65.367C192.124 65.6775 192.035 66.0323 192.035 66.4315L191.42 66.0822C191.42 65.4834 191.553 64.9511 191.819 64.4854C192.085 64.0197 192.456 63.6537 192.933 63.3876C193.41 63.1103 193.948 62.9717 194.547 62.9717C195.146 62.9717 195.672 63.1214 196.127 63.4208C196.593 63.7203 196.959 64.1139 197.225 64.6018C197.491 65.0787 197.624 65.5888 197.624 66.1321V71.0391H196.127ZM190.538 71.0391V63.1381H192.035V71.0391H190.538ZM203.759 66.548V65.184H206.903C207.336 65.184 207.718 65.0953 208.051 64.9179C208.395 64.7404 208.661 64.4909 208.849 64.1694C209.049 63.8478 209.149 63.4652 209.149 63.0216C209.149 62.5781 209.049 62.1955 208.849 61.8739C208.661 61.5523 208.395 61.3028 208.051 61.1254C207.718 60.948 207.336 60.8593 206.903 60.8593H203.759V59.4953H207.003C207.713 59.4953 208.345 59.6395 208.899 59.9278C209.465 60.2161 209.908 60.6264 210.23 61.1587C210.563 61.6799 210.729 62.3008 210.729 63.0216C210.729 63.7313 210.563 64.3523 210.23 64.8846C209.908 65.4058 209.465 65.8161 208.899 66.1155C208.345 66.4038 207.713 66.548 207.003 66.548H203.759ZM202.712 71.0391V59.4953H204.275V71.0391H202.712ZM215.105 71.2054C214.385 71.2054 213.73 71.028 213.143 70.6731C212.555 70.3072 212.089 69.8137 211.745 69.1927C211.413 68.5717 211.246 67.8731 211.246 67.0969C211.246 66.3206 211.413 65.622 211.745 65.001C212.089 64.3801 212.549 63.8866 213.126 63.5206C213.714 63.1547 214.373 62.9717 215.105 62.9717C215.704 62.9717 216.236 63.0993 216.702 63.3543C217.179 63.5983 217.562 63.942 217.85 64.3856C218.138 64.8181 218.299 65.3226 218.332 65.8993V68.2779C218.299 68.8434 218.138 69.348 217.85 69.7915C217.573 70.2351 217.196 70.5844 216.719 70.8395C216.253 71.0834 215.715 71.2054 215.105 71.2054ZM215.355 69.7915C216.098 69.7915 216.697 69.542 217.151 69.043C217.606 68.5329 217.833 67.8842 217.833 67.0969C217.833 66.5535 217.728 66.0822 217.517 65.683C217.318 65.2727 217.029 64.9567 216.652 64.7349C216.275 64.502 215.837 64.3856 215.338 64.3856C214.839 64.3856 214.396 64.502 214.007 64.7349C213.63 64.9678 213.331 65.2894 213.109 65.6997C212.899 66.0989 212.793 66.5591 212.793 67.0803C212.793 67.6125 212.899 68.0838 213.109 68.4941C213.331 68.8933 213.636 69.2094 214.024 69.4422C214.412 69.6751 214.856 69.7915 215.355 69.7915ZM217.733 71.0391V68.91L218.016 66.9804L217.733 65.0676V63.1381H219.247V71.0391H217.733ZM221.094 71.0391V63.1381H222.591V71.0391H221.094ZM222.591 66.5313L222.025 66.2818C222.025 65.2727 222.258 64.4688 222.724 63.87C223.19 63.2711 223.861 62.9717 224.737 62.9717C225.136 62.9717 225.496 63.0438 225.818 63.188C226.14 63.321 226.439 63.5484 226.716 63.87L225.735 64.8846C225.568 64.7072 225.385 64.5797 225.186 64.502C224.986 64.4244 224.753 64.3856 224.487 64.3856C223.933 64.3856 223.478 64.563 223.123 64.9179C222.768 65.2727 222.591 65.8105 222.591 66.5313ZM228.619 71.0391V59.828H230.116V71.0391H228.619ZM226.673 64.502V63.1381H232.062V64.502H226.673ZM238.785 71.0391V66.4315C238.785 65.8327 238.597 65.3393 238.22 64.9511C237.843 64.563 237.355 64.369 236.756 64.369C236.357 64.369 236.002 64.4577 235.691 64.6351C235.381 64.8125 235.137 65.0565 234.959 65.367C234.782 65.6775 234.693 66.0323 234.693 66.4315L234.078 66.0822C234.078 65.4834 234.211 64.9511 234.477 64.4854C234.743 64.0197 235.115 63.6537 235.591 63.3876C236.068 63.1103 236.606 62.9717 237.205 62.9717C237.804 62.9717 238.33 63.1214 238.785 63.4208C239.251 63.7203 239.617 64.1139 239.883 64.6018C240.149 65.0787 240.282 65.5888 240.282 66.1321V71.0391H238.785ZM233.196 71.0391V63.1381H234.693V71.0391H233.196ZM245.636 71.2054C244.848 71.2054 244.139 71.028 243.507 70.6731C242.875 70.3072 242.376 69.8137 242.01 69.1927C241.644 68.5717 241.461 67.8676 241.461 67.0803C241.461 66.304 241.638 65.6054 241.993 64.9844C242.359 64.3634 242.847 63.8755 243.457 63.5206C244.078 63.1547 244.771 62.9717 245.536 62.9717C246.268 62.9717 246.911 63.1381 247.465 63.4707C248.031 63.8034 248.469 64.2636 248.78 64.8513C249.101 65.4391 249.262 66.1044 249.262 66.8474C249.262 66.9583 249.256 67.0803 249.245 67.2133C249.234 67.3353 249.212 67.4795 249.179 67.6458H242.509V66.3983H248.38L247.831 66.8806C247.831 66.3484 247.737 65.8993 247.549 65.5333C247.36 65.1563 247.094 64.868 246.75 64.6684C246.406 64.4577 245.991 64.3523 245.503 64.3523C244.993 64.3523 244.543 64.4632 244.155 64.685C243.767 64.9068 243.468 65.2173 243.257 65.6165C243.046 66.0157 242.941 66.487 242.941 67.0303C242.941 67.5848 243.052 68.0727 243.274 68.4941C243.496 68.9044 243.812 69.226 244.222 69.4589C244.632 69.6806 245.103 69.7915 245.636 69.7915C246.079 69.7915 246.484 69.7139 246.85 69.5587C247.227 69.4034 247.549 69.1705 247.815 68.8601L248.78 69.8414C248.402 70.285 247.937 70.6232 247.382 70.8561C246.839 71.089 246.257 71.2054 245.636 71.2054ZM250.562 71.0391V63.1381H252.059V71.0391H250.562ZM252.059 66.5313L251.493 66.2818C251.493 65.2727 251.726 64.4688 252.192 63.87C252.657 63.2711 253.328 62.9717 254.204 62.9717C254.604 62.9717 254.964 63.0438 255.285 63.188C255.607 63.321 255.906 63.5484 256.184 63.87L255.202 64.8846C255.036 64.7072 254.853 64.5797 254.653 64.502C254.454 64.4244 254.221 64.3856 253.955 64.3856C253.4 64.3856 252.946 64.563 252.591 64.9179C252.236 65.2727 252.059 65.8105 252.059 66.5313Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M208.421 28.3123C208.421 26.525 207.744 24.8957 206.633 23.6666L209 22.1681C210.371 23.8413 211.193 25.9808 211.193 28.3123C211.193 33.6711 206.849 38.0153 201.49 38.0153C196.131 38.0153 191.787 33.6711 191.787 28.3123C191.787 22.9535 196.131 18.6094 201.49 18.6094C202.913 18.6094 204.264 18.9155 205.481 19.4655L203.258 21.6091C202.694 21.4607 202.101 21.3817 201.49 21.3817C197.662 21.3817 194.559 24.4846 194.559 28.3123C194.559 32.1401 197.662 35.243 201.49 35.243C205.318 35.243 208.421 32.1401 208.421 28.3123Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M211.193 21.3817C215.021 21.3817 218.124 24.4846 218.124 28.3123C218.124 32.1401 215.021 35.243 211.193 35.243C210.643 35.243 210.108 35.1789 209.595 35.0578L207.194 37.1556C208.414 37.7079 209.767 38.0153 211.193 38.0153C216.552 38.0153 220.896 33.6711 220.896 28.3123C220.896 22.9535 216.552 18.6094 211.193 18.6094C205.834 18.6094 201.49 22.9535 201.49 28.3123C201.49 30.4628 202.19 32.4499 203.374 34.0584L205.747 32.5991C204.817 31.4196 204.262 29.9307 204.262 28.3123C204.262 24.4846 207.365 21.3817 211.193 21.3817Z"
                          fill="white"
                        />
                        <path
                          d="M93.445 31.4294C93.445 32.7992 93.0964 33.9947 92.399 35.0158C91.7017 36.0369 90.7553 36.8338 89.5598 37.4066C88.3893 37.9795 87.0942 38.2659 85.6747 38.2659H73.0852V11.742H86.2724C87.5176 11.742 88.5885 12.0783 89.4851 12.7507C90.4066 13.3982 91.104 14.245 91.5771 15.291C92.0752 16.3121 92.3243 17.383 92.3243 18.5037C92.3243 19.7988 91.9881 21.0191 91.3156 22.1648C90.6681 23.2855 89.7342 24.1198 88.5138 24.6677C90.033 25.116 91.2285 25.9503 92.1002 27.1707C92.9967 28.3661 93.445 29.7857 93.445 31.4294ZM90.0455 30.8317C90.0455 30.0099 89.8587 29.2503 89.4851 28.5529C89.1365 27.8556 88.6508 27.2952 88.0282 26.8718C87.4305 26.4484 86.7331 26.2367 85.9362 26.2367H76.4474V35.352H85.6747C86.4965 35.352 87.2312 35.1403 87.8788 34.7169C88.5512 34.2935 89.0742 33.7456 89.4478 33.0732C89.8463 32.3758 90.0455 31.6287 90.0455 30.8317ZM76.4474 14.6559V23.5097H84.8902C85.6871 23.5097 86.3845 23.3104 86.9822 22.9119C87.6048 22.5135 88.0904 21.978 88.4391 21.3056C88.8127 20.6331 88.9995 19.8984 88.9995 19.1015C88.9995 18.2547 88.8251 17.5075 88.4765 16.86C88.1527 16.1876 87.692 15.6521 87.0942 15.2536C86.5214 14.8552 85.8614 14.6559 85.1143 14.6559H76.4474ZM106.628 38.6394C105.159 38.6394 103.814 38.3779 102.594 37.8549C101.398 37.307 100.352 36.5723 99.4558 35.6508C98.5841 34.7045 97.8992 33.6211 97.4011 32.4007C96.9279 31.1804 96.6913 29.8853 96.6913 28.5156C96.6913 26.6726 97.1147 24.9915 97.9615 23.4723C98.8083 21.9531 99.9788 20.7327 101.473 19.8113C102.992 18.8898 104.723 18.429 106.666 18.429C108.633 18.429 110.339 18.9022 111.784 19.8486C113.253 20.7701 114.386 21.9904 115.183 23.5097C116.005 25.004 116.416 26.6228 116.416 28.3661C116.416 28.6152 116.404 28.8642 116.379 29.1133C116.379 29.3374 116.366 29.5118 116.341 29.6363H100.166C100.265 30.9064 100.614 32.0396 101.212 33.0358C101.834 34.0071 102.631 34.7792 103.602 35.352C104.574 35.8999 105.62 36.1738 106.741 36.1738C107.936 36.1738 109.057 35.875 110.103 35.2773C111.174 34.6795 111.908 33.895 112.307 32.9237L115.146 33.7083C114.723 34.6546 114.087 35.5014 113.241 36.2486C112.419 36.9957 111.435 37.581 110.289 38.0044C109.169 38.4278 107.948 38.6394 106.628 38.6394ZM100.054 27.3575H113.353C113.253 26.0873 112.892 24.9666 112.269 23.9953C111.647 23.024 110.85 22.2644 109.879 21.7165C108.907 21.1686 107.836 20.8946 106.666 20.8946C105.52 20.8946 104.462 21.1686 103.49 21.7165C102.519 22.2644 101.722 23.024 101.1 23.9953C100.502 24.9666 100.153 26.0873 100.054 27.3575ZM130.755 21.6418C129.111 21.6667 127.654 22.0901 126.384 22.9119C125.139 23.7089 124.254 24.8172 123.731 26.2367V38.2659H120.444V18.7652H123.507V23.2855C124.18 21.9406 125.064 20.8573 126.16 20.0354C127.28 19.1886 128.451 18.7154 129.671 18.6158C129.92 18.6158 130.132 18.6158 130.306 18.6158C130.481 18.6158 130.63 18.6283 130.755 18.6532V21.6418ZM144.7 21.6418C143.056 21.6667 141.599 22.0901 140.329 22.9119C139.083 23.7089 138.199 24.8172 137.676 26.2367V38.2659H134.389V18.7652H137.452V23.2855C138.125 21.9406 139.009 20.8573 140.105 20.0354C141.225 19.1886 142.396 18.7154 143.616 18.6158C143.865 18.6158 144.077 18.6158 144.251 18.6158C144.426 18.6158 144.575 18.6283 144.7 18.6532V21.6418ZM149.23 43.5706C149.554 43.5955 149.878 43.6204 150.202 43.6454C150.525 43.6952 150.774 43.7201 150.949 43.7201C151.347 43.7201 151.696 43.5831 151.995 43.3091C152.294 43.0352 152.617 42.4997 152.966 41.7028C153.34 40.9307 153.813 39.7851 154.386 38.2659L146.13 18.7652H149.604L156.179 34.9411L162.119 18.7652H165.369L155.88 43.3838C155.656 43.9567 155.32 44.4921 154.871 44.9902C154.448 45.5132 153.9 45.9242 153.228 46.223C152.555 46.5219 151.746 46.6713 150.799 46.6713C150.575 46.6713 150.339 46.6589 150.09 46.634C149.865 46.609 149.579 46.5592 149.23 46.4845V43.5706ZM189.947 31.4294C189.947 32.7992 189.598 33.9947 188.901 35.0158C188.204 36.0369 187.257 36.8338 186.062 37.4066C184.891 37.9795 183.596 38.2659 182.177 38.2659H169.587V11.742H182.774C184.02 11.742 185.091 12.0783 185.987 12.7507C186.909 13.3982 187.606 14.245 188.079 15.291C188.577 16.3121 188.826 17.383 188.826 18.5037C188.826 19.7988 188.49 21.0191 187.818 22.1648C187.17 23.2855 186.236 24.1198 185.016 24.6677C186.535 25.116 187.731 25.9503 188.602 27.1707C189.499 28.3661 189.947 29.7857 189.947 31.4294ZM186.548 30.8317C186.548 30.0099 186.361 29.2503 185.987 28.5529C185.639 27.8556 185.153 27.2952 184.53 26.8718C183.933 26.4484 183.235 26.2367 182.438 26.2367H172.949V35.352H182.177C182.999 35.352 183.733 35.1403 184.381 34.7169C185.053 34.2935 185.576 33.7456 185.95 33.0732C186.348 32.3758 186.548 31.6287 186.548 30.8317ZM172.949 14.6559V23.5097H181.392C182.189 23.5097 182.886 23.3104 183.484 22.9119C184.107 22.5135 184.592 21.978 184.941 21.3056C185.315 20.6331 185.502 19.8984 185.502 19.1015C185.502 18.2547 185.327 17.5075 184.979 16.86C184.655 16.1876 184.194 15.6521 183.596 15.2536C183.023 14.8552 182.363 14.6559 181.616 14.6559H172.949ZM230.655 38.6394C229.036 38.6394 227.517 38.3779 226.097 37.8549C224.678 37.307 223.458 36.4976 222.436 35.4267L223.707 33.1105C224.827 34.1565 225.948 34.9037 227.069 35.352C228.189 35.8003 229.335 36.0244 230.506 36.0244C231.851 36.0244 232.946 35.7754 233.793 35.2773C234.64 34.7543 235.063 33.9947 235.063 32.9985C235.063 32.2762 234.839 31.7408 234.391 31.3921C233.967 31.0434 233.357 30.757 232.56 30.5329C231.763 30.2838 230.817 30.0099 229.721 29.711C228.376 29.3125 227.243 28.8891 226.322 28.4408C225.4 27.9926 224.703 27.4322 224.23 26.7598C223.756 26.0873 223.52 25.2405 223.52 24.2194C223.52 22.9742 223.844 21.9282 224.491 21.0814C225.139 20.2097 226.023 19.5498 227.143 19.1015C228.289 18.6532 229.584 18.429 231.029 18.429C232.473 18.429 233.781 18.6532 234.951 19.1015C236.122 19.5498 237.13 20.2097 237.977 21.0814L236.483 23.3602C235.711 22.5633 234.864 21.978 233.943 21.6044C233.021 21.2059 231.988 21.0067 230.842 21.0067C230.169 21.0067 229.509 21.0939 228.862 21.2682C228.214 21.4176 227.679 21.704 227.256 22.1274C226.832 22.5259 226.62 23.0987 226.62 23.8459C226.62 24.4685 226.782 24.9666 227.106 25.3402C227.455 25.6888 227.953 25.9877 228.6 26.2367C229.273 26.4858 230.082 26.7598 231.029 27.0586C232.498 27.482 233.768 27.9054 234.839 28.3288C235.935 28.7522 236.782 29.3001 237.379 29.9725C237.977 30.6449 238.276 31.5789 238.276 32.7743C238.276 34.6173 237.579 36.0618 236.184 37.1078C234.789 38.1289 232.946 38.6394 230.655 38.6394ZM252.669 37.2946C252.395 37.4191 252.022 37.581 251.548 37.7802C251.075 37.9795 250.527 38.1538 249.905 38.3032C249.282 38.4527 248.622 38.5274 247.925 38.5274C247.128 38.5274 246.393 38.3904 245.721 38.1164C245.048 37.8176 244.513 37.3693 244.114 36.7716C243.716 36.1489 243.517 35.3769 243.517 34.4554V21.3429H240.864V18.7652H243.517V12.265H246.804V18.7652H251.175V21.3429H246.804V33.4467C246.854 34.1441 247.09 34.6671 247.514 35.0158C247.937 35.3395 248.435 35.5014 249.008 35.5014C249.656 35.5014 250.253 35.3893 250.801 35.1652C251.349 34.9411 251.71 34.7792 251.885 34.6795L252.669 37.2946Z"
                          fill="white"
                        />
                        <path
                          d="M1.41772 12.1456C1.41772 5.53275 6.77847 0.171997 13.3913 0.171997H21.1342V40.0839C21.1342 46.6967 15.7734 52.0574 9.16063 52.0574H1.41772V12.1456Z"
                          fill="white"
                        />
                        <circle
                          cx="34.1013"
                          cy="10.0302"
                          r="9.85823"
                          fill="white"
                        />
                        <circle
                          cx="39.2898"
                          cy="37.0092"
                          r="15.0468"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2282_8919">
                          <rect width="280" height="73" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex items-end justify-end">
                    <svg
                      width="86"
                      height="96"
                      viewBox="0 0 86 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2282_8916)">
                        <circle
                          cx="46.341"
                          cy="62.3371"
                          r="22.341"
                          fill="white"
                        />
                        <path
                          d="M52.229 64.0438L35.9997 64.0438L35.9997 61.3772L52.229 61.3772L45.077 54.2252L46.9623 52.3398L57.333 62.7105L46.9623 73.0812L45.077 71.1958L52.229 64.0438Z"
                          fill="#14CCC3"
                        />
                        <circle
                          cx="29.9778"
                          cy="29.9798"
                          r="6.17507"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2282_8916">
                          <rect width="96" height="96" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#EDFCFC] lg:px-[100px] px-[24px] md:px-[40px] py-15">
          <div className="flex lg:flex-row flex-col gap-[60px]">
            <div className="lg:w-[calc(50%-30px)] w-[calc(100%-0px)]">
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  Engagement Models
                </p>
              </div>
              <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px] lg:w-[632px] w-auto">
                <span className="font-bold text-[#1D1D1F] ">
                  Fast & Flexible <br /> Engagements For <br />
                  Businesses Of
                </span>{" "}
                <span className="font-normal text-[#14CCC3]">All Sizes</span>
              </p>
              <p className="text-base font-normal leading-[110%] lg:w-[90%] w-full text-[#1D1D1F] mt-3">
                <strong style={{ color: "#14CCC3" }}> BB</strong> offers
                flexible engagement models tailored to suit your business goals,
                timeline, and budget. Whether you're a startup or a scaled-up
                venture, we’ve got you covered. At BerryBoost, we ensure that
                our teams work exactly in accordance with your job requirements,
                matching time zones, and with English proficiency.
              </p>{" "}
              <Link
                href="/engagement-model"
                passHref
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return;
                  }

                  e.preventDefault();
                  handleClickall("/engagement-model");
                }}
                className="flex mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
              >
                Find Out <IoArrowForward size={16} />
              </Link>
            </div>
            <div className="lg:w-[calc(50%-30px)] w-[calc(100%-0px)] flex flex-col items-start lg:ml-10 ml-0 mt-10">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isActive = index === activeIndex;

                return (
                  <div key={index} className="flex items-start relative">
                    <div className="flex flex-col items-center">
                      <div
                        onClick={() => setActiveIndex(index)}
                        className={`w-[32px] h-[32px] rounded-full border-4 cursor-pointer flex items-center justify-center transition-all duration-300
              ${
                isActive
                  ? "bg-[#14CCC3] border-[#14CCC3]"
                  : "border-[#14CCC3] border-[1px] border-opacity-30"
              }`}
                      ></div>
                      {!isLast && (
                        <div
                          className={`w-[1px] transition-all duration-300 ${
                            index === activeIndex
                              ? "md:h-[100px] h-[150px]"
                              : "h-[30px]"
                          } bg-[#14CCC3]`}
                        ></div>
                      )}
                    </div>
                    <div className="ml-10 flex flex-col justify-start ">
                      <p className="text-base mt-1 font-semibold text-[#1D1D1F]">
                        {step.title}
                      </p>
                      <div className="mt-2 lg:w-[400px] w-full min-h-[25px]">
                        {isActive && (
                          <p className="text-sm text-[#1D1D1F] leading-[120%] transition-all duration-300">
                            {step.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                  Berryboost portfolio work
                </p>
              </div>
              <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                <span className="font-bold text-[#1D1D1F]">
                  How BerryBoost Disrupted The <br /> Entire{" "}
                </span>{" "}
                <span className="font-normal text-[#14CCC3]">
                  Medical Tourism Industry
                </span>
              </p>
            </div>
            <Link
              href="/casestudies"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                  return;
                }

                e.preventDefault();
                handleClickall("/casestudies");
              }}
              passHref
              className="flex lg:mt-0 mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
            >
              View All <IoArrowForward size={16} />
            </Link>
          </div>
          <p className="text-[#1D1D1F] lg:w-[50%] w-full text-base font-normal mt-3">
            MediTour Global partnered with BerryBoost to revolutionize the
            medical tourism experience. We built a secure, user-friendly
            platform that connects patients with top global healthcare
            providers. Our team delivered a fully robust and scalable web and
            mobile platform using Node.js, React, React Native, MongoDB, and
            AWS.
          </p>
          <CaseStudySlider />
        </div>
        {articlesData?.length > 0 && (
          <div className="w-full bg-[#F0F0F0] lg:px-[100px] px-[24px] md:px-[40px] py-15">
            <div className="flex flex-wrap justify-between">
              <div>
                <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
                  <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
                  <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                    Inside berryboost
                  </p>
                </div>
                <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                  <span className="font-bold text-[#1D1D1F]">
                    Emerging-Tech{" "}
                  </span>{" "}
                  <span className="font-normal text-[#14CCC3]">Insights</span>
                </p>
              </div>

              <Link
                href="/articles"
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return;
                  }

                  e.preventDefault();
                  handleClickall("/articles");
                }}
                passHref
                className="flex lg:mt-0 mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
              >
                View All <IoArrowForward size={16} />
              </Link>
            </div>
            <p className="text-[#1D1D1F] lg:w-[50%] w-full text-base font-normal mt-3">
              Discover valuable perspectives and thought provoking ideas from
              the heart of BerryBoost. From emerging technologies to real-world
              digital product strategies, our insights reveal the thought
              process behind our solutions.
            </p>
            <TechInside data={articlesData} />
          </div>
        )}
        <div className="bg-[#14CCC3] lg:pb-0 pb-15">
          <p className="pt-15 lg:text-[48px] text-[32px] font-bold text-center text-white">
            Book A Free Consultation
          </p>
          <p className="lg:text-[32px] text:[20px] font-bold text-center mb-5 lg:mb-0 text-white">
            Driving Innovation and creating Impact through technology
          </p>
          <CalendlySection />
        </div>
        <ContactForm />
        {loading && (
          <>
            <div
              style={{ zIndex: "1111" }}
              className="fixed left-0  top-0 bg-black/70  w-full h-screen flex justify-center items-center"
            >
              <CustomLoader />
            </div>
          </>
        )}
        {formModel && (
          <div
            style={{ zIndex: "1111111111111111111111111111" }}
            className="fixed left-0  z-[100000000] top-0 bg-black/70  w-full h-screen flex justify-center items-center"
          >
            <div className="bg-white z-[100000000] absolute rounded-[8px] lg:w-[1200px] w-full ">
              <EngagementPop setFormModel={setFormModel} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
