function numSubarrayProductLessThanK(nums: number[], k: number): number {
  const dp: number[][] = [[]];

  if (nums[0] < k) {
    dp[0].push(nums[0]);
  }

  let total = dp[0].length;
  for (let i = 1; i < nums.length; i++) {
    dp.push([]);

    if (nums[i] < k) {
      dp[i].push(nums[i]);
    }

    for (const prod of dp[i-1]) {
      if (nums[i] * prod < k) {
        dp[i].push(nums[i] * prod);
      }
    }

    total += dp[i].length;
  }

  return total;
}
