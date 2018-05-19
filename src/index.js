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

  //TODO This can be controlled with a button
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
    let hasNotificationsToProcess = notifications.length > 0;
    if (hasNotificationsToProcess) {
      currentNotification = notifications.splice(0, 1)[0];
      let pathName = document.getElementsByClassName(
        currentNotification.name
      )[0];
      pathName.style.fill = 'pink';
    }
    keepListeningNotifications(currentNotification);
  };

  const config = configurations[countryCode];

  stopListeningNotifications();
  document.getElementsByClassName(config.mapDomClass)[0].innerHTML = '';

  fetch(`http://localhost:8080/json/${countryCode}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(mapData => {
      const mapComponent = new MapComponent(config, mapData);
      mapComponent.draw();
      // startListeningNotifications();
    });
};

loadMap('mx');

//TODO the notifications will come from a streaming source
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

const notifications = mxNotifications;
