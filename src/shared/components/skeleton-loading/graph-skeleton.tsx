import React from "react";

const GraphSkeleton = ({ className }: any) => {
  return (
    <div className={`rounded-md p-4 w-full  ${className}`}>
      <div className="animate-pulse w-full">
        <div className="flex space-x-4 items-baseline m-6">
          <div className="flex-1 h-24 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-36 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-48 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-64 bg-slate-400 rounded w-6"></div>
          <div className="flex-1 h-72 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-64 bg-slate-400 rounded w-6"></div>
          <div className="flex-1 h-48 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-36 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-72 bg-slate-400 rounded w-6"></div>
          <div className="flex-1 h-36 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-48 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-64 bg-slate-400 rounded w-6"></div>
          <div className="flex-1 h-72 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-64 bg-slate-400 rounded w-6"></div>
          <div className="flex-1 h-48 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-36 bg-slate-300 rounded w-6"></div>
          <div className="flex-1 h-24 bg-slate-300 rounded w-6"></div>
        </div>
      </div>
    </div>
  );
};

export default GraphSkeleton;
