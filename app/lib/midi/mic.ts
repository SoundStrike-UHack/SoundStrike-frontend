/**
 * Singleton that converts microphone pitches to a frame map of MIDI data.
 */

class Mic {
  private audioContext: AudioContext;
  private mediaStreamSource: any;
  private analyser: AnalyserNode;
  private buf = new Float32Array(1024);
  private curNote = 0;
  constructor() {
    this.audioContext = new AudioContext();
    navigator.webkitGetUserMedia({
      "audio": {
        "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
        },
        "optional": []
      },
    }, (stream) => {
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.mediaStreamSource.connect(this.analyser);
      }, function(err) {
        console.log(err);
      });
  }

  private noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  private autoCorrelate(buf, sampleRate) {
    var SIZE = buf.length;
    var MAX_SAMPLES = Math.floor(SIZE / 2);
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;
    var foundGoodCorrelation = false;
    var correlations = new Array(MAX_SAMPLES);

    for (var i = 0; i < SIZE; i++) {
      var val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) // not enough signal
      return -1;

    var lastCorrelation = 1;
    var MIN_SAMPLES = 0;
    for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
      var correlation = 0;

      for (var i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buf[i]) - (buf[i + offset]));
      }
      correlation = 1 - (correlation / MAX_SAMPLES);
      correlations[offset] = correlation; // store it, for the tweaking we need to do below.
      if ((correlation > 0.9) && (correlation > lastCorrelation)) {
        foundGoodCorrelation = true;
        if (correlation > best_correlation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      } else if (foundGoodCorrelation) {
        var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
        return sampleRate / (best_offset + (8 * shift));
      }
      lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
      return sampleRate / best_offset;
    }
    return -1;
  }


  update() {
    if (this.analyser) {
      this.analyser.getFloatTimeDomainData(this.buf);
      var ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate);
      this.curNote = this.noteFromPitch(ac);
    }
  }

  get pitch() {
    return this.curNote;
  }
}

export default new Mic();
