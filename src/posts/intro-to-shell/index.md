---
title: Intro to Shell 
date: "2020-12-31T02:12:03.284Z"
description: ""
tags: ['Shell']
visible: true 
---

## What is shell?

a [shell](https://en.wikipedia.org/wiki/Shell_(computing)) is a computer program which exposes an operating system's services to a human user or other program.

## The most useful command - man

`man <command>` is very useful. it will display the manual pages for the command. You can use it to look up the usage of command.

Example: 

`man ls` (will enter vim mode, press `q` to quit, `j` to page down)

```bash{4,23}
LS(1)                     BSD General Commands Manual                    LS(1)

NAME
     ls -- list directory contents

SYNOPSIS
     ls [-ABCFGHLOPRSTUW@abcdefghiklmnopqrstuwx1%] [file ...]

DESCRIPTION
     For each operand that names a file of a type other than directory, ls
     displays its name as well as any requested, associated information.  For
     each operand that names a file of type directory, ls displays the names
     of files contained within that directory, as well as any requested, asso-
     ciated information.

     If no operands are given, the contents of the current directory are dis-
     played.  If more than one operand is given, non-directory operands are
     displayed first; directory and non-directory operands are sorted sepa-
     rately and in lexicographical order.

     The following options are available:

    -l      (The lowercase letter ``ell''.)  List in long format.  (See
        below.)  A total sum for all the file sizes is output on a line
        before the long listing.
```

From the page's highlight text, we can know `ls` will list directory contents, and `-l` will list in long format

## Common commands

There are some common commands that used to navigate and manage the folders (Using `man` to see how to use them)

- ls
- cd
- pwd
- mkdir
- mv
- rm

## File Permission
how to read?
how to modify?

## Connecting programs
 >> | >
tee

