import apiClient from "@/api/axiosConfig";

import type { Degree } from "@/api/types";

const getDegrees = async () => {
  console.log(import.meta.env.VITE_APP_API_ACCESS_KEY);
  const response = await apiClient.get<Degree[]>("/");
  return response.data;
};

export default getDegrees;
