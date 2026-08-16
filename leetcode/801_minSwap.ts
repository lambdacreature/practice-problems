// problem: https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/
// solver:  https://leetcode.com/u/lambdacreature/

function minSwap(nums1: number[], nums2: number[]): number {
  const INF = 200001;
  const dp1 = [];
  const dp2 = [];
  for (const _ of nums1) {
    dp1.push(INF);
    dp2.push(INF);
  }

  dp1[0] = 0;
  dp2[0] = 1;

  for (let i = 1; i < nums1.length; i++) {
    // compute dp1[i]
    if (dp1[i-1] != INF) {
      if (nums1[i-1] < nums1[i] && nums2[i-1] < nums2[i]) {
        dp1[i] = Math.min(dp1[i], dp1[i-1]);
      }
    }

    if (dp2[i-1] != INF) {
      if (nums2[i-1] < nums1[i] && nums1[i-1] < nums2[i]) {
        dp1[i] = Math.min(dp1[i], dp2[i-1]);
      }
    }

    //compute dp2[i]
    if (dp1[i-1] != INF) {
      if (nums1[i-1] < nums2[i] && nums2[i-1] < nums1[i]) {
        dp2[i] = Math.min(dp2[i], dp1[i-1]+1);
      }
    }

    if (dp2[i-1] != INF) {
      if (nums2[i-1] < nums2[i] && nums1[i-1] < nums1[i]) {
        dp2[i] = Math.min(dp2[i], dp2[i-1]+1);
      }
    }
  }

  const lastIndex = nums1.length-1;
  const solution = Math.min(dp1[lastIndex], dp2[lastIndex]);

  return solution;
};
