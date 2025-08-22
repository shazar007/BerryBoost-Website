"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { getAllCaseStudy } from "../../../api/caseStudy";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import CustomLoader from "../Loader/page";
import Link from "next/link";

const CaseStudySlider = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  const handleClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    const slug = id
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    const targetPath = `/casestudies/details?id=${encodeURIComponent(slug)}`;

    if (pathname === targetPath) {
      setLoading(false);
      return;
    }

    setLoading(true);
    router.push(targetPath);
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: () => getAllCaseStudy(),
    staleTime: 5 * 60 * 1000,
  });
  let caseStudy = data?.data?.caseStudies;

  return (
    <div className="mt-5 w-full bg-[#B9E9E7] rounded-[8px]">
      <div className="flex items-center justify-between px-5 bg-[#B9E9E7] pt-4">
        <p className="text-[#1D1D1F] text-[32px] font-[700]">Case Studies</p>
        <div className="flex gap-3">
          <div
            ref={prevRef}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
            onDoubleClick={(e) => e.preventDefault()}
            className="swiper-prev h-[32px] w-[32px] bg-white rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <GoArrowLeft />
          </div>
          <div
            ref={nextRef}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
            onDoubleClick={(e) => e.preventDefault()}
            className="swiper-next h-[32px] w-[32px] bg-white rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <GoArrowRight />
          </div>
        </div>
      </div>
      <Swiper
        style={{ padding: "20px" }}
        modules={[Navigation]}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {caseStudy?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Link
              href={`/casestudies/details?id=${encodeURIComponent(
                item._id
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/\//g, "-")
                  .replace(/\s+/g, "-")
                  .replace(/[^\w\-]+/g, "")
              )}`}
              onClick={(e) => {
                handleClick(item._id, e);
              }}
              style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
              className="rounded-[8px] cursor-pointer overflow-hidden w-full h-[300px]"
            >
              <Image
                src={item.coverPhoto}
                width={200}
                height={200}
                alt={`Slide ${index}`}
                className="rounded-[8px] w-full h-full "
                priority={index < 3}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
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
};

export default CaseStudySlider;
