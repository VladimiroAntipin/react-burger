export const addModalId = (modalId: string, url: string) => {
  const urlObject = new URL(url, window.location.origin);

  urlObject.searchParams.set("modalId", modalId);
  return urlObject.toString().replace(urlObject.origin, '');
};
