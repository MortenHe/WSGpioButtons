//Mit WebsocketServer verbinden
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

//GPIO Bibliothek laden
const Gpio = require('onoff').Gpio;

//Button Config laden
const fs = require('fs-extra');
const config = fs.readJsonSync(__dirname + '/config.json');

//Previous-Button
const buttonPrevious = new Gpio(config.buttonPrevious, 'in', 'rising', { debounceTimeout: 10 });

//Pause-Button
const buttonPause = new Gpio(config.buttonPause, 'in', 'rising', { debounceTimeout: 10 });

//Next-Button
const buttonNext = new Gpio(config.buttonNext, 'in', 'rising', { debounceTimeout: 10 });

//Wenn Verbindung mit WSS hergestellt wird
ws.on('open', function open() {
    console.log("connected to wss");

    //Wenn Button gedrueckt wird -> vorherigen Titel abspielen
    buttonPrevious.watch(function (err, value) {
        console.log("previous track");

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: "change-item",
            value: false
        }));
    });

    //Wenn Button gedrueckt wird -> Pause / Unpuase
    buttonPause.watch(function (err, value) {
        console.log("toggle paused");

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: "toggle-paused",
            value: ""
        }));
    });

    //Wenn Button gedrueckt wurd -> naechsten Titel abspielen
    buttonNext.watch(function (err, value) {
        console.log("next track");

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: "change-item",
            value: true
        }));
    });
});