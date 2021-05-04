---
title: Monotonic stack in leetcode
date: "2021-05-04T01:14:03.284Z"
description: ""
tags: ['Algorithm']
visible: true
---

## What's monotonic stack?
Monotonic stack is a normal stack and its elements are all monotonic decreating or increasing.


## What can monotonic stack do?
There are two types of monotonic stack:
- monotonic increase stack. `inc_stack`
- monotoic decrease stack. `dec_stack`

The monotonic increase stack can do following things:
- Find the previous less element(PLE) of each element in an array.
- Find the next less element(NLE) of each element in an array.

### What's PLE and NLE
For previous less element(PLE): 
```
Given: nums = [5, 8, 1, 3, 6]

previous_less = [-1, 0, -1, 2, 3]
```
| num    | previous_less |       PLE     |
| ------ | :-----------:   | ------------- |
| 5      |    -1         |       None    |
| 8      |     0         |       5       |
| 1      |    -1         |       None    |
| 3      |     2         |       1       |
| 6      |     3         |       3       |

`previous_less` stores index of elements, if it's `-1`, it means PLE does exist.


### Find the previous less element(PLE)
```python
def get_previous_less(nums):
    # -1 means no PLE
    previous_less = [-1] * len(nums)
    inc_stack = []

    for index, num in enumerate(nums):
        while inc_stack and nums[inc_stack[-1]] > num:
            inc_stack.pop()
        # currently, all elements in stack are increasing order. 
        # and top element of stack <= num
        previous_less[index] = inc_stack[-1] if inc_stack else -1
        inc_stack.append(index)
    return previous_less
```
### Find the next less element(NLE)
we can apply similar logic of find PLE, but iterate from the end of array.
we can also:
```python
def get_next_less(nums):
    # -1 means no NLE
    next_less = [-1] * len(nums)
    inc_stack = []
    for index, num in enumerate(nums):
        while inc_stack and nums[inc_stack[-1]] > num:
            next_less[inc_stack.pop()] = index
        inc_stack.append(index)
    return next_less
```
