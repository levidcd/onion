export const getContentType = (res: Response) =>
  res.headers.get("Content-Type");

export const isJson = (str: string | null | undefined) =>
  str && /application\/json/.test(str);

export const isStream = (str: string | null | undefined) =>
  str && /application\/octet-stream/.test(str);
