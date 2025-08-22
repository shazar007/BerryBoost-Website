"use client";
import ContactForm from "@/components/ContactForm/page";
import CustomLoader from "@/components/Loader/page";
import SkeletonLoader from "@/components/SkeletonLoader/page";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { getAllCaseStudy } from "../../../api/caseStudy";
import { usePathname, useRouter } from "next/navigation";
const CaseStudy = () => {
  const [loading, setLoading] = useState(false);
  const [Loader, setLoader] = useState(false);

  const pathname = usePathname();

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: () => getAllCaseStudy(),
    staleTime: 5 * 60 * 1000,
  });
  let caseStudy = data?.data?.caseStudies;
  const router = useRouter();
  useEffect(() => {
    setLoader(false);
  }, [pathname]);

  const handleClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
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
  return (
    <>
      <head>
        <title>Case Studies — BerryBoost</title>
        <meta
          name="description"
          content="Explore BerryBoost proven success stories. Discover how our innovative solutions have helped businesses achieve growth, overcome challenges, and drive success."
        />
      </head>
      <section className="relative h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
          style={{
            backgroundImage: "url('/assets/casestudieslistbg.webp')",
          }}
        ></div>
        <div className="relative z-10  h-full bg-black/40 bg flex items-center  lg:px-[100px] px-[24px]">
          <div className="py-[35px] w-full lg:w-[90%] px-[42px] bg-transparent backdrop-blur-xl  rounded-[24px]">
            <div className="w-full lg:w-[80%]">
              <p className="uppercase text-white text-[24px] font-bold">
                Case Studies
              </p>
              <p className="text-white font-bold lg:text-[48px] text-[32px]">
                Real-World Problems Solved With Cutting-Edge Technology
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
      {isLoading ? (
        <SkeletonLoader type="card" />
      ) : (
        <>
          <div>
            {" "}
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:px-[100px] gap-[40px] py-15 px-[24px] md:px-[40px]">
              {caseStudy?.map((item: any, index: number) => (
                <a
                  key={index}
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
                  style={{ boxShadow: "4px 4px 32px 0px #00000029" }}
                  className="w-full cursor-pointer h-[400px] relative group rounded-[8px]"
                >
                  <Image
                    src={item?.coverPhoto}
                    alt={item?.heading || "Cover image"}
                    className="w-full h-full object-cover rounded-[8px]"
                    width={800}
                    height={400}
                  />
                  <div className="absolute rounded-[8px] inset-0 bg-black/70 opacity-100 group-hover:opacity-0 transition-all duration-500 ease-in-out flex items-center justify-center px-2">
                    <p className="text-white text-[24px] lg:text-[32px] font-bold text-center">
                      {item?.heading}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
      {Loader && (
        <>
          <div
            style={{ zIndex: "1111" }}
            className="fixed left-0  top-0 bg-black/70  w-full h-screen flex justify-center items-center"
          >
            <CustomLoader />
          </div>
        </>
      )}
      <ContactForm />
    </>
  );
};
export default CaseStudy;
