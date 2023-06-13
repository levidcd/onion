export type Next<I, O> = (res: I) => Promise<O>;
export type Middleware<I, O> = (next: Next<I, O>) => (res: I) => Promise<O>;
export type MiddlewareAlias<I, O> = (next: Next<I, O>) => Next<I, O>;
