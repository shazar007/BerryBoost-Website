"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoArrowForward, IoBriefcaseOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import RingLoader from "@/components/RingLoader/page";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import ContactForm from "@/components/ContactForm/page";
import { getAllJobs } from "../../../api/Career";
import CustomLoader from "@/components/Loader/page";
import Link from "next/link";

export default function Career() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
  });

  let limit = 5;

  const { data, isFetching, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["jobs", filters],
    queryFn: ({ pageParam = 1 }) => getAllJobs(pageParam, limit, filters),
    getNextPageParam: (lastPage: any) =>
      lastPage?.data?.pagination?.nextPage || undefined,
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });

  let jobs = data?.pages?.flatMap((page: any) => page?.data?.jobs || []);

  const handleClick = (id: any) => {
    setLoading(true);
    router.push(`/career/detail?id=${id}`);
  };
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      {" "}
      <head>
        <title>Career — BerryBoost</title>
        <meta
          name="description"
          content="Explore exciting career opportunities at BerryBoost. We are looking for passionate professionals to join our dynamic team and make an impact in the digital industry."
        />
      </head>
      <div>
        {" "}
        <section className="relative h-[640px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-bottom bg-cover bg-no-repeat bg-fixed"
            style={{
              backgroundImage:
                "url('/assets/9914e10d1dbab97ee951b6a6a3dc2797d443b144.jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50  z-[1]"></div>
          <div className="relative z-10 h-full mt-10 flex flex-col items-start justify-center lg:px-[80px] px-[24px]">
            <div className="lg:py-[35px] py-[16px] w-full lg:w-[90%] lg:px-[42px] px-[16px] bg-transparent backdrop-blur-xl rounded-[24px]">
              <div className="w-full lg:w-[70%]">
                <p className="text-white uppercase leading-[100%] text-start text-[24px] font-[700]">
                  Career
                </p>
                <h1 className="text-start text-white lg:text-[48px] text-[36px] font-[700] lg:leading-[56px] leading-[46px] mb-6">
                  We’re More Than A Workplace
                </h1>
                <p className="text-white lg:text-[24px] text-base font-[400] leading-[110%]">
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
        <div className="my-15 flex justify-center ">
          <p className="lg:text-[48px] text-[32px] text-[#1D1D1F] font-[500]">
            Search Jobs <span className="text-[#14CCC3] font-[300]">Here</span>
          </p>
        </div>
        <div className="lg:px-[100px] px-[24px] md:px-[40px] pb-15 lg:flex-nowrap  flex-wrap flex lg:mx-20 mx-0">
          <input
            placeholder="Keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#7d7d7d] w-full focus:outline-0 h-15 px-5"
          />
          <div className="relative w-full">
            <select
              className="appearance-none border border-[#7d7d7d] w-full focus:outline-0 h-15 px-5 pr-10 text-[#7d7d7d]"
              defaultValue=""
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Engineering">Engineering</option>
              <option value="Creative & Design">Creative & Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="BPO">BPO</option>
            </select>

            <FaChevronDown
              className="absolute top-1/2 right-5 transform -translate-y-1/2 text-[#00] pointer-events-none"
              size={16}
            />
          </div>

          <button
            onClick={() => setFilters({ ...filters, search: search })}
            className="bg-[#14CCC3] text-white border-[1px] border-[#14CCC3]  h-15  lg:w-[220px] w-full cursor-pointer text-[18px] font-[500] px-10"
          >
            Search
          </button>
        </div>
        <div className="py-15 lg:px-[100px] px-[24px] md:px-[40px]">
          {jobs?.length === 0 ? (
            <p className="text-center text-[48px]">
              No Jobs Available for
              <span className="text-[#14CCC3]"> you</span>
            </p>
          ) : (
            <p className="text-center lg:text-[48px] text-[32px]">
              Available Jobs for
              <span className="text-[#14CCC3]"> you</span>
            </p>
          )}

          {jobs?.map((item: any, index: number) => (
            <div
              key={index}
              className="mt-15 w-full flex justify-between items-center flex-wrap p-5 rounded-[8px] "
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <div className="w-full lg:w-[75%]">
                <p className="text-[24px] font-[600]">{item?.title}</p>
                <div className="flex flex-wrap gap-6 my-3">
                  <div className="flex item-center gap-2">
                    <LuClock4 color="#14CCC3" size={20} />
                    <p className="text-[#1D1D1F] text-base font-[300]">
                      {item?.employmentType}
                    </p>
                  </div>{" "}
                  <div className="flex item-center gap-2">
                    <IoBriefcaseOutline color="#14CCC3" size={20} />
                    <p className="text-[#1D1D1F] text-base font-[300]">
                      {item?.experience}
                    </p>
                  </div>{" "}
                  <div className="flex item-center gap-2">
                    <HiOutlineLocationMarker color="#14CCC3" size={20} />
                    <p className="text-[#1D1D1F] text-base font-[300]">
                      Lahore, Pakistan
                    </p>
                  </div>
                </div>
                <p className="text-[#1D1D1F] text-base  font-[300]">
                  {item?.aboutJob}
                </p>
              </div>

              <Link
                href={`/career/detail?id=${item._id}`}
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                    return;
                  }

                  e.preventDefault();
                  handleClick(item._id);
                }}
                className="bg-[#14CCC3] text-white  flex justify-center items-center lg:mt-0 mt-10 lg:w-[180px] w-full text-[18px] font-[500] cursor-pointer h-12 rounded-[8px]"
              >
                View Job
              </Link>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              className="bg-[#14CCC3] flex text-white justify-center items-center w-[180px] text-[18px] font-[500] cursor-pointer h-12 rounded-[8px]"
            >
              {isLoading ? <RingLoader color="#fff" size={16} /> : "See More"}
            </button>
          </div>
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
      </div>
    </>
  );
}
