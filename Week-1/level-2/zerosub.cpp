#include <bits/stdc++.h>
using namespace std;
#define int long long 
#define ld long double
void solve(){
    int n;
    cin >> n;
    vector<int> arr(n);
    for(auto &i:arr) cin>>i;
    
    int totalSub = n * (n + 1) / 2;
    
    int onesubarr = 0;
    int maxred = 0;
    
    int currone = 0; 
    for (int i = 0; i < n; i++){
        if(arr[i] == 1) {
            currone++;
        } else {
            if(currone > 0){
                onesubarr += currone * (currone + 1) / 2;
                
                int L = currone;
                int pos = (L - 1) / 2; 
                int leftLen = pos;               
                int rightLen = L - pos - 1;        
                int afterFlip = leftLen * (leftLen + 1) / 2 + rightLen * (rightLen + 1) / 2;
                int val = L * (L + 1) / 2 - afterFlip;
                
                maxred = max(maxred, val);
            }
            currone = 0;
        }
    }
    
    if(currone > 0){
        onesubarr += currone * (currone + 1) / 2;
        int L = currone;
        int pos = (L - 1) / 2; 
        int leftLen = pos;
        int rightLen = L - pos - 1;
        int afterFlip = leftLen * (leftLen + 1) / 2 + rightLen * (rightLen + 1) / 2;
        int val = L * (L + 1) / 2 - afterFlip;
        maxred = max(maxred, val);
    }
    
    int ans = totalSub - (onesubarr - maxred);
    cout << ans;
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