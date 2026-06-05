// Eagerly import all images in this folder as URLs.
// Returns a map of basename (e.g. "login-01.webp") -> resolved asset URL.
const modules = import.meta.glob("./*.{webp,png,jpg,jpeg,svg,gif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const imageMap: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const name = path.replace(/^\.\//, "");
  imageMap[name] = url;
}

export function getImage(name: string): string {
  const url = imageMap[name];
  if (!url && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(`[images] missing asset: ${name}`);
  }
  return url ?? "";
}

export default imageMap;