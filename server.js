const express = require('express');
const ws = require('ws');

const app = express();


let server = app.listen(3000, function () {
  console.log('MapEvent server listening on port 3000!\n');

});

const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server:   server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};


wss.on('connection', function connection(ws) {
  console.log(`Connected sending events...`);
  ws.send(JSON.stringify([...mxNotifications, ...deNotifications, ...frNotifications]));
});


const deNotifications = [
  {
    country: 'de',
    name: 'berlin',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'bayern',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'berlin',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'bayern',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    country: 'de',
    name: 'berlin',
    value: 1,
    type: 'notification'
  }
];
const frNotifications = [
  {
    country: 'fr',
    name: 'normandie',
    value: 1,
    type: 'notification'
  },
  {
    country: 'fr',
    name: 'nouvelle-aquitaine',
    value: 1,
    type: 'notification'
  },
  {
    country: 'fr',
    name: 'occitanie',
    value: 1,
    type: 'notification'
  },
  {
    country: 'fr',
    name: 'centre-val_de_loire',
    value: 1,
    type: 'notification'
  }
];

const mxNotifications = [
  {
    country: 'mx',
    name: 'baja_california',
    value: 1,
    type: 'notification'
  },
  {
    country: 'mx',
    name: 'veracruz',
    value: 1,
    type: 'notification'
  },
  {
    country: 'mx',
    name: 'sonora',
    value: 1,
    type: 'notification'
  },
  {
    country: 'mx',
    name: 'morelos',
    value: 1,
    type: 'notification'
  }
];
