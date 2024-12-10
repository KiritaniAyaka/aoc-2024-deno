export function solve(input: string) {
  const map = input.split("\n").map((line) => line.split(""));
  const start: [number, number][] = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === "0") start.push([x, y]);
    }
  }
  function find(x: number, y: number): number {
    const cur = +map[x][y];
    let count = 0;
    if (cur === 9) return ++count;
    if (+map[x + 1]?.[y] === cur + 1) count += find(x + 1, y);
    if (+map[x - 1]?.[y] === cur + 1) count += find(x - 1, y);
    if (+map[x]?.[y + 1] === cur + 1) count += find(x, y + 1);
    if (+map[x]?.[y - 1] === cur + 1) count += find(x, y - 1);
    return count;
  }

  return start.reduce((acc, cur) => acc + find(...cur), 0);
}
