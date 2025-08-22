import React from "react";
import { PiDownloadSimpleFill } from "react-icons/pi";
import JSZip from "jszip";

interface MultiDownloaderProps {
  urls: string[];
}

const MultiDownloader: React.FC<MultiDownloaderProps> = ({ urls }) => {
  const handleMultiDownload = async () => {
    const zip = new JSZip();

    await Promise.all(
      urls.map(async (url, index) => {
        try {
          console.log("Fetching file from:", url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const blob = await response.blob();
          const fileName = url.split("/").pop() || `file-${index + 1}`;
          zip.file(fileName, blob);
        } catch (error) {
          console.error(`❌ Failed to fetch ${url}:`, error);
        }
      })
    );

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = "downloads.zip";
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
  };

  return (
    <div>
      <div
        onClick={handleMultiDownload}
        className="text-[#14CCC3] cursor-pointer font-medium text-[14px] flex gap-1"
      >
        <PiDownloadSimpleFill className="h-5 w-5 items-center" />
      </div>
    </div>
  );
};

export default MultiDownloader;
