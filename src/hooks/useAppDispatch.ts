import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store";

type TGetDispatch = () => AppDispatch;
export const useAppDispatch: TGetDispatch = useDispatch;