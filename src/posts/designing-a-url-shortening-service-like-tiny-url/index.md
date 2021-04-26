---
title: Designing a url shortening service like tiny url
date: "2021-04-03T23:56:03.284Z"
description: ""
tags: ['System Design']
---

## Step 1: System Requirements
- generate a short alias for url.
- when users access the short alias, redirect them to original url.
- customized alias
- set expire time for url.


technical requirements:
- highly available. - if the service is down, all URL refirection will fail.
- Read > Write - read-heavy.
- Read need be very fast - low latency
- data consistency ? < 1 minute - new created url need available for all users quickly. - Shortened links should not be guessable (not predictable).

Expanded requirements:
- Analytics - Do we need count the visit number of each url?
- can we delete/update the created short url? - Let's don't support these functions.
- the service need be accessible by REST APIs.

## Step 2: System Interfaces
- create_short_url(long_url, user_id, user_token)
- visit_url(short_url)
- delete_short_url(user_id, user_token, short_url)
...


## Step 3: estimate metrics
Assume QPS: 20000(read), 200(write) - assume 100:1 ratio between read and write.
Storage: 100 * 800 bytes (1 url = 100 chars) * 60 * 60 * 24 =  consider expire time here.
How to estimate size of string?
byte to GB?

netword bandwidth: how to estimate? 1KB = 1000 bytes

Memory estimate for cache: 
80-20 rule = 20% of Urls generate 80% of traffic.


## Step 4: Data model
Thins to consider here before make decision:
- read-heavy
- billions of records, but each one is small < 1000 bytes
- no strong relationships

no strong relationships => NoSQL

short_url_to_long_url table
id
short_url index unique
long_url index unique
user_id fk

## Step 5: high-level graph
short_url service - db (1 master - multi slaves) - time
|
cache (cache strategy) what need to think for cache?

algorithm of short url: hash function - less or no collision - no special character ? MD5 or SHA256, encoding for displaying - base36[a-z,0-9] base62[A-Z, a-z, 0-9] base64(- .)

the length of short key? if base64 and len = 6, 64^6

## Step 6: bottle neck
where is bottle neck? read for db? - cache

offline key generation service - concurrency problems?


## Step 7: open questions
How do we detect and prevent abuse? - authentication 



