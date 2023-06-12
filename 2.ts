/***
 *  送狗去宠物店, 步骤分解
 */

function bringOn(dog) {
  console.log('带上狗子');
  return dog;
}

function go(dog) {
  console.log('去宠物店');
  return dog;
}

function back(dog) {
  console.log('从宠物店回来');
  return dog;
}

function putDown(dog) {
  console.log('关门放狗');
  return dog;
}

function bathe(dog) {
  console.log('洗狗');
  return dog;
}

/**
 * 实际流程
 * bringOn => go => back => putDown
 * 处理的是同一个对象
 */
//  对应函数

function foo(dog) {
  putDown(back(bathe(go(bringOn(dog)))));
}

console.log('=======================================');
foo();
