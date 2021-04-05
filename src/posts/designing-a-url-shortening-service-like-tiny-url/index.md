---
title: Designing a url shortening service like tiny url
date: "2021-04-03T23:56:03.284Z"
description: ""
tags: ['System Design']
---

## Step 1: System Requirements
- The service can short a long url to a short one
- The short url can convert to long one.
- Do we need count the visit number of each url? - Not support.
- can we delete/update the created short url? - Let's don't support these functions.

technical requirements:
- high availability
- Read > Write
- Read need be very fast - low latency
- data consistency ? < 1 minute - new created url need available for all users quickly.

## Step 2: System Interfaces
- create_short_url(long_url, user_id, user_token)
- visit_url(short_url)
- delete_short_url(user_id, user_token, short_url)
...


## Step 3: estimate metrics
Assume QPS: 10000(read), 100(write)
Storage: 100 * 800 bytes (1 url = 100 chars) * 60 * 60 * 24 = 
How to estimate size of string?
byte to GB?

netword bandwidth: how to estimate?

## Step 4: Data model
short_url_to_long_url table
id
short_url index unique
long_url index unique
user_id fk

## Step 5: high-level graph
short_url service - db (1 master - multi slaves) - time
|
cache (cache strategy) what need to think for cache?

algorithm of short url: hash function - less or no collision - no special character ?

## Step 6: bottle neck
where is bottle neck? read for db? - cache



