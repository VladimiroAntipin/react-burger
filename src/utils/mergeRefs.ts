export const mergeRefs =
  (...refs: any) =>
  (item: any) => {
    refs.forEach((ref: any) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(item);
        return;
      }
      ref.current = item;
    });
  };
