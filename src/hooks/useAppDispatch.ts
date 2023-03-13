import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppAction, AppStore } from "../services/store";

type GetDispatch = () => ThunkDispatch<AppStore, unknown, AppAction>;

export const useAppDispatch: GetDispatch = useDispatch;