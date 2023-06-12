export type Next = (res: any) => Promise<any>;
export type Middleware = (next: Next) => (res: any) => Promise<any>;
export type MiddlewareAlias = (next: Next) => Next;
