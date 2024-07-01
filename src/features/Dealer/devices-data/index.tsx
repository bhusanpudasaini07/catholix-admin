import DeviceModelsList from "@/features/Devices/details/models-list";
import RegistrationChart from "@/features/Devices/details/registration-chart";
import React from "react";

const DealerDevicesData = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <RegistrationChart />

      <DeviceModelsList
        searchText={""}
        searchTextHandler={() => {}}
        searchTriggerHandler={() => {}}
      />
      {/* <DeviceModelsList
        searchText={searchText}
        searchTextHandler={searchTextHandler}
        searchTriggerHandler={searchTriggerHandler}
      /> */}
    </div>
  );
};

export default DealerDevicesData;
