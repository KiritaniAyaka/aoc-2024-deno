export function solve(input: string) {
  type Block = { id: number; len: number };
  function expand(input: string) {
    let n = 0;
    return input.split("").reduce((acc, cur, i) => {
      return [...acc, { id: i % 2 !== 0 ? -1 : n++, len: +cur }];
    }, [] as Block[]);
  }

  function checkSum(blocks: Block[]) {
    let sum = 0, pos = 0;
    for (let i = 0, j = blocks.length - 1; i <= j;) {
      if (blocks[i].id !== -1) { // is current block not empty
        sum += pos++ * +blocks[i].id;
        blocks[i].len--;
      } else {
        while (blocks[j].id === -1) j--; // skip empty
        while (blocks[j].len && blocks[i].len) { // "moving"
          sum += pos++ * +blocks[j].id;
          blocks[j].len--;
          blocks[i].len--;
        }
      }

      if (blocks[i].len === 0) i++;
      if (blocks[j].len === 0) j--;
    }
    return sum;
  }
  return checkSum(expand(input));
}
