import apiClient from "@/api/axiosConfig";

import type { ApiResponse } from "@/api/types";

const getJobs = async () => {
  const response = await apiClient.get<ApiResponse>("/");

  return response.data.record.jobs;
};

export default getJobs;
