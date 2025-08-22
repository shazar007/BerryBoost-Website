"use client";

import EngagementPop from "@/components/engagementPop/page";
import Footer from "@/components/Footer/page";
import LetsTalk from "@/components/LetsTalk/page";
import Navbar from "@/components/Navbar/page";
import { getItem, setItem } from "@/utils/localStorageHelper";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [formModel, setFormModel] = useState(false);

  // useEffect(() => {
  //   const hasSeenModal = getItem<string>("hasSeenModal");

  //   if (!hasSeenModal) {
  //     setTimeout(() => {
  //       setFormModel(true);
  //     }, 10000);

  //     setItem("hasSeenModal", "true");
  //   }
  // }, []);

  return (
    <>
      {!isAdmin && <LetsTalk />}
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {/* {formModel && (
        <div
          style={{ zIndex: "1111111111111111111111111111" }}
          className="fixed left-0  z-[100000000] top-0 bg-black/70  w-full h-screen flex justify-center items-center"
        >
          <div className="bg-white z-[100000000] absolute rounded-[8px] lg:w-[1200px] w-full ">
            <EngagementPop setFormModel={setFormModel} />
          </div>
        </div>
      )} */}
    </>
  );
}
