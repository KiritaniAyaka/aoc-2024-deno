import { combinations } from "jsr:@elf/combinatorics@^1.0.14/Combinations";

export function solve(input: string) {
  type Point = [number, number];
  const map = new Map<string, Point[]>();
  const lines = input.split("\n");
  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; y++) {
      const c = lines[x][y];
      if (c === ".") continue;
      map.set(c, [...(map.get(c) ?? []), [x, y]]);
    }
  }
  const inMap = ([x, y]: Point) =>
    x >= 0 && x < lines.length && y >= 0 && y < lines[0].length;

  function calcAntinode([ax, ay]: Point, [bx, by]: Point) {
    return ([
      [bx * 2 - ax, by * 2 - ay],
      [ax * 2 - bx, ay * 2 - by],
    ] as Point[]).filter((n) => inMap(n));
  }

  const antinodes = new Set<string>();
  for (const [, v] of map) {
    for (const [a, b] of combinations(v, 2)) {
      calcAntinode(a, b).forEach((n) => antinodes.add(`${n}`));
    }
  }
  return antinodes.size;
}
