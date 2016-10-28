# rlab

Materials for a workshop on rhythmanalysis


## Create an mlab account

- Sign up at [mLab](https://mlab.com/)
- Verify your email address
- Click `Create new`
- Select `Amazon web services` and  `US East` for the provider
- `Private Environment` should be `None`
- Set plan to `Single-node` and `Sandbox` (the free option)
- Choose a short database name
- Find and click your database under `Home > MongoDB Deployments`
- Copy your driver url, like `mongodb://<dbuser>:<dbpassword>@ds049476.mlab.com:49476/rlab`
- On the database page, under `Users`, add a database user, and write down the username and password
- Click on your user under `Account > Account Users`
- Enable API access and copy your API key


## Local setup

- In the terminal, type `git clone https://github.com/brianhouse/rlab` if you have git, or just [download](https://github.com/brianhouse/rlab)
- Open the directory in a text editing environment such as [Sublime](https://www.sublimetext.com/3), like `sublime rlab`
- Create a file in `rlab/sensor` called `credentials.js` that contains:  
    `base = "https://api.mlab.com/api/1/databases/";`  
    `apiKey = "YOURAPIKEY";`  
    `database = "YOURDATABASENAME";`  
- In the terminal, navigate to the `sensor` directory (`cd rlab/sensor`)
- Launch the webserver `python -m SimpleHTTPServer` or `python3 -m http.server`
- Type `ifconfig` to get your IP address, under `en0`
- Load that IP adress at port 8000 in your mobile device


## Install miniconda

- Visit [miniconda](http://conda.pydata.org/miniconda.html)
- Click on "64-bit (bash installer)" for the Python 3.5 option
- In your terminal, navigate to the downloaded file and type `bash Miniconda3-latest-MacOSX-x86_64.sh` (or equivalent for your platform)
- Approve the terms
- Approve the default location
- Do NOT let the installer modify your PATH variable
- Type `~/miniconda3/bin/conda install numpy matplotlib pymongo`


## Copyright/License

Copyright (c) 2016 Brian House

This code is released under the MIT License and is completely free to use for any purpose. See the LICENSE file for details.