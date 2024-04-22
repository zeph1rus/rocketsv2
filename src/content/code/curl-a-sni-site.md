---
title: Curl a site that isn't in DNS but uses SNI
tags: ["bash", "scripts"]
language: "bash"
date: 2020-01-21
description: Useful for troubleshooting pods and webservers
---

```bash
curl -vk --header 'Host: www.examplesite.com' \
    --resolve www.examplesite.com:443:ip.address.is.here \
    https://www.examplesite.com

```
