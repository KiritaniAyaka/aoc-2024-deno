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
  left.sort((a, b) => b - a);
  right.sort((a, b) => b - a);
  let sum = 0;
  while (left.length) {
    sum += Math.abs(left.pop()! - right.pop()!);
  }
  return sum;
});
