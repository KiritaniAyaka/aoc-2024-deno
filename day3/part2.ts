import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  let enabled = true;
  return input
    .split("\n")
    .map((l) => l.trim())
    .reduce((acc, line) => {
      const manipulation = line.matchAll(/mul\((\d+),(\d+)\)/g);
      const switcher = [...line.matchAll(/do(?:|n't)\(\)/g)];
      let switcherIndex = 0;
      acc += manipulation.reduce((acc, matchResult) => {
        if (
          switcher[switcherIndex] &&
          switcher[switcherIndex].index < matchResult.index
        )
          enabled = switcher[switcherIndex++][0] === "do()";
        return enabled ? acc + +matchResult[1] * +matchResult[2] : acc;
      }, 0);
      return acc;
    }, 0);
});
