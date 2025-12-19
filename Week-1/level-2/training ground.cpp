#include <bits/stdc++.h>
using namespace std;
#define int long long 
#define ld long double

class DSU{
vector<int> parent, size, rank;
public:
    DSU(int n){
        parent.resize(n);
        size.assign(n,1);
        rank.assign(n,0);
        for(int i = 0; i < n; i++){
            parent[i] = i;
        }
    }
 
    int findpar(int node){
        if(parent[node] == node)
            return node;
        return parent[node] = findpar(parent[node]); 
    }
 
    void unionSize(int u, int v){
        int pu = findpar(u);
        int pv = findpar(v);
        if(pu == pv) return;
        if(size[pu] < size[pv]){
            parent[pu] = pv;
            size[pv] += size[pu];
        }
        else{
            parent[pv] = pu;
            size[pu] += size[pv];
        }
    }
};

struct Edge {
    int u, v;
    int w;
};

void solve(){
int m, n, k;
    cin >> m >> n >> k;
    int total = m * n;
    vector<vector<int>> grid(m, vector<int>(n));
    for (int i = 0; i < m; i++){
        for (int j = 0; j < n; j++){
            cin >> grid[i][j];
        }
    }
 
    if(k == 0){
        for (int i = 0; i < m; i++){
            for (int j = 0; j < n; j++){
                cout << 0 << " ";
            }
            cout << "\n";
        }
        return;
    }
 
    
    vector<Edge> edges;
    for (int i = 0; i < m; i++){
        for (int j = 0; j < n; j++){
            int u = i * n + j;
            
            if(j + 1 < n){
                int v = i * n + (j + 1);
                int w = llabs(grid[i][j] - grid[i][j+1]);
                edges.push_back({u, v, w});
            }
           
            if(i + 1 < m){
                int v = (i + 1) * n + j;
                int w = llabs(grid[i][j] - grid[i+1][j]);
                edges.push_back({u, v, w});
            }
        }
    }
 
    
    sort(edges.begin(), edges.end(), [](const Edge &a, const Edge &b){
        return a.w < b.w;
    });
 
    
    vector<vector<int>> comp(total);
    for (int i = 0; i < total; i++){
        comp[i].push_back(i);
    }
 
    
    vector<int> ans(total, -1);
    int req = k + 1;  
 
    DSU dsu(total);
 
    
    for(auto &e : edges){
        int ru = dsu.findpar(e.u);
        int rv = dsu.findpar(e.v);
        if(ru == rv)
            continue;
 
        if(comp[ru].size() < comp[rv].size()){
            swap(ru, rv);
        }
  
        dsu.unionSize(e.u, e.v);
        
        for (auto x : comp[rv]){
            comp[ru].push_back(x);
        }
        comp[rv].clear();
 
        if(comp[ru].size() >= (size_t)req){
            for (int x : comp[ru]){
                if(ans[x] == -1)
                    ans[x] = e.w;
            }
        }
    }
 
    for (int i = 0; i < m; i++){
        for (int j = 0; j < n; j++){
            cout << ans[i * n + j] << " ";
        }
        cout << "\n";
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