export function solve(input: string) {
  const [inputRules, inputPages] = input.split("\n\n").map((s) => s.trim());
  const graph = new Map<number, number[]>();
  inputRules.split("\n").map((s) => s.trim()).forEach(
    (cur) => {
      const [before, after] = cur.split("|");
      if (!graph.get(+before)) graph.set(+before, []);
      graph.get(+before)!.push(+after);
    },
  );

  function check(arr: number[]) {
    for (let i = 1; i < arr.length; i++) {
      if (!graph.get(arr[i - 1])?.includes(arr[i])) return false;
    }
    return true;
  }

  return inputPages.split("\n").map((s) => s.trim()).reduce((acc, cur) => {
    const arr = cur.split(",").map((s) => +s.trim());
    if (check(arr)) return acc + arr[arr.length >> 1];
    return acc;
  }, 0);
}
