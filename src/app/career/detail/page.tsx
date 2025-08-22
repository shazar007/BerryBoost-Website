"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ApplyJob, getSingleJob } from "../../../../api/Career";
import dayjs from "dayjs";
import FileInputUploader from "@/components/FileUploader/Page";
import { IoArrowForward, IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  notifyError,
  notifySuccess,
} from "@/components/ToastNotification/page";
import Image from "next/image";
import RingLoader from "@/components/RingLoader/page";
export default function CareerDetail() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const searchParams = useSearchParams();
  const [ApplyModel, SetApplyModel] = useState(false);
  const [isloading, setLoading] = useState(false);
  const id = searchParams.get("id") || "empty";
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["singleJob"],
    queryFn: () => getSingleJob(id),
    staleTime: 5 * 60 * 1000,
  });
  let job = data?.data?.job;
  const jobDetails = [
    { label: "Job Category:", value: job?.jobCategory },
    { label: "Department:", value: job?.department },
    { label: "Job Type:", value: job?.employmentType },
    { label: "Location:", value: "Lahore, Pakistan" },
    { label: "Total Position:", value: job?.totalPosition },
    { label: "Career Level:", value: job?.careerLevel },
    {
      label: "Experience:",
      value: job?.experience ? job.experience : null,
    },
    {
      label: "Posting Date:",
      value: dayjs(job?.createdAt).format("MMMM D, YYYY"),
    },
    // { label: "Apply Before:", value: "August 15, 2025" },
  ];

  const validationSchema = Yup.object().shape({
    candidateName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone must be digits")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone number is required"),
    cv: Yup.string().required("CV is required"),
  });

  const formik = useFormik({
    initialValues: {
      jobId: id,
      candidateName: "",
      email: "",
      phoneNumber: "",
      cv: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      ApplyJob(values)
        .then((res: any) => {
          notifySuccess("Your application has been successfully submitted.");
          setSubmitSuccess(true);
          SetApplyModel(false);
        })
        .catch((err: any) => {
          const errorMsg =
            err?.response?.data?.error || "Failed to submit your application.";
          notifyError(errorMsg);
        })
        .finally(() => {
          setLoading(false);
          refetch();
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 2000);
          formik.resetForm();
        });
    },
  });

  return (
    <>
      <head>
        <title>Career Details — BerryBoost</title>
        <meta
          name="description"
          content="Explore exciting career opportunities at BerryBoost. We are looking for passionate professionals to join our dynamic team and make an impact in the digital industry."
        />
      </head>
      <div>
        <section className="relative h-[640px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-bottom bg-cover bg-no-repeat bg-fixed"
            style={{
              backgroundImage:
                "url('/assets/9914e10d1dbab97ee951b6a6a3dc2797d443b144.jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50  z-[1]"></div>
          <div className="relative z-10 h-full mt-10 flex flex-col items-start justify-center lg:px-[80px] px-[24px]">
            <div className="lg:py-[35px] py-[16px] w-full lg:w-[90%] lg:px-[42px] px-[16px] bg-transparent backdrop-blur-xl rounded-[24px]">
              <div className="w-full lg:w-[70%]">
                <p className="text-white uppercase leadings-[100%] text-start text-[24px] font-[700]">
                  Career
                </p>{" "}
                <h1 className="text-start text-white lg:text-[48px] text-[36px] font-[700]  lg:leading-[56px] leading-[46px] mb-6">
                  We’re more than a workplace
                </h1>
                <p className="text-white lg:text-[24px] text-base font-[400] leading-[110%]">
                  Are you a rockstar software engineer, digital marketer or a
                  next level creative artist? BB is the place to evolve your
                  career.
                </p>{" "}
                <a
                  href="https://calendly.com/berryboost/30min?hide_gdpr_banner=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center mt-[24px] justify-center cursor-pointer gap-1.5 bg-[#14CCC3] rounded-[4px] text-white border-[#14CCC3] font-[400] text-base w-[220px] h-[56px] hover:gap-5 transition-all duration-300 ease-in-out">
                    Let’s Connect <IoArrowForward size={16} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full lg:px-[100px] px-[24px] md:px-[40px] py-15">
          <p className="lgtext-[48px] text-[32px] font-semibold">
            {job?.title}
          </p>
          <div className="flex flex-wrap gap-4 items-center mt-2">
            <p className="text-xl font-thin"> {job?.employmentType}</p>|
            <p className="text-xl font-thin">Lahore, Pakistan</p>|{" "}
            <p className="text-xl font-thin">
              {dayjs(job?.createdAt).format("MMMM D, YYYY")}
            </p>
            | <p className="text-xl font-thin">{job?.jobCategory}</p>
          </div>
        </div>
        <div className="mb-15 flex flex-wrap gap-[100px] lg:px-[100px] px-[24px] md:px-[40px]">
          <div className="lg:w-[calc(60%-50px)] w-full">
            <p>{job?.aboutJob}</p>
            <div className="mt-7">
              <p className="text-[20px] font-semibold">Key Responsibilities:</p>
              <ul className="mt-3 list-disc pl-5">
                {job?.responsibilities.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>{" "}
            <div className="mt-7">
              <p className="text-[20px] font-semibold">Requirements:</p>
              <ul className="mt-3 list-disc pl-5">
                {job?.requirements.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-7">
              <button
                onClick={() => {
                  SetApplyModel(true);
                }}
                className="bg-[#14CCC3] text-white tetx-xl font-medium w-[220px] cursor-pointer rounded-[8px] h-[50px] "
              >
                Apply
              </button>
            </div>
          </div>
          <div className="lg:w-[calc(40%-50px)] w-full">
            <p className="text-[24px] font-semibold ">Job Details</p>
            <div className="mt-7 flex flex-col gap-2">
              {jobDetails.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start lg:gap-[50px] gap-[20px]"
                >
                  <div className="lg:w-[200px] w-[110px]">
                    <p className="text-base font-semibold">{item.label}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-normal">{item.value ?? "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {ApplyModel && (
            <form onSubmit={formik.handleSubmit}>
              <div className="fixed inset-0 flex items-center justify-center bg-black/70  z-50">
                <div className="bg-white rounded-2xl p-6 w-[800px] shadow-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-[24px] font-semibold">
                      Apply <span className="text-[#14CCC3]">Now</span>
                    </p>
                    <IoClose
                      color="#131313"
                      className="cursor-pointer"
                      size={20}
                      onClick={() => SetApplyModel(false)}
                    />
                  </div>

                  <div className="mt-5">
                    <input
                      name="candidateName"
                      placeholder="Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.candidateName}
                      className="px-4 border-[0.5px] focus:outline-none border-[#ccc] w-full rounded-[8px] h-12"
                    />
                    {formik.touched.candidateName &&
                      formik.errors.candidateName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.candidateName}
                        </p>
                      )}
                    <input
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="px-4 border-[0.5px] mt-3 focus:outline-none border-[#ccc] w-full rounded-[8px] h-12"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                    <input
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      className="px-4 border-[0.5px] mt-3 focus:outline-none border-[#ccc] w-full rounded-[8px] h-12"
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.phoneNumber}
                        </p>
                      )}
                    <div className="mt-3">
                      <FileInputUploader
                        placeholder="Upload your CV"
                        onUploadComplete={(url) => {
                          formik.setFieldValue("cv", encodeURI(url));
                        }}
                      />
                      {formik.touched.cv && formik.errors.cv && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.cv}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        disabled={isloading}
                        className="flex items-center gap-3 p-3 rounded-lg font-normal h-12 cursor-pointer w-44 text-white bg-[#14CCC3] text-[18px] justify-center"
                      >
                        {isloading ? (
                          <>
                            <RingLoader color="#fff" />
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
        {submitSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70  z-50">
            <div className="bg-white rounded-2xl p-6 w-[600px] text-center shadow-xl">
              <div className="flex justify-center">
                <Image
                  alt="emoji"
                  src="https://static.vecteezy.com/system/resources/thumbnails/023/899/168/small_2x/party-popper-emoticon-face-vector.jpg"
                  className="mb-4 mt-4"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="text-5xl font-semibold mb-2 mt-5 text-[#14CCC3]">
                Success!
              </h2>
              <p className="text-gray-600 text-[28px] mb-4">
                Your Application was submitted successfully.
              </p>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                }}
                className="bg-[#14CCC3] text-white px-4 py-2 mt-7 mb-4 w-[140px] rounded-md"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
