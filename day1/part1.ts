import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  const arr = input.split("\n").reduce(
    (acc, line) => {
      const r = /(\d+)\s+(\d+)/g.exec(line)!;
      acc[0].push(+r[1]);
      acc[1].push(+r[2]);
      return acc;
    },
    [[], []] as [number[], number[]]
  );
  arr[0].sort((a, b) => b - a);
  arr[1].sort((a, b) => b - a);
  let sum = 0;
  while (arr[0].length) {
    sum += Math.abs(arr[0].pop()! - arr[1].pop()!);
  }
  return sum;
});
