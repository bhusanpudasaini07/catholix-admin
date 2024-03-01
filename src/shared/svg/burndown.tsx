import React from "react";

const BurndownSvg = (props: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 2.5V17.5H17.5M16.5 13.5L11.6667 11.6667L8.33333 8.33333L5.5 7"
        stroke="#71717A"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BurndownSvg;
