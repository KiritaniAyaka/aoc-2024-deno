export function solve(input: string) {
  type Block = { id: number; len: number };
  function expand(input: string) {
    let n = 0;
    return input.split("").reduce((acc, cur, i) => {
      return [...acc, { id: i % 2 !== 0 ? -1 : n++, len: +cur }];
    }, [] as Block[]);
  }

  function move(blocks: Block[]) {
    for (let i = blocks.length - 1; i > 0; i--) {
      while (blocks[i].id === -1) i--;
      const avaliable = blocks.findIndex((b) =>
        b.id === -1 && b.len >= blocks[i].len
      );
      if (avaliable === -1 || avaliable > i) continue;
      // moving
      const lenDiff = blocks[avaliable].len - blocks[i].len;
      blocks[avaliable].id = blocks[i].id;
      blocks[i].id = -1;
      if (lenDiff) {
        blocks[avaliable].len = blocks[i].len;
        blocks.splice(avaliable + 1, 0, { id: -1, len: lenDiff });
      }
    }
    return blocks;
  }

  function checkSum(blocks: Block[]) {
    let sum = 0;
    for (let i = 0, pos = 0; i < blocks.length; ++i) {
      while (blocks[i] && blocks[i].id === -1) pos += blocks[i++].len; // skip empty
      while (blocks[i] && blocks[i].len--) sum += pos++ * blocks[i].id;
    }
    return sum;
  }
  return checkSum(move(expand(input)));
}
