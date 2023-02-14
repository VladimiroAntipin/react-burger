import { checkResponse } from "./checkResponse";

export const jsonFetch = (url) =>
  fetch(url)
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        return data
      } else {
        throw new Error("Ошибка")
      }
    })
