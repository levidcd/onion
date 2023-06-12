//  对应函数
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return function (...args) {
      return a(b(...args));
    };
  });
}

export class MiddlewareManger {
  constructor() {
    this.use = this.use.bind(this);
  }

  middleware: Middleware[] = [];

  use(middleware: Middleware | Middleware[]) {
    this.middleware = [...this.middleware, ...[middleware]?.flat()];
    return this;
  }

  protected compose(...funcs) {
    if (funcs.length === 0) {
      return (arg) => arg;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce((a, b) => {
      return function (...args) {
        return a(b(...args));
      };
    });
  }

  protected dispatch(fn) {
    const dispatch = this.compose(...this.middleware);
    return dispatch(fn);
  }
}
