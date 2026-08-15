// problem: https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/
// solver:  https://leetcode.com/u/lambdacreature/

function minSwap(nums1: number[], nums2: number[]): number {
  const dive = (index: number, swaps: number, best: number): number => {
    if (best <= swaps) {
      return best;
    }

    if (index == nums1.length) {
      return swaps;
    }

    if (index == 0) {
      const results = [ best ];
      results.push(dive(index+1, swaps, best));

      const backup1 = nums1[index];
      nums1[index] = nums2[index];
      nums2[index] = backup1;

      results.push(dive(index+1, swaps+1, best));

      const backup2 = nums1[index];
      nums1[index] = nums2[index];
      nums2[index] = backup2;

      return Math.min(...results);
    }

    const results = [ best ];

    if (nums1[index-1] < nums1[index] && nums2[index-1] < nums2[index]) {
      // nums1 and nums2 are strictly increasing without swap
      results.push(dive(index+1, swaps, best));
    }


    if (nums1[index-1] < nums2[index] && nums2[index-1] < nums1[index]) { 
      // nums1 and nums2 are strictly increasing after swap
      const backup1 = nums1[index];
      nums1[index] = nums2[index];
      nums2[index] = backup1;

      results.push(dive(index+1, swaps+1, best));

      const backup2 = nums1[index];
      nums1[index] = nums2[index];
      nums2[index] = backup2;
    }

    return Math.min(...results);
  };

  const initialIndex = 0;
  const initialSwaps = 0;
  const initialBest  = nums1.length;

  return dive(initialIndex, initialSwaps, initialBest);
};
