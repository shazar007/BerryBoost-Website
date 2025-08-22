import { IoClose } from "react-icons/io5";
import FormComponent from "../ContactForm/formcomponent";
import dots from "../../../public/assets/mingcute_scale-fill.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Image from "next/image";
import "../Itsection/itSection.css";

export default function EngagementPop({ setFormModel }: any) {
  return (
    <div className="w-full max-h-[80vh] no-scrollbar overflow-y-auto flex flex-col lg:flex-row gap-6 lg:gap-[30px] p-4">
      <div className="lg:w-1/2 w-full bg-[linear-gradient(332.24deg,#14CCC3_2.55%,#0A6661_111.36%)] rounded-lg p-4 lg:p-6">
        <p className="text-2xl lg:text-[36px] font-normal text-white">
          BerryBoost process. Simple,
          <span className="text-[#F9FF8E]"> seamless, </span>
          <span className="font-semibold">streamlined.</span>
        </p>

        <div className="mt-4 space-y-3">
          {[
            {
              title: "Join exploration call.",
              subtitle: "Tell us more about your business on a discovery call.",
            },
            {
              title: "Discuss solution and team structure.",
              subtitle:
                "We will finalize your project specifications, agree on an engagement model, select and onboard your team.",
            },
            {
              title: "Get started and track performance.",
              subtitle:
                "We’ll track progress, report updates, and continuously adapt to your needs.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <IoIosCheckmarkCircle
                size={20}
                className="flex-shrink-0 mt-1"
                color="#fff"
              />
              <div className="text-white">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs font-normal">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full bg-white mt-4 rounded-lg p-3 flex items-center gap-3">
          <div className="w-12 h-12 flex-shrink-0">
            <Image src={dots} alt="Smooth Scalability" height={56} width={56} />
          </div>
          <div>
            <p className="text-sm lg:text-base font-semibold text-[#14CCC3]">
              Smooth Scalability
            </p>
            <p className="text-xs lg:text-sm">
              Elevate Your Team with the Top 1% <br />
              Tech Talent, On Demand
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full relative">
        <div className="flex justify-end absolute right-0 top-0 lg:-right-2 lg:-top-2">
          <button
            onClick={() => setFormModel(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors hover:cursor-pointer"
            aria-label="Close modal"
          >
            <IoClose size={24} color="#14CCC3" />
          </button>
        </div>
        <FormComponent setFormModel={setFormModel} />
      </div>
    </div>
  );
}
