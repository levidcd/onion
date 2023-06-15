import { Logger } from "../utils/logger";
import { IMiddleware } from "../types";

export const takeTimeHandler: IMiddleware = (next) => async (req) => {
  const start = Date.now();

  const res = await next(req);
  const end = Date.now();
  
  if (req.debug) {
    console.log(`${req.url} 请求耗时:  ${end - start}ms`);
  }

  return res;
};
