import useLeadReport from "@/hooks/team/team-leads/useLeadReport.hook";
import DateRangeFilter from "@/shared/components/date-range-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

const LeadHeader = ({ setDateRange, dateRange }: any) => {
  const {
    router,
    current_id,

    selected,
    dateRangeOpen,
    setDateRangeOpen,
    handleChange,
    weeklyData,
    leadsLoading,
    leadList,
    current_page,
    handleLeadsId,
  } = useLeadReport();

  return (
    <div className="flex justify-between items-center bg-white p-8">
      <div className="">
        <h3 className="mb-1.5 text-2xl font-medium text-zinc-700">
          Lead Report -&nbsp;{current_page}
        </h3>
        <p className="text-base text-zinc-500">Report of all the members</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Select
          value={current_id ? current_id?.toString() : "all"}
          onValueChange={(e) => handleLeadsId(e)}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {leadList?.data
              ?.filter((lead: any) => lead?.status === "Active")
              ?.map((lead: any) => (
                <SelectItem key={lead.id} value={lead.id}>
                  {lead.fullname}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Tabs
          defaultValue="monthly"
          className=" flex items-center flex-row-reverse gap-3"
        >
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
            <TabsTrigger value="multi_week">Multiple Weekly Report</TabsTrigger>
          </TabsList>

          <TabsContent className="!m-0" value="monthly">
            <DateRangeFilter
              placeholder="Select Monthly"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </TabsContent>
          <TabsContent className="!m-0" value="daily">
            <DateRangeFilter
              placeholder="Select Daily"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </TabsContent>
          <TabsContent className="!m-0" value="weekly">
            <Select onValueChange={handleChange} value={selected}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent>
                {weeklyData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent className="!m-0" value="multi_week">
            <DateRangeFilter
              placeholder="Select Multiple Weekly"
              dateRangeOpen={dateRangeOpen}
              setDateRangeOpen={setDateRangeOpen}
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeadHeader;
