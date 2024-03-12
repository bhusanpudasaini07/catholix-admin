import ReactECharts, { EChartsOption } from 'echarts-for-react';
import React from 'react';

import { IType, ITypeCount } from '@/interface/project-interface';
import { DataTable } from '@/shared/components/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface IProps {
  columns: ColumnDef<ITypeCount>[];
  statusData: IType | undefined;
  loading: boolean;
  option: EChartsOption;
  chartRef: any;
}

const ProjectDetailStatus = ({
  columns,
  statusData,
  loading,
  option,
  chartRef,
}: IProps) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <DataTable
          border
          height="max-h-[350px]"
          headerSticky
          columns={columns}
          loading={loading}
          data={statusData?.count ?? []}
        />
      </div>

      <div className="col-span-2">
        <ReactECharts
          ref={chartRef}
          opts={{ renderer: "svg" }}
          option={option}
        />
      </div>
    </div>
  );
};

export default ProjectDetailStatus;
