
## configure p5.js access to mlab

sensor/credentials.js should contain:

    base = "https://api.mlab.com/api/1/databases/";
    apiKey = "YOURAPIKEY";
    database = "YOURDATABASENAME";


## install miniconda

- Visit http://conda.pydata.org/miniconda.html
- Click on "64-bit (bash installer)" for the Python 3.5 option
- In your terminal, navigate to the downloaded file and type `bash Miniconda3-latest-MacOSX-x86_64.sh` (or equivalent for your platform)
- Approve the terms
- Approve the default location
- Do NOT let the installer modify your PATH variable
- Type `~/miniconda3/bin/conda install numpy matplotlib pymongo`

