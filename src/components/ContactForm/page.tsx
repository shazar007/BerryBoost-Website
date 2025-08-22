"use client";

import React from "react";
import FormComponent from "./formcomponent";

export default function ContactForm() {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-[48px] px-[24px] md:px-[40px] lg:px-[100px] py-15">
      <div className="lg:w-[55%] 2xl:w-[50%] w-full flex flex-col">
        <div className="bg-[linear-gradient(332.24deg,#14CCC3_2.55%,#0A6661_111.36%)] p-8 rounded-[8px] flex-1 flex flex-col">
          <div className="flex flex-wrap justify-between">
            <div>
              <div className="flex border-[#fff] max-w-max p-2 rounded-full border-[0.5px] gap-2">
                <svg
                  width="13"
                  height="22"
                  viewBox="0 0 13 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6.5706" cy="15.6876" r="5.58524" fill="white" />
                  <circle cx="4.64465" cy="4.34756" r="3.6593" fill="#1D1D1F" />
                </svg>
                <p className="text-[#F9FF8E] font-bold uppercase">
                  let's get started today!
                </p>
              </div>
              <p className="lg:text-[45px] text-[32px] leading-[40px] lg:leading-[56px] mt-[8px]">
                <span className="font-[500] text-[#fff]">
                  Accelerate Your <span className="font-semibold">Product</span>{" "}
                  <br /> <span className="font-semibold">Development</span> With
                  Our
                </span>{" "}
                <br />
                <span className="font-normal text-[#F9FF8E]">
                  Offshore Tech Talent
                </span>
              </p>
            </div>
          </div>
          <p className="text-[#fff] text-base font-normal  w-full mt-5 flex-1">
            <strong className="text-[#F9FF8E]">BB</strong> offers a full-range
            of services from Engineering Innovation to Custom Software
            Development, from Graphic Design to 3D Animations, from Digital to
            AI Marketing, and world class BPO facilities. At BerryBoost, we
            ensure that our teams work exactly in accordance with your job
            requirements, matching time zones, and with English proficiency.
          </p>
        </div>
      </div>

      <div className="lg:w-[45%] 2xl:w-[50%] w-full">
        <div className="h-full">
          <FormComponent />
        </div>
      </div>
    </div>
  );
}
