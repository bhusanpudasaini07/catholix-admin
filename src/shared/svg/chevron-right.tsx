import React from "react";

const ChevronRight = (props: any) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.6 15.5H15L9.4 8.5L15 1.5H6.6L1 8.5L6.6 15.5Z"
        stroke="black"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRight;
