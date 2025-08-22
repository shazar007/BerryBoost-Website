"use client";
import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowUpLong } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import CustomLoader from "../Loader/page";

const socialLinks = [
  {
    icon: <FaLinkedinIn color="#1D1D1F" size={16} />,
    url: "https://www.linkedin.com/company/berryboostbb/",
  },
  {
    icon: <FaFacebookF color="#1D1D1F" size={16} />,
    url: "https://www.facebook.com/people/BerryBoost/61575920497557/",
  },
  {
    icon: <RiInstagramFill color="#1D1D1F" size={16} />,
    url: "https://www.instagram.com/berryboostinc/",
  },
  {
    icon: <BsTwitterX color="#1D1D1F" size={16} />,
    url: "https://x.com/Berryboostbb",
  },
  {
    icon: <IoLogoYoutube color="#1D1D1F" size={16} />,
    url: "https://www.youtube.com/@BerryBoostBB",
  },
];

const quickLinks = [
  { label: "ABOUT" },
  { label: "SERVICES" },
  { label: "SOLUTIONS" },
  { label: "ENGAGEMENT MODELS" },
  { label: "INSIGHTS" },
];

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClickall = (path: string, e: any) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }

    e?.preventDefault();
    setLoading(true);
    router.push(path);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <div className=" lg:bg-[url('/assets/footerBg.png')] bg-[#d4f8f6] h-full bg-center bg-cover bg-no-repeat lg:pt-[80px] lg:px-[70px] py-15 px-[40px] md:pt-[50px] md:px-[70px]">
        <div className="flex flex-wrap gap-[60px]">
          <div className="lg:w-[calc(30%-45px)] md:w-[calc(50%-30px)] w-full">
            <div className="flex items-center gap-3 group">
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none">
                <path
                  d="M0.160156 9.55603C0.160156 4.78536 4.02755 0.917969 8.79823 0.917969H14.3842V29.7115C14.3842 34.4822 10.5168 38.3496 5.74611 38.3496H0.160156V9.55603Z"
                  fill="#14CCC3"
                />
                <circle cx="23.7409" cy="8.02998" r="7.11201" fill="#17252A" />
                <circle cx="27.4841" cy="27.4919" r="10.8552" fill="#14CCC3" />
              </svg>
              <svg
                width="134"
                height="26"
                viewBox="0 0 134 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 13C100 11.7106 99.5119 10.5351 98.7104 9.64839L100.418 8.56736C101.407 9.77444 102 11.3179 102 13C102 16.866 98.866 20 95 20C91.134 20 88 16.866 88 13C88 9.13401 91.134 6 95 6C96.0263 6 97.001 6.22086 97.8792 6.61765L96.2754 8.16412C95.8682 8.05703 95.4408 8 95 8C92.2386 8 90 10.2386 90 13C90 15.7614 92.2386 18 95 18C97.7614 18 100 15.7614 100 13Z"
                  fill="#14CCC3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M102 8C104.761 8 107 10.2386 107 13C107 15.7614 104.761 18 102 18C101.603 18 101.217 17.9538 100.847 17.8664L99.1152 19.3798C99.9948 19.7782 100.972 20 102 20C105.866 20 109 16.866 109 13C109 9.13401 105.866 6 102 6C98.134 6 95 9.13401 95 13C95 14.5514 95.5047 15.9849 96.3589 17.1454L98.0709 16.0926C97.4002 15.2416 97 14.1676 97 13C97 10.2386 99.2386 8 102 8Z"
                  fill="#14CCC3"
                />
                <path
                  d="M17.0532 14.7702C17.0532 15.7584 16.8017 16.6208 16.2986 17.3574C15.7955 18.0941 15.1128 18.669 14.2503 19.0823C13.4059 19.4955 12.4716 19.7021 11.4474 19.7021H2.36503V0.567097H11.8787C12.777 0.567097 13.5496 0.809654 14.1964 1.29477C14.8612 1.76192 15.3643 2.3728 15.7057 3.12742C16.065 3.86408 16.2447 4.63666 16.2447 5.44519C16.2447 6.37948 16.0021 7.25987 15.517 8.08636C15.0499 8.89489 14.3761 9.49679 13.4957 9.89207C14.5917 10.2155 15.4541 10.8174 16.083 11.6978C16.7298 12.5602 17.0532 13.5843 17.0532 14.7702ZM14.6007 14.3389C14.6007 13.746 14.4659 13.198 14.1964 12.6949C13.9449 12.1919 13.5945 11.7876 13.1453 11.4822C12.7141 11.1767 12.2111 11.024 11.6361 11.024H4.7906V17.6H11.4474C12.0404 17.6 12.5704 17.4473 13.0375 17.1418C13.5227 16.8364 13.9 16.4411 14.1695 15.956C14.4569 15.4529 14.6007 14.9139 14.6007 14.3389ZM4.7906 2.66926V9.05659H10.8815C11.4564 9.05659 11.9595 8.91285 12.3907 8.62538C12.8399 8.3379 13.1903 7.95161 13.4418 7.4665C13.7113 6.98138 13.8461 6.45135 13.8461 5.8764C13.8461 5.26552 13.7203 4.7265 13.4688 4.25935C13.2352 3.77424 12.9028 3.38794 12.4716 3.10047C12.0583 2.81299 11.5822 2.66926 11.0432 2.66926H4.7906ZM26.5641 19.9717C25.504 19.9717 24.5338 19.783 23.6534 19.4057C22.791 19.0104 22.0364 18.4804 21.3895 17.8156C20.7607 17.1328 20.2666 16.3513 19.9073 15.4709C19.5659 14.5905 19.3952 13.6562 19.3952 12.668C19.3952 11.3384 19.7006 10.1256 20.3115 9.02964C20.9224 7.93364 21.7669 7.05325 22.8449 6.38847C23.9409 5.72368 25.1896 5.39129 26.591 5.39129C28.0105 5.39129 29.2412 5.73266 30.2833 6.41542C31.3434 7.0802 32.1609 7.96059 32.7358 9.05659C33.3287 10.1346 33.6252 11.3025 33.6252 12.5602C33.6252 12.7399 33.6162 12.9195 33.5982 13.0992C33.5982 13.2609 33.5893 13.3867 33.5713 13.4765H21.9016C21.9735 14.3928 22.225 15.2104 22.6562 15.929C23.1054 16.6298 23.6804 17.1867 24.3811 17.6C25.0818 17.9953 25.8364 18.1929 26.6449 18.1929C27.5074 18.1929 28.3159 17.9773 29.0705 17.5461C29.8431 17.1149 30.3731 16.5489 30.6606 15.8482L32.7089 16.4142C32.4034 17.0969 31.9453 17.7078 31.3344 18.2468C30.7415 18.7858 30.0318 19.2081 29.2053 19.5135C28.3967 19.8189 27.5164 19.9717 26.5641 19.9717ZM21.8208 11.8325H31.4152C31.3434 10.9162 31.0828 10.1077 30.6337 9.40695C30.1845 8.70623 29.6095 8.15823 28.9088 7.76295C28.2081 7.36768 27.4355 7.17004 26.591 7.17004C25.7646 7.17004 25.0009 7.36768 24.3002 7.76295C23.5995 8.15823 23.0246 8.70623 22.5754 9.40695C22.1442 10.1077 21.8926 10.9162 21.8208 11.8325ZM43.9694 7.70905C42.7836 7.72702 41.7325 8.03246 40.8162 8.62538C39.9179 9.20033 39.28 9.99987 38.9027 11.024V19.7021H36.531V5.63384H38.741V8.89489C39.2261 7.92466 39.8639 7.14309 40.6545 6.55017C41.463 5.93929 42.3075 5.59791 43.1879 5.52604C43.3675 5.52604 43.5203 5.52604 43.646 5.52604C43.7718 5.52604 43.8796 5.53502 43.9694 5.55299V7.70905ZM54.0297 7.70905C52.8438 7.72702 51.7928 8.03246 50.8764 8.62538C49.9781 9.20033 49.3402 9.99987 48.9629 11.024V19.7021H46.5913V5.63384H48.8012V8.89489C49.2863 7.92466 49.9242 7.14309 50.7147 6.55017C51.5232 5.93929 52.3677 5.59791 53.2481 5.52604C53.4278 5.52604 53.5805 5.52604 53.7063 5.52604C53.832 5.52604 53.9398 5.53502 54.0297 5.55299V7.70905ZM57.2983 23.5292C57.5319 23.5471 57.7654 23.5651 57.999 23.5831C58.2326 23.619 58.4123 23.637 58.538 23.637C58.8255 23.637 59.077 23.5381 59.2926 23.3405C59.5083 23.1429 59.7418 22.7566 59.9934 22.1816C60.2629 21.6246 60.6043 20.7981 61.0175 19.7021L55.0614 5.63384H57.5678L62.3111 17.3035L66.5963 5.63384H68.941L62.0955 23.3944C61.9338 23.8077 61.6913 24.1939 61.3679 24.5533C61.0624 24.9306 60.6671 25.2271 60.182 25.4427C59.6969 25.6583 59.113 25.7661 58.4302 25.7661C58.2685 25.7661 58.0978 25.7571 57.9182 25.7391C57.7565 25.7212 57.5498 25.6852 57.2983 25.6313V23.5292ZM86.6725 14.7702C86.6725 15.7584 86.421 16.6208 85.9179 17.3574C85.4148 18.0941 84.7321 18.669 83.8697 19.0823C83.0252 19.4955 82.0909 19.7021 81.0668 19.7021H71.9844V0.567097H81.498C82.3963 0.567097 83.1689 0.809654 83.8157 1.29477C84.4805 1.76192 84.9836 2.3728 85.325 3.12742C85.6843 3.86408 85.864 4.63666 85.864 5.44519C85.864 6.37948 85.6215 7.25987 85.1363 8.08636C84.6692 8.89489 83.9954 9.49679 83.115 9.89207C84.211 10.2155 85.0735 10.8174 85.7023 11.6978C86.3491 12.5602 86.6725 13.5843 86.6725 14.7702ZM84.22 14.3389C84.22 13.746 84.0853 13.198 83.8157 12.6949C83.5642 12.1919 83.2138 11.7876 82.7647 11.4822C82.3335 11.1767 81.8304 11.024 81.2554 11.024H74.4099V17.6H81.0668C81.6597 17.6 82.1897 17.4473 82.6569 17.1418C83.142 16.8364 83.5193 16.4411 83.7888 15.956C84.0763 15.4529 84.22 14.9139 84.22 14.3389ZM74.4099 2.66926V9.05659H80.5008C81.0758 9.05659 81.5788 8.91285 82.01 8.62538C82.4592 8.3379 82.8096 7.95161 83.0611 7.4665C83.3306 6.98138 83.4654 6.45135 83.4654 5.8764C83.4654 5.26552 83.3396 4.7265 83.0881 4.25935C82.8545 3.77424 82.5221 3.38794 82.0909 3.10047C81.6777 2.81299 81.2015 2.66926 80.6625 2.66926H74.4099ZM116.04 19.9717C114.873 19.9717 113.777 19.783 112.752 19.4057C111.728 19.0104 110.848 18.4265 110.111 17.6539L111.028 15.9829C111.836 16.7376 112.645 17.2766 113.453 17.6C114.262 17.9234 115.088 18.0851 115.933 18.0851C116.903 18.0851 117.693 17.9054 118.304 17.5461C118.915 17.1688 119.221 16.6208 119.221 15.9021C119.221 15.381 119.059 14.9947 118.736 14.7432C118.43 14.4917 117.99 14.285 117.415 14.1233C116.84 13.9437 116.157 13.746 115.367 13.5304C114.396 13.2429 113.579 12.9375 112.914 12.6141C112.249 12.2907 111.746 11.8864 111.405 11.4013C111.064 10.9162 110.893 10.3053 110.893 9.56866C110.893 8.6703 111.126 7.91568 111.594 7.30479C112.061 6.67594 112.699 6.19981 113.507 5.8764C114.334 5.55299 115.268 5.39129 116.31 5.39129C117.352 5.39129 118.295 5.55299 119.14 5.8764C119.984 6.19981 120.712 6.67594 121.323 7.30479L120.245 8.94879C119.688 8.37384 119.077 7.95161 118.412 7.6821C117.747 7.39463 117.002 7.25089 116.175 7.25089C115.69 7.25089 115.214 7.31378 114.747 7.43955C114.28 7.54735 113.893 7.75397 113.588 8.05941C113.282 8.34689 113.13 8.76013 113.13 9.29915C113.13 9.74833 113.247 10.1077 113.48 10.3772C113.732 10.6287 114.091 10.8443 114.558 11.024C115.043 11.2037 115.627 11.4013 116.31 11.6169C117.37 11.9224 118.286 12.2278 119.059 12.5332C119.85 12.8387 120.46 13.234 120.892 13.7191C121.323 14.2042 121.538 14.878 121.538 15.7404C121.538 17.07 121.035 18.1121 120.029 18.8667C119.023 19.6033 117.693 19.9717 116.04 19.9717ZM131.922 19.0014C131.724 19.0913 131.455 19.2081 131.114 19.3518C130.772 19.4955 130.377 19.6213 129.928 19.7291C129.479 19.8369 129.002 19.8908 128.499 19.8908C127.924 19.8908 127.394 19.792 126.909 19.5943C126.424 19.3787 126.038 19.0553 125.75 18.6241C125.463 18.1749 125.319 17.618 125.319 16.9532V7.49345H123.406V5.63384H125.319V0.944408H127.691V5.63384H130.844V7.49345H127.691V16.2255C127.727 16.7286 127.897 17.1059 128.203 17.3574C128.508 17.591 128.868 17.7078 129.281 17.7078C129.748 17.7078 130.179 17.6269 130.575 17.4652C130.97 17.3035 131.23 17.1867 131.356 17.1149L131.922 19.0014Z"
                  fill="black"
                />
              </svg>
            </div>
            <p className="mt-2 text-base font-normal text-[#1D1D1F]">
              BerryBoost is a technology partner helping early-stage start-ups,
              SMBs, large enterprises, and Fortune 100 companies with technology
              development outsourcing.
            </p>
            <div className="mt-4 flex gap-2 items-center">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.url}
                >
                  <div className="border-[#1D1D1F] transition-transform duration-300 ease-out hover:scale-107 cursor-pointer border-[0.5px] h-[32px] w-[32px] rounded-full flex items-center justify-center">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-[calc(70%-45px)] md:w-[calc(50%-30px)] w-full">
            <p className="text-[#1D1D1F] text-[20px] font-bold uppercase">
              Our Global Offices
            </p>
            <div className="mt-3 flex items-center">
              <div className="border-[#14CCC3] border-[0.5px] w-[77px]"></div>
              <div className="border-[#14CCC3] border-[2px] h-[11px] w-[11px] bg-white rounded-full"></div>
            </div>
            <div
              className=" grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-2 
                gap-[40px] 
                md:gap-x-[20px] 
                md:gap-y-[30px] 
                lg:grid-cols-4 
                lg:gap-[60px] 
                mt-5 
                justify-items-center"
            >
              {[
                {
                  img: "/assets/Flag_of_USA.png",
                  title: "Headquarters",
                  addr: "37 Alexander Avenue Staten Island, NY, 10312, USA",
                  phone: "+1-(347)-922-4969",
                },
                {
                  img: "/assets/Flag_of_Canada.png",
                  title: "Regional Office",
                  addr: "181 Dundas Street East, Toronto Ontario M5A 0N5, Canada",
                  phone: "+1-(437)-259-5662",
                },
                {
                  img: "/assets/Flag_of_UK.png",
                  title: "Regional Office",
                  addr: "Warlies Park House, Upshire, Waltham Abbey EN9 3SL, United Kingdom",
                  phone: "+44-7710083013",
                },
                {
                  img: "/assets/Flag_of_Pakistan.png",
                  title: "Global Delivery Center",
                  addr: "154-D, Architect Engineers Society, Lahore, Pakistan",
                  phone: "+92-42-37885101-4",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-[160px] h-full"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={160}
                    height={100}
                  />
                  <div className="bg-[#14CCC3] text-white p-3 flex flex-col justify-between h-full w-full">
                    <p className="text-sm text-center font-medium">
                      {item.title}
                    </p>
                    <p className="text-sm text-center">{item.addr}</p>
                    {/* <p className="text-sm text-center">{item.phone}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#14CCC3] lg:px-[100px] lg:py-[24px] px-[40px] md:py-[50px] md:px-[70px] py-6 relative flex flex-wrap items-center justify-between">
        <p className="text-white text-base font-normal">
          Copyright © 2025 BerryBoost. All rights reserved.
        </p>
        <p className="lg:mt-0 mt-5 md:mt-5 text-white text-base font-normal lg:mr-[150px] mr-0">
          <span className="cursor-pointer">Terms & Conditions </span> |
          <a href="/career" onClick={(e) => handleClickall("/career", e)}>
            <span className="cursor-pointer"> Careers </span> |
          </a>
          <a
            href="/privacy-policy"
            onClick={(e) => handleClickall("/privacy-policy", e)}
          >
            <span className="cursor-pointer"> Privacy Policy </span>
          </a>
        </p>
        <div
          onClick={scrollToTop}
          className="bg-white rounded-t-[4px] w-[34px] h-[48px] absolute right-5 bottom-0 flex items-center justify-center cursor-pointer"
        >
          <FaArrowUpLong size={20} color="#14CCC3" />
        </div>
      </div>{" "}
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
    </>
  );
};

export default Footer;
