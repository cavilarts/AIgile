export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const extractJSONfromString = (str: string) => {
  const jsonRegex = /json\s*({[\s\S]*})/;
  const match = str.match(jsonRegex);
  return match ? match[1] : undefined;
}