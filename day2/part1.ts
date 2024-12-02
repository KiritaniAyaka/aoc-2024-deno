import { solve } from "@kiritaniayaka/aoc-toolkit";

solve((input) => {
  function check(nums: number[]) {
    const increment = nums[1] > nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (Math.abs(nums[i - 1] - nums[i]) > 3) return false;
      if (increment && nums[i - 1] >= nums[i]) return false;
      if (!increment && nums[i - 1] <= nums[i]) return false;
    }
    return true;
  }

  return input
    .split("\n")
    .map((l) => l.trim())
    .reduce((acc, line) => {
      const nums = line.split(" ").map((n) => +n);
      return check(nums) ? acc + 1 : acc;
    }, 0);
});
