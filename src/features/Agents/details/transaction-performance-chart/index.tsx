import React from "react";
import ReactECharts from "echarts-for-react";

const TransactionPerformanceChart = () => {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-700">
        Transaction Performance By Agent
      </p>
      <ReactECharts
        option={{}}
        opts={{ renderer: "svg" }}
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
};

export default TransactionPerformanceChart;
