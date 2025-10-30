export type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

export type ApiErrorResponse = {
  error: {
    internalCode?: number;
    message?: string;
  };
};
