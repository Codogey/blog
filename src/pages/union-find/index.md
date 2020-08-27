---
title: Union find 
date: "2019-01-07T22:12:03.284Z"
description: "Hello World"
tags: ['Algorithm']
---

```java
class UnionFind{
        HashMap<Integer, Integer> father = new HashMap<Integer, Integer>();
        UnionFind(){
            // init father map, make everyone is the father of themselves.
        }
        int compressed_find(int x){
            int parent =  father.get(x);
            while(parent!=father.get(parent)) {
                parent = father.get(parent);
            }
            int temp = -1;
            int fa = x;
            while(fa!=father.get(fa)) {
                temp = father.get(fa);
                father.put(fa, parent) ;
                fa = temp;
            }
            return parent;
                
        }
        
        void union(int x, int y){
            int fa_x = compressed_find(x);
            int fa_y = compressed_find(y);
            if(fa_x != fa_y)
                father.put(fa_x, fa_y);
        }
    }
```

## How to handle 2d-array?
we can try to convert `(x, y)` to `id = x * # of each row's elements`
```java
int convertToId(int x, int y, int num) {
  return x * num + y;
}
```
## How to count number of connected components?
we can use a `count` to record this information. At beginning,it equals to the total number of elements. And when we `connect(a, b)`, when the father of a is not equal to the father of b, which means we connect two separated components together, so we let `count--`;
```java
    public void connect(int a, int b) {
        int root_a = find(a);
        int root_b = find(b);
        if (root_a != root_b) {
            father[root_a] = root_b;
            count--;  // NOTICE!
        }
    }
``` 
## How to count the number of connected component nodes which include node a?
we can use a `int[] sizes` to record this information. At the beginning, it equals to 1. when we `connect(a, b)`, if `father of a` is not equal to `father of b`,  we should add the size together and update the `sizes[]` of father node. When we `query()`, we get this information from father node's `sizes[]`
```java
    public void connect(int a, int b) {
        int root_a = find(a);
        int root_b = find(b);
        if (root_a != root_b) {
            father[root_a] = root_b;
            size[root_b] += size[root_a]; // NOTICE!
        }
    }
```


## Number of Connected Components
### Undirected Graph
[Leetcode 323. Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
#### Union Find
```java
class Solution {
    class UnionFind {
        Map<Integer, Integer> parents = new HashMap<>();
        public UnionFind(int n) {
            for (int i = 0; i < n; i++) {
                parents.put(i, i);
            }
        }
        public void union(int x, int y) {
            int faX = find(x);
            int faY = find(y);
            if (faX != faY) {
                parents.put(faX, faY);
            }
        }
        public int find(int x) {
            int parent = x;
            while (parent != parents.get(parent)) {
                parent = parents.get(parent);
            }
            int curr = x;
            while (curr != parents.get(curr)) {
                int next = parents.get(curr);
                parents.put(curr, parent);
                curr = next;
            }
            return parent;
        }
        public int count() {
            Set<Integer> set = new HashSet<>();
            for (int parent : parents.values()) {
                set.add(find(parent));
            }
            return set.size();
        }
    }
    public int countComponents(int n, int[][] edges) {
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edges) {
            uf.union(edge[0], edge[1]);
        }
        return uf.count();
    }
}
```
#### dfs
```java
class Solution {
    public int countComponents(int n, int[][] edges) {
        boolean[] visited = new boolean[n];
        Map<Integer, List<Integer>> graph = buildGraph(edges);
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(i, graph, visited);
                count++;
            }
        }
        return count;
    }
    private Map<Integer, List<Integer>> buildGraph(int[][] edges) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        for (int[] edge : edges) {
            if (!graph.containsKey(edge[0])) {
                graph.put(edge[0], new ArrayList<>());
            }
            if (!graph.containsKey(edge[1])) {
                graph.put(edge[1], new ArrayList<>());
            }
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        return graph;
    }
    private void dfs(int start, Map<Integer, List<Integer>> graph, boolean[] visited) {
        if (graph.containsKey(start)) {
            for (int next : graph.get(start)) {
                if (!visited[next]) {
                    visited[next] = true;
                    dfs(next, graph, visited);
                }
            }
        }
    }
}
```
#### How to print connected component?
[LintCode 431. Connected Component in Undirected Graph
](https://www.lintcode.com/problem/connected-component-in-undirected-graph/description)