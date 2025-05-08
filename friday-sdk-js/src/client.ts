import { SDKOptions } from "./types";

export class APIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: SDKOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || "https://api.fridaydata.tech";
 
  }

  async request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error ${res.status}: ${errorText}`);
    }

    return res.json();
  }
}
