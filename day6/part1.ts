export function solve(input: string) {
  const map = input.split("\n").map((s) => s.trim());
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as const;
  const visited = Array.from(
    { length: map.length },
    () => Array.from({ length: map[0].length }, () => false),
  );
  let direction = 0;
  let x = map.findIndex((line) => line.includes("^"));
  let y = map[x].indexOf("^");

  function nextPosition(x: number, y: number, direction: number) {
    const [dx, dy] = directions[direction];
    if (map[x + dx]?.[y + dy] === "#") {
      return nextPosition(x, y, (direction + 1) % directions.length);
    }
    return [x + dx, y + dy, direction];
  }

  while (x >= 0 && y >= 0 && x < map.length && y < map[0].length) {
    visited[x][y] = true;
    [x, y, direction] = nextPosition(x, y, direction);
  }
  return visited.flat().filter(Boolean).length;
}
