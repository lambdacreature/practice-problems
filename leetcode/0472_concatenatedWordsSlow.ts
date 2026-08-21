function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const concatenatedWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const targetWord = words[i];
    // dp[u] === targetWord[0..u] is a concatenated word
    const dp: boolean[] = Array(30).fill(false);

    // handle base cases for targetWord
    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      if (word.length >= targetWord.length) {
        continue;
      }

      let matches = true;

      for (let k = 0; k < word.length; k++) {
        if (targetWord[k] != word[k]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        dp[word.length-1] = true;
      }
    }

    for (let u = 0; u < targetWord.length; u++) {
      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        if (word.length >= targetWord.length) {
          continue;
        }

        const prevEnd = u - word.length;
        if (prevEnd >= 0 && dp[prevEnd]) {
          let matches = true;

          for (let k = 0; k < word.length; k++) {
            if (targetWord[prevEnd+k+1] != word[k]) {
              matches = false;
              break;
            }
          }

          if (matches) {
            dp[u] = true;
            break;
          }
        }
      }
    }

    if (dp[targetWord.length-1]) {
      concatenatedWords.push(targetWord);
    }
  }

  return concatenatedWords;
};
