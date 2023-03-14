export const isNumber = (v: unknown): v is number => typeof v === "number";
export const isObject = (v: unknown): v is object =>
  typeof v === "object" && v !== null;
export const isString = (v: unknown): v is string => typeof v === "string";

type Get<T, Prop> = Prop extends keyof T ? T[Prop] : unknown;

export const get = <V, Prop extends string>(value: V, prop: Prop) =>
  (isObject(value) ? (value as Record<Prop, unknown>)[prop] : undefined) as Get<
    V,
    Prop
  >;