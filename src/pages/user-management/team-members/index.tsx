import MainLayout from "@/shared/main-layout";
import { getI18nProps } from "@/shared/utils/i18n-utils/i18n.util";
import React from "react";
import { NextPageWithLayout } from "../../_app";
import TeamMembersTable from "@/features/User-Management/team-members/team-members-table";

const TeamMembersList: NextPageWithLayout = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-b-slate-100">
        <div>
          <h4 className="flex items-center gap-2 mb-1 text-2xl font-medium text-zinc-700">
            Team Member List
          </h4>
          <p className="text-base font-normal text-zinc-500">
            List of individual members
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 max-h-[calc(100vh-115px)] overflow-auto">
        <TeamMembersTable />
      </div>
    </div>
  );
};

export default TeamMembersList;

export const getStaticProps = getI18nProps;

TeamMembersList.getLayout = (page) => {
  return <MainLayout title="Report">{page}</MainLayout>;
};
