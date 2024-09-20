"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined | null; // 由 File obj 組成的 array
  onChange: (file: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  // 記憶檔案拖曳，避免不必要的重新渲染
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {/* 檢查、渲染目前要上傳的圖片 */}
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          height={1000}
          width={1000}
          alt="uploaded image"
          className="max-h-[400px] object-cover overflow-hidden"
        />
      ) : (
        // 沒有上傳圖片時的 placeholder
        <>
          <Image
            src="/assets/icons/upload.svg"
            height={40}
            width={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG, or GIF (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
};
