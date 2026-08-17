// problem: https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal/
// solver:  https://github.com/lambdacreature/

function minOperations(nums: number[], queries: number[]): number[] {
  // each entry in the answer array is
  const answer: number[] = [];

  nums.sort((a, b) => a - b);

  const prefixSum: number[] = [ nums[0] ];
  for (let i = 1; i < nums.length; i++) {
    prefixSum.push(prefixSum[i-1] + nums[i]);
  }

  for (const query of queries) {
    let low = 0;
    let high = nums.length-1;
    let lowerBound = nums.length;

    while (low <= high) {
      const mid = low + Math.floor((high-low)/2);

      if (nums[mid] >= query) {
        lowerBound = mid;
        high = mid-1;
      } else {
        low = mid+1;
      }
    }

    let left = 0;
    if (lowerBound > 0) {
      const sum = prefixSum[lowerBound-1];
      const elementCount = lowerBound;
      left = query * elementCount - sum;
    }

    let right = 0;
    if (lowerBound < nums.length) {
      const sum = prefixSum[nums.length-1] - (lowerBound === 0 ? 0 : prefixSum[lowerBound-1]);
      const elementCount = nums.length - lowerBound;
      right = sum - query * elementCount;
    }

    answer.push(left+right);
  }

  return answer;
};
