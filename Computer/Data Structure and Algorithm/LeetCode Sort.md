https://leetcode.com/tag/sort/


- 349 Intersection of Two Arrays 
两个数组的交集 
https://leetcode.com/problems/intersection-of-two-arrays/description/

set用法
multiset用法
vector用法 
http://www.cplusplus.com/reference/vector/vector/

dalao的解法：利用了erase
set初始化

```
vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
    set<int> s(nums1.begin(), nums1.end());
    vector<int> out;
    for (int x : nums2)
        if (s.erase(x))
            out.push_back(x);
    return out;
}

```



