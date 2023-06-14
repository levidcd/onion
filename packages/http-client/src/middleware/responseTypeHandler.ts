import { HttpClientMiddleware } from "../types";


export const responseTypeHandler: HttpClientMiddleware = (next) => async (req) => {
  const res = await next(req);
  try {
    if (req.responseType === "json") {
      return await res[req.responseType]();
    }

    return req.responseType
      ? {
          code: 0,
          data: await res[req.responseType](),
          msg: "",
          resInfo: res,
        }
      : res;
  } catch (error) {
    console.error(error);
    return res;
  }
};
