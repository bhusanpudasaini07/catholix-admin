import ReactECharts from 'echarts-for-react';
import React from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';

interface IProps {
  timeConusmedOption: any;
}

const TopTimeConsumed = ({ timeConusmedOption }: IProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Top 5 Most Time Consumed */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-10">
            <p className="text-lg font-medium text-zinc-700">
              Top 5 Most Time Consumed
            </p>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <ReactECharts
              option={timeConusmedOption}
              showLoading={true}
              loadingOption={true}
              opts={{ renderer: "svg" }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Most Time Consumed for Git Commit */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-10">
            <p className="text-lg font-medium text-zinc-700">
              Top 10 Most Time Consumed for Git Commit
            </p>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <ReactECharts
              option={timeConusmedOption}
              showLoading={true}
              loadingOption={true}
              opts={{ renderer: "svg" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopTimeConsumed;
