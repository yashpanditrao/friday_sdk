interface FridayClientConfig {
  apiKey: string;
  baseUrl?: string;
}

interface SearchOptions {
  location?: string;
  numResults?: number;
}

interface CrawlOptions {
  formats?: string[];
  maxPages?: number;
}

interface ScrapeOptions {
  formats?: string[];
}

interface ApiResponse<T = any> {
  data: T;
  error?: string;
}

export class FridayClient {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Initialize the Friday API client.
   * @param apiKey - Your Friday API key
   * @param baseUrl - Optional base URL for the API
   */
  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl?.replace(/\/$/, '') || 'https://api.fridaydata.tech';
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Request failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Fetch and analyze a LinkedIn profile.
   * @param profileUrl - LinkedIn profile URL to analyze
   */
  async getProfile(profileUrl: string): Promise<ApiResponse> {
    return this.makeRequest('GET', `/profile?profile_url=${profileUrl}`);
  }

  /**
   * Analyze a company based on its LinkedIn URL.
   * @param linkedinUrl - Company's LinkedIn URL
   */
  async analyzeCompany(linkedinUrl: string): Promise<ApiResponse> {
    return this.makeRequest('POST', '/analyze-company', {
      body: JSON.stringify({ linkedin_url: linkedinUrl }),
    });
  }

  /**
   * Scrape a website.
   * @param url - URL to scrape
   * @param formats - Output formats (default: ['html'])
   */
  async scrape(url: string, formats: string[] = ['html']): Promise<ApiResponse> {
    return this.makeRequest('POST', '/scrape', {
      body: JSON.stringify({
        url,
        formats,
      }),
    });
  }

  /**
   * Crawl a website.
   * @param url - Starting URL to crawl
   * @param formats - Output formats (default: ['html'])
   * @param maxPages - Maximum number of pages to crawl (default: 10)
   */
  async crawl(
    url: string,
    formats: string[] = ['html'],
    maxPages: number = 10
  ): Promise<ApiResponse> {
    return this.makeRequest('POST', '/crawl', {
      body: JSON.stringify({
        url,
        formats,
        max_pages: maxPages,
      }),
    });
  }

  /**
   * Perform a Google search.
   * @param query - Search query
   * @param location - Search location (default: 'US')
   * @param numResults - Number of results to return (default: 15)
   * @returns Promise<ApiResponse> - Returns either an object or array response
   */
  async search(
    query: string,
    location: string = 'US',
    numResults: number = 5
  ): Promise<ApiResponse> {
    return this.makeRequest('POST', '/search', {
      body: JSON.stringify({
        query,
        location,
        num_results: numResults,
      }),
    });
  }

  /**
   * Extract specific information from a website using AI.
   * @param url - Website URL to analyze
   * @param query - Query describing what information to extract
   */
  async extract(url: string, query: string): Promise<ApiResponse> {
    return this.makeRequest('POST', '/extract', {
      body: JSON.stringify({ url, query }),
    });
  }

  /**
   * Get current API key status and rate limit information.
   */
  async getStatus(): Promise<ApiResponse> {
    return this.makeRequest('GET', '/status');
  }
}