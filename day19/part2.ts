export function solve(input: string) {
  const [towelsInput, designsInput] = input.split("\n\n");
  const towels = towelsInput.split(", ");
  const designs = designsInput.split("\n");
  function check(design: string) {
    const dp = Array<number>(design.length + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < design.length; i++) {
      if (dp[i]) {
        for (const t of towels) {
          if (design.startsWith(t, i)) dp[i + t.length] += dp[i];
        }
      }
    }
    return dp[design.length];
  }
  return designs.reduce((acc, cur) => acc += check(cur), 0);
}
