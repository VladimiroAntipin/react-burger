import { BASE_URL } from "../services/reducers/fetchReducer";
import { checkResponse } from "./checkResponse";

export const jsonFetch = <T extends { success: boolean }>(prefix: string) =>
  fetch(`${BASE_URL}${prefix}`)
    .then(checkResponse<T>)
    .then((data) => {
      if (data.success) {
        return data;
      } else {
        throw new Error("Ошибка");
      }
    });
