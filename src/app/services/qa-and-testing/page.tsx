"use client";
import React from "react";
import ServiceDetail from "../components/servicesDetail";
import { getItem } from "@/utils/localStorageHelper";

function Service() {
  const title = getItem<string>("title");
  return (
    <div>
      <ServiceDetail title={title} />
    </div>
  );
}

export default Service;
