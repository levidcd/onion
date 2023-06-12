/***
 *  送狗去宠物店, 步骤分解
 */

function bringOn(dog) {
  console.log('带上狗子');
}

function go(dog) {
  console.log('去宠物店');
}

function back(dog) {
  console.log('从宠物店回来');
}

function putDown(dog) {
  console.log('关门放狗');
}

function bathe(dog) {
  console.log('洗狗');
}

/**
 * 实际流程
 * bringOn => go => back => putDown
 * 处理的是同一个对象
 */
//  对应函数

function foo(dog) {
  bringOn(dog);
  go(dog);
  bathe(dog);
  back(dog);
  putDown(dog);
}

console.log('=======================================');
foo();
