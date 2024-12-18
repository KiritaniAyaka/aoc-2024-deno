export function solve(input: string) {
  function numbersIn(str: string) {
    return str.matchAll(/-?\d+(?:\.\d+)?/g).map((r) => parseFloat(r[0]))
      .toArray();
  }
  const [a, b, c, ...programs] = numbersIn(input);
  return exec([a, b, c], programs);
}

export function exec(registers: number[], programs: number[]): string {
  let [a, b, c] = registers;
  const output: number[] = [];
  const combo = (n: number) => {
    if (n <= 3) return n;
    if (n === 4) return a;
    if (n === 5) return b;
    if (n === 6) return c;
    return 0;
  };

  for (let i = 0; i < programs.length; i += 2) {
    const instr = programs[i], operand = programs[i + 1];
    switch (instr) {
      case 0:
        a = Math.trunc(a / 2 ** combo(operand));
        break;
      case 1:
        b = b ^ operand;
        break;
      case 2:
        b = combo(operand) % 8;
        break;
      case 3:
        if (a !== 0) i = operand - 2;
        break;
      case 4:
        b = b ^ c;
        break;
      case 5:
        output.push(combo(operand) % 8);
        break;
      case 6:
        b = Math.trunc(a / 2 ** combo(operand));
        break;
      case 7:
        c = Math.trunc(a / 2 ** combo(operand));
        break;
    }
  }
  return output.join(",");
}
