import { APIClient } from "../client";

export interface LinkedInProfileResponse {
  name?: string;
  headline?: string;
  about?: string;
  location?: string;
  experiences?: any[];
  education?: any[];
  skills?: string[];
  [key: string]: any; // extra fields
}

export const getProfile = (
  client: APIClient,
  profileUrl: string
): Promise<LinkedInProfileResponse> => {
  const encodedUrl = encodeURIComponent(profileUrl);
  return client.request<LinkedInProfileResponse>(`/profile?profile_url=${encodedUrl}`);
};
