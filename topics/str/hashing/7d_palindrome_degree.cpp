#include <bits/stdc++.h>

#define MAX_N 5000000

using namespace std;


string s;
int n;
int M = (int)1e9+9;
vector<long long> b_pows(MAX_N+1);
vector<long long> ph(MAX_N+1);
vector<long long> rph(MAX_N+1);

int val(char c) {
	if (c >= 'a') {
		return c - 'a' + 1;
	} else if (c >= 'A') {
		return c - 'A' + 27;
	}
	return c - '0' + 53;
}


int main() {
	ios::sync_with_stdio(0); cin.tie(0);
	cin >> s;
	n = s.size();

	int B = 67;

	b_pows[0] = 1;
	for (int i = 1; i <= n; i++) {
		b_pows[i] = (b_pows[i-1]*B)%M;
	}

	ph[0] = 0;
	for (int i = 0; i < n; i++) {
		ph[i+1] = (ph[i]*B + val(s[i]))%M;
	}

	rph[0] = 0;
	for (int i = 0; i < n; i++) {
		rph[i+1] = (rph[i] + val(s[i])*b_pows[i]%M)%M;
	}

	int sol = 1;
	vector<int> dp(n);
	dp[0] = 1;
	int i = 0;
	while (1) {
		if (2*i+1 < n) {
			if (ph[2*i+2] == rph[2*i+2]) {
				dp[2*i+1] = dp[i] + 1;
				sol += dp[i]+1;
			} else {
				dp[2*i+1] = 0;
			}

			if (2*i+2 < n) {
				if (ph[2*i+3] == rph[2*i+3]) {
					dp[2*i+2] = dp[i] + 1;
					sol += dp[i] + 1;
				} else {
					dp[2*i+2] = 0;
				}
			}
		} else {
			break;
		}
		i++;
	}

	cout << sol << "\n";

	return 0;
}


