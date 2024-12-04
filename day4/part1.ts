import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  const xPos: [number, number][] = [];
  const arr: string[] = [];
  input
    .split("\n")
    .map((l) => l.trim())
    .forEach((line, idx) => {
      arr.push(line);
      xPos.push(
        ...[...line.matchAll(/X/g)].map(
          (item) => [idx, item.index] as [number, number],
        ),
      );
    });

  const target = "XMAS";
  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return xPos.reduce((acc, [x, y]) => {
    for (const [dx, dy] of directions) {
      if (
        Array.from({ length: target.length }).every(
          (_, i) => arr[x + dx * i]?.[y + dy * i] === target[i],
        )
      ) acc++;
    }
    return acc;
  }, 0);
});
