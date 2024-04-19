export function getImageUrl(id: string) {
  return `/example-images/${parseInt(id.slice(0, 8), 16) % 29}.jpg`;
}
