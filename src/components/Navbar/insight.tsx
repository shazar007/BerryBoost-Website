"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { MdArrowForwardIos } from "react-icons/md";
import Ellipse from "../../../public/assets/Ellipse1180.webp";
import { usePathname, useRouter } from "next/navigation";
import CustomLoader from "../Loader/page";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../../api/blog";
import Link from "next/link";

interface InsideItem {
  insideTitle: string;
  content?: string;
}

export default function Insight({ onTitleClick, setMenuOpen }: any) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5 * 60 * 1000,
  });
  let articlesData = data?.data?.blogs;

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const scrollLeft = () => {
    if (containerRef.current) {
      const isMobile = window.innerWidth < 768;
      const width = isMobile
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetWidth / 2.5;
      containerRef.current.scrollBy({ left: -width, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const isMobile = window.innerWidth < 768;
      const width = isMobile
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetWidth / 2.5;
      containerRef.current.scrollBy({ left: width, behavior: "smooth" });
    }
  };

  const handleClickall = (path: string, e: any) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }

    e?.preventDefault();
    setLoading(true);
    router.push(path);
    setMenuOpen(false);
    setTimeout(() => {
      onTitleClick(false);
      setLoading(false);
    }, 2000);
  };

  const handleClick = (
    id: string,
    v: any,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    e?.preventDefault();
    const slug = v?.heading
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    const targetPath = `/articles/articlesdetails?${encodeURIComponent(
      slug
    )}&id=${encodeURIComponent(id)}`;
    if (pathname === targetPath) {
      setLoading(false);
      return;
    }
    setLoading(true);
    router.push(targetPath);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-[24px]">
        <div className="lg:w-[calc(30%-12px)] w-full">
          <p className="text-[#fff] text-lg font-bold bg-[#14CCC3] px-4 py-1 rounded-xs w-fit">
            Your Engineering Innovation Partner
          </p>

          <div className="lg:w-[calc(50%-30px)] w-full">
            <div className="gap-2 items-center group flex mt-6 mb-3">
              <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-[500] text-sm">
                Inside BerryBoost
              </p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>

              <Link
                href="/events"
                onClick={(e) => handleClickall("/events", e)}
                className="text-[#1D1D1F] mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-medium"
              >
                BerryBoost Culture
              </Link>
            </div>{" "}
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>
              <Link
                href="/articles"
                onClick={(e) => handleClickall("/articles", e)}
                className="text-[#1D1D1F] mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-medium"
              >
                Tech Insights
              </Link>
            </div>
            <div className="gap-2 items-center group flex mt-6 mb-3">
              <p className="text-[#14CCC3] group-hover:text-[#14CCC3] font-[500] text-sm">
                Get To Know Us
              </p>
              <MdArrowForwardIos size={12} color="#14CCC3" />
            </div>
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>
              <Link
                href="/meet-the-team"
                passHref
                onClick={(e) => handleClickall("/meet-the-team", e)}
                className="text-[#1D1D1F] mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-medium"
              >
                Meet The Team
              </Link>
            </div>{" "}
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>
            </div>
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>

              <Link
                href="/career"
                passHref
                onClick={(e) => handleClickall("/career", e)}
                className=" text-[#1D1D1F] mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-medium"
              >
                Career
              </Link>
            </div>{" "}
            <div className="relative group flex items-center">
              <div className="absolute -left-5 top-[6px] hidden group-hover:block transition-opacity duration-300">
                <svg
                  width="10"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="5.58524"
                    cy="14.9993"
                    r="5.58524"
                    fill="#14CCC3"
                  />
                  <circle cx="3.6593" cy="3.6593" r="3.6593" fill="#17252A" />
                </svg>
              </div>

              <Link
                href="/contact-us"
                passHref
                onClick={(e) => handleClickall("/contact-us", e)}
                className=" text-[#1D1D1F] mt-1 text-base leading-[24px] font-[300] cursor-pointer group-hover:font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-5 bg-[#14CCC3] rounded-[8px] lg:w-[300px] w-full h-[120px] px-4 flex items-center gap-3">
            <div className="w-[76px] h-[76px] rounded-full ">
              <Image src={Ellipse} alt="Ellipse" />
            </div>
            <div className="lg:w-[calc(100%-90px)] w-full">
              <div className="gap-2 items-center group flex my-3 ">
                <p className="text-white font-normal text-sm">Join Us</p>
                <MdArrowForwardIos size={12} color="white" />
              </div>
              <p className="text-white font-[600] text-base">
                Jump-start your <br /> career evolution
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[calc(70%-12px)] w-full lg:p-5 p-2 bg-[#14CCC3]  rounded-[8px] overflow-hidden">
          <div className="relative  overflow-hidden">
            <div
              ref={containerRef}
              className="flex overflow-x-auto scroll-smooth no-scrollbar"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {articlesData?.map((v: any, idx: any) => (
                <a
                  href={`/articles/articlesdetails?${encodeURIComponent(
                    v.heading
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/\//g, "-")
                      .replace(/\s+/g, "-")
                      .replace(/[^\w\-]+/g, "")
                  )}&id=${encodeURIComponent(v?._id)}`}
                  onClick={(e) => {
                    handleClick(v._id, v, e);
                  }}
                  className="flex-shrink-0 lg:w-[calc(100%/2.5)] w-full cursor-pointer scroll-snap-align-start p-1"
                >
                  <div className="w-full lg:h-[330px] h-[150px] relative rounded-[8px] overflow-hidden">
                    <Image
                      src={v.coverPhoto}
                      alt={`slide-${idx}`}
                      className="w-full h-full object-cover rounded-xl"
                      width={800}
                      height={400}
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute flex items-start gap-[24px] bottom-0 left-0 p-4 text-white">
                      <div className="w-[80%]">
                        <p className="text-sm font-[400] truncate">
                          {v.heading}
                        </p>
                        <p className="text-sm font-[700]">Read Our Insights</p>
                      </div>
                      <GoArrowRight color="#fff" size={24} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={scrollLeft}
              className="h-[32px] w-[32px] cursor-pointer rounded-[4px] flex items-center justify-center bg-[#fff]"
            >
              <GoArrowLeft color="#14CCC3" size={16} />
            </button>
            <button
              onClick={scrollRight}
              className="h-[32px] w-[32px] cursor-pointer rounded-[4px] flex items-center justify-center bg-[#fff]"
            >
              <GoArrowRight color="#14CCC3" size={16} />
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
}
