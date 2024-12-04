import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  const aPos: [number, number][] = [];
  const arr: string[] = [];
  input
    .split("\n")
    .map((l) => l.trim())
    .forEach((line, idx) => {
      arr.push(line);
      aPos.push(
        ...[...line.matchAll(/A/g)].map(
          (item) => [idx, item.index] as [number, number],
        ),
      );
    });

  const directions: [number, number][] = [
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return aPos.reduce((acc, [x, y]) => {
    let c = 0;
    for (const [dx, dy] of directions) {
      if (arr[x + dx]?.[y + dy] === "M" && arr[x - dx]?.[y - dy] === "S") {
        c++;
      }
    }
    return c > 1 ? acc + 1 : acc;
  }, 0);
});
