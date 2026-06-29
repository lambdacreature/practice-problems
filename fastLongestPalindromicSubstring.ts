function longestPalindrome(s: string): string {
  const longestEven = longestEvenPalindrome(s);
  const longestOdd = longestOddPalindrome(s);

  return longestEven.length > longestOdd.length ? longestEven : longestOdd;
};

function longestEvenPalindrome(s: string): string {
  let longestCenter = 0;
  let longestRadius = 0;

  const maxSubpalindromeRadii: number[] = [];
  for (const _ of s) {
    maxSubpalindromeRadii.push(0);
  }

  let center = 0;
  let radius = 0;
  while (center < s.length) {
    while (
      (center-(radius+1) >= 0) && (center+radius < s.length) && (s[center-(radius+1)] == s[center+radius])
    ) {
      radius++;
    }

    maxSubpalindromeRadii[center] = radius;
    if (radius > longestRadius) {
      longestCenter = center;
      longestRadius = radius;
    }

    const oldCenter = center;
    const oldRadius = radius;

    center++;
    radius = 0;

    while (center <= oldCenter+oldRadius-1) {
      const mirroredCenter = oldCenter-(center-oldCenter)-1;
      const maxMirroredRadius = oldCenter+oldRadius-center;

      if (maxSubpalindromeRadii[mirroredCenter] < maxMirroredRadius-1) {
        maxSubpalindromeRadii[center] = maxSubpalindromeRadii[mirroredCenter];
        center++;

      } else {
        break;
      }
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

  const maxSubpalindromeRadii: number[] = [];
  for (const _ of s) {
    maxSubpalindromeRadii.push(0);
  }

  let center = 0;
  let radius = 0;
  while (center < s.length) {
    while (
      (center-(radius+1) >= 0) && (center+radius+1 < s.length) && (s[center-(radius+1)] == s[center+radius+1])
    ) {
      radius++;
    }

    maxSubpalindromeRadii[center] = radius;
    if (radius > longestRadius) {
      longestCenter = center;
      longestRadius = radius;
    }

    const oldCenter = center;
    const oldRadius = radius;

    center++;
    radius = 0;

    while (center <= oldCenter+oldRadius) {
      const mirroredCenter = oldCenter-(center-oldCenter);
      const maxMirroredRadius = oldCenter+oldRadius-center;

      if (maxSubpalindromeRadii[mirroredCenter] < maxMirroredRadius) {
        maxSubpalindromeRadii[center] = maxSubpalindromeRadii[mirroredCenter];
        center++;

      } else if (maxSubpalindromeRadii[mirroredCenter] > maxMirroredRadius) {
        maxSubpalindromeRadii[center] = maxMirroredRadius;
        center++;

      } else {
        radius = maxMirroredRadius;
        break;
      }
    }
  }

  return s.slice(
    longestCenter-longestRadius,
    longestCenter+longestRadius+1,
  );
}
