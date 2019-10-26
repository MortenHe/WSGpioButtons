const button1 = 14;
const button1 = 15;
const button1 = 18;

const Gpio = require('onoff').Gpio;
const buttonPrevious = new Gpio(button1, 'in', 'rising', { debounceTimeout: 10 });
const buttonPause = new Gpio(button2, 'in', 'rising', { debounceTimeout: 10 });
const buttonNext = new Gpio(button3, 'in', 'rising', { debounceTimeout: 10 });

buttonPrevious.watch(function (err, value) {
    console.log("previous track");
});

buttonPause.watch(function (err, value) {
    console.log("toggle paused");
});

buttonNext.watch(function (err, value) {
    console.log("next track");
});