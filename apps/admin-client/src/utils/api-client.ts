import { ApiResponse } from "./request";

export class ApiClient {
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

      // handle HTTP errors (eg. 4xx, 5xx)
      if (!response.ok) {
        return await this.getErrorResponse(response);
      }
      if(response.status === 204) {
        return { data: null };
      }

      const json = await response.json();

      // check if response has acceptable format
      if (json.data === undefined && response.status !== 204 && json.success !== true) {
        console.warn(`Warning: Unexpected response format from ${url}`);
        return {
          data: null,
          error: {
            message: `Invalid response format (response status: ${response.status}`,
          },
        };
      }

      return { data: json.data };
    } catch (error) {
      console.error(`Caught error for url: ${url}:`, error);
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : "An error occurred",
        },
      };
    }
  }

  private async getErrorResponse(
    response: Response
  ): Promise<ApiResponse<null>> {
    try {
      const errorData = await response.json();
      return {
        data: null,
        error: {
          message: errorData?.error || `HTTP ${response.status}`,
          status: response.status,
        },
      };
    } catch {
      return {
        data: null,
        error: { message: `HTTP ${response.status}: ${response.statusText}` },
      };
    }
  }

  get<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  post<T>(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "POST", body, headers);
  }

  put<T>(
    endpoint: string,
    body: any,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "PUT", body, headers);
  }

  delete<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T | null>> {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}
