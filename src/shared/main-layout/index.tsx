import Head from "next/head";
import React, { useEffect, useState } from "react";

import Header from "./header";
import SidebarNew from "./sidebar-new";
import SidebarSheet from "./sidebar-sheet";

const MainLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [screenSize, setScreenSize] = useState<number | null>(null);

  const sidebarWidth = isExpanded ? "260px" : "64px"; // Adjust as needed

  const bodyWidth = isExpanded
    ? "xl:max-w-[calc(100vw-260px)]"
    : "xl:max-w-[calc(100vw-64px)]";

  useEffect(() => {
    if (window.innerWidth) {
      setScreenSize(window.innerWidth);
    }
  }, [screenSize]);
  return (
    <>
      <Head>
        <title>Resource Planning</title>
      </Head>

      {/* Body Content */}
      <main>
        <div className="flex transition-all">
          {/* sidebar sheet when in tabs */}
          <SidebarNew
            sidebarWidth={sidebarWidth}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />

          <SidebarSheet openSheet={openSheet} setOpenSheet={setOpenSheet} />
          <div className="flex-grow ">
            {/* Give css according to header and sidebar  */}
            <div
              className={`bg-slate-50 h-[calc(100vh-180px)] lg:h-[calc(100vh-56px)] max-w-[100vw] ${bodyWidth} overflow-y-scroll`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
      {/* 
      <AlertDialog open={screenSize! < 1024}>
        <AlertDialogContent>
          View this content in laptop or desktop.
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
};

export default MainLayout;
