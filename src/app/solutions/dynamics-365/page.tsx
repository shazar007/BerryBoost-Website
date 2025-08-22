"use client";
import React from "react";
import { getItem } from "@/utils/localStorageHelper";
import SolutionDetail from "../components/solutionDetail";

function Solution() {
  const title = getItem<string>("title");
  return (
    <div>
      <SolutionDetail title={title} />
    </div>
  );
}

export default Solution;
