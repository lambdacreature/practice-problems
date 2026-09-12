type Trie = {
  terminates: boolean;
  links: (Trie | undefined)[];
};

function lexicalOrder(n: number): number[] {
  const digits: number[] = [];
  for (const digit of n.toString()) {
    digits.push(parseInt(digit));
  }

  const buildTrie = (index: number, matchesN: boolean): Trie => {
    const result = {
      terminates: true,
      links: Array(10),
    };
    if (index === 0) {
      result.terminates = false;
    }



    return result;
  };

  const trie: Trie = buildTrie(0, true);

  return [];
};
