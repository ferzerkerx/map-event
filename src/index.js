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

  const pickNotification = previousNotification => {
    if (previousNotification) {
      let pathName = document.getElementsByClassName(
        previousNotification.name
      )[0];
      pathName.style.fill = 'green';
    }

    let currentNotification;
    let hasNotificationsToProcess = eventNotifications.length > 0;
    if (hasNotificationsToProcess) {
      currentNotification = eventNotifications.splice(0, 1)[0];
      let pathName = document.getElementsByClassName(
        currentNotification.name
      )[0];
      pathName.style.fill = 'pink';
    }
    keepListeningNotifications(currentNotification);
  };

  const config = configurations[countryCode];

  //TODO delete all notifications
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
