export function solve(input: string) {
  const map = input.split("\n").map((s) => s.trim().split(""));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] as const;
  const visited = new Set<string>();
  let direction = 0;
  let x = map.findIndex((line) => line.includes("^"));
  let y = map[x].indexOf("^");
  let result = 0;
  const inMap = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < map.length && y < map[0].length;

  function nextPosition(x: number, y: number, direction: number) {
    const [dx, dy] = directions[direction];
    if (map[x + dx]?.[y + dy] === "#") {
      return nextPosition(x, y, (direction + 1) % directions.length);
    }
    return [x + dx, y + dy, direction];
  }

  function checkLoop(x: number, y: number, direction: number) {
    const [obstacleX, obstacleY] = nextPosition(x, y, direction);
    if (!inMap(obstacleX, obstacleY)) return false;
    if (visited.has(`${obstacleX},${obstacleY}`)) return false;

    map[obstacleX][obstacleY] = "#";
    const interVisited = new Set<string>(visited);
    while (inMap(x, y)) {
      [x, y, direction] = nextPosition(x, y, direction);
      if (interVisited.has(`${x},${y},${direction}`)) {
        map[obstacleX][obstacleY] = ".";
        return true;
      }
      interVisited.add(`${x},${y},${direction}`);
    }
    map[obstacleX][obstacleY] = ".";
    return false;
  }

  while (inMap(x, y)) {
    visited.add(`${x},${y}`);
    visited.add(`${x},${y},${direction}`);
    if (checkLoop(x, y, direction)) result++;
    [x, y, direction] = nextPosition(x, y, direction);
  }
  return result;
}
