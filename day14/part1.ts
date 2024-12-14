export function solve(input: string) {
  const numbersIn = (str: string) =>
    str.matchAll(/-?\d+(?:\.\d+)?/g).map((r) => parseFloat(r[0])).toArray();
  const SIZE_X = 101, SIZE_Y = 103, SECONDS = 100;
  const normalizePosition = (p: number, axis: "x" | "y") => {
    const SIZE = axis === "x" ? SIZE_X : SIZE_Y;
    while (p < 0) p += SIZE;
    return p % SIZE;
  };

  return input.split("\n").map((l) => numbersIn(l)).map(
    (robot) => [
      normalizePosition(robot[0] + robot[2] * SECONDS, "x"),
      normalizePosition(robot[1] + robot[3] * SECONDS, "y"),
      robot[2],
      robot[3],
    ],
  ).reduce((acc, [x, y]) => {
    if (x === SIZE_X >> 1 || y === SIZE_Y >> 1) return acc;
    acc[+(y > SIZE_Y >> 1) << 1 | +(x > SIZE_X >> 1)]++;
    return acc;
  }, Array<number>(4).fill(0)).reduce((a, b) => a * b);
}
