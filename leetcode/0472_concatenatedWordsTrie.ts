type Trie = {
  terminates: boolean;
  links: Array<Trie | undefined>;
}

const trieHas = (trie: Trie, target: string, start: number, len: number): boolean => {
  const firstCode = 'a'.charCodeAt(0);
  for (let i = start; i < start + len; i++) {
    const ithCode = target.charCodeAt(i);
    const nextNode = trie.links[ithCode - firstCode];
    if (nextNode === undefined) {
      return false;
    }
    trie = nextNode;
  }

  return trie.terminates;
}

const trieAdd = (trie: Trie, target: string): void => {
  const firstCode = 'a'.charCodeAt(0);
  for (let i = 0; i < target.length; i++) {
    const ithCode = target.charCodeAt(i);
    const nextNode = trie.links[ithCode - firstCode];
    if (nextNode === undefined) {
      for (let j = i; j < target.length; j++) {
        const jthCode = target.charCodeAt(j);
        const newNode = {
          terminates: false,
          links: Array(26),
        }
        trie.links[jthCode - firstCode] = newNode;
        trie = newNode;
      }
      break;
    }
    trie = nextNode;
  }
  trie.terminates = true;
}

function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const concatenatedWords: string[] = [];

  const trie: Trie = {
    terminates: false,
    links: Array(26),
  };

  // fill up that trie
  for (const word of words) {
    trieAdd(trie, word);
  }

  for (let i = 0; i < words.length; i++) {
    const targetWord = words[i];
    // dp[u] === targetWord[0..u] is a concatenated word
    const dp: boolean[] = Array(30).fill(false);

    // handle base cases for targetWord
    for (let j = 0; j < targetWord.length-1; j++) {
      dp[j] = trieHas(trie, targetWord, 0, j+1);
    }

    for (let u = 0; u < targetWord.length; u++) {
      for (let len = 1; len < targetWord.length; len++) {
        const prevEnd = u-len;
        if (prevEnd >= 0 && dp[prevEnd]) {
          if (trieHas(trie, targetWord, prevEnd+1, len)) {
            dp[u] = true;
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
