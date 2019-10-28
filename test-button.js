const fs = require("fs-extra");
const Gpio = require('onoff').Gpio;
const configButtons = fs.readJsonSync(__dirname + '/config_8080.json');

buttons = [];

let counter = 0;
for (configButton of configButtons) {
    console.log(configButton);

    buttons[counter] = new Gpio(configButton.pin, 'in', 'rising', { debounceTimeout: 10 });

    //Wenn Button gedrueckt wird -> Fkt ausfuehren
    buttons[counter].watch(function (err, value) {
        console.log(this);
        //console.log(configButtons[counter].type)
        //console.log(configButtons[counter].pin)
    });

    counter++;
}

console.log(buttons);