import { MapComponent } from './MapComponent/MapComponent';

import * as topojson from 'topojson';

import styles from './app.css';

const config = {
  mapUrl: 'http://localhost:8080/json/de0.json',
  mapDomElement: '.map',
  toolTipDomElement: '.tooltip',
  height: 768,
  width: 1024,
  zoomEnabled: false,
  featureExtractor: mapData => {
    return topojson.feature(mapData, mapData.objects.state_data).features;
  },

  regionDisplayDataExtractor: regionData => {
    return `${regionData.properties.NAME_1} <br/>`;
  },
  regionClassMapper: regionData => {
    const regionName = regionData.properties.NAME_1;
    return regionName.replace('\s', '').toLowerCase();
  }
};


fetch(config.mapUrl)
  .then(function(response) {
    return response.json();
  })
  .then(mapData => {
    const mapComponent = new MapComponent(config, mapData);
    mapComponent.draw();
    startListeningNotifications();
  });


let notificationTimerId;

//TODO This can be controlled with a button
const stopListeningNotifications = () => {
  window.clearTimeout(notificationTimerId);
}

const startListeningNotifications = () => {
  notificationTimerId = window.setTimeout(pickNotification, 2000);
}

const keepListeningNotifications = (currentNotification) => {
  notificationTimerId = window.setTimeout(pickNotification, 5000, currentNotification);
}


const pickNotification = (previousNotification) => {
  if (previousNotification) {
    let pathName = document.getElementsByClassName(previousNotification.name)[0];
    pathName.style.fill = 'green';
  }

  let currentNotification;
  let hasNotificationsToProcess = notifications.length > 0
  if (hasNotificationsToProcess) {
    currentNotification = notifications.splice(0, 1)[0];
    let pathName = document.getElementsByClassName(currentNotification.name)[0];
    pathName.style.fill = 'pink';
  }
  keepListeningNotifications(currentNotification);
}

//TODO the notifications will come from a streaming source
const notifications = [
  {
   "name" : "berlin",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "brandenburg",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "bayern",
   "value": 1,
   "type": "notification",
  },
  {
    "name" : "brandenburg",
    "value": 1,
    "type": "notification",
  },
  {
    "name" : "berlin",
    "value": 1,
    "type": "notification",
  },
  {
   "name" : "brandenburg",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "bayern",
   "value": 1,
   "type": "notification",
  },
  {
    "name" : "brandenburg",
    "value": 1,
    "type": "notification",
  },
  {
    "name" : "berlin",
    "value": 1,
    "type": "notification",
  },
];