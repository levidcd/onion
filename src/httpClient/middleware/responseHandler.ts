import { Middleware } from "../../middlewareCreator/interface";
import { Res } from "../Res";

export const responseHandler: Middleware = (next) => async (req) => {

  /** 只处理res */
  const response: Response = await next(req);


  if (req.throwHttpError && !response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  // /** 如果是JSON处理后返回 */

  return new Res(response, { ...req });
};
