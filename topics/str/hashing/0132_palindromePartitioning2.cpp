// url: https://leetcode.com/problems/palindrome-partitioning-ii/description/
#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
  int minCut(string s) {
    int n = s.size();

    // dp[k] = minimum cuts needed for a palindrome partitioning
    // of the prefix with length k
    vector<int> dp(n + 1, n + 1);
    dp[0] = 0;

    long long M = (1LL << 61) - 1;
    int B = 29;

    vector<__int128_t> ph(n + 1);
    ph[0] = 0;
    for (int k = 0; k < n; k++) {
      ph[k + 1] = (ph[k] * B + (s[k] - 'a' + 1)) % M;
    }

    vector<__int128_t> psh(n + 1);
    psh[0] = 0;
    for (int k = 0; k < n; k++) {
      psh[k + 1] = (psh[k] * B + (s[n - k - 1] - 'a' + 1)) % M;
    }

    vector<__int128_t> b_pows(n + 1);
    b_pows[0] = 1;
    for (int i = 1; i <= n; i++) {
      b_pows[i] = (b_pows[i - 1] * B) % M;
    }

    for (int k = 1; k <= n; k++) {
      for (int u = 0; u < k; u++) {
        int st = u;
        int ed = k - 1;

        auto hash =
            ((ph[ed + 1] - ph[st] * b_pows[ed - st + 1] % M) % M + M) % M;
        auto rhash =
            ((psh[n - st] - psh[n - ed - 1] * b_pows[ed - st + 1] % M) % M +
             M) %
            M;

        if (hash == rhash) {
          dp[k] = min(dp[k], dp[u] + (u == 0 ? 0 : 1));
        }
      }
    }

    return dp[n];
  }
};
