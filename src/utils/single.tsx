import React from "react";
import { PiDownloadSimpleFill } from "react-icons/pi";

interface SingleDownloadProps {
  url: string;
}

const SingleDownload: React.FC<SingleDownloadProps> = ({ url }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div
        onClick={handleDownload}
        className="text-[#14CCC3] cursor-pointer font-medium text-[14px] flex gap-1"
      >
        <PiDownloadSimpleFill className="h-5 w-5 items-center" />
        <p>Download CV</p>
      </div>
    </div>
  );
};

export default SingleDownload;
