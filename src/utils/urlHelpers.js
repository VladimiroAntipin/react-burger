export const addModalId = (modalId, url) => {
  const urlObject = new URL(url, window.location.origin);

  urlObject.searchParams.set("modalId", modalId);
  return urlObject.toString().replace(urlObject.origin, '');
};
