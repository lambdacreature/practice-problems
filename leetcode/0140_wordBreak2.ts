// problem: https://leetcode.com/problems/word-break-ii/description/
// solver:  https://github.com/lambdacreature/

function wordBreak(s: string, wordDict: string[]): string[] {
  // dp[i] is true if s[0..i] can be segmented
  const dp: boolean[] = [];

  // sentences[i] stores all sentences that have s[i] as the last character of ther last word
  const sentences: string[][] =[];

  for (let i = 0; i < s.length; i++) {
    dp.push(false);
    sentences.push([]);

    for (const word of wordDict) {
      const prevEnd = i - word.length;
      if (prevEnd == -1) {
        // possible base case
        let matches = true;

        for (let j = 0; j < word.length; j++) {
          if (s[j] != word[j]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          dp[i] = true;
          sentences[i].push(word);
        }

      } else if (prevEnd >= 0 && dp[prevEnd]) {
        let matches = true;

        for (let j = 0; j < word.length; j++) {
          if (s[prevEnd+j+1] != word[j]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          dp[i] = true;
          for (const prevSentence of sentences[prevEnd]) {
            sentences[i].push(`${prevSentence} ${word}`);
          }
        }
      }
    }
  }

  const lastIndex = sentences.length - 1;
  return sentences[lastIndex];
};
