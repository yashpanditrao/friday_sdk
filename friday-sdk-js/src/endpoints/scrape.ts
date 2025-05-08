import { APIClient } from "../client";

export interface ScrapeOptions {
  formats: Array<"html" | "markdown" | "text" | "links">;
}

export interface ScrapeResponse {
  html?: string;
  markdown?: string;
  text?: string;
  links?: string[];
}

export const scrape = (
  client: APIClient,
  url: string,
  options: ScrapeOptions
): Promise<ScrapeResponse> => {
  return client.request<ScrapeResponse>("/scrape", {
    method: "POST",
    body: JSON.stringify({
      url,
      ...options,
    }),
  });
};
