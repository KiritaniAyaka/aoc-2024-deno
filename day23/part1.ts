export function solve(input: string) {
  const edges = input.trim().split("\n");
  const graph: Map<string, Set<string>> = new Map();

  for (const edge of edges) {
    const [a, b] = edge.split("-");
    if (!graph.has(a)) graph.set(a, new Set());
    if (!graph.has(b)) graph.set(b, new Set());
    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  }

  const result: Set<string> = new Set();
  for (const [key, value] of graph) {
    const nodes = Array.from(value);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i];
        const node2 = nodes[j];
        if (graph.get(node1)!.has(node2)) {
          result.add([key, node1, node2].sort().join(","));
        }
      }
    }
  }

  return [...result].filter((i) =>
    i.split(",").some((node) => node.startsWith("t"))
  ).length;
}
