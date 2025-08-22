import { IoArrowForward } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addDevRequest } from "../../../api/hireDevRequest";
import { notifyError, notifySuccess } from "../ToastNotification/page";
import RingLoader from "../RingLoader/page";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function DevForm({ setFormModel }: any) {
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      otherDetails: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      otherDetails: Yup.string(),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      addDevRequest(values)
        .then((res: any) => {
          notifySuccess("Request successfully Sent.");
          resetForm();
          setPhoneValue("");
        })
        .catch((err: any) => {
          console.error(err);
          notifyError(
            err?.response?.data?.message || "Failed to Sent Request ."
          );
        })
        .finally(() => {
          setLoading(false);
          setFormModel(false);
        });
    },
  });
  const handlePhoneChange = (phone: string | undefined) => {
    setPhoneValue(phone);
    formik.setFieldValue("phoneNumber", phone || "");
  };
  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="relative">
          <p className="text-xs pl-2 text-[#202020] font-bold">Name</p>
          <input
            name="name"
            type="text"
            className="p-2 border-[0.5px] focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div className="mt-4 relative">
          <p className="text-xs pl-2 text-[#202020] font-bold">Email</p>
          <input
            name="email"
            type="email"
            className="p-2 border-[0.5px] focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
            placeholder="ABC@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="mt-4 relative">
          <p className="text-xs pl-2 text-[#202020] font-bold">Phone Number</p>
          <div className="">
            <PhoneInput
              international
              defaultCountry="PK"
              value={phoneValue}
              onChange={handlePhoneChange}
              className="p-2 border-[0.5px] focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
            />
            <style>{`
  .PhoneInputInput {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`}</style>
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <div className="mt-4 relative">
          <p className="text-xs pl-2 text-[#202020] font-bold">
            Share other important Details
          </p>
          <textarea
            name="otherDetails"
            style={{ resize: "none" }}
            className="p-2 border-[0.5px] h-20 focus:outline-0 w-full rounded-[4px] bg-[#EDFCFC] border-[#EDFCFC]"
            placeholder="Please share anything that will help prepare for our meeting."
            value={formik.values.otherDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otherDetails && formik.errors.otherDetails && (
            <div className="text-red-500 text-[12px] absolute top-0 right-0">
              {formik.errors.otherDetails}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex mt-5 items-center justify-center cursor-pointer gap-3 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[600] text-base w-full h-[56px] hover:gap-5 transition-all duration-300 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <RingLoader color="#fff" size={24} />
          ) : (
            <>
              {" "}
              Send Message <IoArrowForward size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
