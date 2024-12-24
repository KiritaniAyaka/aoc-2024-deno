export function solve(input: string) {
  const [towelsInput, designsInput] = input.split("\n\n");
  const towels = towelsInput.split(", ");
  const designs = designsInput.split("\n");
  function check(design: string) {
    const dp = Array<boolean>(design.length + 1).fill(false);
    dp[0] = true;
    for (let i = 0; i < design.length; i++) {
      if (dp[i]) {
        for (const t of towels) {
          if (design.startsWith(t, i)) dp[i + t.length] = true;
        }
      }
    }
    return dp[design.length];
  }
  return designs.reduce((acc, cur) => check(cur) ? acc + 1 : acc, 0);
}
