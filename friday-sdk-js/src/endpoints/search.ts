import { APIClient } from "../client";

export const search = (
  client: APIClient,
  query: string,
  location: string,
  numResults: number
): Promise<string> => {
  return client.request<string>("/search", {
    method: "POST",
    body: JSON.stringify({ query, location, num_results: numResults }), 
  });
};
