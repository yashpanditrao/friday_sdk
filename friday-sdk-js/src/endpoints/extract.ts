import { APIClient } from "../client";

export const extract = (
  client: APIClient,
  url: string,
  query: string,
  customSchema?: Record<string, any>
): Promise<string> => {
  return client.request<string>("/extract", {
    method: "POST",
    body: JSON.stringify({
      url,
      query,
      custom_schema: customSchema
    }),
  });
};
