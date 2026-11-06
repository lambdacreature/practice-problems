#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
  vector<vector<int>> palindromePairs(vector<string> &words) {
    long long M = (1LL << 61) - 1;
    int B = 31;
    vector<__int128> hashes(words.size());
    vector<__int128> rhashes(words.size());

    for (int i = 0; i < words.size(); i++) {
      hashes[i] = 0;
      for (int j = 0; j < words[i].size(); j++) {
        hashes[i] = (hashes[i] * B + (words[i][j] - 'a' + 1)) % M;
      }

      rhashes[i] = 0;
      for (int j = 0; j < words[i].size(); j++) {
        rhashes[i] =
            (rhashes[i] * B + (words[i][words[i].size() - j - 1] - 'a' + 1)) %
            M;
      }
    }

    vector<__int128> b_pows(5001);
    b_pows[0] = 1;
    for (int i = 1; i <= 5000; i++) {
      b_pows[i] = (b_pows[i - 1] * B) % M;
    }

    vector<vector<int>> sol;
    for (int i = 0; i < words.size(); i++) {
      for (int j = 0; j < words.size(); j++) {
        if (i == j) {
          continue;
        }

        __int128 hash =
            (hashes[i] * b_pows[words[j].size()] % M + hashes[j]) % M;
        __int128 rhash =
            (rhashes[j] * b_pows[words[i].size()] % M + rhashes[i]) % M;

        if (hash == rhash) {
          sol.push_back({i, j});
          cout << "hi" << endl;
        }
      }
    }

    return sol;
  }
};
