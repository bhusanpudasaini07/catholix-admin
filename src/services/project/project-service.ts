import httpRequest from "@/axios/axiosInstance";
import { httpMethods } from "@/enums";

const getProjectList = (
  page?: number,
  per_page?: number,
  keyword?: string,
  risk_status?: string,
  source?: string,
  market?: string,
  type?: string,
  lead?: string,
  date_type?: string,
  date?: string,
  client?: string,
  status?: string
) => {
  if (
    keyword !== "" ||
    status ||
    source ||
    market ||
    type ||
    lead ||
    date_type ||
    date ||
    client
  ) {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}&keyword=${keyword}&risk_status=${risk_status}&source=${source}&market=${market}&type=${type}&lead=${lead}&date_type=${date_type}&date=${date}&client=${client}&status=${status}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/projects?pg=${page}&dataperpage=${per_page}`,
      httpMethods.GET
    );
  }
};

const getProjectDetail = (code: any) => {
  return httpRequest(`/get-single-project?project_id=${code}`, httpMethods.GET);
};

const getRpSummary = (
  code: any,
  date_type?: string,
  date_from?: string,
  date_to?: string,
  month_from?: string,
  month_to?: string
) => {
  if (date_type || date_from || date_to || month_from || month_to) {
    return httpRequest(
      `/get-project-rp-summary?project_id=${code}&date_type=${date_type}&date_from=${date_from}&date_to=${date_to}&month_from=${month_from}&month_to=${month_to}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/get-project-rp-summary?project_id=${code}`,
      httpMethods.GET
    );
  }
};

const getTimeLogs = (
  code: any,
  keyword: string,
  page: any,
  per_page: any,
  fields?: any,
  date_from?: string,
  date_to?: string,
  timelog_date_order?: "DESC" | string
) => {
  if (keyword !== "") {
    return httpRequest(
      `/get-time-logs?project_id=${code}&keyword=${keyword}&pg=${page}&dataperpage=${per_page}`,
      httpMethods.GET
    );
  } else if (fields || date_to) {
    return httpRequest(
      `/get-time-logs?project_id=${code}&pg=${page}&dataperpage=${per_page}&fields=${fields}&date_from=${date_from}&date_to=${date_to}&timelog_date_order=${timelog_date_order}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/get-time-logs?project_id=${code}&pg=${page}`,
      httpMethods.GET
    );
  }
};

const getProjectRelases = (code: any) => {
  return httpRequest(
    `/get-project-releases?project_id=${code}`,
    httpMethods.GET
  );
};

const getProjectStories = (
  code: any,
  keyword?: string,
  sort?: string,
  sort_order?: string
) => {
  if (keyword || sort || sort_order) {
    return httpRequest(
      `/get-user-stories?project_id=${code}&keyword=${keyword}&sort=${sort}&sort_order=${sort_order}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(`/get-user-stories?project_id=${code}`, httpMethods.GET);
  }
};

const getProjectSales = (code: any) => {
  return httpRequest(`/project-sales-rp?project_id=${code}`, httpMethods.GET);
};

const getProjectLatestActivities = (
  code: any,
  page: any,
  per_page: any,
  type?: string,
  date_from?: string,
  date_to?: string
) => {
  if ((type && type !== "all") || date_to) {
    return httpRequest(
      `/get-activity-logs?project_id=${code}&pg=${page}&dataperpage=${per_page}&type=${type}&date_from=${date_from}&date_to=${date_to}`,
      httpMethods.GET
    );
  } else {
    return httpRequest(
      `/get-activity-logs?project_id=${code}&pg=${page}&dataperpage=${per_page}`,
      httpMethods.GET
    );
  }
};

// RP Consumption burndown chart
const getProjectBurndown = (code: any) => {
  return httpRequest(
    `/project-rp-burndown?project_id=${code}`,
    httpMethods.GET
  );
};

const getProjectEstimation = (code: any) => {
  return httpRequest(
    `/project-estimations?project_id=${code}`,
    httpMethods.GET
  );
};

const getProjectTaskLabelRp = (code: any) => {
  return httpRequest(
    `/get-project-task-label-rp?project_id=${code}`,
    httpMethods.GET
  );
};

const getProjectTaskBugRatio = (code: any) => {
  return httpRequest(
    `/get-project-task-bug-ratio?project_id=${code}`,
    httpMethods.GET
  );
};

const getEstimatedActual = (code: any) => {
  return httpRequest(
    `/get-project-role-group-rp-summary?project_id=${code}`,
    httpMethods.GET
  );
};

const getProjectRoleRp = (code: any) => {
  return httpRequest(
    `/get-project-role-rp-summary?project_id=${code}`,
    httpMethods.GET
  );
};

export {
  getProjectList,
  getProjectDetail,
  getRpSummary,
  getTimeLogs,
  getProjectRelases,
  getProjectStories,
  getProjectSales,
  getProjectLatestActivities,
  getProjectBurndown,
  getProjectEstimation,
  getProjectTaskLabelRp,
  getProjectTaskBugRatio,
  getEstimatedActual,
  getProjectRoleRp,
};
