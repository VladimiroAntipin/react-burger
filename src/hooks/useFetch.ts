import { useEffect, useState } from "react";
import { jsonFetch } from "../utils/fetch";

export const useFetch = <T extends { success: boolean }, Err = unknown>(
  url: string
) => {
  const [status, setStatus] = useState("LOADING");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Err | null>(null);

  useEffect(() => {
    jsonFetch<T>(url)
      .then((result) => {
        setData(result);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        setError(error);
        setStatus("ERROR");
      });
  }, [url]);

  return {
    status,
    data,
    error,
    isLoading: status === "LOADING",
    isError: status === "ERROR",
  };
};
