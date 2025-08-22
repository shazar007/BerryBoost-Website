import React, { useRef, useState } from "react";
import "./itSection.css";
import EngagementPop from "../engagementPop/page";

export default function ItSection() {
  const images = [
    {
      src: "/assets/slide1.jpg",
      title: "",
      description: "",
    },
    {
      src: "/assets/slide2.jpg",
      title: " Fixed Price Projects",
      description:
        "It is ideal for projects with clearly defined requirements, designs and budgets. We handle the entire development lifecycle, ensuring on-time delivery with no surprises. You get complete visibility, quality assurance, and a result-driven team at every step.",
    },
    {
      src: "/assets/slide3.jpg",
      title: "IT Staff Augmentation",
      description:
        "Boost your in-house capabilities by hiring our pre-vetted developers on demand. Ideal for short-term needs or filling skill gaps, our developers integrate seamlessly with your existing teams to accelerate your development cycle.",
    },
    {
      src: "/assets/slide4.jpg",
      title: "Dedicated Teams",
      description:
        "Get a fully committed, cross-functional team that works exclusively on your project. Enjoy the benefits of flexibility, long-term alignment, and deep domain expertise—like your own offshore product engineering team.",
    },
    {
      src: "/assets/slide5.jpg",
      title: "Offshore Development Center",
      description:
        "Set up your offshore development center with BerryBoost. From talent acquisition to infrastructure and daily operations, we manage it all so you can focus on scaling your business while reducing costs.",
    },
  ];

  const defaultImage = images[0];
  const [bgImage, setBgImage] = useState(defaultImage.src);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [formModel, setFormModel] = useState(false);

  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className="relative z-10 w-full h-[380px] xl:h-[450px] lg:overflow-hidden overflow-x-scroll sm:overflow-x-scroll transition-all duration-500"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex z-30 ">
        {images.slice(1).map((image, index) => (
          <div
            onClick={() => {
              setFormModel(true);
            }}
            key={index}
            ref={(el: any) => (blocksRef.current[index] = el)}
            className={`lg:w-full w-[330px] flex-1 double-gradient  transition-all duration-300 cursor-pointer px-4 relative flex items-center justify-center 
          ${index < images.length - 1 ? "border-r border-white" : ""}`}
            onMouseEnter={() => {
              setBgImage(image.src);
              setActiveIndex(index);
              blocksRef.current[index]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }}
            onMouseLeave={() => {
              setBgImage(defaultImage.src);
              setActiveIndex(null);
            }}
          >
            <div className="text-white text-start p-4 lg:w-full w-[330px] relative z-50 overflow-hidden h-full flex flex-col pt-30">
              <h3
                className={`text-[30px] leading-none w-full  font-bold transition-all duration-500 text-start transform
      ${activeIndex === index ? "translate-y-[-40px]" : "translate-y-[60px]"}
    `}
              >
                {image.title}
              </h3>

              <p
                className={`text-base text-normal transition-all duration-500 ease-in-out
      ${
        activeIndex === index
          ? "opacity-100 animate-descriptionSlideIn"
          : "opacity-0"
      }
    `}
              >
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {formModel && (
        <div
          style={{ zIndex: "1111111111111111111111111111" }}
          className="fixed left-0  z-[100000000] top-0 bg-black/70  w-full h-screen flex justify-center items-center"
        >
          <div className="bg-white z-[100000000] absolute rounded-[8px] lg:w-[1200px] w-full ">
            <EngagementPop setFormModel={setFormModel} />
          </div>
        </div>
      )}
    </div>
  );
}
