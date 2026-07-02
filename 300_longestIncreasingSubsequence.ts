function lengthOfLIS(nums: number[]): number {
  // dp[i] = tamaño de la LIS que tiene
  // nums[i] como su último elemento
  const dp: number[] = []

  let longestLength = 1;
  for (let i = 0; i < nums.length; i++) {
    dp.push(1);
    for (let j = i; j >= 0; j--) {
      if (j+2 < longestLength) {
        break;
      }

      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[j]+1, dp[i]);
      }
    }

    longestLength = Math.max(longestLength, dp[i]);
  } 

  return longestLength;
}
