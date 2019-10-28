//Port 8080 (audio player) oder 9090 (sh audio player)
const port = process.argv[2] || 8080;

//Mit WebsocketServer verbinden
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:' + port);

//GPIO Bibliothek laden
const Gpio = require('onoff').Gpio;

//Button Config laden
const fs = require('fs-extra');
const config = fs.readJsonSync(__dirname + '/config_' + port + '.json');

//Button 1
const button1 = new Gpio(config.button1.pin, 'in', 'rising', { debounceTimeout: 10 });

//Button 2
const button2 = new Gpio(config.button2.pin, 'in', 'rising', { debounceTimeout: 10 });

//Button 3
const button3 = new Gpio(config.button3.pin, 'in', 'rising', { debounceTimeout: 10 });

//Wenn Verbindung mit WSS hergestellt wird
ws.on('open', function open() {
    console.log("connected to wss");

    //Wenn Button gedrueckt wird -> vorherigen Titel abspielen
    button1.watch(function (err, value) {
        console.log(config.button1.type);

        let sendValue = port != "7070" ? config.button1.value : JSON.stringify(config.button1.value)

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button1.type,
            value: sendValue
        }));
    });

    //Wenn Button gedrueckt wird -> Pause / Unpuase
    button2.watch(function (err, value) {
        console.log(config.button2.type);

        let sendValue = port != "7070" ? config.button2.value : JSON.stringify(config.button2.value)

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button2.type,
            value: sendValue
        }));
    });

    //Wenn Button gedrueckt wurd -> naechsten Titel abspielen
    button3.watch(function (err, value) {
        console.log(config.button3.type);

        let sendValue = port != "7070" ? config.button3.value : JSON.stringify(config.button3.value)

        //Nachricht an WSS schicken
        ws.send(JSON.stringify({
            type: config.button3.type,
            value: sendValue
        }));
    });
});