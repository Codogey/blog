---
title: Intro to Pyramid Tween 
date: "2020-11-12T21:40:03.284Z"
description: ""
tags: ['Python']
visible: true 
---

## What is Tween?

Tween is a contraction of the word "between" that sits between Pyramid router component and upstream WSGI component. 

It behaves a bit like WSGI Middleware, but have the ability to access the Pyramid application. (e.g. registry, template)

> application registry: 
> 
> A registry of configuration information consulted by Pyramid while servicing an application. An application registry maps resource types to views, as well as housing other application-specific component registrations. Every Pyramid application has one (and only one) application registry.

## Why use Tween?
If you already know python decorator, tween is similar. It's used to apply a common behavior for all requests.

There are 3 examples:
- request validation (e.g. validate request parameters' type)
- monitoring (e.g. Zipkin integration, timer)
- add special headers (e.g. add `Access-Control-Allow-Origin` to allow CORS)

## The lifecycle of request
![Pyramid tween lifecycle](/images/pyramid-tween-and-request-lifecycle.png)
<Img src="/images/pyramid-tween-and-request-lifecycle.png" width='400px'/>

## How to write the tween?
Create the tween factory.

```python
def tween_factory(handler, registry):
    if registry.settings['is_enable']:
        def tween_func(request):
            response = handler(request)
            return responnse
        return tween_func
    return handler
```
`handler`: The next tween in the stack.
`registry`: the pyramid registry

## Control the order of tweens

TODO: picture for INGRESS and MAIN, EXCVIEW

you cannot add a tween before INGRESS nor after after MAIN

There are 3 ways to control the order of tweens:
- add_tween without condition
- add_tween with condition

### add_tween without condition
In this way, we only use the `add_tween` function but don't use `over`, and `under` parameters. The order is implicit.
```python
def webapp():
    config.add_tween('tween.factory_a')
    config.add_tween('tween.factory_b')
```
It's like a stack - LIFO (last in, first out). The order of the tweens will be:
1. INGRESS
2. tween.factory_b 
3. tween.factory_a
4. MAIN

### add_tween with condition
The `add_tween` has `over` and `under` parameters to control the order.
```python
def webapp():
    config.add_tween('tween.factory_a')
    config.add_tween(
        'tween.factory_b',
        over=pyramid.tweens.MAIN,
        under='tween.factory_a'
    )
```
`over` means 'before'.
`under` means 'after'

So the order is:
1. INGRESS
2. tween.factory_a 
3. tween.factory_b
4. MAIN

### Config file - development.ini
The order can be defined in config file, and it will ignore any calls of `add_tween()`
``` ini
[app:main]
pyramid.tweens = tween.factory_a
                 tween.factory_b
                 pyramid.tweens.excview_tween_factory
```