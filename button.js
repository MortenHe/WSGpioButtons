//Port 8080 (audio player) oder 9090 (sh audio player)
const port = process.argv[2];

//Mit WebsocketServer verbinden
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:' + port);

//Beep-Ton bei Button
const singleSoundPlayer = require('node-wav-player');

//GPIO Bibliothek laden
const Gpio = require('onoff').Gpio;

//Button Config laden
const fs = require('fs-extra');
const config = fs.readJsonSync(__dirname + '/config_' + port + '.json');

//Button 1, 2, 3
const button1 = new Gpio(config.button1.pin, 'in', 'falling', { debounceTimeout: 100 });
const button2 = new Gpio(config.button2.pin, 'in', 'falling', { debounceTimeout: 100 });
const button3 = new Gpio(config.button3.pin, 'in', 'falling', { debounceTimeout: 100 });

//Wenn Verbindung mit WSS hergestellt wird
ws.on('open', function open() {
    console.log("connected to wss");

    //Wenn Button gedrueckt wird -> vorherigen Titel abspielen
    button1.watch(function () {
        console.log(config.button1.type);

        //Beep abspielen
        //playSound();

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button1.type,
            value: config.button1.value
        }));
    });

    //Wenn Button gedrueckt wird -> Pause / Unpuase
    button2.watch(function () {
        console.log(config.button2.type);

        //Beep abspielen
        playSound();

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button2.type,
            value: config.button2.value
        }));
    });

    //Wenn Button gedrueckt wurd -> naechsten Titel abspielen
    button3.watch(function () {
        console.log(config.button3.type);

        //Beep abspielen
        playSound();

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button3.type,
            value: config.button3.value
        }));
    });
});

//Einzelsound abspielen
function playSound(sound) {
    const playedSound = sound ?? "button.wav";
    singleSoundPlayer.play({ path: __dirname + "/" + playedSound });
}