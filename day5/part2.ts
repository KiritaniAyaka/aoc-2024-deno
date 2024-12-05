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

  function sort(arr: number[]): number[] {
    const subgraph = new Map<number, number[]>();
    const inDegree = new Map<number, number>();
    for (const node of arr) {
      if (graph.has(node)) {
        subgraph.set(node, graph.get(node)!);
        inDegree.set(node, 0);
      }
    }

    for (const [, neighbors] of subgraph.entries()) {
      for (const neighbor of neighbors) {
        if (arr.includes(neighbor)) {
          if (!inDegree.has(neighbor)) inDegree.set(neighbor, 0);
          inDegree.set(neighbor, inDegree.get(neighbor)! + 1);
        }
      }
    }
    const queue: number[] = [];
    for (const [page, degree] of inDegree.entries()) {
      if (degree === 0) queue.push(page);
    }

    const sorted: number[] = [];
    while (queue.length) {
      const node = queue.shift()!;
      sorted.push(node);
      for (const neighbor of graph.get(node) ?? []) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      }
    }
    return sorted;
  }

  return inputPages.split("\n").map((s) => s.trim()).reduce((acc, cur) => {
    const arr = cur.split(",").map((s) => +s.trim());
    if (check(arr)) return acc;
    return acc + sort(arr)[arr.length >> 1];
  }, 0);
}
