// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// const LottiePlayer = dynamic(
//   () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
//   {
//     ssr: false,
//     loading: () => <div className="text-white">Loading animation...</div>,
//   }
// );

// export default function CustomLoader() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const preloadLottie = async () => {
//       try {
//         const response = await fetch("/assets/lottie/data.json");
//         if (response.ok) {
//           setIsLoaded(true);
//         }
//       } catch (err) {
//         console.error("Error preloading Lottie JSON:", err);
//       }
//     };

//     preloadLottie();
//   }, []);

//   return (
//     <div className="flex justify-center items-center">
//       {isLoaded ? (
//         <LottiePlayer
//           autoplay
//           loop
//           speed={1.5}
//           src="/assets/lottie/data.json"
//           style={{ height: "300px", width: "300px" }}
//         />
//       ) : (
//         <div className="spinner"></div>
//       )}
//     </div>
//   );
// }
import React from "react";

export default function CustomLoader() {
  return (
    <div>
      <img src="/assets/new file.gif" alt="Loading..." className="w-64 h-64" />
    </div>
  );
}
