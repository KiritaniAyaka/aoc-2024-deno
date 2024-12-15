export function solve(input: string) {
  const DIRECTIONS = {
    "<": [0, -1],
    ">": [0, 1],
    "^": [-1, 0],
    "v": [1, 0],
  } as const;
  type Move = keyof typeof DIRECTIONS;
  const [mapInput, movesInput] = input.split("\n\n");
  const map = mapInput.split("\n").map((line) => line.split(""));
  const moves = movesInput.split("\n").flatMap((l) => l.split("")) as Move[];
  let x = map.findIndex((line) => line.includes("@"));
  let y = map[x].indexOf("@");

  function move(
    x: number,
    y: number,
    [dx, dy]: readonly [number, number],
  ): boolean {
    const newX = x + dx, newY = y + dy;
    const object = map[x][y];
    if (map[newX][newY] === "#") return false;
    if (map[newX][newY] === "." || move(newX, newY, [dx, dy])) {
      map[newX][newY] = object;
      map[x][y] = ".";
      return true;
    }
    return false;
  }

  moves.map((m) => DIRECTIONS[m]).forEach(([dx, dy]) => {
    if (move(x, y, [dx, dy])) [x, y] = [x + dx, y + dy];
  });
  return map.flatMap((r, x) => r.map((o, y) => o === "O" ? 100 * x + y : 0))
    .reduce((a, b) => a + b);
}
