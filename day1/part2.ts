import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  const [left, right] = input.split("\n").reduce(
    (acc, line) => {
      const r = /(\d+)\s+(\d+)/g.exec(line)!;
      acc[0].push(+r[1]);
      acc[1].push(+r[2]);
      return acc;
    },
    [[], []] as [number[], number[]]
  );
  const m = right.reduce(
    (acc, n) => acc.set(n, (acc.get(n) || 0) + 1),
    new Map<number, number>()
  );
  return left.reduce((acc, cur) => m.get(cur) ?? 0 * cur + acc, 0);
});
