import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  return input
    .split("\n")
    .map((l) => l.trim())
    .reduce((acc, line) => {
      const r = line.matchAll(/mul\((\d+),(\d+)\)/g);
      acc += r.reduce(
        (acc, matchResult) => acc + +matchResult[1] * +matchResult[2],
        0
      );
      return acc;
    }, 0);
});
