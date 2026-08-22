// problem: https://leetcode.com/problems/word-break/description/
// solver:  https://github.com/lambdacreature/

type Trie = {
  terminates: boolean;
  links: Map<string, Trie>;
}

const trieHas = (trie: Trie, target: string, start: number, len: number): boolean => {
  for (let i = start; i < start + len; i++) {
    const nextNode = trie.links.get(target[i]);
    if (nextNode === undefined) {
      return false;
    }
    trie = nextNode;
  }

  return trie.terminates;
}

const trieAdd = (trie: Trie, target: string): void => {
  for (let i = 0; i < target.length; i++) {
    const nextNode = trie.links.get(target[i]);
    if (nextNode === undefined) {
      for (let j = i; j < target.length; j++) {
        const newNode = {
          terminates: false,
          links: new Map(),
        }
        trie.links.set(target[j], newNode);
        trie = newNode;
      }
      break;
    }
    trie = nextNode;
  }
  trie.terminates = true;
}



function wordBreak(s: string, wordDict: string[]): boolean {
  // dp[i] is true if s[0..i] can be segmented
  const dp: boolean[] = [];
  for (const _ of s) {
    dp.push(false);
  }

  const trie: Trie = {
    terminates: false,
    links: new Map(),
  };

  // fill that trie
  for (const word of wordDict) {
    trieAdd(trie, word);
  }

  // handle base cases
  for (let i = 0; i < s.length; i++) {
    dp[i] = trieHas(trie, s, 0, i+1);
  }

  for (let i = 0; i < s.length; i++) {
    for (let len = 1; len <= 20; len++) {
      const prevEnd = i-len;
      if (prevEnd >= 0 && dp[prevEnd]) {
        if (trieHas(trie, s, prevEnd+1, len)) {
          dp[i] = true;
          break;
        }

      }
    }
  }

  const lastIndex = dp.length - 1;
  return dp[lastIndex];
};
