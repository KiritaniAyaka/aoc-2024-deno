import { findPositions } from "jsr:@kiritaniayaka/surprise@0.4.0/array";
import { BinaryHeap } from "jsr:@std/data-structures@1.0.4/binary-heap";

type QueueElement = [number, number, number, Direction];
const DIRECTIONS = ["E", "S", "W", "N"] as const;
type Direction = typeof DIRECTIONS[number];
const MOVES = {
  "E": [0, 1],
  "S": [1, 0],
  "W": [0, -1],
  "N": [-1, 0],
};

export function solve(input: string): number {
  const map = input.split("\n").map((line) => line.split(""));
  const [[startX, startY]] = findPositions(map, "S");
  const [[endX, endY]] = findPositions(map, "E");
  const pq = new BinaryHeap<QueueElement>((a, b) => a[0] - b[0]);
  pq.push([0, startX, startY, "E"]);
  const visited = new Set<string>();

  while (pq.length) {
    const [cost, x, y, dir] = pq.pop()!;
    const state = `${x},${y},${dir}`;
    if (visited.has(state)) continue;
    visited.add(state);
    if (x === endX && y === endY) return cost;

    const [dx, dy] = MOVES[dir];
    const newX = x + dx;
    const newY = y + dy;

    if (map[newX][newY] !== "#") pq.push([cost + 1, newX, newY, dir]);
    const dirIndex = DIRECTIONS.indexOf(dir);
    pq.push([cost + 1000, x, y, DIRECTIONS[(dirIndex + 1) % 4]]);
    pq.push([cost + 1000, x, y, DIRECTIONS[(dirIndex + 3) % 4]]);
  }

  return -1;
}
