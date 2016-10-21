import numpy as np

def combine(signal_x, signal_y):
    return np.stack((signal_x, signal_y), axis=-1)

def normalize(signal, minimum=None, maximum=None):
    """Normalize a signal to the range 0, 1. Uses the minimum and maximum observed in the data unless explicitly passed."""
    signal = np.array(signal).astype('float')
    if minimum is None:
        minimum = np.min(signal)
    if maximum is None:
        maximum = np.max(signal)
    signal -= minimum
    maximum -= minimum
    signal /= maximum
    signal = np.clip(signal, 0.0, 1.0)
    return signal    

def resample(ts, values, num_samples):
    """Convert a list of times and a list of values to evenly spaced samples with linear interpolation"""
    assert np.all(np.diff(ts) > 0)
    ts = normalize(ts)
    return np.interp(np.linspace(0.0, 1.0, num_samples), ts, values)

def smooth(signal, size=10, window='blackman'):
    """Apply weighted moving average (aka low-pass filter) via convolution function to a signal"""
    signal = np.array(signal)
    if size < 3:
        return signal
    s = np.r_[2 * signal[0] - signal[size:1:-1], signal, 2 * signal[-1] - signal[-1:-size:-1]]
    w = np.ones(size,'d')
    y = np.convolve(w / w.sum(), s, mode='same')
    return y[size - 1:-size + 1]

def detect_peaks(signal, lookahead=10, delta=0):
    """ Detect the local maximas and minimas in a signal
        lookahead -- samples to look ahead from a potential peak to see if a bigger one is coming
        delta -- minimum difference between a peak and surrounding points to be considered a peak (no hills) and makes things faster
        Note: careful if you have flat regions, may affect lookahead
    """    
    signal = np.array(signal)
    peaks = []
    valleys = []
    min_value, max_value = np.Inf, -np.Inf    
    for index, value in enumerate(signal[:-lookahead]):        
        if value > max_value:
            max_value = value
            max_pos = index
        if value < min_value:
            min_value = value
            min_pos = index    
        if value < max_value - delta and max_value != np.Inf:
            if signal[index:index + lookahead].max() < max_value:
                peaks.append([max_pos, max_value])
                drop_first_peak = True
                max_value = np.Inf
                min_value = np.Inf
                if index + lookahead >= signal.size:
                    break
                continue
        if value > min_value + delta and min_value != -np.Inf:
            if signal[index:index + lookahead].min() > min_value:
                valleys.append([min_pos, min_value])
                drop_first_valley = True
                min_value = -np.Inf
                max_value = -np.Inf
                if index + lookahead >= signal.size:
                    break
    return peaks, valleys    