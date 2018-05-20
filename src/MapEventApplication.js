import { loadMap } from './loadMap';

class MapEventApplication {
  constructor(countryCode) {
    this.eventNotifications = [];
    this.notificationTimerId = null;
    this.countryCode = countryCode;
  }

  _changedMap(event, mapApp) {
    let countryCode = event.target.value;
    mapApp.stopListeningNotifications();
    this.notificationTimerId = loadMap(countryCode).then(() =>
      mapApp.startListeningNotifications()
    );
    mapApp.countryCode = countryCode;
  }

  _addEventListeners() {
    const wrapper = event => this._changedMap(event, this);
    document.getElementById('map-selector').addEventListener('change', wrapper);
  }

  stopListeningNotifications() {
    if (this.notificationTimerId) {
      window.clearTimeout(this.notificationTimerId);
    }
  }

  startListeningNotifications() {
    const wrapper = () => this.pickNotification();
    this.notificationTimerId = window.setTimeout(wrapper, 2000);
  }

  keepListeningNotifications(currentNotification) {
    const wrapper = () => this.pickNotification(currentNotification);
    this.notificationTimerId = window.setTimeout(wrapper, 5000);
  }

  static _updateRegionFillColor(regionName, fill = 'green') {
    let pathName = document.getElementsByClassName(regionName)[0];
    if (pathName) {
      pathName.style.fill = fill;
    }
  }

  _getCurrentNotification() {
    let currentNotification;
    let hasNotificationsToProcess = this.eventNotifications.length > 0;
    if (hasNotificationsToProcess) {
      currentNotification = this.eventNotifications.splice(0, 1)[0];
    }
    return currentNotification;
  }

  pickNotification(previousNotification) {
    let shouldRestorePreviousHighlightedRegion =
      previousNotification && previousNotification.country === this.countryCode;
    if (shouldRestorePreviousHighlightedRegion) {
      MapEventApplication._updateRegionFillColor(
        previousNotification.name,
        'green'
      );
    }

    let currentNotification = this._getCurrentNotification();
    if (currentNotification) {
      if (currentNotification.country === this.countryCode) {
        MapEventApplication._updateRegionFillColor(
          currentNotification.name,
          'pink'
        );
      }
    }
    this.keepListeningNotifications(currentNotification);
  }

  _startNotificationsSocket(url) {
    const ws = new WebSocket(url);

    ws.onmessage = event => {
      const events = JSON.parse(event.data);
      for (const currentEvent of events) {
        this.eventNotifications.push(currentEvent);
      }
    };

    ws.onclose = function() {
      throw 'Lost connection with the server try to reload the page.';
    };
  }

  start(socketUrl) {
    this._addEventListeners();
    this._startNotificationsSocket(socketUrl);
    this.notificationTimerId = loadMap(this.countryCode).then(() =>
      this.startListeningNotifications()
    );
  }
}

export { MapEventApplication };
