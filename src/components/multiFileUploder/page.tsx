"use client";
import React, { useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { uploadMultiFile } from "../../../api/blog";
import Image from "next/image";

interface MultiFileInputUploaderProps {
  placeholder?: string;
  onUploadComplete: (urls: string[]) => void;
}

const MultiFileInputUploader: React.FC<MultiFileInputUploaderProps> = ({
  placeholder = "Choose files...",
  onUploadComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const isImage = (filename: string) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileNames = Array.from(files)
      .map((file) => file.name)
      .join(", ");
    setInputValue(fileNames);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      const response = await uploadMultiFile(formData as any);
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const uploadedUrls = (response.data?.urls || []).map((url: string) =>
        url.startsWith("http") ? url : `${baseUrl}${url}`
      );

      if (uploadedUrls.length > 0) {
        const updatedUrls = [...fileUrls, ...uploadedUrls];
        setFileUrls(updatedUrls);
        setInputValue(""); // clear input after upload
        onUploadComplete(updatedUrls);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      e.target.value = ""; // reset file input so same file can be reselected
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    const updatedUrls = fileUrls.filter((_, i) => i !== index);
    setFileUrls(updatedUrls);
    onUploadComplete(updatedUrls);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={styles.container}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          style={styles.input}
          disabled
        />
        <div style={styles.iconWrapper} onClick={handleIconClick}>
          {uploading ? (
            "Uploading..."
          ) : (
            <FiUpload color="#131313" style={styles.icon} />
          )}
        </div>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {fileUrls.length > 0 && (
        <div style={styles.previewContainer}>
          {fileUrls.map((url, index) =>
            isImage(url) ? (
              <div key={index} style={styles.imageWrapper}>
                <Image
                  src={url}
                  alt={`preview-${index}`}
                  height={80}
                  width={80}
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemoveImage(index)}
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <div key={index} style={styles.fileBox}>
                <span>{`File ${index + 1}`}</span>
                <button
                  style={styles.removeBtnFile}
                  onClick={() => handleRemoveImage(index)}
                >
                  <FiX size={14} />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    outline: "none",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  iconWrapper: {
    backgroundColor: "#f4f4f4",
    padding: "10px 14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  previewContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: 30,
  },
  imageWrapper: {
    position: "relative",
    display: "inline-block",
  },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 2,
    lineHeight: 0,
  },
  fileBox: {
    position: "relative",
    backgroundColor: "#eee",
    padding: "8px 12px",
    borderRadius: 6,
    fontSize: 12,
  },
  removeBtnFile: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 2,
    lineHeight: 0,
  },
} as const;

export default MultiFileInputUploader;
