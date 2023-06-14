import { Logger } from "../utils/logger";
import { HttpClientMiddleware } from "../types";

export const takeTimeHandler: HttpClientMiddleware = (next) => async (req) => {
  const start = Date.now();

  const res = await next(req);
  const end = Date.now();
  
  if (req.debug) {
    console.log(`${req.url} 请求耗时:  ${end - start}ms`);
  }

  return res;
};
