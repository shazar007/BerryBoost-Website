"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CustomLoader from "../Loader/page";

export default function TechInside({ title, data }: any) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

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
  return (
    <div>
      <div className="mt-15">
        <div className="grid gap-[24px] lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {data?.slice(0, 3).map((card: any, index: number) => (
            <a
              href={`/articles/articlesdetails?${encodeURIComponent(
                card.heading
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/\//g, "-")
                  .replace(/\s+/g, "-")
                  .replace(/[^\w\-]+/g, "")
              )}&id=${encodeURIComponent(card?._id)}`}
              onClick={(e) => {
                handleClick(card._id, card, e);
              }}
              key={index}
              style={{ boxShadow: "0px 4px 12px 0px #00000040" }}
              className="cusrsor-pointer flex flex-col justify-between group w-full rounded-[8px] overflow-hidden"
            >
              <div
                style={{ backgroundImage: `url(${card.coverPhoto})` }}
                className="relative cusrsor-pointer h-[350px] w-full group-hover:bg-blend-multiply overflow-hidden bg-cover bg-center"
              >
                <div className="absolute cursor-pointer inset-0 bg-black/70 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-in-out flex items-center justify-center">
                  <p className="text-white text-[24px] px-10 font-bold text-center">
                    {card.heading}
                  </p>
                </div>
              </div>
            </a>
          ))}
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
