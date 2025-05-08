import { APIClient } from "../client";

export const extract = (
  client: APIClient,
  url: string,
  query: string
): Promise<string> => {
  return client.request<string>("/extract", {
    method: "POST",
    body: JSON.stringify({ url, query }), // Send URL and query in the body
  });
};
