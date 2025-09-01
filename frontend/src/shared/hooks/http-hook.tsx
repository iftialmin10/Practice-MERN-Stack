import { useState, useCallback, useRef, useEffect } from "react";

interface UseHttpClientHook {
  isLoading: boolean;
  error: string | null;
  sendRequest: <T = any>(
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: BodyInit | null,
    headers?: Record<string, string>
  ) => Promise<T>;
  clearError: () => void;
}

export const useHttpClient = (): UseHttpClientHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
      body: BodyInit | null = null,
      headers: Record<string, string> = {}
    ): Promise<T> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData: T = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(
            (responseData as any).message || "Something went wrong!"
          );
        }

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        if (err.name === "AbortError") {
          return Promise.reject(err);
        }
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
