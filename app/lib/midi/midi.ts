enum MidiState {
  Pressed = 144,
  Released = 128
}

class Midi {
  private midi: any;
  private device: any;
  private keyMap = {};
  constructor() {
    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(
        (midi) => {
          this.midi = midi;
          this.device = this.midi.inputs.get(0);
          this.device.onmidimessage = (e) => this.onMidiMessage(e);
        },
        (err) => console.log(err));

  }
  update() {

  }
  onMidiMessage(e) {
    if (e.data[0] === MidiState.Pressed) {
      for (var keys in this.keyMap) {
        if (this.keyMap[keys].status === MidiState.Released)
          delete this.keyMap[keys];
      }

      this.keyMap[e.data[1]] = { status: e.data[0], velocity: e.data[2], startTime: e.receivedTime, duration: 0 };
      console.log(this.keyMap);
    }
    if (e.data[0] === MidiState.Released) {
      this.keyMap[e.data[1]].status = e.data[0];
      this.keyMap[e.data[1]].duration = e.receivedTime - this.keyMap[e.data[1]].startTime;
      window.dispatchEvent(new CustomEvent('midiReleased', { 'detail': this.keyMap }));
    }

  }
}

export let midi = new Midi();
