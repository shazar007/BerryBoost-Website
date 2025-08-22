"use client";
import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../../../api/event";
import ContactForm from "@/components/ContactForm/page";
import ImageGrid from "@/components/imgGallery/page";
import dayjs from "dayjs";

interface Event {
  _id: string;
  title: string;
  date: string;
  images?: string[];
}

const Event = () => {
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await getAllEvents();
        return response.data.events || [];
      } catch (err) {
        throw new Error("Failed to fetch events");
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <head>
        <title>Events — BerryBoost</title>
        <meta
          name="description"
          content="Explore the culture at BerryBoost—a software development company where innovation, collaboration, and personal growth shape everything we do. See how our team thrives together."
        />
      </head>

      <>
        <section className="relative h-[640px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-bottom bg-cover bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/assets/eventsbg.png')" }}
          />
          <div className="absolute inset-0 bg-opacity-50 z-[1]" />
          <div className="relative z-10 h-full mt-10 flex flex-col items-start justify-center lg:px-[80px] px-[24px]">
            <div className="lg:py-[35px] py-[16px] w-full lg:w-[90%] lg:px-[42px] px-[16px] bg-transparent backdrop-blur-xl rounded-[24px]">
              <div className="w-full lg:w-[70%]">
                <p className="text-white uppercase leading-[100%] text-start text-[28px] lg:text-[24px] font-[700]">
                  Events
                </p>
                <h1 className="text-start text-white text-[32px] lg:text-[48px] font-[700] leading-[46px] lg:leading-[56px] mb-6">
                  We’re More Than A Workplace
                </h1>
                <p className="text-white text-[18px] lg:text-[24px] font-[400] leading-[110%]">
                  Are you a rockstar software engineer, digital marketer or a
                  next level creative artist? BB is the place to evolve your
                  career.
                </p>
                <a
                  href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="flex mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-[#fff] border-white font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                    Let’s Connect <IoArrowForward size={16} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="flex-1 w-full px-8 py-16">
          {events?.length > 0 ? (
            events.map((event) => {
              const checkDate = dayjs(event?.date).format("DD/MM/YYYY");
              return (
                <div
                  key={event._id}
                  className="flex flex-col lg:flex-row gap-14 w-full h-full mb-24"
                >
                  <div className="p-8 w-full sm:w-52 flex flex-col h-full">
                    <p className="text-[#14CCC3] text-xl sm:text-2xl font-bold mb-6">
                      Recent Events
                    </p>
                    <p className="text-2xl sm:text-3xl text-black font-bold mb-6">
                      {event.title}
                    </p>
                    <p className="text-[14px] sm:text-[16px] text-black font-semibold">
                      {/* {dayjs(event.date).format("DD/MM/YYYY")} */}
                      {checkDate}
                    </p>
                  </div>

                  {event.images && event.images.length > 0 && (
                    <div className="flex-1 overflow-hidden flex justify-end">
                      <ImageGrid
                        images={event.images}
                        columnsCountBreakPoints={{
                          480: 1,
                          750: 2,
                          1024: 3,
                        }}
                        gutter="12px"
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center w-full py-16">No events found.</p>
          )}
        </div>

        <ContactForm />
      </>
    </>
  );
};

export default Event;
