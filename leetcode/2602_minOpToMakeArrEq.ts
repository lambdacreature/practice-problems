// problem: https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal/
// solver:  https://github.com/lambdacreature/

function minOperations(nums: number[], queries: number[]): number[] {
  // each entry in the answer array is
  const answer: number[] = [];

  nums.sort();

  const prefixSum: number[] = [ nums[0] ];
  for (let i = 1; i < nums.length; i++) {
    prefixSum.push(prefixSum[i-1] + nums[i]);
  }

  for (const query of queries) {
    let lo = 0;
    let hi = nums.length;

    // encuentra donde cabria query en nums para mantener nums ordenado
    // mas especifico: encuentra el menor indice para el cual se cumple
    // nums[i] >= query
    let mid = 0;
    while (lo < hi) {
      mid = Math.floor((lo + hi)/2);
      if (nums[mid] < query) {
        lo = mid+1;
      } else {
        // nums[mid] >= query
        hi = mid;
      }
    }

    // lo == hi
    // en la izquierda se nums de query
    // y en la derecha de resta query de nums

    // lo == 0 means todos los nums son mayores o iguales a query
    // osea, no hay lado izq
    const left  = lo === 0 ? 0 : query * (lo) - prefixSum[lo-1];

    // lo === nums.length means todos los elementos son menores a query
    // osea que no hay lado derech.
    const right = lo === nums.length ? 0 : (prefixSum[nums.length-1] - prefixSum[lo-1]) - query * (nums.length - lo);

    answer.push(left + right);
  }

  return answer;
};
