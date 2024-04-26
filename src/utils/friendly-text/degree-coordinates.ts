/**
 * Converts coordinates in decimal degrees to a DMS format
 *
 * @component
 * @param num - Decimal degrees
 * @param type - Latitude ("lat") or longitude ("long")
 * @returns A string with degrees, minutes, and seconds
 */
const coordinatesString = (num: number, type: "lat" | "long") => {
  let dir;

  if (num < 0) {
    num *= -1;
    dir = type === "lat" ? "S" : "W";
  } else {
    dir = type === "lat" ? "N" : "E";
  }

  const deg = Math.floor(num);
  const min = Math.floor((num % 1) * 60);
  const sec = (num - deg) * 3600 - min * 60;

  return `${deg}°${min}'${sec.toFixed(1)}" ${dir}`;
};

export default coordinatesString;
