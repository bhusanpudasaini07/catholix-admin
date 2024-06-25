import React from "react";
import ReactECharts from "echarts-for-react";

const RegistrationChart = () => {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-700">
        Number of Registration By Device
      </p>
      <ReactECharts
        option={{}}
        opts={{ renderer: "svg" }}
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
};

export default RegistrationChart;
