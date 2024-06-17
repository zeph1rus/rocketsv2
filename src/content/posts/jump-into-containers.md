---
title: "How to jump into containers to debug"
tags: ["tools"]
date: 2022-05-29
description: I always forget the syntax to jump into containers or k8s pods without invoking the entrypoint
---
## Jumping into containers

I always forget the syntax to jump into containers or k8s pods without invoking the entrypoint. This is a reminder for me.i

### Docker

```bash
docker run -it --entrypoint <new entrypoint> <container>:<tag>
```

### K8s

```bash
kubectl exec -n <namespace> <podname>  --stdin --tty [-c <containername>]  -- <new entrypoint>
```



