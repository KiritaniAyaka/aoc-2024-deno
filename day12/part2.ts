export function solve(input: string) {
  const map = input.split("\n").map((line) => line.split(""));
  const visited = Array.from(
    { length: map.length },
    () => Array(map[0].length).fill(false),
  );
  const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]] as const;
  const inMap = (x: number, y: number) =>
    x >= 0 && x < map.length && y >= 0 && y < map[0].length;

  const countCorners = (x: number, y: number) =>
    [0, 1, 2, 3]
      .map((d) => [directions[d], directions[(d + 1) % 4]])
      .map(([[dx1, dy1], [dx2, dy2]]) => [
        map[x][y],
        map[x + dx1]?.[y + dy1],
        map[x + dx2]?.[y + dy2],
        map[x + dx1 + dx2]?.[y + dy1 + dy2],
      ])
      .filter(([self, left, right, mid]) =>
        (left !== self && right !== self) ||
        (left === self && right === self && mid !== self)
      )
      .length;

  function dfs(x: number, y: number, type: string): number {
    const stack: [number, number][] = [[x, y]];
    let area = 0;
    let corners = 0;

    while (stack.length) {
      const [curX, curY] = stack.pop()!;
      if (visited[curX][curY]) continue;
      visited[curX][curY] = true;
      corners += countCorners(curX, curY);
      area++;

      for (const [dx, dy] of directions) {
        const newX = curX + dx;
        const newY = curY + dy;
        if (!inMap(newX, newY) || map[newX][newY] !== type) continue;
        if (!visited[newX][newY]) stack.push([newX, newY]);
      }
    }
    return area * corners;
  }

  return map
    .flatMap((r, x) => r.map((c, y) => visited[x][y] ? 0 : dfs(x, y, c)))
    .reduce((acc, cur) => acc + cur);
}
