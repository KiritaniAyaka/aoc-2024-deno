export function solve(input: string) {
  const result = input.matchAll(
    /Button (?:A|B): X\+(\d+), Y\+(\d+)\nButton (?:A|B): X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g,
  );
  function play(
    aX: number,
    aY: number,
    bX: number,
    bY: number,
    pX: number,
    pY: number,
  ): number {
    for (let a = 0; a <= 100; a++) {
      for (let b = 100; b >= 0; b--) {
        if (a * aX + b * bX === pX && a * aY + b * bY === pY) {
          return a * 3 + b;
        }
      }
    }
    return 0;
  }

  return result.reduce((acc, cur) => {
    const nums = cur.filter((_, i) => i > 0).map(Number);
    return acc + play(nums[0], nums[1], nums[2], nums[3], nums[4], nums[5]);
  }, 0);
}
