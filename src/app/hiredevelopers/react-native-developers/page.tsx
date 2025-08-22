"use client";
import React from "react";
import { getItem } from "@/utils/localStorageHelper";
import HireDevelopersDetail from "../components/hiredevelopersdsetail";

function HireDeveloper() {
  const title = getItem<string>("title");
  return (
    <div>
      <HireDevelopersDetail />
    </div>
  );
}

export default HireDeveloper;
