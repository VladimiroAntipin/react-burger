import { ThunkAction } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/checkResponse";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

type FetchAction<T extends string> = {
  type: `${T}-fetch`;
};
type SuccessAction<T extends string, R> = {
  type: `${T}-success`;
  payload: R;
};
type FailAction<T extends string, Err = unknown> = {
  type: `${T}-fail`;
  payload: Err;
};

export type FetchReducerAction<T extends string, Result, Err = unknown> =
  | SuccessAction<T, Result>
  | FailAction<T, Err>
  | FetchAction<T>;

const isFail = <T extends FetchReducerAction<any, any, any>>(
  action: T
): action is Exclude<T, SuccessAction<any, any> | FetchAction<any>> =>
  action.type.endsWith("-fail");

type FetchState<Result, Err = unknown> = {
  data: Result | null;
  error: Err | null;
  status: "STALE" | "FAILED" | "SUCCESS" | "LOADING";
};

export const createFetchReducer = <Url extends string, Result, Err = unknown>(
  url: Url
) => {
  const prefix = url;
  const initialState = {
    data: null,
    error: null,
    status: "STALE",
  } as const;

  const fetchReducer = (
    state: FetchState<Result, Err> = initialState,
    action: FetchReducerAction<Url, Result, Err>
  ): FetchState<Result, Err> => {
    if (!action.type.includes(url)) {
      return state;
    }
    if ("payload" in action) {
      return isFail(action)
        ? {
            data: null,
            error: action.payload as Err,
            status: "FAILED",
          }
        : {
            data: action.payload as Result,
            error: null,
            status: "SUCCESS",
          };
    }

    return {
      data: null,
      error: null,
      status: "LOADING",
    };
  };

  const getAction =
    (): ThunkAction<
      unknown,
      unknown,
      unknown,
      FetchReducerAction<Url, Result, Err>
    > =>
    async (dispatch) => {
      try {
        dispatch({
          type: `${prefix}-fetch`,
        });
        const result = await fetch(`${BASE_URL}${prefix}`).then(checkResponse);
        dispatch({
          type: `${prefix}-success`,
          payload: result as Result,
        });
      } catch (err) {
        dispatch({
          type: `${prefix}-fail`,
          payload: err as Err,
        } as const);
      }
    };

  return {
    getAction,
    fetchReducer,
  };
};