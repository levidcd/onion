import { Middleware } from "../../middlewareCreator/interface";
import { Req } from "../Req";





export const requestHandler: Middleware = (next) => async (req) => {
  const { url } = req;

  return await next(new Req(req as Req, { url }));
};

