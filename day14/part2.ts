import sharp from "npm:sharp@0.33.5";
import { Buffer } from "node:buffer";
import { join } from "jsr:@std/path@1.0.8";
import { ensureDir } from "jsr:@std/fs@^1.0.6";

export async function solve(input: string) {
  const numbersIn = (str: string) =>
    str.matchAll(/-?\d+(?:\.\d+)?/g).map((r) => parseFloat(r[0])).toArray();
  const SIZE_X = 101, SIZE_Y = 103, SECONDS = 10000;
  const normalizePosition = (p: number, axis: "x" | "y") => {
    const SIZE = axis === "x" ? SIZE_X : SIZE_Y;
    while (p < 0) p += SIZE;
    return p % SIZE;
  };
  const robots = input.split("\n").map((l) => numbersIn(l));
  for (let i = 0; i <= SECONDS; i++) {
    const moved = robots.map(
      (robot) => [
        normalizePosition(robot[0] + robot[2] * i, "x"),
        normalizePosition(robot[1] + robot[3] * i, "y"),
        robot[2],
        robot[3],
      ],
    );

    const outputDir = join(import.meta.filename!, "..", "visualize");
    await ensureDir(outputDir);
    const image = Buffer.alloc(SIZE_X * SIZE_Y, 0);
    for (const [x, y] of moved) image[x + y * SIZE_X] = 255;
    await sharp(image, {
      raw: {
        width: SIZE_X,
        height: SIZE_Y,
        channels: 1,
      },
    })
      .toFormat("jpeg")
      .toFile(join(outputDir, `${i}.jpg`));
  }
}
