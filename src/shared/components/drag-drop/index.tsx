import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import { Trash, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const supportedFileTypes = ["jpg", "jpeg", "png", "pdf"];

interface IDragDrop {
  file: File | null;
  setFile: (arg0: any) => void;
  children?: any;
  module: string;
}
const DragDrop = ({ file, setFile, children, module }: IDragDrop) => {
  //   const [file, setFile] = useState<any>(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (newFile: any) => {
    setFile(newFile);
    setPageNumber(1);
    setSuccessMessage("File uploaded successfully!");

    // Reset the success message after a certain duration if needed
  };

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-fit">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={supportedFileTypes}
        className="p-0"
      >
        {children ? (
          children
        ) : (
          <div className="border border-dashed p-8 rounded-lg max-w-[160px] text-center">
            <UploadCloud stroke="#84919A" className="m-auto" />
            {successMessage && file ? (
              <p className="text-sm text-purple-60 font-medium">
                {successMessage}
              </p>
            ) : (
              <p className="text-color font-medium text-sm">
                Drag {module} image here or <br />
                <span className="underline text-purple-60">
                  Select a file
                </span>{" "}
              </p>
            )}
          </div>
        )}
      </FileUploader>

      {file && (
        <div className="mt-4 border rounded-md relative p-2 max-w-[200px] max-h-[200px]">
          <Button
            onClick={() => setFile(null)}
            className="p-0 absolute -top-2 w-[30px] h-[30px] -right-2 z-[1]"
          >
            <Trash width={15} height={15} stroke="#fff" />
          </Button>
          {file.type.startsWith("image/") ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="File Preview"
              width={150}
              height={200}
              className="rounded-md h-full w-full aspect-square object-cover"
              quality={100}
            />
          ) : file.type === "application/pdf" ? (
            <div className="preview-pdf">
              <Document
                file={URL.createObjectURL(file)}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  pageNumber={pageNumber}
                />
              </Document>
              {/* <div>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </div> */}
            </div>
          ) : (
            <p className="text-destructive">
              This file type is not supported for preview.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
