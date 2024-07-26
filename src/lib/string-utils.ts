export const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const extractJSONfromString = (str: string) => {
  if (!str) return undefined;

  const jsonRegex = /json\s*({[\s\S]*})/;
  const match = str.match(jsonRegex);
  return match ? match[1] : undefined;
}