import { MapComponent } from './MapComponent';

import * as topojson from 'topojson';

const config = {
  mapUrl: 'http://localhost:8080/json/de0.json',
  mapDomElement: 'body',
  toolTipDomElement: '.tooltip',
  height: 768,
  width: 1024,
  featureExtractor: mapData => {
    return topojson.feature(mapData, mapData.objects.asd1).features;
  },

  regionDisplayDataExtractor: regionData => {
    return `Name: ${regionData.properties.NAME_1} <br/>`;
  }
};

fetch(config.mapUrl)
  .then(function(response) {
    return response.json();
  })
  .then(mapData => {
    const mapComponent = new MapComponent(config, mapData);
    mapComponent.draw();
  });
