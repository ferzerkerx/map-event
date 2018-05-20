import { MapComponent } from './MapComponent/MapComponent';
import { configurations } from './configurations';

const loadMap = countryCode => {
  const _clearPreviousMap = mapDomClass => {
    let domElement = document.getElementsByClassName(mapDomClass)[0];
    if (domElement) {
      domElement.innerHTML = '';
    }
  };

  const _loadNewMapInformation = () => {
    const config = configurations[countryCode];

    _clearPreviousMap(config.mapDomClass);

    return fetch(`/json/${countryCode}.json`)
      .then(function(response) {
        return response.json();
      })
      .then(mapData => {
        const mapComponent = new MapComponent(config, mapData);
        mapComponent.draw();
      });
  };

  return _loadNewMapInformation();
};

export { loadMap };
