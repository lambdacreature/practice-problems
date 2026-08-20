// problem: https://leetcode.com/problems/word-break-ii/description/
// solver:  https://github.com/lambdacreature/

function wordBreak(s: string, wordDict: string[]): string[] {
  // dp[i] is all the possible sentences with s[0..i]
  const dp: string[][] = [];
  for (const _ of s) {
    dp.push([]);
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
      dp[word.length-1].push(word);
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (const word of wordDict) {
      const prevEnd = i - word.length;
      if (prevEnd >= 0 && dp[prevEnd].length > 0) {
        let matches = true;

        for (let j = 0; j < word.length; j++) {
          if (s[prevEnd+j+1] != word[j]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          for (const prevSentence of dp[prevEnd]) {
            dp[i].push(`${prevSentence} ${word}`)
          }
        }
      }
    }
  }

  const lastIndex = dp.length - 1;
  return dp[lastIndex];
};
