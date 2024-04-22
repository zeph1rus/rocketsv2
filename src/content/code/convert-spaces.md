---
title: Converting HTML %20 to spaces in filenames
language: "bash"
tags: ["bash", "scripts"]
date: 2020-01-21
description: Bash Script
---


A little script to clean up downloaded files 

```bash
#!/bin/bash
for x in *.<EXTENSION>
  do mv -- "$x" "${x//%2F/ }"
done
```
