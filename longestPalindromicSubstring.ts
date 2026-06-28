function longestPalindrome(s: string): string {
  const longestEven = longestEvenPalindrome(s);
  const longestOdd = longestOddPalindrome(s);

  return longestEven.length > longestOdd.length ? longestEven : longestOdd;
};

function longestEvenPalindrome(s: string): string {
  let longestCenter = 0;
  let longestRadius = 0;

  for (let center = 0; center < s.length; center++) {
    let radius = 0;
    while (
      (center-(radius+1) >= 0) && (center+radius < s.length) && (s[center-(radius+1)] == s[center+radius])
    ) {
      radius++;
    }

    if (radius > longestRadius) {
      longestCenter = center;
      longestRadius = radius;
    }

  }

  return s.slice(
    longestCenter-longestRadius,
    longestCenter+longestRadius,
  );
}

function longestOddPalindrome(s: string): string {
  let longestCenter = 0;
  let longestRadius = 0;

  for (let center = 0; center < s.length; center++) {
    let radius = 0;
    while (
      (center-(radius+1) >= 0) && (center+radius+1 < s.length) && (s[center-(radius+1)] == s[center+radius+1])
    ) {
      radius++;
    }

    if (radius > longestRadius) {
      longestCenter = center;
      longestRadius = radius;
    }

  }

  return s.slice(
    longestCenter-longestRadius,
    longestCenter+longestRadius+1,
  );
}
