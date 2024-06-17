---
title: "A Companies House Data Scraper/Grapher"
tags: ["tools", "politics", "web"]
date: 2024-06-17
description:  A tool to graph the relationships of people and companies on companies house using GraphViz and the companies house API. 
---
## Graphing Companies House Data

Years ago, when politics was a more hopeful place, and not just a competition between the leading tepid wet blanket proto-fascists,  I did some work on opposition research for a cause I believed in. 

This led to building this tool to graph companies house relationships using GraphViz. 

I recently updated the tool to work with the updated companies house api, so I published it to GitHub

Example: ![Example Graph](/images/ch_example.jpg)

See the full rendered graph here: [Rendered Graph](https://raw.githubusercontent.com/zeph1rus/companies_house_relationship_grapher/main/examples/WesleyPaulWilliamSTREETING.gv.svg)

## Installation

Clone the repo at: [GitHub](https://github.com/zeph1rus/companies_house_relationship_grapher/tree/main)

Install Graphviz:

This depends on your OS

- Ubuntu: `sudo apt-get install graphviz`
- MacOS: `brew install graphviz`
- Windows: [Download the installer](https://graphviz.org/download/)

Then install the Python dependencies in a venv or equivalent (google this if you don't know how):

```bash
pip install -r requirements.txt
```

### Companies House API Key

You'll need a companies house api key. You can get this by registering an application with Companies House in their developer portal

See: https://developer.company-information.service.gov.uk/get-started

## Usage

```bash
python ch_parser.py 
    -u URL  # The URL of the base officer you're looking at - e.g https://find-and-update.company-information.service.gov.uk/officers/zvMsdSrp3DBpbynbh7l5mg9MlPI/appointments
    -k APIKEY # a Companies House API key
    [-d DETECT] # Detect service companies with large numbers of links - 'true' or 'false' (default faulse)
    [-n NUMBER] # The number of links to detect a service company - default 250
```

Files will be in the /output directory 


