export function solve(input: string) {
  const buyer = input.split("\n").map(Number);
  const mix = (a: number, b: number) => (a ^ b) >>> 0;
  const prune = (n: number) => n % 16777216;

  function next(n: number, times: number): number {
    for (let i = 0; i < times; i++) {
      n = prune(mix(n * 64, n));
      n = prune(mix(Math.floor(n / 32), n));
      n = prune(mix(n * 2048, n));
    }
    return n;
  }

  return buyer.reduce((acc, cur) => next(cur, 2000) + acc, 0);
}
