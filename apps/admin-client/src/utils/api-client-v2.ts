
import { ApiResponse, ApiErrorResponse, ApiSuccessResponse } from "../../../api/utils/response";


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
    method: string,
    body?: unknown,
    customHeaders: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: { ...this.headers, ...customHeaders },
        body: body ? JSON.stringify(body) : undefined,
      });

      const responseData = await response.json();

      if (!response.ok) {
        return responseData as ApiErrorResponse;
      }

      return responseData as ApiSuccessResponse<T>;
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : "Network error",
          errorCode: "NETWORK_ERROR",
        },
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
    body?: unknown,
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
