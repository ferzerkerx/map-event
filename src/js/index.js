const d3 = require('d3');
const topojson = require('topojson');



const height = 768;
const width = 1024;


const projection = d3
  .geoMercator()
  .scale(3600)
  .translate([0, height * 5.4]);const tooltip = d3.select('.tooltip').style('opacity', 0);

  const path = d3.geoPath().projection(projection);



const createToolTipHtml = (data) => {
  return `Name: ${data.properties.NAME_1} <br/>`;
}

function onMouseOverHandler(data) {
  d3
    .select(this)
    .attr('d', path)
    .style('fill', 'yellow');
  tooltip.style('opacity', 0.9);

  tooltip
    .html(createToolTipHtml(data))
    .style('left', `${d3.event.pageX + 30 }px`)
    .style('top', `${d3.event.pageY - 30}px`);
}

function onMouseOutHandler() {
  d3
    .select(this)
    .attr('d', path)
    .style('fill', 'green');
  tooltip.style('opacity', 0);
}


const mapUrl = '/json/de0.json';


function drawMap (height, width, mapUrl) {


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

  d3.json(mapUrl).then(jsonResponse => {
    svg
      .append('g')
      .selectAll('path')
      .data(topojson.feature(jsonResponse, jsonResponse.objects.asd1).features)
      .enter()
      .append('path')
      .attr('fill', 'green')
      .attr('stroke', 'orange')
      .attr('d', path)
      .on('mouseover', onMouseOverHandler)
      .on('mouseout', onMouseOutHandler);

    function onZoomHandler() {
      const transform = d3.event.transform;
      svg.attr('transform', transform);
    }

    svg.call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 4])
        .on('zoom', onZoomHandler)
    );
  });
}

drawMap(height,  width, mapUrl);
