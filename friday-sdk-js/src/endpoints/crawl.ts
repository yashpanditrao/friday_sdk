import { APIClient } from "../client";

export interface CrawlOptions {
  formats: Array<"html" | "markdown" | "text" | "links">;
  maxPages?: number;
}

export interface CrawlResponse {
  pages: Array<{
    url: string;
    html?: string;
    markdown?: string;
    text?: string;
    links?: string[];
  }>;
}

export const crawl = (
  client: APIClient,
  url: string,
  options: CrawlOptions
): Promise<CrawlResponse> => {
  return client.request<CrawlResponse>("/crawl", {
    method: "POST",
    body: JSON.stringify({
      url,
      ...options,
    }),
  });
};
