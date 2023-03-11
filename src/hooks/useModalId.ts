import { useSearchParams } from "react-router-dom";

export const useModalId = () => {
  const [params] = useSearchParams();
  return params.get("modalId");
};
