"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { getAllBlogs } from "../../../api/blog";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import SkeletonLoader from "@/components/SkeletonLoader/page";
import CustomLoader from "@/components/Loader/page";
import ContactForm from "@/components/ContactForm/page";
export default function Articles() {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlogs(),
    staleTime: 5 * 60 * 1000,
  });
  const pathname = usePathname();
  const router = useRouter();

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

  let articlesData = data?.data?.blogs;
  return (
    <>
      <head>
        <title>Articles — BerryBoost</title>
        <meta
          name="description"
          content="Stay updated with the latest trends, tips, and insights in digital marketing, tech, and business development. Read expert articles from BerryBoost blog to stay ahead."
        />
      </head>
      <section className="relative h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
          style={{
            backgroundImage:
              "url('/assets/74def331b90e2aeb3d992fb77753ab8ba0407b40.jpg')",
          }}
        ></div>
        <div className="relative z-10  h-full  bg flex flex-col items-start justify-center  lg:px-[80px] px-[24px]">
          <div className="py-[35px] w-full lg:w-[90%] px-[42px] bg-transparent backdrop-blur-xl  rounded-[24px]">
            <div className="w-full lg:w-[80%]">
              <p className="uppercase text-white text-[24px] font-bold">
                inside
              </p>
              <p className="text-white font-bold lg:text-[64px] text-[32px]">
                Read The Latest Blogs
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
              {articlesData?.map((item: any, index: number) => (
                <a
                  href={`/articles/articlesdetails?${encodeURIComponent(
                    item.heading
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/\//g, "-")
                      .replace(/\s+/g, "-")
                      .replace(/[^\w\-]+/g, "")
                  )}&id=${encodeURIComponent(item?._id)}`}
                  onClick={(e) => {
                    handleClick(item._id, item, e);
                  }}
                  key={index}
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
      {loading && (
        <>
          <div
            style={{ zIndex: "1111" }}
            className="fixed left-0 top-0 bg-black/70  w-full h-screen flex justify-center items-center"
          >
            <CustomLoader />
          </div>
        </>
      )}
      <ContactForm />
    </>
  );
}
