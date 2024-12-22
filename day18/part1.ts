export function solve(input: string): number {
  type QueueItem = { x: number; y: number; steps: number };
  const size = 71;
  const bytes = 1024;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]] as const;
  const positions = input.trim().split("\n").map((line) =>
    line.split(",").map(Number)
  );
  const map: boolean[][] = Array.from(
    { length: size },
    () => Array(size).fill(false),
  );
  const inMap = (x: number, y: number) => x >= 0 && y >= 0 && x < size && y < size;

  for (let i = 0; i < bytes && i < positions.length; i++) {
    const [x, y] = positions[i];
    map[x][y] = true;
  }
  const visited: boolean[][] = Array.from(
    { length: size },
    () => Array(size).fill(false),
  );
  visited[0][0] = true;

  const queue: QueueItem[] = [{ x: 0, y: 0, steps: 0 }];
  while (queue.length) {
    const { x, y, steps } = queue.shift()!;
    if (x === size - 1 && y === size - 1) return steps;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (inMap(nx, ny) && !map[nx][ny] && !visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push({ x: nx, y: ny, steps: steps + 1 });
      }
    }
  }
  return -1;
}
