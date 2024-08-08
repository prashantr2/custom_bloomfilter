#include <bits/stdc++.h>
#define MOD 100000007
using namespace std;
typedef long long ll;

int consistent_hash(string & key, vector<int> & arr, int ringSize){
    hash<string> hasher; 
    int h = hasher(key) % ringSize;
    int idx = upper_bound(arr.begin(), arr.end(), h) - arr.begin();
    if (idx == arr.size()) return arr[0];
    return arr[idx];
}

void print_ring(vector<int>& arr, int ringSize){
    int pos = 0;
    for (int i = 0; i < ringSize; i++) {
        if (arr[pos] == i) {
            cout << "(" << i << ")";
            pos++;
        }
        else cout << "-";
    }
    cout << endl;
}

void add_node(vector<int>& arr, int ringSize){
    cout << "Add " << arr.size() << "th node: ";
    int a; cin >> a;
    arr.push_back(-1);
    for (int i = arr.size()-1; i > 0; i--) {
        if (arr[i-1] < a) {
            arr[i] = a;
            break;
        }
        arr[i] = arr[i-1];
    }
    for (auto i: arr) cout << i << ", ";
    cout << endl;
    print_ring(arr, ringSize);
}

void remove_node(vector<int>& arr, int ringSize) {
    cout << "Which node to remove: ";
    int a; cin >> a;
    vector<int> new_arr;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] != a) {
            new_arr.push_back(arr[i]);
        }
    }
    arr = new_arr;
    print_ring(new_arr, ringSize);
}

int main(){
    int ringSize = -1;
    while ((ringSize < 4) || (ringSize > 64)) {
        cout << "Give ring size (4 <= ring_size <= 64): ";
        cin >> ringSize;
        if (ringSize < 4) continue;
        if (ringSize > 64) continue;
    }
    vector<int> arr;     
    cout << "How many nodes to add? ";
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Add " << i << "th node: ";
        int a; cin >> a;
        arr.push_back(a);
    }
    sort(arr.begin(), arr.end());
    print_ring(arr, ringSize);
    
    while (true) {
        cout << "Give a key: ";
        string key;
        cin >> key;
        if (key == "quit") break;
        else if (key == "__add__") add_node(arr, ringSize);
        else if (key == "__remove__") remove_node(arr, ringSize);
        else cout << key << " belongs to: " << consistent_hash(key, arr, ringSize) << endl;
    }
    cout << "Thank you!" << endl;

    return 0;
}