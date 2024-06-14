import axios from "axios";

const getDlcmData = async (
  page: number,
  pageSize: number,
  searchTerm?: string,
  columns?: string
) => {
  const queryParams = [];

  if (searchTerm) queryParams.push(`searchTerm=${searchTerm}`);
  if (columns) queryParams.push(`columns=${columns}`);

  const queryString = queryParams.join("&");

  const finalUrl = `https://6376-110-44-123-47.ngrok-free.app/dlcm?page=${page}&pageSize=${pageSize}${
    queryString ? `&${queryString}` : ""
  }`;

  const response = await axios.get(finalUrl);
  return response.data;
};

export { getDlcmData };
