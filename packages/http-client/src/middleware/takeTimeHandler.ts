import { Logger } from "../utils/logger";
import { HttpClientMiddleware } from "../types";


export const takeTimeHandler: HttpClientMiddleware = (next) => async (req) => {
  const start = Date.now();

  const res = await next(req);
  const end = Date.now();

  Logger.debug(`${req.url} 请求耗时:  ${end - start}ms`);

  return res;
};
