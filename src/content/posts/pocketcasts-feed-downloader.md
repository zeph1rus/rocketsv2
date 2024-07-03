---
title: "Pocketcasts Feed Downloader"
tags: ["m3u", "pocketcasts", "podcasts", "sound"]
date: 2024-07-03
description: A pocketcasts latest feed downloader for dumb mp3 players.
---

# Pocketcasts Latest Downloader

I wrote this script to download the latest number (default 10) podcasts from your Pocketcasts Plus "New Releases" feed, sequentially name them, put them in a folder and create an M3U playlist file for them.

This is written to simplify stuffing podcasts onto dumb sports MP3 players, that are waterproof or similar for swimming and exercise.

## Requirements

Python 3.10 or later. 

An understanding of how to run a Python script from the command line.

## Installation

1. Clone this repository [Github](https://github.com/zeph1rus/pocketcasts_latest_downloader)
2. Install the requirements with `pip install -r requirements.txt` (you should use a virtual environment)
3. Create a .env file (see example) or set the environment variables in your shell for Username/Password


## Usage

Run the script with `python main.py`

The files and playlist are contained in the `output` folder. This can be changed by editing the script.

Copy the files from there onto your player.  I've included the script I use as `transfer.sh`

## Configuration

You can change the following constants in the script.
    
```python
DB_FILE = "pc_play.db" # The sqlite database file to store the auth token
CACHE_DIR = "cache" # The cache directory to store the podcast files
OUTPUT_DIR = "output" # The output directory to store the playlist and files
EPISODES_TO_GET = 10 # The number of episodes to get
M3U_FILENAME = "playlist.m3u" # The name of the playlist file
TOKEN_EXPIRY_SECS = 7200 # The number of seconds the auth token is valid for (2 hours). It will be automatically refreshed
```