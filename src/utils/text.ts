export function truncDescription(text: string, length: number) {
  const clamp = "...";
  return text.length > length ? text.slice(0, length) + clamp : text;
}
