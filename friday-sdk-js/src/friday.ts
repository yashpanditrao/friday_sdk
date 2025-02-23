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
   * @param config - Configuration object containing API key and optional base URL
   */
  constructor(config: FridayClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl?.replace(/\/$/, '') || 'https://friday-data.up.railway.app';
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
  }

  /**
   * Fetch and analyze a LinkedIn profile.
   * @param profileUrl - LinkedIn profile URL to analyze
   */
  async getProfile(profileUrl: string): Promise<ApiResponse> {
    return this.makeRequest('GET', `/profile?profile_url=${encodeURIComponent(profileUrl)}`);
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
   * @param options - Optional parameters for scraping
   */
  async scrape(url: string, options: ScrapeOptions = {}): Promise<ApiResponse> {
    return this.makeRequest('POST', '/scrape', {
      body: JSON.stringify({
        url,
        formats: options.formats || ['html'],
      }),
    });
  }

  /**
   * Crawl a website.
   * @param url - Starting URL to crawl
   * @param options - Optional parameters for crawling
   */
  async crawl(url: string, options: CrawlOptions = {}): Promise<ApiResponse> {
    return this.makeRequest('POST', '/crawl', {
      body: JSON.stringify({
        url,
        formats: options.formats || ['html'],
        max_pages: options.maxPages || 10,
      }),
    });
  }

  /**
   * Perform a Google search.
   * @param query - Search query
   * @param options - Optional parameters for search
   */
  async search(query: string, options: SearchOptions = {}): Promise<ApiResponse> {
    return this.makeRequest('POST', '/search', {
      body: JSON.stringify({
        query,
        location: options.location || 'US',
        num_results: options.numResults || 15,
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