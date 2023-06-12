import { Middleware } from "../../middlewareCreator/interface";


export const responseTypeHandler: Middleware = (next) => async (req) => {

  const res = await next(req);


  return req.responseType ? await res[req.responseType]() : res;
};

