import * as d3 from 'd3';
import * as topojson from 'topojson';

const defaultConfig = {
  mapDomClass: 'map',
  toolTipDomClass: 'tooltip',
  height: 768,
  width: 1024,
  projection: (width, height) => {
    return d3
      .geoMercator()
      .scale(defaultConfig.scale)
      .translate([width / 2, height / 2]);
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
  }
};

const deConfig = Object.assign({}, defaultConfig, {
  projection: (width, height) => {
    return d3
      .geoMercator()
      .scale(defaultConfig.scale)
      .translate([-60, height * 5]);
  }
});

const frConfig = Object.assign({}, defaultConfig, {
  projection: (width, height) => {
    return d3
      .geoMercator()
      .scale(defaultConfig.scale)
      .translate([width / 2, height * 4.5]);
  }
});

const mxConfig = Object.assign({}, defaultConfig, {
  scale: 2000,
  projection: (width, height) => {
    return d3
      .geoAlbers()
      .scale(mxConfig.scale)
      .translate([width / 1.5, -100]);
  }
});

const configurations = {
  de: deConfig,
  fr: frConfig,
  mx: mxConfig
};

export { configurations };
