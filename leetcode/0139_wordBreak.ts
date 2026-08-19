function wordBreak(s: string, wordDict: string[]): boolean {
  // dp[i] is true if s[0..i] can be segmented
  const dp: boolean[] = [];

  for (let i = 0; i < s.length; i++) {
    dp.push(false);

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
        }
      }
    }
  }

  const lastIndex = dp.length - 1;
  return dp[lastIndex];
};
