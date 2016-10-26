import regeneratorRuntime from "regenerator-runtime";
var Promise = require("bluebird");

const supportedColors = {
  r: 'r',
  g: 'g',
  b: 'b'
};

type SupportedColorsType = $Keys<typeof supportedColors>;

function decorateBlinkInterval(target, key, descriptor) {
  const method = descriptor.value;
  const moreInterval = 1000;
  let ret;
  descriptor.value = (...args) => {
    args[0] += moreInterval;
    console.log(args);
    ret = method.apply(target, args);
    return ret;
  };
  return descriptor;
}

class Blinker {
  constructor(blinkLength: number = 1000, blueBlinkInterval: number = 3000, redBlinkInterval: number = 6000, greenBlinkInterval: number = 5000) {
    this.started = false;
    this.blinkLength = blinkLength;
    this.init(blueBlinkInterval, redBlinkInterval, greenBlinkInterval);
  }

  @decorateBlinkInterval
  init(blueBlinkInterval: number, redBlinkInterval: number, greenBlinkInterval: number) {
    this.blueBlinkInterval = blueBlinkInterval;
    this.redBlinkInterval = redBlinkInterval;
    this.greenBlinkInterval = greenBlinkInterval;
  }

  async blink(color: SupportedColorsType) {
    const colorName: string = ({b: 'blueBlinkInterval', g: 'greenBlinkInterval', r: 'redBlinkInterval'})[color];
    const delayLength: number = this[colorName];

    while(this.started) {
      $(`#led-${color}`).turnOn();
      console.log(`#led-${color} is on for ${this.blinkLength} ms`);
      await Promise.delay(this.blinkLength);

      $(`#led-${color}`).turnOff();
      console.log(`#led-${color} is off for ${delayLength} ms`);
      await Promise.delay(delayLength);
    }
  }

  startBlink() {
    if (this.started) {
      return;
    }
    this.started = true;
    ['r', 'g', 'b'].map(color => this.blink(color));
  }

  stopBlink() {
    this.started = false;
  }
}

const blinker = new Blinker()
$.ready(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  blinker.startBlink();
});

$.end(function () {
  blinker.stopBlink();
});
