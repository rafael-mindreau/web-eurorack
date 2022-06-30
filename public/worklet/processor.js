class ToneProcessor extends AudioWorkletProcessor {
  #index = 0;

  static parameterDescriptors = [
      {
          name: "sampleRate",
          defaultValue: 48000
      },
      {
          name: "frequency",
          defaultValue: 440
      },
      {
          name: "type",
          defaultValue: 0
      }
  ];

  process(inputList, outputList, parameters) {
    const output = outputList[0];

    output.forEach(channel => {
        for(let i = 0; i < channel.length; i++){ //channel is a buffer
            channel[i] = getSineWave(parameters.frequency[0], this.#index / parameters.sampleRate[0]);
            this.#index++;
        }
    });

    return true;
  }
}

registerProcessor('tone-processor', ToneProcessor);

function getSineWave(frequency, time) {
    return 0.5 * Math.sin(frequency * 2 * Math.PI * time);
}
