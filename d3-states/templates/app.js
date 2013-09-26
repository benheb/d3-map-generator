/*global App */
if (!this.App || typeof this.App !== 'object') {
    this.App = {};
}
(function () {
  'use strict';

  var width = 700,
      height = 600

  var projection = d3.geo.albersUsa()
    .scale(500)
    .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var graticule = d3.geo.graticule();

  var zoom = d3.behavior.zoom(true)
      .scale(projection.scale())
      .scaleExtent([100, 2000])
      .on("zoom", zoomed);

  var svg = d3.select("#states-map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

  d3.json("data/us.json", function(error, us) {
    svg.append("g")
      .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
        .attr("d", function(d) { return path(d); })
        .attr("class", "states");

    var counties = topojson.feature(us, us.objects.counties).features;

    svg.append("g")
        .attr('class', 'allcounties')
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .attr("d", function(d) { return path(d); })
        .attr("class", "counties");

  });
  
  //zoom on mouse scroll
  function zoomed() {
    if(d3.event){
      var scale = d3.event.scale;
      projection.scale(scale);

      d3.selectAll('path').attr('d', path);
      d3.selectAll('circle')
        .attr("transform", function(d) {
          return "translate(" + projection(d.geometry.coordinates) + ")";
        })
    }
  } 
  

})();