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
  console.log('带上狗子', dog);
  const newDog = next(dog);
  console.log('关门放狗', dog);
  return newDog;
};
const drive: MidddleAlias = (next) => (dog) => {
  console.log('去宠物店', dog);
  const newDog = next(dog);
  console.log('从宠物店回来', dog);
  return newDog;
};
const newBathe = (next) => (dog) => {
  console.log('洗狗', dog);
  debugger;

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
    return function (dog) {
      return a(b(dog));
    };
  });
}

const foo = compose(putDown, back, bathe, go, bringOn);

console.log('==================================');
foo('小柴');

console.log('==========================洋葱');
const composeMiddle = compose(pack, drive);
composeMiddle(bathe)('小菜');
