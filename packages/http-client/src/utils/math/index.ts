/**
 * 获取区间内随机整数
 * @param min
 * @param max
 * @returns
 */
export function getRandomInteger(min = 0, max = 10) {
  const randomNumber = getRandomRanger(min, max);
  return Math.floor(randomNumber);
}
/**
 * 获取区间内随机数
 * @param min
 * @param max
 * @returns
 */
export function getRandomRanger(min = 0, max = 10) {
  return Math.random() * (max - min) + min;
}
