import { useEffect, useState } from "react";
import { jsonFetch } from "../utils/fetch";

export const useFetch = (url) => {
  const [status, setStatus] = useState("LOADING");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    jsonFetch(url)
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
