"""Convenience wrapper for 3D matplotlib plotting"""

import os, time
import numpy as np
import matplotlib
from mpl_toolkits import mplot3d
from matplotlib import pylab, colors
from pylab import plt

# http://matplotlib.org/users/customizing.html
matplotlib.rcParams['toolbar'] = 'None'
matplotlib.rcParams['lines.linewidth'] = 1
matplotlib.rcParams['font.family'] = 'Monaco'
matplotlib.rcParams['font.size'] = 8
matplotlib.rcParams['xtick.labelsize'] = 6
matplotlib.rcParams['ytick.labelsize'] = 6
matplotlib.rcParams['xtick.major.pad'] = 1
matplotlib.rcParams['ytick.major.pad'] = 1
matplotlib.rcParams['figure.facecolor'] = '1.0'
matplotlib.rcParams['legend.frameon'] = 'False'
figure = plt.figure()
figure.canvas.set_window_title("")
ax = plt.axes(projection='3d')
plt.style.use("ggplot")

def plot(data, scatter=False, **args):
    data = np.array(data)
    skip = 0
    if 'skip' in args:
        skip = args['skip']
        del args['skip']
    if not scatter:
        data = np.column_stack((range(skip, skip + len(data)), data))
    else:
        data = np.add(data, [skip, 0, 0])
    if 'label' in args:
        args['label'] = args['label'].upper()
    f = ax.plot if not scatter else ax.scatter    
    f(data[:,0], data[:,1], data[:,2], **args)

def show(hide=False):
    if hide:
        plt.axis('off')
    else:
        plt.legend(loc="upper left", prop={'weight': "roman", 'size': "x-small"})
    ax.set_xlabel("SAMPLES", fontsize=8)
    ax.set_ylabel("X POSITION", fontsize=8)
    ax.set_zlabel("Y POSITION", fontsize=8)
    plt.show()

