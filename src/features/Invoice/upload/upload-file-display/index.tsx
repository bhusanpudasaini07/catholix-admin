import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { RenderZoomProps, zoomPlugin } from "@react-pdf-viewer/zoom";
import { Slider } from "@/shared/components/ui/slider";
import Magnifier from "react-magnifier";
import { ZoomIn } from "lucide-react";

interface IProps {
  invoice_file: any;
}

const UploadFileDisplay = ({ invoice_file }: IProps) => {
  const zoomPluginInstance = zoomPlugin();
  const { Zoom } = zoomPluginInstance;
  return invoice_file && invoice_file.type.startsWith("image/") ? (
    <div className="py-6 px-4 h-[calc(100vh-210px)] overflow-y-scroll">
      <Magnifier
        src={URL.createObjectURL(invoice_file)}
        width={500}
        mgShape="circle"
      />
    </div>
  ) : (
    <div className="py-6 px-4">
      <Zoom>
        {(props: RenderZoomProps) => (
          <div className="flex items-center justify-end mb-8 gap-4">
            <ZoomIn width={18} stroke="#64748B" />
            <Slider
              defaultValue={[1]}
              className="w-40"
              onValueChange={(e: any) => {
                props.onZoom(e[0]);
              }}
              max={2}
              min={0.8}
              step={0.1}
            />
          </div>
        )}
      </Zoom>
      <div className="h-[calc(100vh-320px)] overflow-y-scroll">
        <Worker
          workerUrl={
            "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
          }
        >
          <Viewer
            plugins={[zoomPluginInstance]}
            renderPage={(props) => {
              return props.canvasLayer.children ? (
                <>{props.canvasLayer.children}</>
              ) : (
                <>No pdf</>
              );
            }}
            fileUrl={URL.createObjectURL(invoice_file)}
          />
        </Worker>
      </div>
    </div>
  );
};

export default UploadFileDisplay;
