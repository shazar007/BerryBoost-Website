import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface SkeletonLoaderProps {
  type: string;
}
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type }) => {
  return (
    <div>
      {type == "card" ? (
        <div className="flex flex-wrap gap-[60px] mb-12 lg:px-[100px] py-15 px-[24px] md:px-[40px]">
          <div className="w-full md:w-[calc(33%-40px)]">
            <Skeleton height={32} width="40%" className="mb-4" />
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
          </div>
          <div className="w-full md:w-[calc(33%-40px)]">
            <Skeleton height={32} width="40%" className="mb-4" />
            <Skeleton height={48} className="mb-6" />{" "}
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
          </div>
          <div className="w-full md:w-[calc(33%-40px)]">
            <Skeleton height={32} width="40%" className="mb-4" />
            <Skeleton height={48} className="mb-6" />{" "}
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
          </div>
        </div>
      ) : (
        <div className="mb-12 lg:px-[100px] py-15 px-[24px] md:px-[40px]">
          <div className="w-full ">
            <Skeleton height={32} width="40%" className="mb-4" />
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
            <Skeleton height={48} className="mb-6" />
          </div>
        </div>
      )}
    </div>
  );
};
export default SkeletonLoader;
