export interface ResponseData<T> {
  data: T | null;
  success?: boolean;
  error?: {
    message: string;
    status?: number;
  };
}

export type ApiResponse<T> = Promise<ResponseData<T>>;

type FetchOptions = RequestInit & { params?: Record<string, string> };

class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );
    }
    return url.toString();
  }

  async request(
    method: string,
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method,
      headers: { ...this.headers, ...fetchOptions.headers },
      ...fetchOptions,
    });

    return response;
  }

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.request("GET", endpoint, options);
  }

  post<T>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request("POST", endpoint, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request("PUT", endpoint, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.request("DELETE", endpoint, options);
  }
}

// utils/api.ts
export const fetchData = async <T>(
  url: string
): Promise<ApiResponse<T | null>> => {
  try {
    const apiClient = new ApiClient("http://localhost:8000"); // switch to some env variable passed from config
    const response = await apiClient.get(url);

    if (!response.ok) {
      const errorResponse = await getErrorResponse(response);
      console.error(`API Error (${url}):`, errorResponse.error?.message);
      return errorResponse;
    }

    const { data } = await response.json();

    if (data === undefined) {
      throw new Error("Invalid response data");
    }
    return { data };
  } catch (error) {
    console.error(`Catched error for url: ${url}:`, error);
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An error occurred",
      },
    };
  }
};

export const postData = async <T>(
  url: string,
  body: any
): Promise<ApiResponse<T | null>> => {
  try {
    const apiClient = new ApiClient("http://localhost:8000"); // switch to some env variable passed from config
    const response = await apiClient.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await getErrorResponse(response);
      console.error(`API Error (${url}):`, errorResponse.error?.message);
      return errorResponse;
    }

    const { data } = await response.json();

    if (data === undefined) {
      throw new Error("Invalid response data");
    }
    return { data };
  }
  catch (error) {
    console.error(`Catched error for url: ${url}:`, error);
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "An error occurred",
      },
    };
  }
};

const getErrorResponse = async (
  response: Response
): Promise<ApiResponse<null>> => {
  try {
    const errorBody = await response.json();
    return {
      data: null,
      error: {
        status: response.status,
        message: errorBody.error || response.statusText,
      },
    };
  } catch {
    return {
      data: null,
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }
};
