import { Middleware } from "./interface";

//  对应函数
export function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return function (...args: any[]) {
      return a(b(...args));
    };
  });
}

export class MiddlewareManger<I, O> {
  constructor() {
    this.use = this.use.bind(this);
  }

  middleware: Middleware<I, O>[] = [];

  use(middleware: Middleware<I, O> | Middleware<I, O>[]) {
    this.middleware = [...this.middleware, ...[middleware]?.flat()];
    return this;
  }

  protected compose<T extends Function>(...funcs: Array<(a: T) => T>) {
    if (funcs.length === 0) {
      return <T>(arg: T) => arg;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce(
      (a, b) =>
        (...args) =>
          a(b(...args))
    );
  }

  protected dispatch = (fn: (req: I) => Promise<O>) =>
    this.compose(...this.middleware)(fn);
}
