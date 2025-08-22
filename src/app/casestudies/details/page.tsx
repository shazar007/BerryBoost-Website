"use client";
import Image, { StaticImageData } from "next/image";
import React, { Suspense, useEffect } from "react";
import card1 from "../../../../public/assets/ri_team-fill.png";
import card2 from "../../../../public/assets/hugeicons_office.png";
import card3 from "../../../../public/assets/gis_search-country.png";
import Dots from "../../../../public/assets/dots2.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoArrowForward, IoCheckbox } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getSingleCaseStudy } from "../../../../api/caseStudy";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm/page";
import CustomLoader from "@/components/Loader/page";
type DetailCard = {
  id?: number;
  title?: string;
  content?: string;
  img: StaticImageData;
  rating?: number;
};

const Details = () => {
  const searchParams = useSearchParams();
  const id: string = searchParams.get("id") || "empty";
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["getSingleCaseStudy"],
    queryFn: () => getSingleCaseStudy(id),
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  let filteredItems = data?.data?.caseStudy;

  const cardsData: DetailCard[] = [
    {
      id: 1,
      title: "Client",
      content: filteredItems?.clientName,
      img: card1,
    },
    {
      id: 2,
      title: "Industry",
      content: filteredItems?.industry,
      img: card2,
    },
    {
      id: 3,
      title: "Country",
      content: filteredItems?.country,
      img: card3,
    },
  ];
  const rating = 4.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;

    if (rating >= starValue) {
      return <FaStar key={i} className="text-blue-700" />;
    } else if (rating >= starValue - 0.5) {
      return <FaStarHalfAlt key={i} className="text-blue-700" />;
    } else {
      return <FaRegStar key={i} className="text-blue-700" />;
    }
  });
  // const { data: blogs } = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: () => getAllBlogs(),
  //   staleTime: 5 * 60 * 1000,
  // });
  // let articlesData = blogs?.data?.blogs;
  // const filteredBlogs = articlesData?.filter((item: any) =>
  //   item.category?.includes(id)
  // );

  return (
    <>
      <head>
        <title>Case Study Details — BerryBoost</title>
        <meta
          name="description"
          content="Explore BerryBoost proven success stories. Discover how our innovative solutions have helped businesses achieve growth, overcome challenges, and drive success."
        />
      </head>
      <Suspense fallback={<div>Loading services...</div>}>
        {isLoading ? (
          <>
            {" "}
            <div
              style={{ zIndex: "1111" }}
              className="fixed left-0  top-0 bg-black/70  w-full h-screen flex justify-center items-center"
            >
              <CustomLoader />
            </div>
          </>
        ) : (
          <>
            <div className="bg-[url('/assets/engagementBg.png')] relative lg:pb-0 pb-[70px] lg:pt-[0px] pt-[150px] lg:px-[100px] px-[24px] md:px-[40px] lg:h-[110vh] h-auto bg-cover w-full bg-no-repeat bg-center flex flex-wrap gap-[100px] items-center">
              <div className="lg:w-[calc(50%-50px)] w-full">
                <div className="flex border-[#14CCC3] max-w-max px-3 p-2 rounded-full border-[0.5px] gap-2">
                  <Image src={Dots} alt="dots" className="h-[24px] w-[14px]" />
                  <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                    Case study
                  </p>
                </div>
                <p className="text-[#fff] text-[36px] md:text-[48px] lg:text-[48px] font-bold">
                  {filteredItems?.heading}
                </p>
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
              <div className="w-full lg:w-[calc(50%-50px)] h-auto">
                <Image
                  src={filteredItems?.coverPhoto || "/fallback.jpg"}
                  alt="Cover Photo"
                  width={520}
                  height={300}
                  className="w-[90%] h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="relative z-10 w-full flex flex-wrap justify-center gap-6 lg:mt-[-100px] mt-15 px-4">
              {cardsData?.map((card: any, index: number) => (
                <div
                  key={index}
                  style={{
                    boxShadow: "4px 4px 24px 0px #00000029",
                    transform: "translateY(0px)",
                  }}
                  className={`bg-[#14CCC3] lg:w-[260px] w-full sm:w-[300px] h-[200px] rounded-2xl p-5 transition-shadow flex flex-col items-center text-center`}
                >
                  <Image
                    src={card?.img}
                    alt=""
                    width={50}
                    height={20}
                    className="mb-2  filter brightness-0 invert"
                  />
                  <h3 className="text-[24px] font-semibold text-white mb-2">
                    {card?.title}
                  </h3>
                  <p className="text-white flex-grow">{card?.content}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-[100px] items-center w-full lg:px-[100px] px-[24px] md:px-[40px] pt-15 pb-15">
              <div className="lg:w-[calc(50%-50px)] w-full">
                <p className="text-black text-3xl md:text-4xl lg:text-5xl font-bold   w-full  leading-tight">
                  Product Background
                </p>
                <div className="mt-5 w-full px-2">
                  <p className="text-[16px] text-gray-600 sm:text-left w-full lg:w-[70%] text-justify">
                    {filteredItems?.productBackgroundDescription}
                  </p>
                </div>
                <p className="text-black text-3xl md:text-4xl lg:text-5xl font-bold   w-full  leading-tight mt-7">
                  Challenge
                </p>
                <div className=" mt-5 w-full px-2">
                  <p className="text-[16px] text-gray-600 sm:text-left text-justify  w-full lg:w-[70%]">
                    {filteredItems?.challenge}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2.5 mt-7">
                  {filteredItems?.challengeBullets.map(
                    (content: any, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div>
                          <IoCheckbox className="" color="#14CCC3" size={20} />
                        </div>
                        <div>
                          <p className="text-[16px] text-gray-600">{content}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="lg:w-[calc(50%-50px)] w-full">
                <Image
                  src="/assets/F00rame1597884596.png"
                  alt=""
                  height={600}
                  width={600}
                />
              </div>
            </div>
            <div className="w-ful flex flex-wrap gap-[100px] bg-[#00A79E] items-center lg:px-[100px] px-[24px] md:px-[40px] py-15">
              <div className="w-full lg:w-[calc(50%-50px)]">
                <Image
                  src={filteredItems?.solutionImage}
                  alt="Doctors Page"
                  className="w-fit rounded-[8px] h-fit"
                  width={400}
                  height={400}
                />
              </div>
              <div className="w-full lg:w-[calc(50%-50px)]">
                <p className="text-white text-[48px] md:text-4xl font-bold mb-4 ">
                  Solution
                </p>

                <p className="text-white text-[16px]  font-medium  ">
                  {filteredItems?.productBackgroundDescription}
                </p>

                <div className="flex flex-col gap-3 mt-8">
                  {filteredItems?.solutionBullets.map(
                    (content: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <IoCheckbox className="" color="#fff" />

                        <p className="text-white text-base leading-snug">
                          {content}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-[100px] w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
              {" "}
              <div className="w-full lg:w-[calc(50%-50px)] ">
                <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-[700] mb-6">
                  Results
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {filteredItems?.resultsDescription}
                </p>
              </div>
              <div className="w-full lg:w-[calc(50%-50px)] relative">
                <div className="flex justify-end">
                  <Image
                    src={filteredItems?.resultsImage}
                    alt="Laptop View"
                    width={600}
                    height={500}
                  />
                </div>
              </div>
            </div>
            <div className="mb-15 w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
              <p className="text-[48px] font-[700] text-[#202020] mb-0">
                Tech Stack:
              </p>

              <div className="flex flex-wrap gap-[24px] py-2">
                {filteredItems?.techStack.map((card: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      background: `linear-gradient(279.48deg, #EDFCFC 10.22%, #FFFFFF 46.19%, #EDFCFC 103.87%),
                 linear-gradient(279.48deg, #14CCC3 -10.22%, #FFFFFF 46.19%, #14CCC3 103.87%)`,

                      borderImageSource:
                        "linear-gradient(237.65deg, #14CCC3 -39.35%, #14CCC3 100.81%)",
                      borderImageSlice: 1,
                      borderRadius: "8px",
                      border: "1px solid #14CCC3",
                    }}
                    className="w-full lg:w-[calc(25%-18px)] 2xl:w-[calc(20%-19.2px)] py-15   rounded-[8px] p-6  transition-shadow 
                             flex flex-col items-center text-center"
                  >
                    {card.logo && (
                      <Image src={card.logo} height={120} width={120} alt="" />
                    )}
                    <h4 className="text-md font-semibold text-gray-800">
                      {card.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="w-full lg:px-[100px] px-[24px] md:px-[40px] ">
            <p className="text-[48px] font-[700] text-[#202020] mb-10">
              Testimonial
            </p>
            <div className="relative bg-[#EDFCFC] px-15 py-10 mt-[200px] lg:mt-[100px] pt-[100px]">
              <div className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                <div className="w-[61px] absolute left-0 top-[-40px] h-[61px] border-[1px] border-dashed border-[#0FBAB1] rounded-full"></div>
                <div className="w-[228px] h-[228px] border-[1px] bg-white border-dashed border-[#0FBAB1] rounded-full flex justify-center items-center">
                  <p className="text-[48px] font-bold">Clutch</p>
                </div>
              </div>

              <p className="text-base mt-7 text-center">
                Lorem ipsum dolor sit amet consectetur. Id integer convallis
                aliquam viverra. Fringilla amet lectus lacus platea viverra.
                Consequat sem vitae ut gravida aliquam ipsum ultrices amet. Id
                et imperdiet aliquet justo. Convallis sed libero odio morbi
                donec consequat magna elementum. Eu quis gravida fames eget. Sem
                turpis consectetur phasellus ut dignissim nunc varius cursus.
                Tempus senectus at eget adipiscing eu ultricies imperdiet.
                Cursus nunc aliquam id mi amet. Sapien neque mauris varius
                scelerisque ut. Fermentum nulla lectus arcu id massa nibh
                suspendisse.
              </p>
              <div className="flex flex-wrap justify-between items-center mt-7">
                <div className="">
                  <p className="text-[36px] font-bold">Wajahat Ali Khan</p>
                  <p className="text-[24px]">CEO BerryBoost</p>
                </div>
                <div className="flex gap-3 items-center">
                  <FaStar color="#14CCC3" size={30} />
                  <FaStar color="#14CCC3" size={30} />
                  <FaStar color="#14CCC3" size={30} />
                  <FaStar color="#14CCC3" size={30} />
                  <FaStar color="#14CCC3" size={30} />
                </div>
              </div>
            </div>
          </div> */}
            {/* {filteredBlogs?.length > 0 && (
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
            <a href="/articles" className="inline-block">
              <button className="flex lg:mt-0 mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                View All <IoArrowForward size={16} />
              </button>
            </a>
          </div>
          <p className="text-[#1D1D1F] lg:w-[75%] w-full text-base font-normal mt-3">
            Discover valuable perspectives and thought provoking ideas from the
            heart of BerryBoost. From emerging technologies to real-world
            digital product strategies, our insights reveal the thought process
            behind our solutions.
          </p>
          <TechInside title={heading} data={filteredBlogs} />
        </div>
      )} */}
            <ContactForm />
          </>
        )}
      </Suspense>
    </>
  );
};

export default Details;
