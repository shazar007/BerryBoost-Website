"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoArrowForward } from "react-icons/io5";
import collaboration from "../../../public/assets/Rectangle40082UJK.png";
import "../../components/Itsection/itSection.css";
import Dots from "../../../public/assets/mdi_target-variant.png";
import ContactForm from "@/components/ContactForm/page";
import ItSection from "@/components/Itsection/page";

export default function EngagementModel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <head>
        <title>Engagement Model — BerryBoost</title>
        <meta
          name="description"
          content="BerryBoost offers flexible engagement models to help you hire skilled talent, scale your team, and achieve faster results with a tailored collaboration approach."
        />
      </head>{" "}
      <section className="relative h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/61fbdd5e03361031deb507b5bfec68c4ff33de65.jpg')",
          }}
        ></div>
        <div className="relative z-10  h-full  mt-10 bg flex flex-col items-start justify-center  lg:px-[80px] px-[24px]">
          <div className="py-[35px] w-full lg:w-[90%] px-[42px] bg-transparent backdrop-blur-xl  rounded-[24px]">
            <div className="w-full ">
              <p className="text-[#fff]  text-[24px] uppercase font-bold">
                Engagement Models
              </p>
              <p className="text-white leading-[56px] font-bold lg:text-[48px] text-[36px]">
                Accelerate Product Development
                <br /> With BerryBoost
              </p>
              <a
                href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                {" "}
                <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                  Let’s Connect <IoArrowForward size={16} />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="lg:px-[100px]  px-[24px] md:px-[40px] gap-[60px] py-15 flex flex-wrap items-center">
        <div className="lg:w-[calc(50%-30px)] w-full">
          <p className="text-[#1D1D1F] font-bold text-[48px] leading-[100%]">
            Fast & Flexible <br /> Engagement Models
          </p>
          <p className="text-[#1D1D1F] font-ormal text-[18px] mt-5">
            BB offers flexible engagement models tailored to suit your business
            goals, timeline, and budget. Whether you're a startup or a scaled-up
            venture, we’ve got you covered. At Berry Boost, we ensure that our
            teams work exactly in accordance with your job requirements,
            matching time zones, and with English proficiency.
          </p>
        </div>
        <div className="lg:w-[calc(50%-30px)] w-full flex lg:justify-center 2xl:justify-end">
          <Image src={collaboration} alt="" />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="py-15 bg-[#EDFCFC] lg:px-[100px] px-[24px] md:px-[40px] "
      >
        <div className=" flex items-center w-full   ">
          <div className="">
            <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px] gap-2">
              <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
              <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                Our offerings
              </p>
            </div>
            <p className="text-[#1D1D1F] mt-[8px] font-bold lg:text-[48px] text-[24px] leading-[100%]">
              Boost Up With Top 1% <br /> Exceptional Tech{" "}
              <span className="text-[#14CCC3] font-[400]">Talent</span>
            </p>
            <p className="text-[#1D1D1F]  w-full font-normal lg:text-base text-xs mt-4">
              BerryBoost helps early-stage startups, small-medium, and large
              corporations with technology development outsourcing, 100%
              sustainably, and affordably.{" "}
              <span className="text-[#14CCC3] font-[600]">BerryBoost</span> not
              only boosts your engineering operations but also guides you with
              expert product design, strategy, and technical feasibility—turning
              great ideas into scalable digital products.
            </p>{" "}
            <a
              href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                Schedule a Call <IoArrowForward size={16} />
              </button>
            </a>
          </div>
        </div>{" "}
        <div className="mt-15 ">
          <ItSection />
        </div>
      </div>{" "}
      <ContactForm />
    </>
  );
}
