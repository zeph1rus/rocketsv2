---
title: "OSX Keychain Breaking"
tags: ["OSX", "Keychains"]
date: 2023-07-03
description: Exporting Non-Exportable Keychain Items in OSX
---
## How to export non-exportable keychain items (certs/passwords/etc) from the OSX keychain

![image](/images/osx-keychain-1.png)

Did you accidentally import keys or passwords into your keychain as unexportable and then lost the originals and really need to grab them.

Well then you need to break the cert out of your keychain - Good News! this is possible, despite what google and stack overflow say!

**Note - this all assumes you know your login keychain password - it's a the password you login to OSX with.**

*If you don't know this then you need to figure out another way to get that.*

## Get your keychain

You'll need your keychain - grab a copy from `/Users/$USERNAME/Library/Keychains` - it should be called `login.keychain-db` or similar.

## Install chainbreaker

I did this on an ubunutu 22.04 machine but it should work on any OSX ver with an up to date python - `brew update && brew upgrade python3` should get you updated if you have homebrew installed.

In a clean directory, create a virtual environment using `python3 -m venv env` and then activate it using `source env/bin/activate`

Clone chainbreaker to your directory using `git clone https://github.com/n0fate/chainbreaker.git` and then change to that directory (`cd chainbreaker`)

Ensure you have setuptools installed using `pip install setuptools wheel`

Run `python setup.py bdist_wheel -d dist` to build the chainbreaker module, then run `pip install -e .` to install it into your virtual environment

## Run chainbreaker

Use cd to go back to your original folder (`cd ..`) and copy your `login.keychain.db` file into that directory.

Run `python -m chainbreaker -a ./login.keychain-db -p` and when prompted enter your keychain password - this will be the password you use to log into your account on OSX.  If you want to grab items from the system keychain that is stored in a seperate location - see the chainbreaker readme for details.

You'll get a dump of your certs, keys and other keychain items - all your certs and keys are in base64 encoding and you'll need to decode them from base64, and then from binary cert formats if needed (using `openssl x509` and `openssl rsa` for public/private keys respectively).

I tested this on Ventura/Monterey Keychains and it works fine for me. 