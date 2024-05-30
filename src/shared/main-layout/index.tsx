import Head from "next/head";
import React, { useEffect, useState } from "react";

import Header from "./header";
import Sidebar from "./sidebar";
import SidebarSheet from "./sidebar-sheet";
import { cn } from "../utils/utils";
import { AlertDialog, AlertDialogContent } from "../components/ui/alert-dialog";
import { favIcon } from "../lib/image-config";

const MainLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const sidebarWidth = isExpanded ? "260px" : "84px"; // Adjust as needed

  const bodyWidth = isExpanded
    ? "xl:max-w-[calc(100vw-260px)]"
    : "xl:max-w-[calc(100vw-64px)]";

  useEffect(() => {
    // For opening modal
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    };

    const handleExpand = () => {
      if (window.innerWidth > 1480) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleExpand);

    // Call handleResize initially in case the window size is already less than 1024px
    handleResize();
    handleExpand();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleExpand);
    };
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href={favIcon} />
        <title>MTN</title>
      </Head>

      {/* Body Content */}
      <main>
        <div className="flex transition-all">
          {/* sidebar sheet when in tabs */}
          <Sidebar
            sidebarWidth={sidebarWidth}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />

          <SidebarSheet openSheet={openSheet} setOpenSheet={setOpenSheet} />
          <div className="w-full min-w-0">
            {/* Give css according to header and sidebar  */}
            <div
              className={`overflow-y-scroll h-screen bg-white`}
              // className={`overflow-y-scroll h-screen bg-slate-50 max-w-[100vw] ${bodyWidth}`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={modalOpen}>
        <AlertDialogContent>
          View this content in laptop or desktop.
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MainLayout;
