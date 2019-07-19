import { MouseMapEvent } from './MouseMapEvent';

import * as d3 from 'd3';

import styles from './map.css';

class MapComponent {
  constructor(config, mapData) {
    const { height, width } = config;

    const projection = config.projection(width, height);
    const tooltip = d3.select(`.${config.toolTipDomClass}`).style('opacity', 0);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select(`.${config.mapDomClass}`)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height + 'px');

    svg
      .append('rect')
      .attr('width', '100%')
      .attr('height', height)
      .attr('fill', 'lightblue');

    this.featureExtractor =
      config.featureExtractor || MapComponent._noOpFeatureExtractor;
    this.regionDisplayDataExtractor =
      config.regionDisplayDataExtractor || MapComponent._regionDisplayData;

    this.regionClassMapper =
      config.regionClassMapper || MapComponent._regionClassMapper;

    this.tooltip = tooltip;
    this.path = path;
    this.mapData = mapData;
    this.svg = svg;
    this.config = config;
  }

  draw() {
    const {
      path,
      tooltip,
      svg,
      featureExtractor,
      regionDisplayDataExtractor,
      regionClassMapper,
      mapData,
      config
    } = this;
    svg
      .append('g')
      .selectAll('path')
      .data(featureExtractor(mapData))
      .enter()
      .append('path')
      .attr('fill', 'green')
      .attr('stroke', 'orange')
      .attr('d', path)
      .style('opacity', 1)
      .attr('class', function(regionData) {
        return regionClassMapper(regionData);
      })
      .on('mouseover', function(regionData) {
        const regionPath = this;
        const regionDisplayData = regionDisplayDataExtractor(regionData);
        const mapEvent = new MouseMapEvent(
          regionDisplayData,
          path,
          tooltip,
          regionPath
        );
        MapComponent.onMouseOverHandler(mapEvent);
      })
      .on('mouseout', function(regionData) {
        const regionPath = this;
        const regionDisplayData = regionDisplayDataExtractor(regionData);
        const mapEvent = new MouseMapEvent(
          regionDisplayData,
          path,
          tooltip,
          regionPath
        );
        MapComponent.onMouseOutHandler(mapEvent);
      });

    if (config.zoomEnabled) {
      svg.call(
        d3
          .zoom()
          .scaleExtent([0.25, 1.5])
          .on('zoom', function() {
            const transform = d3.event.transform;
            svg.attr('transform', transform);
          })
      );
    }
  }

  static onMouseOverHandler(mapEvent) {
    d3.select(mapEvent.regionPath)
      .attr('d', mapEvent.path)
      .style('fill', 'yellow');
    mapEvent.tooltip.style('opacity', 0.9);

    mapEvent.tooltip
      .html(mapEvent.regionDisplayData)
      .style('left', `${d3.event.pageX + 30}px`)
      .style('top', `${d3.event.pageY - 30}px`);
  }

  static onMouseOutHandler(mapEvent) {
    d3.select(mapEvent.regionPath)
      .attr('d', mapEvent.path)
      .style('fill', 'green');
    mapEvent.tooltip.style('opacity', 0);
  }

  static _noOpFeatureExtractor(mapData) {
    throw Error(`Feature extractor not set ${mapData}`);
  }

  static _regionDisplayData(regionData) {
    return regionData.toString();
  }

  static _regionClassMapper(regionData) {
    throw Error(`Region class mapper not set ${regionData}`);
  }
}

export { MapComponent };
