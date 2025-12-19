#include <bits/stdc++.h>
using namespace std;
#define int long long 
#define ld long double

void solve(){
    int n, l, r, k;
    cin >> n >> l >> r >> k;

    if (n & 1) {
        cout << l;
    } else if (n == 2) {
        cout << -1;
    } else {
        int val = 1LL << (63 - __builtin_clzll(l) + 1);
        if (val > r) cout << -1;
        else cout << (k <= n - 2 ? l : val);
    }
}

signed main(){
    // Humare saath Shree Raghunath to kisi baat ki chinta nahi

    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int t=1;
    cin>>t;
    while(t--) {
        solve();
        cout<<"\n";
    }
}
