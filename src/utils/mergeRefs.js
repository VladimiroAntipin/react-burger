export const mergeRefs =
  (...refs) =>
  (item) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(item);
        return;
      }
      ref.current = item;
    });
  };
