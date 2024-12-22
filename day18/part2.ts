export function solve(input: string): string {
  type QueueItem = { x: number; y: number };
  const size = 71;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]] as const;
  const positions = input.trim().split("\n").map((line) =>
    line.split(",").map(Number)
  );
  const map: boolean[][] = Array.from(
    { length: size },
    () => Array(size).fill(false),
  );
  const inMap = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < size && y < size;

  function check() {
    const visited: boolean[][] = Array.from(
      { length: size },
      () => Array(size).fill(false),
    );
    visited[0][0] = true;
    const queue: QueueItem[] = [{ x: 0, y: 0 }];
    while (queue.length) {
      const { x, y } = queue.shift()!;
      if (x === size - 1 && y === size - 1) return true;
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (inMap(nx, ny) && !map[nx][ny] && !visited[nx][ny]) {
          visited[nx][ny] = true;
          queue.push({ x: nx, y: ny });
        }
      }
    }
    return false;
  }

  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i];
    map[x][y] = true;
    if (!check()) return `${x},${y}`;
  }
  return "";
}
