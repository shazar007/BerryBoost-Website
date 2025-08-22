"use client";
import { IoArrowForward } from "react-icons/io5";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Dots from "../../../public/assets/mdi_target-variant.png";
import companyphilosophy from "../../../public/assets/companyphilosophy.webp";
import Sheero from "../../../public/assets/Sheero.webp";
import ContactForm from "@/components/ContactForm/page";
const services = [
  {
    number: "01",
    title: "Vision-Driven Leaders",
    subtitle:
      "Guiding BerryBoost with innovation, strategy, and forward-thinking leadership",
  },
  {
    number: "02",
    title: "Solving Problems",
    subtitle:
      "Turning complex challenges into simple, effective, and scalable solutions",
  },
  {
    number: "03",
    title: "Top 1% Tech Talent",
    subtitle:
      "We promise to hire top 1% of Tech talent and deliver world-class services cost-effectively",
  },
  {
    number: "04",
    title: "Client-Centric Approach",
    subtitle:
      "Committed to understanding needs and exceeding expectations every time",
  },
];

export default function MeetTeam() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  const scrollLeftt = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <head>
        <title>Meet The Team — BerryBoost</title>
        <meta
          name="description"
          content="Discover the talented team powering BerryBoost. We're a group of passionate professionals committed to innovation, growth, and delivering real results."
        />{" "}
      </head>
      <div>
        <section className="relative h-[640px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-bottom bg-fixed"
            style={{
              backgroundImage: "url('/assets/MeetTheTeam.webp')",
            }}
          ></div>
          <div className="relative z-10  h-full bg-black/40 bg flex items-center  lg:px-[100px] px-[24px]">
            <div className="py-[35px] w-full lg:w-[90%] px-[42px] bg-transparent backdrop-blur-xl  rounded-[24px]">
              <div className="w-full lg:w-[80%]">
                <p className="uppercase text-white text-[24px] font-bold">
                  Meet the team
                </p>
                <p className="text-white font-bold lg:text-[48px] text-[32px]">
                  Building A Digital Tomorrow
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
        <div className="lg:pl-[100px] pl-[24px] md:pl-[40px] bg-[#EDFCFC] py-15">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center lg:gap-[24px] gap-[16px] w-max min-w-full pr-4 ">
              <div className="lg:w-[528px] w-[300px] flex-shrink-0">
                <div className="w-[90%]">
                  <p className="text-[#1D1D1F] font-bold lg:text-[48px] text-[24px] leading-[100%]">
                    Thought
                    <span className="text-[#14CCC3]"> Leadership</span>
                  </p>
                  <p className="text-[#1D1D1F] font-normal lg:text-base text-xs mt-4">
                    BerryBoost is the brainchild of Shahzar Khan (Founder &
                    CEO/CTO) - Sheena (Co-Founder & COO) - who have a clear
                    vision that continuous innovation is the only way for all
                    global businesses to survive and thrive for the next 50
                    years.
                    <br />
                    Our primary goal is to digitize every small, medium, and
                    large business as well as Industry.
                  </p>
                </div>
              </div>
              {[
                {
                  id: 1,
                  image: "/assets/team/ShazarKhan.png",
                  name: "Shazar Khan",
                  titel: "Founder & CEO",
                },
                {
                  id: 2,
                  image: "/assets/team/Sheena.png",
                  name: "Sheena",
                  titel: "Co-Founder & COO",
                },
                {
                  id: 3,
                  image: "/assets/team/AdilKhan.png",
                  name: "Adil Khan",
                  titel: "Managing Director",
                },
                {
                  id: 4,
                  image: "/assets/team/Maryam.png",
                  name: "M K",
                  titel: "Project Manager",
                },
                {
                  id: 5,
                  image: "/assets/team/Umair.png",
                  name: "Umair",
                  titel: "Head of Engineering",
                },
                {
                  id: 6,
                  image: "/assets/team/Umer1.png",
                  name: "Umer",
                  titel: "Head of Creative & UIUX",
                },
                {
                  id: 7,
                  image: "/assets/team/Hussain.png",
                  name: "Hussain",
                  titel: "Head of Quality Assurance",
                },
                {
                  id: 8,
                  image: "/assets/team/Salim.png",
                  name: "Salim",
                  titel: "Head of Mobile Developemet",
                },
                {
                  id: 9,
                  image: "/assets/team/Bilal.png",
                  name: "Bilal",
                  titel: "Head of Frontend Developemet",
                },
                {
                  id: 10,
                  image: "/assets/team/Zubair.png",
                  name: "Zubair",
                  titel: "Lead Frontend Developer",
                },
                {
                  id: 11,
                  image: "/assets/team/Umer2.png",
                  name: "Umar",
                  titel: "Head of Digital Marketing",
                },
                {
                  id: 12,
                  image: "/assets/team/Imran.png",
                  name: "Imran",
                  titel: "Head of SEO",
                },
                {
                  id: 13,
                  image: "/assets/team/Amman.png",
                  name: "Amman ",
                  titel: "Lead Data Analyst",
                },
                {
                  id: 14,
                  image: "/assets/team/Shoaib.png",
                  name: "Shoaib ",
                  titel: "Head of Illustration & Animations",
                },
                {
                  id: 15,
                  image: "/assets/team/Bushra.png",
                  name: "Bushra ",
                  titel: "Head of Content",
                },
              ].map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative flex-col group w-[300px] flex-shrink-0 rounded-[8px] overflow-hidden transition-all duration-300"
                >
                  <div className=" h-[330px] w-[300px]  rounded-full overflow-hidden relative">
                    <Image
                      src={
                        item?.image ||
                        "https://cdn-icons-png.flaticon.com/512/3675/3675805.png"
                      }
                      alt=""
                      height={400}
                      width={300}
                      className="object-cover h-full w-full absolute top-0"
                    />
                  </div>

                  <div>
                    {" "}
                    <p className="text-base text-center text-[#14CCC3] font-[700] mt-5">
                      {item?.titel}
                    </p>
                    <p className="text-[#1D1D1F] text-center text-[32px] font-[700]">
                      {item?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center gap-10 mt-7">
            <div
              className="cursor-pointer"
              onClick={scrollLeftt}
              onMouseDown={(e) => e.preventDefault()}
            >
              <svg
                width="83"
                height="64"
                viewBox="0 0 83 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.344605 31.3578C0.123944 31.5787 5.19213e-07 31.8782 5.32863e-07 32.1905C5.46512e-07 32.5027 0.123944 32.8022 0.344605 33.0232L11.3219 44.0208C11.4305 44.1334 11.5605 44.2232 11.7042 44.2851C11.8479 44.3469 12.0025 44.3795 12.159 44.3809C12.3155 44.3823 12.4706 44.3526 12.6155 44.2934C12.7603 44.2342 12.8919 44.1468 13.0026 44.0362C13.1133 43.9256 13.2008 43.7941 13.2602 43.6493C13.3195 43.5046 13.3494 43.3494 13.3481 43.1929C13.3468 43.0365 13.3144 42.8819 13.2527 42.7381C13.191 42.5943 13.1013 42.4642 12.9888 42.3555L4.02097 33.3704L41.6475 33.3877C41.96 33.3881 42.2599 33.2643 42.4811 33.0436C42.7024 32.823 42.827 32.5234 42.8274 32.2109C42.8278 31.8984 42.7041 31.5985 42.4834 31.3772C42.2627 31.156 41.9631 31.0314 41.6506 31.031L4.01783 31.0153L12.9904 22.0255C13.1028 21.9167 13.1926 21.7867 13.2542 21.6429C13.3159 21.4991 13.3484 21.3445 13.3496 21.188C13.3509 21.0315 13.321 20.8764 13.2617 20.7316C13.2024 20.5868 13.1149 20.4553 13.0042 20.3447C12.8935 20.2341 12.7619 20.1467 12.617 20.0875C12.4722 20.0284 12.317 19.9986 12.1606 20C12.0041 20.0015 11.8495 20.0341 11.7058 20.0959C11.562 20.1577 11.4321 20.2475 11.3234 20.3601L0.344605 31.3578Z"
                  fill="#14CCC3"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="31.619"
                  transform="matrix(-1 0 0 1 82.4465 0)"
                  stroke="#14CCC3"
                  strokeWidth="0.761905"
                  strokeDasharray="3.05 3.05"
                />
              </svg>
            </div>{" "}
            <div
              className="cursor-pointer"
              onClick={scrollRight}
              onMouseDown={(e) => e.preventDefault()}
            >
              <svg
                width="83"
                height="64"
                viewBox="0 0 83 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M82.5485 31.3578C82.7691 31.5787 82.8931 31.8782 82.8931 32.1905C82.8931 32.5027 82.7691 32.8022 82.5485 33.0232L71.5712 44.0208C71.4626 44.1334 71.3326 44.2232 71.1889 44.2851C71.0451 44.3469 70.8905 44.3795 70.7341 44.3809C70.5776 44.3823 70.4224 44.3526 70.2776 44.2934C70.1328 44.2342 70.0012 44.1468 69.8905 44.0362C69.7798 43.9256 69.6922 43.7941 69.6329 43.6493C69.5736 43.5046 69.5437 43.3494 69.545 43.1929C69.5463 43.0365 69.5787 42.8819 69.6404 42.7381C69.7021 42.5943 69.7918 42.4642 69.9043 42.3555L78.8721 33.3704L41.2456 33.3877C40.9331 33.3881 40.6332 33.2643 40.4119 33.0436C40.1906 32.823 40.0661 32.5234 40.0657 32.2109C40.0653 31.8984 40.189 31.5985 40.4097 31.3772C40.6304 31.156 40.9299 31.0314 41.2424 31.031L78.8752 31.0153L69.9027 22.0255C69.7902 21.9167 69.7005 21.7867 69.6388 21.6429C69.5771 21.4991 69.5447 21.3445 69.5434 21.188C69.5421 21.0315 69.572 20.8764 69.6313 20.7316C69.6907 20.5868 69.7782 20.4553 69.8889 20.3447C69.9996 20.2341 70.1312 20.1467 70.276 20.0875C70.4209 20.0284 70.576 19.9986 70.7325 20C70.889 20.0015 71.0436 20.0341 71.1873 20.0959C71.331 20.1577 71.461 20.2475 71.5696 20.3601L82.5485 31.3578Z"
                  fill="#14CCC3"
                />
                <circle
                  cx="32.4465"
                  cy="32"
                  r="31.619"
                  stroke="#14CCC3"
                  strokeWidth="0.761905"
                  strokeDasharray="3.05 3.05"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="lg:pl-[100px] pl-[24px] md:pl-[40px] py-15">
          <p className="text-center lg:text-[48px] text-[32px] font-[700]">
            Berry<span className="text-[#14CCC3]">Booster</span>
          </p>
          <div className="h-auto">
            <Image src={Sheero} alt="dots" className="h-full w-full" />
          </div>
        </div>
        <div className="md:px-[40px] lg:px-[100px] px-[24px] pb-15 flex flex-wrap items-center gap-[120px] ">
          <div className="lg:w-[calc(50%-60px)] w-full">
            <div className="flex border-[#14CCC3] max-w-max p-2 rounded-full border-[0.5px]  gap-2">
              <Image src={Dots} alt="dots" className="h-[24px] w-[24px]" />
              <p className="text-[#14CCC3] lg:font-base sm:font-sm uppercase font-bold">
                company philosophy
              </p>
            </div>
            <div className="mt-5 xl:w-[76%] 2xl:w-[70%] lg:w-full">
              <p>
                BerryBoost helps early-stage startups, small-medium, and large
                corporations with technology development outsourcing, 100%
                sustainably, and affordably.
              </p>
              <p>
                <span className="text-[#14CCC3] font-semibold">BB</span> not
                only boosts your engineering operations but also guides you with
                expert product design, strategy, and technical
                feasibility—turning great ideas into scalable digital products.{" "}
              </p>
              <a
                href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                {" "}
                <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                  Schedule a Call <IoArrowForward size={16} />
                </button>
              </a>
            </div>
          </div>{" "}
          <div className="lg:w-[calc(50%-60px)] w-full flex justify-end">
            <Image src={companyphilosophy} alt="dots" />
          </div>
        </div>
        <div className="md:px-[40px] lg:px-[100px] px-[24px] mb-15">
          <div className="border-[1px] border-[#14CCC3] rounded-[8px] p-6">
            <p className="lg:text-[48px] text-[32px] font-bold">
              Our <span className="text-[#14CCC3]">Goal</span>
            </p>
            <p className="text-[24px] font-medium mt-5 w-full lg:w-[90%]">
              Our goal is to help the world’s leading companies turn ideas into
              scalable digital products, improving business value, operational
              efficiency, and growth using cutting-edge technology.
            </p>
          </div>
        </div>
        <div className="bg-[#00A79E] lg:px-[100px] px-[24px] py-15 md:px-[40px]">
          <div className=" flex items-center gap-2 justify-center">
            <p className="text-center text-[#fff] leading-[100%] text-[32px]  font-[700] lg:text-[48px] ">
              We Believe in Providing Values
            </p>
            <svg
              width="15"
              height="29"
              viewBox="0 0 15 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.44699" cy="20.6657" r="7.44699" fill="white" />
              <circle cx="4.87906" cy="5.54508" r="4.87906" fill="white" />
            </svg>
          </div>
          <div className="pt-15 flex-wrap flex gap-[24px]">
            {services?.map((feature: any, index: number) => (
              <div
                key={index}
                className="lg:w-[calc(25%-19.2px)] relative md:w-[calc(50%-12px)] w-[calc(100%-0px)]"
              >
                <div className="w-[61px] absolute left-[-5px] h-[61px] top-[-45px] flex items-center justify-center rounded-full border-t border-r border-dashed border-[#fff]">
                  <p className="text-[#fff] text-[24px] font-normal">
                    {feature.number}
                  </p>
                </div>

                <div className="w-[250px] p-[40px] h-[250px] flex items-center justify-center flex-col rounded-full border-t border-r border-dashed border-[#fff]">
                  <p className="text-[#fff] text-[24px] font-normal text-start">
                    {feature.title || "Content is not Found"}
                  </p>
                  <p className="text-[#fff] text-[12px] font-[400] text-start mt-2">
                    {feature.subtitle || "Content is not Found"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:px-[40px] lg:px-[100px] px-[24px] my-15">
          <div className="border-[1px] border-[#14CCC3] rounded-[8px] p-6">
            <p className="lg:text-[48px] text-[32px] font-bold">
              Our <span className="text-[#14CCC3]">Vision</span>
            </p>
            <p className="text-[24px] font-medium mt-5 w-full lg:w-[90%]">
              Our vision is to become one of the leading IT consulting, custom
              software development services, and enterprise software solutions
              companies worldwide.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
