export function solve(input: string) {
  const formulas = input.split("\n").map((line) => {
    const r = /(\d+):((?: \d+)+)/g.exec(line);
    return [+r![1], [
      ...r![2].split(" ").filter(Boolean).map(Number),
    ]] as [number, number[]];
  });

  function check(result: number, nums: number[]): boolean {
    if (nums.length < 2) return result === nums[0];
    const mul = nums[0] * nums[1];
    const add = nums[0] + nums[1];
    return (mul <= result && check(result, [mul, ...nums.slice(2)])) ||
      (add <= result && check(result, [add, ...nums.slice(2)]));
  }

  return formulas.reduce(
    (acc, cur) => check(...cur) ? acc + cur[0] : acc,
    0,
  );
}
