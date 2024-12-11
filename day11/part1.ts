export function solve(input: string, times = 25) {
  const nums = input.split(" ").map((n) => +n);
  const cache = new Map<string, number>();
  function split(num: number): [number, number] {
    const str = `${num}`;
    return [+str.substring(0, str.length / 2), +str.substring(str.length / 2)];
  }

  function blink(nums: number[], depth: number): number {
    if (depth === 0) return nums.length;
    return nums.reduce((acc, cur) => {
      let count = cache.get(`${cur},${depth}`);
      if (count !== undefined) return acc + count;
      cache.set(`${cur},${depth}`, count = blinkOne(cur, depth));
      return acc + count;
    }, 0);
  }

  function blinkOne(num: number, depth: number) {
    if (num === 0) return blink([1], depth - 1);
    else if (`${num}`.length % 2 === 0) return blink(split(num), depth - 1);
    else return blink([num * 2024], depth - 1);
  }

  return blink(nums, times);
}
