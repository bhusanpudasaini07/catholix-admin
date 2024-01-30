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

  const sidebarWidth = isExpanded ? "250px" : "80px"; // Adjust as needed

  const bodyWidth = isExpanded
    ? "lg:max-w-[calc(100vw-250px)]"
    : "lg:max-w-[calc(100vw-80px)]";

  return (
    <>
      <Head>
        <title>Orion {title && `| ${title}`}</title>
        {/* <link rel="icon" type="image/x-icon" href={FavIcon}></link> */}
      </Head>

      {/* Body Content */}
      <main className="flex transition-all">
        <SidebarNew sidebarWidth={sidebarWidth} isExpanded={isExpanded} />

        {/* sidebar sheet when in tabs */}
        <SidebarSheet openSheet={openSheet} setOpenSheet={setOpenSheet} />

        <div className="flex-grow">
          <Header
            openSheet={openSheet}
            setOpenSheet={setOpenSheet}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
          {/* Give css according to header and sidebar  */}
          <div
            className={`bg-white px-4 py-7 h-[calc(100vh-180px)] lg:h-[calc(100vh-65px)] max-w-[100vw] ${bodyWidth} overflow-y-scroll`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
