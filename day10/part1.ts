export function solve(input: string) {
  const map = input.split("\n").map((line) => line.split(""));
  const start: [number, number][] = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === "0") start.push([x, y]);
    }
  }
  return start.reduce((acc, cur) => {
    const peaks = new Set<string>();
    find(...cur);
    return acc + peaks.size;

    function find(x: number, y: number) {
      const cur = +map[x][y];
      if (cur === 9) peaks.add(`${x},${y}`);
      if (+map[x + 1]?.[y] === cur + 1) find(x + 1, y);
      if (+map[x - 1]?.[y] === cur + 1) find(x - 1, y);
      if (+map[x]?.[y + 1] === cur + 1) find(x, y + 1);
      if (+map[x]?.[y - 1] === cur + 1) find(x, y - 1);
    }
  }, 0);
}
