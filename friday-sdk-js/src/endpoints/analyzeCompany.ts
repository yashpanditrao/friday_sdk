import { APIClient } from "../client";

export interface AnalyzeCompanyResponse {
  name?: string;
  description?: string;
  industry?: string;
  size?: string;
  website?: string;
  linkedin?: string;
  [key: string]: any; // fallback for unexpected fields
}

export const analyzeCompany = (
  client: APIClient,
  linkedinUrl: string
): Promise<AnalyzeCompanyResponse> => {
  return client.request<AnalyzeCompanyResponse>("/analyze-company", {
    method: "POST",
    body: JSON.stringify({ linkedin_url: linkedinUrl }),
  });
};
