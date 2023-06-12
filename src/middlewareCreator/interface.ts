import { Req } from "../httpClient/Req";
import { Res } from "../httpClient/Res";

export type Next = (res: Req) => Promise<Res>;
export type Middleware = (next: Next) => (res: Req) => Promise<Res>;
export type MiddlewareAlias = (next: Next) => Next;
