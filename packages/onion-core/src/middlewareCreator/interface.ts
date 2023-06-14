export type Next<I, O> = (req: I) => Promise<O>;
export type Middleware<I, O> = (next: Next<I, O>) => Next<I, O>;
