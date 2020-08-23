---
title: Calculate the area of triangle in algorithm question
date: "2019-07-16T22:12:03.284Z"
description: "Hello World"
---

In algorithm questions, knowing how to calculate the area of the triangle makes problems easy.
[Leetcode 1037. Valid Boomerang](https://leetcode.com/problems/valid-boomerang/)
[Leetcode 812. Largest Triangle Area](https://leetcode.com/problems/largest-triangle-area/)

## Calculate area
In an algorithm problem, we usually use (x, y) to represent a point in Cartesian coordinate system. Given three points, how can we calculate the area? we need to know the concept of `Vector product` firstly.

## Vector product

![image](https://user-images.githubusercontent.com/24699211/61271685-2455aa80-a75a-11e9-870e-908e1cffa43b.png)

As shown in the figure, the `|aXb|` represents the area of the parallelogram combined with Vector a and Vector b. If we just want to get the area of the triangle, it's **half**.

## How to calculate vector product?

![image](https://user-images.githubusercontent.com/24699211/61273020-5ae0f480-a75d-11e9-990f-5047852b3993.png)

## Formula
```
Given:
A(xa, ya), B(xb,yb), C(xc,yc)
O(0,0) - origin of coordinates

AB = AO + OB = OB - OA = ((xb - xa), (yb - ya))
AC = OC - OA = ((xc - xa), (yc - ya))

Area of ABC = 1 / 2 * |AB X AC|
AB X AC = (xb - xa) * (yc - ya) - (yb -ya) * (xc - xa) = (xa * yb + xb * yc + xc * ya) - (xc * yb + xb * ya - xa * yc)

area = abs(AB X AC) / 2

```
