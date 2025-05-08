export interface SDKOptions {
    apiKey: string;
    baseUrl?: string;
}

export interface ApiResponse<T = any> {
    success:boolean;
    data?: T;
    error?: string;

}