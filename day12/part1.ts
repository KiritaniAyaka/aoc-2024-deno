export function solve(input: string) {
  const map = input.split("\n").map((line) => line.split(""));
  const visited = Array.from(
    { length: map.length },
    () => Array(map[0].length).fill(false),
  );
  const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]] as const;
  const inMap = (x: number, y: number) =>
    x >= 0 && x < map.length && y >= 0 && y < map[0].length;

  function dfs(x: number, y: number, type: string): number {
    const stack: [number, number][] = [[x, y]];
    let area = 0;
    let perimeter = 0;

    while (stack.length) {
      const [curX, curY] = stack.pop()!;
      if (visited[curX][curY]) continue;
      visited[curX][curY] = true;
      area++;

      for (const [dx, dy] of directions) {
        const newX = curX + dx;
        const newY = curY + dy;
        if (!inMap(newX, newY) || map[newX][newY] !== type) perimeter++;
        else if (!visited[newX][newY]) stack.push([newX, newY]);
      }
    }
    return area * perimeter;
  }

  return map
    .flatMap((r, x) => r.map((c, y) => visited[x][y] ? 0 : dfs(x, y, c)))
    .reduce((acc, cur) => acc + cur);
}
