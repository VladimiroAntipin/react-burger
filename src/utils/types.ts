import { ReactNode } from "react";
import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

export interface Ingredient {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  }
  
  export type IngredientType = "bun" | "main" | "sauce";

  export type ProviderProps = {
    children: ReactNode
  }

export type ThunkActionShort<T extends Action<any>> = ThunkAction<
  unknown,
  unknown,
  unknown,
  T
>;
export type ThunkActionS<T extends Action<any>> = ThunkActionShort<T>;

  export type CreateResponse<T> =
  | {
      success: false;
    }
  | ({
      success: true;
    } & T);

export type OrderResponse = CreateResponse<{
  name: string;
  order: {
    number: number;
  };
}>;

export type UserData = {
  email: string;
  name: string;
};

export type UserResponse = CreateResponse<{
  user: UserData;
}>;

export type SignInResponse = CreateResponse<{
  user: UserData;
  refreshToken: string;
  accessToken: string;
}>;

export type SignInRequestData = {
  email: string;
  password: string;
};
export type RegisterRequestData = {
  email: string;
  password: string;
  name: string;
};