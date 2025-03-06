export interface ResponseData<T> {
  data: T | null;
  error?: {
    message: string;
    status?: number;
  };
}

export type ApiResponse<T> = Promise<ResponseData<T>>;

// utils/api.ts
export const fetchData = async <T>(
  url: string
): Promise<ApiResponse<T | null>> => {
  try {
    const response = await fetch(url);

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
    console.error(`Error (${url}):`, error);
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
