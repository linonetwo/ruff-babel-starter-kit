
const supportedColors = {
  r: 'r',
  g: 'g',
  b: 'b'
};

type SupportedColorsType = $Keys<typeof supportedColors>;

function decorateBlinkInterval(target, key, descriptor) {
  const method = descriptor.value;
  const moreInterval = 100;
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
  constructor(blinkLength: number = 100, blueBlinkInterval: number = 200, redBlinkInterval: number = 600, greenBlinkInterval: number = 1000) {
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
    while(true) {
      async () => {
        $(`#led-${color}`).turnOn();
        await Promise.delay(this.blinkLength);
        $(`#led-${color}`).turnOff();
        await Promise.delay(this[({b: 'blue', g: 'green', r: 'red'})[color]]);
      }
    }
  }

  startBlink() {
    if (this.started) {
      return;
    }
    this.started = true;
    ['r', 'g', 'b'].map(color => this.blink(color));
  }
}

$.ready(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  $('#led-b').turnOn();
  $('#led-g').turnOn();
});

$.end(function () {
  $('#led-b').turnOff();
  $('#led-g').turnOff();
});
