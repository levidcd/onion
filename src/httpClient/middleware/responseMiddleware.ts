import { MiddlewareAlias } from "../../middlewareCreator/interface";


/**
 * 判断是Json自动转换
 * @param next
 * @returns
 */
export const responseMiddleware: MiddlewareAlias = (next) => async (req) => {
  console.log(req);
  const res = await next(req);

  console.log(res);

  return res;
};
