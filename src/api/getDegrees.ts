import apiClient from "@/api/axiosConfig";

import type { ApiResponse } from "@/api/types";

const getDegrees = async () => {
  const response = await apiClient.get<ApiResponse>("/");

  return response.data.record.degrees;
};

export default getDegrees;
