import { MiddlewareAlias } from "../../middlewareCreator/interface";

export const authHandler: MiddlewareAlias = (next) => async (req) => {
  console.log(req)
  req.headers.set("x-requested-with", encodeURIComponent("贺千禧"));

  const res = await next(req);
  let end = Date.now();

  return res;
};
