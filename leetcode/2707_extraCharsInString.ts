// problem: https://leetcode.com/problems/extra-characters-in-a-string/
// solver:  https://github.com/lambdacreature/

function minExtraChar(s: string, dictionary: string[]): number {
  const dp: number[] = [];
  for (let i = 0; i < s.length; i++) {
    dp.push(i+1);
  }

  // handle base cases
  for (const word of dictionary) {
    let matches = true;

    for (let j = 0; j < word.length; j++) {
      if (s[j] != word[j]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      dp[word.length-1] = 0;
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (const word of dictionary) {
      const prevEnd = i - word.length;
      if (prevEnd >= 0) {
        let matches = true;

        for (let j = 0; j < word.length; j++) {
          if (s[prevEnd+j+1] != word[j]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          for (let k = 0; k <= prevEnd; k++) {
            const extraChars = prevEnd-k;
            dp[i] = Math.min(dp[i], dp[k]+extraChars);
          }
        }
      }
    }

    for (let k = 0; k < i; k++) {
      const extraChars = i-k;
      dp[i] = Math.min(dp[i], dp[k]+extraChars);
    }
  }

  const lastIndex = s.length-1;
  return dp[lastIndex];
};
