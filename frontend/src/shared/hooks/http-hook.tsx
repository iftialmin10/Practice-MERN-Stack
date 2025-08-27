import { useCallback, useEffect, useRef, useState } from "react";

interface SendRequestParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown> | null;
  headers?: Record<string, string>;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = {},
    }: SendRequestParams): Promise<Response> => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, method, body, headers, signal: httpAbortCtrl.signal);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(()=>{
    return()=>{activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())}
  },[])

  return { isLoading, error, sendRequest, clearError };
};
