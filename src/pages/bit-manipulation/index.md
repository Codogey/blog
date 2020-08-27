---
title: Bit manipulation 
date: "2019-01-17T22:12:03.284Z"
description: "Hello World"
tags: ['Algorithm']
---

## Basic Operations
### & and
```
A = 001010
B = 101100
A & B = 001000
```
### | or
```
A = 001010
B = 101100
A | B = 101110
```
### ~ compliment
tilde
invert the bit.
```
 A = 010
~A = 101
```
### ^ xor
exclusive or
```
A = 001010
B = 101100
A ^ B = 100110
```
### >> right shift, >>> zero fill right shift
```
A = 1000 0001
A >> 1 = 1100 0000
```
```
A = 1000 0001
A >>> 1 = 0100 0000
```
### << left shift
```
A = 1000 0001 
A << 1 = 0000 0010
```
## Two's complement
The leftmost bit represents the negative or positive of a number.
0 - positive
1 - negative
### Conversion to Two's Complement
If number is negative, such as -28.
1. write out 28 in binary form. `00011100`
2. invert the digits. `11100011`
3. add 1. `11100100`
### Conversion from two's complement.
If the leftmost bit is 1.
1. invert the digits.
2. add one.
### what happens if we assign a negative number to an unsigned integer?
unsigned int a = -1 // 1111111111111111111 = Integer.MAX_VALUE
binary does not change, the way of explaining changes.
## Tips
### Set x's k-th bit to 1
`x | (1 << k)`
### Set x's k-th bit to 0
`x & ~ (1 << k)`
### get x's k-th bit
`x >> k & 1`
### inverse x's kth bit
`x ^ (1 << k)`
### get the different bit between two numbers
`x ^ y`
### count '1' in x
```java
int count = 0;
for (unsigned int c = x; c != 0; C = C >> 1) {
    count += (c & 1);
}
return count;
```
### remove the rightmost 1 of x
`x & (x - 1)`
```
x = 1010
x - 1 = 1001
x & (x - 1) = 1000
```
### get the position of x's rightmost 1 
`x & -x`
### ^
`b ^ b = 0`
`0 ^ b = b`
### subtraction
`A & ~B`