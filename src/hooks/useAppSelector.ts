import { useSelector, TypedUseSelectorHook } from "react-redux";
import { AppStore } from "../services/store";

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;