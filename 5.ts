type Next = (res: string) => string;
type Midddle = (next: Next) => (res: string) => string;
type MidddleAlias = (next: Next) => Next;

/***
 *  送狗去宠物店, 步骤分解
 */

function bringOn(dog) {
  console.log('带上狗子', dog);
  return dog;
}

function go(dog) {
  console.log('去宠物店', dog);
  return dog;
}

function back(dog) {
  console.log('从宠物店回来', dog);
  return dog;
}

function putDown(dog) {
  console.log('关门放狗', dog);
  return dog;
}

function bathe(dog) {
  console.log('洗狗', dog);
  return dog;
}

const pack: MidddleAlias = (next) => (dog) => {
  console.log(next);
  console.log('带上狗子', dog);
  const newDog = next(dog);
  console.log('关门放狗', dog);
  return newDog;
};
const drive: MidddleAlias = (next) => (dog) => {
  console.log(next);
  console.log('去宠物店', dog);
  const newDog = next(dog);
  console.log('从宠物店回来', dog);
  return newDog;
};

const newBathe = (next) => (dog) => {
  console.log(next);
  console.log('洗狗', dog);

  return next(dog);
};

/**
 * 实际流程
 * bringOn => go => back => putDown
 * 处理的是同一个对象
 */
//  对应函数

function compose(...args) {
  return args.reduce((a, b) => {
    return function (...args) {
      return a(b(...args));
    };
  });
}

/** 无效的中间件 */
const any: MidddleAlias = (next) => (dog) => {
  console.log(next);
  console.log('无效的中间件', dog);
  return dog;
};
/** 只有后处理 */
const any1: MidddleAlias = (next) => (dog) => {
  console.log(next);
  const newDog = next(dog);
  console.log('只有后处理', newDog);
  return newDog;
};
/** 只有预处理 */
const any2: MidddleAlias = (next) => (dog) => {
  console.log(next);
  console.log('只有预处理', dog);
  return next(dog);
};

console.log('==========================洋葱');
const composeMiddle = compose(pack, drive);
composeMiddle(bathe)('小菜');

console.log('==========================洋葱 + any');
const composeMiddle2 = compose(pack, any, drive);
composeMiddle2(bathe)('小菜');

console.log('==========================洋葱 + 预处理, 后处理');
const composeMiddle3 = compose(pack, any1, drive, any2);
composeMiddle3(bathe)('小菜');
