import { MiddlewareAlias } from "../../middlewareCreator/interface";

export const logHandler: MiddlewareAlias = (next) => async (req) => {
  let start = Date.now();
  console.log(req);
  console.log(start, req);

  const res = await next(req);
  let end = Date.now();

  console.log(end - start + "ms");

  return res;
};
