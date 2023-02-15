import { BASE_URL } from "../services/reducers/fetchReducer";
import { checkResponse } from "./checkResponse";

export const jsonFetch = (prefix) =>
  fetch(`${BASE_URL}${prefix}`)
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        return data
      } else {
        throw new Error("Ошибка")
      }
    })
