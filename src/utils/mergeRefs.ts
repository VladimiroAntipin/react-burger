export const mergeRefs =
<T>(...refs: React.Ref<T>[]) =>
(item: T | null) => {
  refs.forEach((ref) => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(item);
      return;
    }
    (ref as React.MutableRefObject<T | null>).current = item;
  });
};