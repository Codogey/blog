---
title: Search in 2d array 
date: "2019-01-16T22:12:03.284Z"
description: "Hello World"
---

## Introduction
The typical question is the **maze**. we can do a search in the maze with BFS or DFS. There are some trade-offs.
```
{S, X, O, O, O}
{O, X, O, O, O}
{O, X, O, O, O}
{O, X, X, X, X}
{O, O, O, O, E}
_________________________
S - Start
E - End
X - Wall
O - Empty sapce
```
## General tips
**How to represent 4 directions?**
```java
private static final int[] directionX = {0, 0, 1, -1};
private static final int[] directionY = {1, -1, 0, 0};
```
**check the index in the bound of matrix**
```java
    private static boolean inBound(int x, int y, char[][] maze) {
        return 0 <= x && x < maze.length && 0 <= y && y < maze[0].length;
    }
```
## Can we find a path from start to end?
For both dfs or dfs, we need a `booealn[][] visited` to record whether a point has been visited to avoid visit a point repeatedly.

### dfs
```java
    public static boolean canReachDFS(char[][] maze, int startX, int startY, int endX, int endY) {
        return canReachDFSHelper(maze, startX, startY, endX, endY, new boolean[maze.length][maze[0].length]);
    }
    private static boolean canReachDFSHelper(
            char[][] maze,
            int currX,
            int currY,
            int endX,
            int endY,
            boolean[][] visited
    ) {
        if (currX == endX && currY == endY) {
            return true;
        }
        for (int i = 0; i < 4; i++) {
            int nextX = currX + directionX[i];
            int nextY = currY + directionY[i];
            if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                visited[nextX][nextY] = true;
                if (canReachDFSHelper(maze, nextX, nextY, endX, endY, visited)) {
                    return true;
                }
                visited[nextX][nextY] = false;
            }
        }
        return false;
    }
```
### bfs
```java
 public static boolean canReachBFS(char[][] maze, int startX, int startY, int endX, int endY) {
        Queue<Coordinate> queue = new LinkedList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        queue.offer(new Coordinate(startX, startY));
        visited[startX][startY] = true;
        while (!queue.isEmpty()) {
            Coordinate curr = queue.poll();
            // reach end.
            if (curr.x == endX && curr.y == endY) {
                return true;
            }
            for (int i = 0; i < 4; i++) {
                int nextX = curr.x + directionX[i];
                int nextY = curr.y + directionY[i];
                if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                    queue.offer(new Coordinate(nextX, nextY));
                    visited[nextX][nextY] = true;
                }
            }
        }
        return false;
    }
```
## How to find the shortest path?
`bfs` is better, it visits every node exactly once. On the contrary, `dfs` maybe visit one node multiple times to update the `int[][] distances`
Also, `bfs` is easy to write.
### dfs
1. `distances[x][y]` represents the shortest distance between start and `Point(x, y)`. Because of the definition of `int[][] distances`, there is no need to recover the `int[][] distances` after the dfs().
2. At the beginning, we set all values in `int[][] distances` to `Integer.MAX_VALUE` which means that we can't reach this point from start.
3. When we do dfs() recursively, we should check whether we have reached next point in previous round with shorter path. We only do the dfs() when the current path is shorter.
```java
 public static int shortestPathDFS(char[][] maze, int startX, int startY, int endX, int endY) {
        int[][] distances = new int[maze.length][maze[0].length];
        for (int[] row : distances) {
            Arrays.fill(row, Integer.MAX_VALUE); // NOTICE!
        }
        distances[startX][startY] = 0; // NOTEICE!
        shortestPathDFSHelper(maze, startX, startY, endX, endY, distances);
        return distances[endX][endY] == Integer.MAX_VALUE ? -1 : distances[endX][endY]; // NOTICE!

    }
    private static void shortestPathDFSHelper(
            char[][] maze,
            int currX,
            int currY,
            int endX,
            int endY,
            int[][] distances
    ) {
        if (currX == endX && currY == endY) {
            return;
        }
        int distance = distances[currX][currY];
        for (int i = 0; i < 4; i++) {
            int nextX = currX + directionX[i];
            int nextY = currY + directionY[i];
            // NOTICE!
            if (inBound(nextX, nextY, maze) && maze[nextX][nextY] != 'X' && distances[nextX][nextY] > distance + 1) {
                distances[nextX][nextY] = distance + 1;
                shortestPathDFSHelper(maze, nextX, nextY, endX, endY, distances);
            }
        }
    }
```
### bfs
If we do the bfs, when it arrives at the end, it must be the shortest path. The only thing we should do is recording the distance. We can use a `int count` to record the distance and do a level-order traversal.
```java
 public static int shortestPathBFS(char[][] maze, int startX, int startY, int endX, int endY) {
        Queue<Coordinate> queue = new LinkedList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        queue.offer(new Coordinate(startX, startY));
        visited[startX][startY] = true;
        int count = 0; // NOTICE!
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                Coordinate curr = queue.poll();
                // reach end.
                if (curr.x == endX && curr.y == endY) {
                    return count;
                }
                for (int i = 0; i < 4; i++) {
                    int nextX = curr.x + directionX[i];
                    int nextY = curr.y + directionY[i];
                    if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                        queue.offer(new Coordinate(nextX, nextY));
                        visited[nextX][nextY] = true;
                    }
                }
            }
            count++; // NOTICE!
        }
        return -1;
    }
```
## How to record all possible paths?
### dfs
```java
 public static List<String> recordAllPossiblePaths(char[][] maze, int startX, int startY, int endX, int endY) {
        List<String> ans = new ArrayList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        visited[startX][startY] = true;
        recordAllPossiblePathsDFSHelper(maze, startX, startY, endX, endY, visited, new StringBuilder(), ans);
        return ans;
    }
    private static void recordAllPossiblePathsDFSHelper(
            char[][] maze,
            int currX,
            int currY,
            int endX,
            int endY,
            boolean[][] visited,
            StringBuilder path,
            List<String> ans
    ) {
        if (currX == endX && currY == endY) {
            ans.add(path.toString());
            return;
        }
        for (int i = 0; i < 4; i++) {
            int nextX = currX + directionX[i];
            int nextY = currY + directionY[i];
            if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                visited[nextX][nextY] = true;
                path.append(directionS[i]);
                recordAllPossiblePathsDFSHelper(maze, nextX, nextY, endX, endY, visited, path, ans);
                visited[nextX][nextY] = false;
                path.deleteCharAt(path.length() - 1);
            }
        }
    }
```
### bfs
**VERY STUPID!**
```java
    public static List<String> recordAllPossiblePathsBFS(char[][] maze, int startX, int startY, int endX, int endY) {
        // NOTEICE!
        List<String>[][] paths = new List[maze.length][maze[0].length];
        for (int i = 0; i < paths.length; i++) {
            for (int j = 0; j < paths[0].length; j++) {
                paths[i][j] = new ArrayList<>();
            }
        }
        paths[startX][startY].add(""); // NOTEICE!
        Queue<Coordinate> queue = new LinkedList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        queue.offer(new Coordinate(startX, startY));
        visited[startX][startY] = true;
        while (!queue.isEmpty()) {
            Coordinate curr = queue.poll();
            List<String> lastPaths = paths[curr.x][curr.y]; // NOTICE!
            for (int i = 0; i < 4; i++) {
                // NOTEICE!
                List<String> newPaths = new ArrayList<>();
                for (String lastPath : lastPaths) {
                    newPaths.add(lastPath + directionS[i]);
                }
                int nextX = curr.x + directionX[i];
                int nextY = curr.y + directionY[i];
                if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                    // NOTEICE!
                    if (nextX == endX && nextY == endY) {
                        paths[endX][endY].addAll(newPaths);
                        continue;
                    }
                    queue.offer(new Coordinate(nextX, nextY));
                    visited[nextX][nextY] = true;
                    paths[nextX][nextY] = newPaths;
                }
            }
        }
        return paths[endX][endY];
    }
```
## How to record shortest path?
### dfs
```java
  public static List<String> recordShortestPathDFS(char[][] maze, int startX, int startY, int endX, int endY) {
        List<String> ans = new ArrayList<>();
        int[][] distances = new int[maze.length][maze[0].length];
        for (int[] row : distances) {
            Arrays.fill(row, Integer.MAX_VALUE); // NOTICE!
        }
        distances[startX][startY] = 0; // NOTEICE!
        recordShortestPathDFSHelper(maze, startX, startY, endX, endY, distances, new StringBuilder(), ans);
        return ans;
    }
    private static void recordShortestPathDFSHelper(
            char[][] maze,
            int currX,
            int currY,
            int endX,
            int endY,
            int[][] distances,
            StringBuilder path, // NOTICE!
            List<String> ans    // NOTICE!
    ) {
        if (currX == endX && currY == endY) {
            // NOTICE!!
            if (ans.isEmpty()) {
                ans.add(path.toString());
            } else {
                int length = ans.get(0).length();
                if (path.length() <= length) {
                    if (path.length() < length) {
                        ans.clear();
                    }
                    ans.add(path.toString());
                }
            }
            return;
        }
        int distance = distances[currX][currY];
        for (int i = 0; i < 4; i++) {
            int nextX = currX + directionX[i];
            int nextY = currY + directionY[i];
            // NOTICE!
            if (inBound(nextX, nextY, maze) && maze[nextX][nextY] != 'X' && distances[nextX][nextY] > distance + 1) {
                distances[nextX][nextY] = distance + 1;
                path.append(directionS[i]); // NOTICE!
                recordShortestPathDFSHelper(maze, nextX, nextY, endX, endY, distances, path, ans);
                path.deleteCharAt(path.length() - 1); // NOTICE!
            }
        }
    }
```
### bfs
If we only need to print one of the shortest path, we can use a 'pre[x][y]' to record the previous directions that reach to `Point(x, y)`. When we arrive at the end. we can track back accoding to the `char[][] pre`. 
```java
    public static String recordShortestPathBFS(char[][] maze, int startX, int startY, int endX, int endY) {
        Queue<Coordinate> queue = new LinkedList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        char[][] pre = new char[maze.length][maze[0].length];  // NOTICE!
        queue.offer(new Coordinate(startX, startY));
        visited[startX][startY] = true;
        while (!queue.isEmpty()) {
            Coordinate curr = queue.poll();
            // reach end.
            if (curr.x == endX && curr.y == endY) {
                return printPath(pre, startX, startY, endX, endY);  // NOTICE!
            }
            for (int i = 0; i < 4; i++) {
                int nextX = curr.x + directionX[i];
                int nextY = curr.y + directionY[i];
                if (inBound(nextX, nextY, maze) && !visited[nextX][nextY] && maze[nextX][nextY] != 'X') {
                    queue.offer(new Coordinate(nextX, nextY));
                    visited[nextX][nextY] = true;
                    pre[nextX][nextY] = directionS[i]; // NOTICE!
                }
            }
        }
        return "";
    }
```
#### How to track back the path from end?
```java
 private static String printPath(char[][] pre, int startX, int startY, int endX, int endY) {
        if (startX == endX && startY == endY) {
            return "";
        }
        char direction = pre[endX][endY];
        if (direction == 'l') {
            return printPath(pre, startX, startY, endX, endY + 1) + 'l';
        } else if (direction == 'r') {
            return printPath(pre, startX, startY, endX, endY - 1) + 'r';
        } else if (direction == 'u') {
            return printPath(pre, startX, startY, endX + 1, endY) + 'u';
        } else if (direction == 'd') {
            return printPath(pre, startX, startY, endX - 1, endY) + 'd';
        }
        return "";
    }
```