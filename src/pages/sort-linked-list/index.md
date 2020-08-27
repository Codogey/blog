---
title: Sort linked list 
date: "2018-11-30T22:12:03.284Z"
description: "Hello World"
tags: ['Algorithm']
---

[Leetcode 148. Sort List](https://leetcode.com/problems/sort-list/)

## Intuition
The most straightforward idea is using merge sort. In the past, I think it can't be done with quicksort because it's difficult to swap the elements in the process of partition. Recently, my friends said that their professor asked them to do it with quicksort. I think it's impossible and do some research. The result updates my understanding of quicksort. So I write this article.
## Merge sort
Step:
1. use slow-fast pointers to find the middle of the linked list, and divided it into two parts.
2. do mergeSort() for two split linked lists.
3. merge two sorted linked lists.

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null) {
            return null;
        }
        if (head.next == null) {
            return head;
        }
        // find mid
        ListNode slow = head;
        ListNode fast = head.next;
        // 1 2 3 4
        //   s
        //       f
        // 1 2 3 4 5
        //     s
        //            f
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode head2 = slow.next;
        slow.next = null; // divide into two linked list.
        head = sortList(head);
        head2 = sortList(head2);
        return merge(head, head2);
    }
    private ListNode merge(ListNode head1, ListNode head2) {
        if (head1 == null && head2 == null) {
            return null;
        }
        if (head1 == null) {
            return head2;
        }
        if (head2 == null) {
            return head1;
        }
        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;
        while (head1 != null && head2 != null) {
            if (head1.val < head2.val) {
                curr.next = head1;
                curr = curr.next;
                head1 = head1.next;
            } else {
                curr.next = head2;
                curr = curr.next;
                head2 = head2.next;
            }
        }
        while (head1 != null) {
            curr.next = head1;
            curr = curr.next;
            head1 = head1.next;
        }
        while (head2 != null) {
            curr.next = head2;
            curr = curr.next;
            head2 = head2.next;
        }
        return dummy.next;
    }
}
```

Time complexity: O(nlogn)
The only difference between doing merge sort in arrays is that we need `O(n)` time to find the middle of the linked list.
Space complexity: O(logn) 
We don't need an extra space to do merge(), but the cost of call stack still be logn.
## Quicksort
The key idea of quicksort is the partition.
In the arrays, we use swapping to do partition, but it can be implemented in many ways in fact. We can iterate the linked list and divide it into 3 linked lists (<, >, =) with dummy nodes.  In this way, we can do the partition in O(n) time; Finally, we just need to do quickSort for the linked list that less and bigger than pivot, and merge them.

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode dummyLess = new ListNode(-1);
        ListNode small = dummyLess;
        ListNode dummyEquals = new ListNode(-1);
        ListNode equals = dummyEquals;
        ListNode dummyBigger = new ListNode(-1);
        ListNode bigger = dummyBigger;
        ListNode pivot = head;
        ListNode curr = head;
        
        while (curr != null) {
            if (curr.val < pivot.val) {
                small.next = curr;
                small = small.next;
            } else if (curr.val > pivot.val) {
                bigger.next = curr;
                bigger = bigger.next;
            } else {
                equals.next = curr;
                equals = equals.next;
            }
            curr = curr.next;
        }
        small.next = null;
        bigger.next = null;
        equals.next = null;
        return merge(merge(sortList(dummyLess.next), dummyEquals.next), sortList(dummyBigger.next));
    }
    private ListNode merge(ListNode node1, ListNode node2) {
        if (node1 == null && node2 == null) {
            return null;
        }
        if (node1 == null) {
            return node2;
        }
        if (node2 == null) {
            return node1;
        }
        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;
        while (node1 != null && node2 != null) {
            if (node1.val < node2.val) {
                curr.next = node1;
                curr = curr.next;
                node1 = node1.next;
            } else {
                curr.next = node2;
                curr = curr.next;
                node2 = node2.next;
            }
        }
        while (node1 != null) {
            curr.next = node1;
            curr = curr.next;
            node1 = node1.next;
        }
        while (node2 != null) {
            curr.next = node2;
            curr = curr.next;
            node2 = node2.next;
        }
        return dummy.next;
    }
}
```

This is implementation is easy, but notice not to do `quickSort()` for the linked list that equals pivot. It will cause stackOverflow. On the other hand, if all nodes are equal, there is no need to sort.

Time Complexity: O(nlogn)
For partition, we iterate the linked list once, so the cost of time is O(n).
Sapce Complexity: O(n) 
worst case, there are n levels.