import { MapComponent } from './MapComponent/MapComponent';

import { configurations } from './configurations';

import styles from './app.css';

const changedMap = event => {
  let countryCode = event.target.value;
  loadMap(countryCode);
};

document.getElementById('map-selector').addEventListener('change', changedMap);

const loadMap = countryCode => {
  let notificationTimerId;

  const stopListeningNotifications = () => {
    if (notificationTimerId) {
      window.clearTimeout(notificationTimerId);
    }
  };

  const startListeningNotifications = () => {
    notificationTimerId = window.setTimeout(pickNotification, 2000);
  };

  const keepListeningNotifications = currentNotification => {
    notificationTimerId = window.setTimeout(
      pickNotification,
      5000,
      currentNotification
    );
  };

  const _updateRegionFillColor = (regionName, fill = 'green') => {
    let pathName = document.getElementsByClassName(
      regionName
    )[0]
    pathName.style.fill = fill
  }

  const _getCurrentNotification = () => {
    let currentNotification;
    let hasNotificationsToProcess = eventNotifications.length > 0;
    if (hasNotificationsToProcess) {
      currentNotification = eventNotifications.splice(0, 1)[0];
    }
    return currentNotification;
  }

  const pickNotification = previousNotification => {
    let shouldRestorePreviousHighlightedRegion = previousNotification && previousNotification.country === countryCode
    if (shouldRestorePreviousHighlightedRegion) {
      _updateRegionFillColor(previousNotification.name, 'green')
    }

    let currentNotification = _getCurrentNotification();
    if (currentNotification) {
      if (currentNotification.country === countryCode) {
        _updateRegionFillColor(currentNotification.name, 'pink')
        console.log(`currentNotification.name: ${currentNotification.name}`);
      }
    }
    keepListeningNotifications(currentNotification);
  };

  const config = configurations[countryCode];

  stopListeningNotifications();
  document.getElementsByClassName(config.mapDomClass)[0].innerHTML = '';

  fetch(`/json/${countryCode}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(mapData => {
      const mapComponent = new MapComponent(config, mapData);
      mapComponent.draw();
      startListeningNotifications();
    });
};

loadMap('mx');


const socketUrl = `ws://localhost:3000/`;
const ws = new WebSocket(socketUrl);

ws.onmessage = (event)  => {
  const events = JSON.parse(event.data);
  for (const currentEvent of events) {
    eventNotifications.push(currentEvent);
  }
};

ws.onclose = function() {
  throw 'Lost connection with the server try to reload the page.';
};



const eventNotifications = [];
