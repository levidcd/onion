class Onions {
  middleware = [];
}

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};
/**
 *
 */
export type Next = (req) => Promise<any>;
/**
 *
 */
export type Middleware = (next: Next) => (req) => Promise<any>;

const a: Middleware = (next) => async (req) => {
  console.log(next);
  console.log(req);
  console.log('a 进入');
  const res = await next(req);
  console.log('a 出');
  return res;
};
const b: Middleware = (next) => async (req) => {
  console.log(next);
  console.log(req);
  console.log('b 进入');
  const res = await next(req);
  console.log('b 出');
  return res;
};
const c: Middleware = (next) => async (req) => {
  console.log(next);
  console.log(req);
  console.log('c 进入');
  const res = await next(req);
  console.log('c 出');
  return res;
};
const dispatch = compose(a, b, c);

const fetch = (req) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ ...req, time: Date.now().toLocaleString() });
    }, 1000);
  });

const request = (req) => dispatch(fetch)(req);

const getList = () => {
  return request({ a: 1 });
};

getList().then((res) => {
  console.log(res);
});
getList().then((res) => {
  console.log(res);
});

// function a1() {
//   console.log('函数a1 入');
//   return function () {
//     console.log('函数a1 出');
//   };
// }
