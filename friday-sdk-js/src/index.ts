import { APIClient } from "./client";
import { SDKOptions } from "./types";
import { getStatus } from "./endpoints/status";
import { scrape, ScrapeOptions, ScrapeResponse } from "./endpoints/scrape";
import { crawl, CrawlOptions, CrawlResponse } from "./endpoints/crawl";
import { analyzeCompany, AnalyzeCompanyResponse } from "./endpoints/analyzeCompany";
import { extract } from "./endpoints/extract";
import { search } from "./endpoints/search"; 
import { getProfile, LinkedInProfileResponse } from "./endpoints/profile";

export class FridayClient {
    private client: APIClient;
  
    constructor(options: SDKOptions) {
      this.client = new APIClient(options);
    }
  
    get_status() {
      return getStatus(this.client);
    }
  
    scrape(url: string, options: ScrapeOptions): Promise<ScrapeResponse> {
      return scrape(this.client, url, options);
    }

    crawl(url: string, options: CrawlOptions): Promise<CrawlResponse> {
        return crawl(this.client, url, options);
      }

    analyzeCompany(linkedinUrl: string): Promise<AnalyzeCompanyResponse> {
        return analyzeCompany(this.client, linkedinUrl);
    }

    extract(url: string, query: string): Promise<string> {  
        return extract(this.client, url, query);
    }

    search(query: string, location: string, numResults: number): Promise<string> {
        return search(this.client, query, location, numResults);
    }
    getProfile(profileUrl: string): Promise<LinkedInProfileResponse> {
        return getProfile(this.client, profileUrl);
    }
    
}
  