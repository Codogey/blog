---
title: N sum 
date: "2018-12-06T22:12:03.284Z"
description: "Hello World"
---

## Two sum
[Leetcode 1. Two Sum](https://leetcode.com/problems/two-sum/)
**Feature:**
1. must have exactly one solution.
2. not use the same element twice.

**Algorithm:** For each element, we need know whether `target - nums[i]` is in the array, it's normal to think of using `HashMap` to do this operation in O(1) time. The key of the HashMap is element's value, and the value of the HashMap is the index of element. And  then, we iterate every element in the array. we firstly check if HashMap contains `target - nums[i]`, if yes, return the result, otherwise, we put this nums[i] into HashMap.
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return null;
        }
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (map.containsKey(need)) {
                return new int[] {map.get(need), i};
            } else {
                map.put(nums[i], i);
            }
        }
        return null;
    }
}
```
Time Complexity: O(n)
Space Complexity: O(n)

**Notice:**
We can also solve this problem with two pointers if the array is sorted. We should notice that if the interviewer asks us to optimize space, sorting the array with `Arrays.sort() in java` and using two pointers cannot optimize spacem, because the quickSort or mergeSort also need O(n) space (for callstack). We need heapSort to do this with O(1) space.
## Two Sum II - Input array is sorted
[Leetcode 167. Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
**Feature:**
1. must have exactly one solution.
2. not use the same element twice.
3. array sorted in ascending order

**Algorithm:** Because the array is already sorted, so we can use two pointers. We put two pointers at the head and the end of the array and get the sum. If the sum is bigger, which means we need make the sum smaller, so we move the pointer `right--`, otherwise, we make `left++`. When `sum == target`, we get what we want.
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if (numbers == null || numbers.length == 0) {
            return null;
        }
        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                return new int[] {left + 1, right + 1}; // index is not start from 0.
            }
        }
        return null;
    }
}
```
Time Complexity: O(n)
Space Complexity: O(1)
## Two Sum III - Data structure design
[Leetcode 170. Two Sum III - Data structure design](https://leetcode.com/problems/two-sum-iii-data-structure-design/)
The difficulty of this problem is how to represents the repeated numbers. We can easily solve it by recording the value and the times of the element in HashMap.
```java
class TwoSum {
    private Map<Integer, Integer> map;
    /** Initialize your data structure here. */
    public TwoSum() {
        this.map = new HashMap<>();
    }
    
    /** Add the number to an internal data structure.. */
    public void add(int number) {
        map.put(number, map.getOrDefault(number, 0) + 1);
    }
    
    /** Find if there exists any pair of numbers which sum is equal to the value. */
    public boolean find(int value) {
        for (int key : map.keySet()) {
            int need = value - key;
            if ((need == key && map.get(need) > 1) || (need != key && map.containsKey(need))) {
                return true;
            }
        }
        return false;
    }
}
```
Time Complexity:
- add: O(1)
- find: O(n)
Space Complexity: O(n)

**Follow up:**
what if the `find()` calls more than `add()`?
we can pre-done the sum when `add()`.
```java
class TwoSum {
    Set<Integer> sum;
    Set<Integer> nums;
    /** Initialize your data structure here. */
    public TwoSum() {
        sum = new HashSet<>();
        nums = new HashSet<>(); // optimize for repeated element.
    }
    
    /** Add the number to an internal data structure.. */
    public void add(int number) {
        for (int num : nums) {
            sum.add(num + number);
        }
        nums.add(number);
    }
    
    /** Find if there exists any pair of numbers which sum is equal to the value. */
    public boolean find(int value) {
        return sum.contains(value);
    }
}
```
Time Complexity:
- add: O(n)
- find: O(1)
Space Complexity: O(n)

## Two Sum IV - Input is a BST
[653. Two Sum IV - Input is a BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)
The only difference is the way of iterating the elements.
```java
class Solution {
    Set<Integer> set = new HashSet<>();
    public boolean findTarget(TreeNode root, int k) {
        if (root == null) {
            return false;
        }
        int need = k - root.val;
        if (set.contains(need)) {
            return true;
        }
        set.add(root.val);
        return findTarget(root.left, k) || findTarget(root.right, k);
    }
}
```

## Three sum
[Leetcode 15. 3Sum](https://leetcode.com/problems/3sum/)
We can do a 2sum for every element in the array. The Time Complexity could be O(n^2). The time cost of sort is no longer the limitation of time complexity, so we can do sort firstly. 
**How to avoid repeated answer?**
Another difficulty is avoiding repeated anwser. Of course, we can use a HashSet to do it. Another approach is as bellow.
1. we can define `i < j < k` for answer triple.
2. only consider the first element for continuous repeated elements in the array. (for both 2sum and 3sum)
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        if (nums == null || nums.length < 2) {
            return ans;
        }
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            // avoid repeated answer.
            if (i != 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            List<List<Integer>> lists = twoSum(nums, i + 1, -nums[i]);
            for (List<Integer> list : lists) {
                list.add(0, nums[i]);
                ans.add(list);
            }
        }
        return ans;
    }
    private List<List<Integer>> twoSum(int[] nums, int start, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        int left = start;
        int right = nums.length - 1;
        while (left < right) {
            if (left != start && nums[left] == nums[left - 1]) {
                left++;
                continue;
            }
            if (right != nums.length - 1 && nums[right] == nums[right + 1]) {
                right--;
                continue;
            }
            int sum = nums[left] + nums[right];
            if (sum == target) {
                List<Integer> list = new LinkedList<>();
                list.add(nums[left++]);
                list.add(nums[right--]);
                ans.add(list);
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return ans;
    }
}
```
Time Complexity: O(n^2)
Space Complexity: O(n) if quickSort.

## 4Sum
[Leetcode 18. 4Sum](https://leetcode.com/problems/4sum/)
The idea is same as 3sum.
4Sum => 3Sum => 2Sum.
```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        
        if (nums == null || nums.length == 0) {
            return result;
        }
        Arrays.sort(nums);
 
        for (int i = 0; i < nums.length - 3; i++) {
            if (i != 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            int num = nums[i];
            List<List<Integer>> list = threeSumFromIndex(nums, target - num, i + 1);
            for (List<Integer> l : list) {
                l.add(0, num);
                result.add(l);
            }
        }
        return result;
    }
    private List<List<Integer>> threeSumFromIndex(int[] nums, int target, int start) {
        List<List<Integer>> result = new ArrayList<>();
        for (int i = start; i < nums.length - 2; i++) {
            if (i != start && nums[i] == nums[i - 1]) {
                continue;
            }
            int num = nums[i];
            List<List<Integer>> list = twoSumFromIndex(nums, target - num, i + 1);
            for (List<Integer> l : list) {
                l.add(0, num);
                result.add(l);
            }
        }
        return result;
    }
    private List<List<Integer>> twoSumFromIndex(int[] nums, int target, int start) {
        List<List<Integer>> result = new ArrayList<>();
        int right = nums.length - 1;
        int left = start;
        while (left < right) {
            // skip duplicate.
            if (left != start && nums[left] == nums[left - 1]) {
                left++;
                continue;
            }
            if (right != nums.length - 1 && nums[right] == nums[right + 1]) {
                right--;
                continue;
            }
            if (nums[left] + nums[right] == target) {
                List<Integer> pair = new LinkedList<>();
                pair.add(nums[left]);
                pair.add(nums[right]);
                result.add(pair);
                left++;
                right--;
            } else if (nums[left] + nums[right] < target) {
                left++;
            } else {
                right--;
            }
        }
        return result;
    }
}
```
Time Complexity: O(n^3)
Space Complexity: O(n) if quickSort.