export const getContentType = (res: Response) =>
  res.headers.get("Content-Type");

export const isJson = (str: string | null | undefined) => /application\/json/.test(str);


export const isStream = (str: string | null | undefined) => /application\/octet-stream/.test(str);


