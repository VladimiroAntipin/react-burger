import { useEffect, useState } from "react";
import { jsonFetch } from "../utils/fetch";

export const useFetch = (url) => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    jsonFetch(url)
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [url]);

  return {
    status,
    data,
    error,
    isLoading: status === "loading",
    isError: status === "error",
  };
};