import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notifyError, notifySuccess } from "../ToastNotification/page";
import { addRequst } from "../../../api/serviceRequest";
import RingLoader from "../RingLoader/page";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MultiSelectDropdown, {
  MultiSelectDropdownRef,
} from "../MultiSelectDropdown/page";
interface ContactFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  requiredServices: [];
  productDetail: string;
}

export default function FormComponent({ setFormModel }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneValuenew, setPhoneValuenew] = useState<string | undefined>("");
  const dropdownRef = useRef<MultiSelectDropdownRef>(null);
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      requiredServices: [],
      productDetail: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      requiredServices: Yup.array()
        .min(1, "At least one service is required")
        .required("Service is required"),
      productDetail: Yup.string().required("Details are required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      addRequst(values)
        .then((res: any) => {
          notifySuccess("Request has been successfully submit.");
          formik.resetForm();
          dropdownRef.current?.clear();

          if (setFormModel) {
            setFormModel(false);
          }
          setPhoneValuenew("");
        })
        .catch((err: any) => {
          console.error(err);
          notifyError(
            err?.response?.data?.message || "Failed to submit Request."
          );
        })
        .finally(() => {
          setIsLoading(false);
          setPhoneValuenew("");
        });
    },
  });

  const handlePhoneChange = (phone: string | undefined) => {
    setPhoneValuenew(phone);
    formik.setFieldValue("phoneNumber", phone || "");
  };
  const serviceCategories = {
    Engineering: [
      "Custom Software Development",
      "MVP & PoC Development",
      "Web App Development",
      "Mobile App Development",
      "E-Commerce App Development",
      "AI/ML & Data Engineering",
      "Product Strategy Consulting",
      "Product Support & Maintaince",
      "Cloud Engineering & Migration",
      "DevOps & DevSecOps",
      "QA & Testing",
    ],
    Creative: [
      "UI/UX Design",
      "Graphic Design",
      "Illustration Art",
      "3D Animation",
      "Game Design",
      "Custom Branding",
      "Video Editing & After Effects",
      "Digital Content Production",
      "NFTs",
    ],
    Digital: [
      "Digital & Social Ads Experts",
      "SEO & ASO Experts",
      "Performance Marketing",
      "Content Writers",
      "Business Development",
    ],
    BPO: ["Customer Success", "Email & Chat Support", "Virtual Agents"],
  };
  const handleCategoryChange = (selected: string[] = []) => {
    formik.setFieldValue("requiredServices", selected);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-wrap items-center gap-[24px] mt-4">
          <div className="lg:w-[calc(50%-12px)] w-full relative">
            <p className="text-sm font-[500]">Name</p>
            <input
              name="fullName"
              placeholder="Name*"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              className="w-full p-[20px] h-[59px] bg-[#EDFCFC] placeholder:text-[#5F5F5F] focus:outline-0"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-[12px] absolute top-0 right-0">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div className="lg:w-[calc(50%-12px)] w-full relative">
            <p className="text-sm font-[500] ">Email</p>
            <input
              name="email"
              placeholder="Abc@gmail.com*"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full  p-[20px] h-[59px] bg-[#EDFCFC] placeholder:text-[#5F5F5F] focus:outline-0"
            />

            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-[12px] absolute top-0 right-0">
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>
        <div className=" w-full mt-4 relative">
          <p className="text-sm font-[500]">Phone Number</p>
          <PhoneInput
            international
            defaultCountry="PK"
            value={phoneValuenew}
            onChange={handlePhoneChange}
            className="w-full  p-[20px] h-[59px] bg-[#EDFCFC] placeholder:text-[#5F5F5F] focus:outline-0"
          />
          <style>{`
              .PhoneInputInput {
                outline: none !important;
                border: none !important;
                box-shadow: none !important;
              }
            `}</style>{" "}
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <div className=" w-full mt-4 relative">
          <p className="text-sm font-[500]">Required Service</p>
          <div style={{ backgroundColor: "#EDFCFC" }}>
            <MultiSelectDropdown
              ref={dropdownRef}
              options={serviceCategories}
              title="Related to"
              width="100%"
              height="59px"
              borderWidth="0px"
              onChange={handleCategoryChange}
            />
          </div>
          {formik.touched.requiredServices &&
            formik.errors.requiredServices && (
              <div className="text-red-500 text-[12px] absolute top-0 right-0">
                {formik.errors.requiredServices}
              </div>
            )}
        </div>

        <div className="mt-4 relative">
          <p className="text-sm font-[500]">Product Detail</p>
          <textarea
            name="productDetail"
            placeholder="Enter Required Details*"
            style={{ resize: "none" }}
            onChange={formik.handleChange}
            value={formik.values.productDetail}
            className="w-full p-[20px] h-[73px] bg-[#EDFCFC] placeholder:text-[#5F5F5F] focus:outline-0"
          />{" "}
          {formik.touched.productDetail && formik.errors.productDetail && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.productDetail}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex text-[20px] items-center mt-[24px] justify-center cursor-pointer gap-3 bg-[#14CCC3] rounded-[4px] text-white font-[700] text-base w-full h-[56px] hover:gap-5 transition-all duration-300 ease-in-out"
        >
          {isLoading ? <RingLoader color="#fff" size={16} /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
