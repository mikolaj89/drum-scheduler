import { ApiResponse } from "./request";

  
 export  class ApiClient {
    private baseUrl: string;
    private headers: Record<string, string>;
  
    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
      this.baseUrl = baseUrl;
      this.headers = {
        "Content-Type": "application/json",
        ...defaultHeaders,
      };
    }
  
    setHeader(key: string, value: string) {
      this.headers[key] = value;
    }
  
    async request<T>(
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE",
      body?: any,
      customHeaders: Record<string, string> = {}
    ): Promise<ApiResponse<T | null>> {
      const url = `${this.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: { ...this.headers, ...customHeaders },
        body: body ? JSON.stringify(body) : undefined,
      };
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          const errorResponse = await this.getErrorResponse(response);
          console.error(`API Error (${url}):`, errorResponse.error?.message);
          return errorResponse;
        }
  
        const { data } = await response.json();
        if (data === undefined) {
          throw new Error("Invalid response data");
        }
  
        return { data };
      } catch (error) {
        console.error(`Caught error for url: ${url}:`, error);
        return {
          data: null,
          error: { message: error instanceof Error ? error.message : "An error occurred" },
        };
      }
    }
  
    private async getErrorResponse(response: Response): Promise<ApiResponse<null>> {
      try {
        const errorData = await response.json();
        return {
          data: null,
          error: { message: errorData?.error?.message || `HTTP ${response.status}` },
        };
      } catch {
        return {
          data: null,
          error: { message: `HTTP ${response.status}: ${response.statusText}` },
        };
      }
    }
  
    get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<ApiResponse<T | null>> {
      return this.request<T>(endpoint, "GET", undefined, headers);
    }
  
    post<T>(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<ApiResponse<T | null>> {
      return this.request<T>(endpoint, "POST", body, headers);
    }
  
    put<T>(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<ApiResponse<T | null>> {
      return this.request<T>(endpoint, "PUT", body, headers);
    }
  
    delete<T>(endpoint: string, headers: Record<string, string> = {}): Promise<ApiResponse<T | null>> {
      return this.request<T>(endpoint, "DELETE", undefined, headers);
    }
  }
  