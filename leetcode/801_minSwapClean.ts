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

  // invariant: dp1[i] stores the minimum number of swaps
  // needed to make nums1[0..i] and nums2[0..i] strictly increasing
  // without swapping nums1[i] and nums2[i]
  // dp2[i] is the same but having swapped nums1[i] and nums2[i]
  //
  // dp1[i] = INF if this is not possible
  // dp2[i] = INF if this is not possible
  // note: at least one of the two has to be true

  // la cantidad minima de swaps para hacer ambos arrays
  // estrictamente creciente se puede determinar de la forma siguente
  //
  // sea k1 la cantidad minima de swaps para hacer la secuencia entera estrictamente
  // creciente sin contar el ultimo elemento, sin hacer swap a los penultimos
  //
  // y tambien sea k2 la cantidad minima de swaps para hacer el array entero estrictamente
  // creciente sin tener en cuenta el ultimo elemento pero habiendo hecho swap a los penultimos
  //
  // IM HAVING A MELTDOWN QUE DP MAS TRICKY
  // 

  dp1[0] = 0;
  dp2[0] = 1;

  for (let i = 1; i < nums1.length; i++) {
    if (dp1[i-1] != INF) {
      if(nums1[i-1] < nums1[i] && nums2[i-1] < nums2[i]) {
        dp1[i] = Math.min(dp1[i-1], dp1[i]);
      }

      if(nums1[i-1] < nums2[i] && nums2[i-1] < nums1[i]) {
        dp2[i] = Math.min(dp1[i-1]+1, dp2[i]);
      }
    }

    if (dp2[i-1] != INF) {
      if(nums2[i-1] < nums1[i] && nums1[i-1] < nums2[i]) {
        dp1[i] = Math.min(dp2[i-1], dp1[i]);
      }

      if(nums2[i-1] < nums2[i] && nums1[i-1] < nums1[i]) {
        dp2[i] = Math.min(dp2[i-1]+1, dp2[i]);
      }
    }
  }

  const lastIndex = nums1.length-1;
  const solution = Math.min(dp1[lastIndex], dp2[lastIndex]);

  return solution;
};
