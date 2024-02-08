import Head from "next/head";
import React, { useState } from "react";
import Header from "./header";
import SidebarNew from "./sidebar-new";
// import { FavIcon } from "../lib/image-config";
import SidebarSheet from "./sidebar-sheet";

const MainLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);

  const sidebarWidth = isExpanded ? "260px" : "64px"; // Adjust as needed

  const bodyWidth = isExpanded
    ? "lg:max-w-[calc(100vw-260px)]"
    : "lg:max-w-[calc(100vw-64px)]";

  return (
    <>
      <Head>
        <title>Resource Planning{title && `| ${title}`}</title>
      </Head>

      {/* Body Content */}
      <main>
        <Header
          openSheet={openSheet}
          setOpenSheet={setOpenSheet}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <div className="flex transition-all">
          {/* sidebar sheet when in tabs */}
          <SidebarNew sidebarWidth={sidebarWidth} isExpanded={isExpanded} />

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
    </>
  );
};

export default MainLayout;
