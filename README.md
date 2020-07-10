# Web Eurorack
This project provides a showcase in which you can patch an Eurorack modular synthesizer in your browser, just for fun!

![image](https://user-images.githubusercontent.com/1874332/87173248-c2c90d00-c2d5-11ea-98cb-4c8fda2cb32b.png)

## 🤔 What to expect?

At the moment, not much. This is mainly a side-project just for fun. Will probably end up using this showcase on a future portfolio or something. Not sure what I'll do with it. It would be cool if it could generate some sound dynamically, and if it got some interest from the community. Other than that, it's just a novelty kind of thing at the moment.

My first goal is to just allow making a rack and fill it up with modules that you can patch together. Maybe handy for something like ModularGrid to share patches and ideas?

The code should be relatively easy to read on the surface:
```javascript
export default () => {
  return (
    <div className="App">
      <Eurorack hp={84}>
        <VCO offset={2} />
        <VCO offset={15} />
      </Eurorack>
    </div>
  );
}
```

## Run it yourself

You'll need node on your machine!

Install dependencies
```
npm i
```

Run it locally
```
npm start
```

## Make your own modules

It's possible to smack your own stuff into this and see if it works.

* Create a JS file under `src/components/modules`
* Import the Eurorack context in it from `src/components/managers/Eurorack`. From it you need the `startCable` and `endCable` handlers.
* The panel art is just SVG, but you can import and use the existing panel from `src/components/modules/Blank` as a starting point.

## Note on audio

Currently I'm not running any DSP through this whatsoever. This is planned, but I don't know exactly when. I'll probably use the Audio Worklet API to use a separate thread in the browser and some actual DSP. It will not lock up since the Worklets now run a separate thread OS-level. This will probably only work on Chrome latest, and I can't be bothered worrying about browser support in this stage, or in the future.
