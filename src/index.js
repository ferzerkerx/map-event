import { MapComponent } from './MapComponent/MapComponent';

import * as topojson from 'topojson';

import styles from './app.css';
import * as d3 from 'd3'

const defaultConfig = {
  mapUrl: 'http://localhost:8080/json/mex0.json',
  mapDomElement: '.map',
  toolTipDomElement: '.tooltip',
  height: 768,
  width: 1024,
  projection: (width, height) => {
    return d3
    .geoMercator()
    .scale(defaultConfig.scale)
    .translate(config.initialPosition(width, height));
  },
  zoomEnabled: false,
  scale: 3300,
  featureExtractor: mapData => {
    return topojson.feature(mapData, mapData.objects.state_data).features;
  },

  regionDisplayDataExtractor: regionData => {
    return `${regionData.properties.NAME_1} <br/>`;
  },
  regionClassMapper: regionData => {
    const regionName = regionData.properties.NAME_1;
    return regionName.replace(/\s+/g, '_').toLowerCase();
  },
  initialPosition: (width, height) => {
    return [width / 2, height / 2];
  }
};

const deConfig = Object.assign({}, defaultConfig, {
  mapUrl: 'http://localhost:8080/json/de0.json',
  initialPosition: (width, height) => {
    return [-60, height * 5];
  }});

const frConfig = Object.assign({}, defaultConfig, {
  mapUrl: 'http://localhost:8080/json/fra0.json',
  initialPosition: (width, height) => {
    return [width / 2, height * 4.5];
  }});

const mxConfig = Object.assign({}, defaultConfig, {
  mapUrl: 'http://localhost:8080/json/mex0.json',
  scale: 2000,
  projection: (width, height) => {
    return d3
      .geoAlbers()
      .scale(mxConfig.scale)
      .translate([width / 1.5, -100]);
  }});


const config = mxConfig;


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
const deNotifications = [
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
]
const frNotifications = [
  {
   "name" : "normandie",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "nouvelle-aquitaine",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "occitanie",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "centre-val_de_loire",
   "value": 1,
   "type": "notification",
  }
];

const mxNotifications = [
  {
   "name" : "baja_california",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "veracruz",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "sonora",
   "value": 1,
   "type": "notification",
  },
  {
   "name" : "morelos",
   "value": 1,
   "type": "notification",
  }
];

const notifications = mxNotifications;
