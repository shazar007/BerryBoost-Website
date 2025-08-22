"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import mainImg from "../../../../public/assets/articleMain.png";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlogs } from "../../../../api/blog";
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import SkeletonLoader from "@/components/SkeletonLoader/page";
import { IoArrowForward, IoLogoYoutube } from "react-icons/io5";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import EngagementPop from "@/components/engagementPop/page";
import ContactForm from "@/components/ContactForm/page";
import "./articlesdetails.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";

const ArticlesDetails = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const baseUrl = "https://berryboost.us";
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [openModel, setOpenModel] = useState(false);
  const id: string = searchParams.get("id") || "empty";
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: () => getSingleBlogs(id),
    staleTime: 5 * 60 * 1000,
  });
  let articlesDetails = data?.data.blog;

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const container = contentRef.current;

      // Fix all anchor tags
      const anchors = container.querySelectorAll("a");
      anchors.forEach((a) => {
        let safeHref = a.getAttribute("href")?.trim() || "";

        if (!safeHref.startsWith("http") && !safeHref.startsWith("/")) {
          safeHref = "https://" + safeHref;
          a.setAttribute("href", safeHref);
        }

        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
      let html = container.innerHTML;
      html = html.replace(/:\s*/g, ":<br/>");
      html = html.replace(
        /(\d+\.)/g,
        '<br/><span style="font-weight:bold; margin-right:10px;">$1</span>'
      );
      html = html.replace(
        /•\s*/g,
        '<br/><span style="font-size:16px; margin-right:10px;">&#9679;</span> '
      );

      container.innerHTML = html;
    }
  }, [articlesDetails]);

  const articleUrl = `${baseUrl}${pathname}?${searchParams.toString()}`;
  return (
    <>
      <head>
        <title>Article Details — BerryBoost</title>
        <meta
          name="description"
          content="Stay updated with the latest trends, tips, and insights in digital marketing, tech, and business development. Read expert articles from BerryBoost blog to stay ahead."
        />
      </head>
      <Suspense fallback={<div>Loading services...</div>}>
        <section className="relative h-[440px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-fixed"
            style={{
              backgroundImage: "url('/assets/articlesDetails.webp')",
            }}
          ></div>
        </section>
        <div>
          {isLoading ? (
            <SkeletonLoader type="line" />
          ) : (
            <div className="relative z-10 flex justify-center -mt-[207px]">
              <Image
                src={articlesDetails?.coverPhoto || mainImg}
                alt={articlesDetails?.heading || "mainImg"}
                className="h-[414px] lg:w-[calc(50%-40px)] w-[90%] object-cover shadow-lg rounded-lg"
                width={1400}
                height={514}
              />
            </div>
          )}
          {isLoading ? (
            <>
              <SkeletonLoader type="line" /> <SkeletonLoader type="line" />
            </>
          ) : (
            <div className="py-17 md:px-[40px] flex-wrap lg:px-[100px] px-[24px] flex gap-[60px]">
              <div className="lg:w-[calc(20%-40px)] w-full">
                <div className="w-full rounded-[8px]">
                  <p className="text-[24px] font-semibold">
                    Thinking About Implementing AI?
                  </p>
                  <p className="text-base font-normal mt-3">
                    Discover the best way to introduce AI in your company with
                    our AI workshop.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  className="flex  mt-5 items-center justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
                >
                  Let’s Work Together
                  <IoArrowForward size={16} />
                </button>
                <div className="mt-10">
                  <p className="text-[18px] font-normal">Share this article</p>
                  <div className="flex gap-2 mt-3">
                    <LinkedinShareButton
                      url={articleUrl}
                      title={articlesDetails?.heading}
                    >
                      <div className="cursor-pointer min-w-8 min-h-8 w-8 h-8 rounded-full border flex justify-center items-center border-[#14CCC3]">
                        <FaLinkedinIn color="#14CCC3" size={16} />
                      </div>
                    </LinkedinShareButton>

                    <FacebookShareButton
                      url={articleUrl}
                      quote={articlesDetails?.heading}
                    >
                      <div className="cursor-pointer min-w-8 min-h-8 w-8 h-8 rounded-full border flex justify-center items-center border-[#14CCC3]">
                        <FaFacebookF color="#14CCC3" size={16} />
                      </div>
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={articleUrl}
                      title={articlesDetails?.heading}
                    >
                      <div className="cursor-pointer min-w-8 min-h-8 w-8 h-8 rounded-full border flex justify-center items-center border-[#14CCC3]">
                        <BsTwitterX color="#14CCC3" size={16} />
                      </div>
                    </TwitterShareButton>

                    <WhatsappShareButton
                      url={articleUrl}
                      title={articlesDetails?.heading}
                      separator=" - "
                    >
                      <div className="cursor-pointer min-w-8 min-h-8 w-8 h-8 rounded-full border flex justify-center items-center border-[#14CCC3]">
                        <FaWhatsapp color="#14CCC3" size={16} />
                      </div>
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
              <div className="lg:w-[calc(60%-40px)] w-full">
                <div className="w-full mb-6 flex flex-wrap ">
                  {articlesDetails?.category.map((item: any, index: number) => (
                    <p
                      key={index}
                      className="text-2xl text-[#14CCC3] uppercase font-bold "
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <p
                  id="main-heading"
                  className="lg:text-[48px] text-[32px] text-[#1D1D1F] font-bold  mb-6"
                >
                  {articlesDetails?.heading}
                </p>
                <p className="text-base mb-5 text-[#1D1D1F] ">
                  {" "}
                  {dayjs(articlesDetails?.createdAt).format("DD/MM/YYYY")}{" "}
                </p>
                <div>
                  <div
                    className="article-content"
                    ref={contentRef}
                    dangerouslySetInnerHTML={{
                      __html: articlesDetails?.content,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <ContactForm />
        </div>
        {openModel && (
          <div
            style={{ zIndex: "1111111111111111111111111111" }}
            className="fixed left-0  z-[100000000] top-0 bg-black/70  w-full h-screen flex justify-center items-center"
          >
            <div className="bg-white z-[100000000] absolute rounded-[8px] lg:w-[1200px] w-full ">
              <EngagementPop setFormModel={setOpenModel} />
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
};

export default ArticlesDetails;
