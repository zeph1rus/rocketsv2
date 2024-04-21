---
title: "Nginx config scaffolder"
tags: ["nginx", "npm"]
date: 2023-04-16
description: A tool to scaffold out the missing parts from nginx configs
---
## NGINX Config Scaffolder

This is a tool I wrote to scaffold out NGINX configurations so that you can test them out in CI situations. 

### Why? 

When you try to test an NGINX config (by running `nginx -t`) it checks two things that you may not have access to in your CI environment:

1. The existence of all the certificates mentioned explicitly in your config
2. That it can resolve all the hostnames referenced in your configuration.

If you don't have access to all of those the config test will fail. 

If you're just doing tests in pull requests using docker this might make it difficult to see if a dev has forgotten how nginx config works, or an infra guy has forgotten how CIDR works, or just that you have duplicated config elements. 

`nginx-config-scaffold` placeholders all of these for you so you can just test your config. 

It's available on [NPM](https://www.npmjs.com/package/@zeph1rus/nginx-config-scaffold) and the source is on [Github](https://github.com/zeph1rus/nginx-config-scaffold)

### Usage

The easiest way to use it is to build a container using your config in your ci process.  Simply run the built container and you can use the process return value to judge success (gihub/gitlab/azuredevops will fail automatically if retval !=0).

This takes about 30s to run through on github in our environments.

#### Example:

```dockerfile
FROM alpine:latest
RUN apk add nginx nodejs npm
COPY MY_CONFDIR_CHANGE_ME /etc/nginx
RUN mkdir /opt/app
WORKDIR "/opt/app"
COPY "entrypoint.sh" "."
RUN chmod u+x entrypoint.sh
RUN npm i @zeph1rus/nginx-config-scaffold
ENTRYPOINT ["./entrypoint.sh"]
```

using this `entrypoint.sh`

```bash
#!/usr/bin/env sh
npx nginx-config-scaffold --basedir /etc/nginx --upstreams --proxies
nginx -t
```

