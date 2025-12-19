#include <bits/stdc++.h>
using namespace std;
#define int long long 
#define ld long double

struct Fenw {
    int n;
    vector<long long> bit;
    Fenw(int n) : n(n), bit(n,0) { }
    
    void update(int idx, long long delta){
        for(; idx < n; idx = idx | (idx+1))
            bit[idx] += delta;
    }
    
    long long query(int idx){
        long long res = 0;
        for(; idx >= 0; idx = (idx & (idx+1)) - 1)
            res += bit[idx];
        return res;
    }
};
 

void solve(){
    int n, k;
    cin >> n >> k;
    vector<int> P(n);
    for(auto &x : P) 
        cin >> x;
 
    
    if(k == n){
        cout << 0 << "\n";
        return;
    }
 
    int S = n - k;
    int m = S / 2;       
    bool odd = (S % 2 == 1); 
 
    vector<int> sortedP = P;
    sort(sortedP.begin(), sortedP.end());
   
    vector<long long> prefix(n+1, 0);
    for (int i = 0; i < n; i++){
        prefix[i+1] = prefix[i] + sortedP[i];
    }
    
    vector<int> pos_map(n+1);
    for (int i = 0; i < n; i++){
        pos_map[ sortedP[i] ] = i;
    }
 
    
    Fenw fenwCount(n), fenwSum(n);
 
    for (int i = 0; i < k; i++){
        int pos = pos_map[ P[i] ];
        fenwCount.update(pos, 1);
        fenwSum.update(pos, P[i]);
    }
 
    auto kthAvailable = [&](int kVal) -> int {
        int l = 0, r = n - 1, ans = -1;
        while(l <= r){
            int mid = (l + r) / 2;
            int removed = (int)fenwCount.query(mid);
            int avail = (mid + 1) - removed;
            if(avail >= kVal){
                ans = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return ans;
    };
 
    
    auto sumOfKAvailable = [&](int kVal) -> long long {
        if(kVal <= 0) return 0LL;
        int idx = kthAvailable(kVal); 
        long long sumBefore = 0;
        if(idx > 0)
            sumBefore = prefix[idx] - fenwSum.query(idx-1);
        return sumBefore + sortedP[idx];
    };
 
    
    auto computeScore = [&]() -> long long {
        long long score = 0;
        if(m > 0)
            score = 2LL * sumOfKAvailable(m);
        if(odd){
            int idx = kthAvailable(m+1);
            score += sortedP[idx];
        }
        return score;
    };
 
    long long bestScore = computeScore();
 
    
    for (int i = k; i < n; i++){
        
        int pos_left = pos_map[ P[i - k] ];
        fenwCount.update(pos_left, -1);
        fenwSum.update(pos_left, -P[i - k]);
        
        int pos_right = pos_map[ P[i] ];
        fenwCount.update(pos_right, 1);
        fenwSum.update(pos_right, P[i]);
 
        long long currScore = computeScore();
        bestScore = max(bestScore, currScore);
    }
 
    cout << bestScore;
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