// problem: https://leetcode.com/problems/longest-valid-parentheses/description/

function locateStarts(s: string): number[] {
  const starts: number[] = [];
  for (const _ of s) {
    starts.push(67);
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      continue;
    }

    let guess = i - 1;
    while (guess >= 0) {
      if (s[guess] == "(") {
        starts[i] = guess;
        break;

      } else if (starts[guess] == -1) {
        starts[i] = -1;
        break;

      } else {
        guess = starts[guess]-1;
      }
    }

    if (guess < 0) {
      starts[i] = -1;
    }
  }

  return starts;
}

function longestValidParentheses(s: string): number {
  const starts = locateStarts(s);

  const sol: number[] = [];
  for (const _ of s) {
    sol.push(0);
  }


  let longestLength = 0;
  let longestEnd = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      continue;
    }

    let j = i;
    while (j >= 0 && starts[j] != -1 && s[j] != "(") {
      sol[i] += j - starts[j] + 1;
      j = starts[j] - 1;
    }

    if (sol[i] > longestLength) {
      longestLength = sol[i];
      longestEnd = i;
    }

  }

  return longestLength;
}
