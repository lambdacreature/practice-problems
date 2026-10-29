// url: https://leetcode.com/problems/longest-palindromic-substring/description/
#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
  string longestPalindrome(string s) {
    int n = s.size();
    long long M = (1LL << 61) - 1;
    int B = 67;

    vector<__int128_t> b_pows(n + 1);
    b_pows[0] = 1;
    for (int i = 1; i <= n; i++) {
      b_pows[i] = (b_pows[i - 1] * B) % M;
    }

    vector<__int128_t> ph(n + 1);
    ph[0] = 0;
    for (int k = 0; k < n; k++) {
      char c = s[k];
      int c_val = c >= 'a'   ? c - 'a' + 1
                  : c >= 'A' ? 27 + c - 'A'
                             : 53 + c - '0';
      ph[k + 1] = (ph[k] * B + c_val) % M;
    }

    vector<__int128_t> rsh(n + 1);
    rsh[0] = 0;
    for (int k = 0; k < n; k++) {
      char c = s[n - k - 1];
      int c_val = c >= 'a'   ? c - 'a' + 1
                  : c >= 'A' ? 27 + c - 'A'
                             : 53 + c - '0';
      rsh[k + 1] = (rsh[k] * B + c_val) % M;
    }

    int max_i = 0;
    int max_j = 0;
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        auto hash = ((ph[j + 1] - ph[i] * b_pows[j - i + 1] % M) % M + M) % M;
        auto rhash =
            ((rsh[n - i] - rsh[n - j - 1] * b_pows[j - i + 1] % M) % M + M) % M;

        if (hash == rhash && j - i + 1 > max_j - max_i + 1) {
          max_i = i;
          max_j = j;
        }
      }
    }

    return s.substr(max_i, max_j - max_i + 1);
  }
};
