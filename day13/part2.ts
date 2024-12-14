export function solve(input: string) {
  const result = input.matchAll(
    /Button (?:A|B): X\+(\d+), Y\+(\d+)\nButton (?:A|B): X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g,
  );
  const OFFSET = 10000000000000;
  // ax * ta + bx * tb = X
  // ay * ta + by * tb = Y
  // thus:
  // ta = (X - bx * tb) / ax, where ax !== 0
  // ta = (Y - by * tb) / ay, where ay !== 0
  // thus:
  // (X - bx * tb) / ax = (Y - by * tb) / ay, where ax !== 0, ay !== 0
  // thus:
  // ay * (X - bx * tb) = ax * (Y - by * tb)
  // thus:
  // ay * X - ay * bx * tb = ax * Y - ax * by * tb
  // ay * X - ax * Y = ay * bx * tb - ax * by * tb
  // thus:
  // tb = (ay * X - ax * Y) / (ay * bx - ax * by), where ay !== 0, bx !== 0, ax !== 0, by != 0
  /**
   * See https://github.com/letelete/advent-of-code/blob/53562ec855a3a82c2a3ac3fa7a37bd40979a2e3b/2024/days/day-13/main.js#L17-L30
   */
  function play(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    px: number,
    py: number,
  ) {
    if ([ax, ay, bx, by].some((v) => v === 0)) return 0;
    [px, py] = [px + OFFSET, py + OFFSET];
    const tb = Math.floor((ay * px - ax * py) / (ay * bx - ax * by));
    const ta = Math.floor((px - bx * tb) / ax);
    return ax * ta + bx * tb === px && ay * ta + by * tb === py
      ? ta * 3 + tb
      : 0;
  }
  return result.reduce((acc, cur) => {
    const nums = cur.filter((_, i) => i > 0).map(Number);
    return acc + play(nums[0], nums[1], nums[2], nums[3], nums[4], nums[5]);
  }, 0);
}
