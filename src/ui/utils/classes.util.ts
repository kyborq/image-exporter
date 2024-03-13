type Classes = string | number | boolean | null | undefined;

export function classes(...args: Classes[]) {
  return args.filter(Boolean).join(" ");
}
