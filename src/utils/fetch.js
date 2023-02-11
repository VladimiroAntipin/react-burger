export const jsonFetch = (url) =>
  fetch(url).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  );
