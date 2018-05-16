const d3 = require('d3');
const topojson = require('topojson');


class MouseMapEvent {

  constructor(regionName, path, tooltip, regionPath) {
    this.regionName = regionName;
    this.path = path;
    this.tooltip = tooltip;
    this.regionPath = regionPath;
  }
}

class MapComponent {

  constructor (width, height, mapUrl) {
    const projection = d3
      .geoMercator()
      .scale(3600)
      .translate([0, height * 5.4]);
    const tooltip = d3.select('.tooltip').style('opacity', 0);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', '100%')
      .attr('height', height + 'px');


    svg
      .append('rect')
      .attr('width', '100%')
      .attr('height', height)
      .attr('fill', 'lightblue');

    this.width = width;
    this.height = height;
    this.tooltip = tooltip;
    this.path = path;
    this.mapUrl = mapUrl;
    this.svg = svg;

  }
  drawMap() {
    const that = this;
    const svg = this.svg;
    d3.json(this.mapUrl).then(jsonResponse => {
      svg
        .append('g')
        .selectAll('path')
        .data(topojson.feature(jsonResponse, jsonResponse.objects.asd1).features)
        .enter()
        .append('path')
        .attr('fill', 'green')
        .attr('stroke', 'orange')
        .attr('d', this.path)
        .on('mouseover', function (regionData) {
          const regionPath = this;
          const regionName = `Name: ${regionData.properties.NAME_1} <br/>`;
          const mapEvent = new MouseMapEvent(regionName, that.path, that.tooltip, regionPath);
          MapComponent.onMouseOverHandler(mapEvent);
        })
        .on('mouseout', function (regionData) {
          const regionPath = this;
          const regionName = `Name: ${regionData.properties.NAME_1} <br/>`;
          const mapEvent = new MouseMapEvent(regionName, that.path, that.tooltip, regionPath);
          MapComponent.onMouseOutHandler(mapEvent);
        });

      svg.call(
        d3
          .zoom()
          .scaleExtent([0.25, 1.5])
          .on('zoom', function() {
        const transform = d3.event.transform;
        svg.attr('transform', transform);
      }
    )
      );
    });
  }

   static onMouseOverHandler(mapEvent) {
    d3
      .select(mapEvent.regionPath)
      .attr('d', mapEvent.path)
      .style('fill', 'yellow');
     mapEvent.tooltip.style('opacity', 0.9);

     mapEvent.tooltip
      .html(mapEvent.regionName)
      .style('left', `${d3.event.pageX + 30 }px`)
      .style('top', `${d3.event.pageY - 30}px`);
  }

  static onMouseOutHandler(mapEvent) {
    d3
      .select(mapEvent.regionPath)
      .attr('d', mapEvent.path)
      .style('fill', 'green');
    mapEvent.tooltip.style('opacity', 0);
  }

}

const height = 768;
const width = 1024;
const mapUrl = '/json/de0.json';


const mapComponent = new MapComponent(width, height, mapUrl);
mapComponent.drawMap();
