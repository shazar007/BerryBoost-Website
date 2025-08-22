"use client";
import dayjs from "dayjs";
import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import {
  deleteRequest,
  getAllRequest,
  getALLHireRequest,
  deleteHireRequest,
} from "../../../api/serviceRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  notifyError,
  notifySuccess,
} from "@/components/ToastNotification/page";
import RingLoader from "@/components/RingLoader/page";

type ServiceRequest = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  requiredService: string;
  productDetail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type HireDeveloperRequest = {
  _id: string;
  name: string;
  email: string;
  otherDetails: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  __v: number;
};

const Request = () => {
  const [activeTab, setActiveTab] = useState<
    "serviceRequest" | "hireDeveloper"
  >("serviceRequest");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewdeatail, setViewdetail] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const serviceTableHeaders = [
    {
      title: "Sr #",
      width: "w-[8%]",
      minWidth: "min-w-[50px]",
      align: "text-left",
    },
    {
      title: "Name",
      width: "w-[16%]",
      minWidth: "min-w-[100px]",
      align: "text-left",
    },
    {
      title: "Work Email",
      width: "w-[20%]",
      minWidth: "min-w-[120px]",
      align: "text-left",
    },
    {
      title: "Phone",
      width: "w-[16%]",
      minWidth: "min-w-[100px]",
      align: "text-left",
    },
    {
      title: "Required Service",

      width: "w-[16%]",
      minWidth: "min-w-[120px]",
      align: "text-left",
    },
    {
      title: "Request Date & Time",

      width: "w-[16%]",
      minWidth: "min-w-[120px]",
      align: "text-left",
    },
    {
      title: "Action",
      width: "w-[8%]",
      minWidth: "min-w-[80px]",
      align: "flex justify-end",
    },
  ];

  const hireTableHeaders = [
    {
      title: "Sr #",
      width: "w-[8%]",
      minWidth: "min-w-[50px]",
      align: "text-left",
    },
    {
      title: "Name",
      width: "w-[16%]",
      minWidth: "min-w-[100px]",
      align: "text-left",
    },
    {
      title: "Email",
      width: "w-[20%]",
      minWidth: "min-w-[120px]",
      align: "text-left",
    },
    {
      title: "Request Date & Time",
      width: "w-[20%]",
      minWidth: "min-w-[120px]",
      align: "text-left",
    },
    {
      title: "Phone",
      width: "w-[28%]",
      minWidth: "min-w-[150px]",
      align: "text-left",
    },
    {
      title: "Action",
      width: "w-[8%]",
      minWidth: "min-w-[80px]",
      align: "flex justify-end",
    },
  ];

  const {
    data: serviceRequestsResponse,
    error: serviceError,
    isLoading: serviceLoading,
    refetch: serviceRefetch,
  } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: () => getAllRequest(),
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: hireDeveloperRequestsResponse,
    error: hireError,
    isLoading: hireLoading,
    refetch: hireRefetch,
  } = useQuery({
    queryKey: ["hireDeveloperRequests"],
    queryFn: () => getALLHireRequest(),
    staleTime: 5 * 60 * 1000,
  });

  const serviceRequests = serviceRequestsResponse?.data?.serviceRequests || [];
  const hireDeveloperRequests =
    hireDeveloperRequestsResponse?.data?.hireDeveloperRequests || [];

  const deleteServiceMutation = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      serviceRefetch();
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
      notifySuccess("Request has been successfully deleted.");
      setDeleteModalOpen(false);
    },
    onError: (error: any) => {
      notifyError(
        error?.response?.data?.message || "Failed to delete the request."
      );
      setDeleteModalOpen(false);
    },
  });
  const deleteHireMutation = useMutation({
    mutationFn: deleteHireRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["hireDeveloperRequests"] });
      notifySuccess("Hire request has been successfully deleted.");
      setDeleteModalOpen(false);
    },
    onError: (error: any) => {
      notifyError(
        error?.response?.data?.message || "Failed to delete the hire request."
      );
      setDeleteModalOpen(false);
    },
  });

  const openDeleteModal = (id: string) => {
    setRequestToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setRequestToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      if (activeTab === "serviceRequest") {
        deleteServiceMutation.mutate(requestToDelete);
      } else {
        deleteHireMutation.mutate(requestToDelete);
      }
    }
  };

  const isLoading =
    activeTab === "serviceRequest" ? serviceLoading : hireLoading;
  const error = activeTab === "serviceRequest" ? serviceError : hireError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <RingLoader color="#14CCC3" size="50px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error: {error instanceof Error ? error.message : "Failed to fetch data"}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="mt-3 mb-7 flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("serviceRequest")}
              className={`h-12 px-6 flex items-center justify-center rounded-md text-[16px] cursor-pointer font-semibold
                                ${
                                  activeTab === "serviceRequest"
                                    ? "bg-[#14CCC3] text-white"
                                    : "bg-white text-black"
                                }`}
            >
              Service Requests
            </button>
            <button
              onClick={() => setActiveTab("hireDeveloper")}
              className={`h-12 px-6 flex items-center justify-center rounded-md text-[16px] cursor-pointer font-semibold 
                                ${
                                  activeTab === "hireDeveloper"
                                    ? "bg-[#14CCC3] text-white"
                                    : "bg-white text-black"
                                }`}
            >
              Developer Requests
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl w-full overflow-hidden flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto scrollbar-hide hide-scrollbar">
            <div className="flex flex-col w-full bg-[#F9FAFC] rounded-[8px] min-h-auto p-6">
              {/* <p className="text-[#131313] text-3xl mb-9 font-semibold">
                                {activeTab === "serviceRequest"
                                    ? "Service Requests"
                                    : "Hire Developer Requests"}
                            </p> */}

              <div className="h-auto bg-white p-8 mb-4 rounded-lg shadow-sm overflow-x-auto">
                <p className="text-black font-medium text-sm md:text-[14px] text-left">
                  Requests
                </p>
                {/* Table Header */}
                <div className="flex border-b-[0.5px] border-b-[#7D7D7D] h-10 items-center min-w-[800px]">
                  {(activeTab === "serviceRequest"
                    ? serviceTableHeaders
                    : hireTableHeaders
                  ).map((header, index) => (
                    <div
                      key={index}
                      className={`${header.width} ${header.minWidth} ${header.align}`}
                    >
                      <p className="text-[#7D7D7D] font-medium text-sm md:text-[14px]">
                        {header.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Table Rows */}
                {activeTab === "serviceRequest" ? (
                  serviceRequests.length > 0 ? (
                    serviceRequests.map(
                      (request: ServiceRequest, index: number) => (
                        <div
                          key={request._id}
                          className="flex flex-row border-b-[0.5px] border-b-[#7D7D7D] py-0 h-10 items-center min-w-[800px]"
                        >
                          <div className="w-[8%] min-w-[50px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left">
                              {index + 1}
                            </p>
                          </div>
                          <div className="w-[16%] min-w-[100px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                              {request.fullName || "--"}
                            </p>
                          </div>
                          <div className="w-[20%] min-w-[120px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                              {request.email || "--"}
                            </p>
                          </div>
                          <div className="w-[16%] min-w-[100px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left">
                              {request.phoneNumber || "--"}
                            </p>
                          </div>
                          <div className="w-[16%] min-w-[120px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                              {request.requiredService || "--"}
                            </p>
                          </div>
                          <div className="w-[16%] min-w-[120px]">
                            <p className="text-black font-medium text-sm md:text-[14px] text-left">
                              {request.createdAt
                                ? dayjs(request.createdAt).format(
                                    "DD/MM/YYYY hh:mm A"
                                  )
                                : "--"}
                            </p>
                          </div>

                          <div className=" flex-1 flex justify-end ">
                            <div className="flex gap-2">
                              <button
                                className="p-2 rounded-full hover:bg-[#E8F9F9] border border-[#14CCC3] transition duration-200 cursor-pointer"
                                title="Details"
                                onClick={() => {
                                  setSelectedDetail(
                                    request.productDetail || null
                                  );
                                  setViewdetail(true);
                                }}
                              >
                                <CgDetailsMore color="#14CCC3" size={16} />
                              </button>

                              <button
                                onClick={() => openDeleteModal(request._id)}
                                className="p-2 rounded-full hover:bg-[#FFEAEA] border border-[#B3261E] transition duration-200 cursor-pointer"
                                title="Delete"
                              >
                                <MdDelete color="#B3261E" size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="flex justify-center items-center h-20">
                      <p className="text-gray-500">No service requests found</p>
                    </div>
                  )
                ) : hireDeveloperRequests.length > 0 ? (
                  hireDeveloperRequests.map(
                    (request: HireDeveloperRequest, index: number) => (
                      <div
                        key={request._id}
                        className="flex flex-row border-b-[0.5px] border-b-[#7D7D7D] py-0 h-10 items-center min-w-[800px]"
                      >
                        <div className="w-[8%] min-w-[50px]">
                          <p className="text-black font-medium text-sm md:text-[14px] text-left">
                            {index + 1}
                          </p>
                        </div>
                        <div className="w-[16%] min-w-[100px]">
                          <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                            {request.name || "--"}
                          </p>
                        </div>
                        <div className="w-[20%] min-w-[120px]">
                          <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                            {request.email || "--"}
                          </p>
                        </div>
                        <div className="w-[20%] min-w-[120px]">
                          <p className="text-black font-medium text-sm md:text-[14px] text-left">
                            {request.createdAt
                              ? dayjs(request.createdAt).format(
                                  "DD/MM/YYYY hh:mm A"
                                )
                              : "--"}
                          </p>
                        </div>
                        <div className="w-[28%] max-w-[150px]">
                          <p className="text-black font-medium text-sm md:text-[14px] text-left truncate">
                            {request.phoneNumber || "--"}
                          </p>
                        </div>
                        <div className="flex-1 flex justify-end ">
                          <div className="flex gap-2">
                            {/* Details Button with Custom Tooltip */}
                            <div className="relative group">
                              <button
                                className="p-2 rounded-full hover:bg-[#E8F9F9] border border-[#14CCC3] transition duration-200 cursor-pointer"
                                onClick={() => {
                                  setSelectedDetail(
                                    request.otherDetails || null
                                  );
                                  setViewdetail(true);
                                }}
                              >
                                <CgDetailsMore color="#14CCC3" size={16} />
                              </button>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white border border-gray-300 shadow-md px-3 py-1 rounded text-black font-medium text-sm md:text-[14px] text-left whitespace-nowrap z-10">
                                Details
                              </div>
                            </div>

                            {/* Delete Button with Custom Tooltip */}
                            <div className="relative group">
                              <button
                                onClick={() => openDeleteModal(request._id)}
                                className="p-2 rounded-full hover:bg-[#FFEAEA] border border-[#B3261E] transition duration-200 cursor-pointer"
                              >
                                <MdDelete color="#B3261E" size={16} />
                              </button>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white border border-gray-300 shadow-md px-3 py-1 rounded text-black font-medium text-sm md:text-[14px] text-left whitespace-nowrap z-10">
                                Delete
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex justify-center items-center h-20">
                    <p className="text-gray-500">
                      No hire developer requests found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-2xl p-8 w-[400px] sm:w-[600px] text-center shadow-xl">
            <div className="text-[48px] mb-2">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Are you sure you want to delete this request?
            </h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 w-[140px] flex justify-center items-center rounded-lg bg-[#FF0000] text-white hover:bg-red-600 transition-all"
                disabled={
                  deleteServiceMutation.isPending ||
                  deleteHireMutation.isPending
                }
              >
                {deleteServiceMutation.isPending ||
                deleteHireMutation.isPending ? (
                  <RingLoader color="#fff" size="16px" />
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {viewdeatail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="relative bg-white max-h-[80vh] w-[90%] md:w-[600px] rounded-xl p-6 overflow-y-auto  ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Request Details
              </h2>
              <button
                onClick={() => setViewdetail(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <div className="text-gray-700 whitespace-pre-wrap pr-4">
              {selectedDetail?.trim()
                ? selectedDetail
                : "No details available."}
            </div>

            {/* <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-1/2 w-2 bg-[#14CCC3] rounded-full"></div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
