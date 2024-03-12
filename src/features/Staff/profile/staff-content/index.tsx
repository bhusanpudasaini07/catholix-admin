import React from 'react';

import useStaffDetail from '@/hooks/staff/useStaffDetail.hook';

import AllTimeProjects from './all-time-projects';
import StaffDetailOverview from './details-overview';
import StaffProjectsList from './projects-list';
import ProjectsOverview from './projects-overiew';
import RPAllocation from './rp-allocation';
import DailyRPUtilization from './rp-utilization/daily';
import MonthlyRPUtilization from './rp-utilization/monthly';

const StaffContent = () => {
  const {
    staffDetails,
    staffDetailsLoading,
    staffLog,
    staffLogLoading,
    rpDate,
    rpDateOpen,
    setRpDateOpen,
    changeRPDate,
  } = useStaffDetail();
  return (
    <div className="grid grid-cols-1 gap-4">
      <StaffDetailOverview
        loading={staffDetailsLoading}
        name={staffDetails?.data?.fullname ?? ""}
        email={staffDetails?.data?.email ?? ""}
        image={staffDetails?.data?.profile_image ?? ""}
        designation={staffDetails?.data?.role?.name ?? ""}
        ic={staffDetails?.data?.ic_level ?? ""}
        phone={staffDetails?.data?.phone ?? ""}
        // address={staffDetails?.data?.address ?? ""}
        joined_date={staffDetails?.data?.join_date ?? ""}
        careerExp={staffDetails?.data?.career_date ?? ""}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RPAllocation
          report={{
            total: staffLog?.data?.report?.total_rp ?? 0,
            client: staffLog?.data?.report?.client_rp ?? 0,
            inhouse: staffLog
              ? staffLog?.data?.report?.total_rp -
                staffLog?.data?.report?.client_rp
              : 0,
          }}
          loading={staffLogLoading}
          date={rpDate}
          setDate={changeRPDate}
          dateOpen={rpDateOpen}
          setDateOpen={setRpDateOpen}
        />
        <ProjectsOverview />
      </div>
      <StaffProjectsList />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DailyRPUtilization />
        <MonthlyRPUtilization />
      </div>
      <AllTimeProjects />
    </div>
  );
};

export default StaffContent;
