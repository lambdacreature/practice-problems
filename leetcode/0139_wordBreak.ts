// problem: https://leetcode.com/problems/word-break/description/
// solver:  https://github.com/lambdacreature/

function wordBreak(s: string, wordDict: string[]): boolean {
  // dp[i] is true if s[0..i] can be segmented
  const dp: boolean[] = [];
  for (const _ of s) {
    dp.push(false);
  }

  // handle base cases
  for (const word of wordDict) {
    let matches = true;

    for (let j = 0; j < word.length; j++) {
      if (s[j] != word[j]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      dp[word.length-1] = true;
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (const word of wordDict) {
      const prevEnd = i - word.length;
      if (prevEnd >= 0 && dp[prevEnd]) {
        let matches = true;

        for (let j = 0; j < word.length; j++) {
          if (s[prevEnd+j+1] != word[j]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          dp[i] = true;
          break;
        }
      }
    }
  }

  const lastIndex = dp.length - 1;
  return dp[lastIndex];
};
