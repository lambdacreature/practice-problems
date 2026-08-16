// problem: https://leetcode.com/problems/minimum-operations-to-make-all-array-elements-equal/
// solver:  https://github.com/lambdacreature/

function minOperations(nums: number[], queries: number[]): number[] {
  const answer: number[] = [];
  for (const query of queries) {
    answer.push(0);
    for (const num of nums) {
      answer[answer.length-1] += Math.abs(num - query);
    }
  }

  return answer;
};
