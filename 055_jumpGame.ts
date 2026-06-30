function canJump(nums: number[]): boolean {
  const reachable: boolean[] = [];
  for (const _ of nums) {
    reachable.push(false);
  }

  reachable[0] = true;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (reachable[j] && (j+nums[j] >= i)) {
        reachable[i] = true;
        break;
      }
    }
  }

  return reachable[nums.length-1];
};
