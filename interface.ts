export type Next = (res: string) => string;
export type Middleware = (next: Next) => (res: string) => string;
export type MiddlewareAlias = (next: Next) => Next;
