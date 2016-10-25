'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#led-r').turnOn();
    $('#led-g').turnOn();
});

$.end(function () {
    $('#led-r').turnOff();
    $('#led-g').turnOff();
});
