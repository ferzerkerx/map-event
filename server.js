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
  console.log(`Connected sending info...`);
  ws.send(JSON.stringify(mxNotifications));
});


const deNotifications = [
  {
    name: 'berlin',
    value: 1,
    type: 'notification'
  },
  {
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    name: 'bayern',
    value: 1,
    type: 'notification'
  },
  {
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    name: 'berlin',
    value: 1,
    type: 'notification'
  },
  {
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    name: 'bayern',
    value: 1,
    type: 'notification'
  },
  {
    name: 'brandenburg',
    value: 1,
    type: 'notification'
  },
  {
    name: 'berlin',
    value: 1,
    type: 'notification'
  }
];
const frNotifications = [
  {
    name: 'normandie',
    value: 1,
    type: 'notification'
  },
  {
    name: 'nouvelle-aquitaine',
    value: 1,
    type: 'notification'
  },
  {
    name: 'occitanie',
    value: 1,
    type: 'notification'
  },
  {
    name: 'centre-val_de_loire',
    value: 1,
    type: 'notification'
  }
];

const mxNotifications = [
  {
    name: 'baja_california',
    value: 1,
    type: 'notification'
  },
  {
    name: 'veracruz',
    value: 1,
    type: 'notification'
  },
  {
    name: 'sonora',
    value: 1,
    type: 'notification'
  },
  {
    name: 'morelos',
    value: 1,
    type: 'notification'
  }
];
