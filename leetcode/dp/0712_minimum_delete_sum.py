import array


class Solution:
    def minimumDeleteSum(self, s1: str, s2: str) -> int:
        offset = 97 - ord('a')
        dp = [array.array('l', range(len(s2)+1)) for _ in range(len(s1)+1)]

        dp[0][0] = 0

        for i in range(1, len(s1)+1):
            dp[i][0] = ord(s1[i-1]) + offset + dp[i-1][0]

        for j in range(1, len(s2)+1):
            dp[0][j] = ord(s2[j-1]) + offset + dp[0][j-1]

        for i in range(1, len(s1)+1):
            for j in range(1, len(s2)+1):
                dp[i][j] = min(
                    dp[i-1][j] + ord(s1[i-1]) + offset,
                    dp[i][j-1] + ord(s2[j-1]) + offset,
                    dp[i-1][j-1] + (0 if s1[i-1] == s2[j-1] else ord(s1[i-1]) + offset + ord(s2[j-1]) + offset)
                )

        return dp[-1][-1]
