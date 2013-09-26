/*global App */
if (!this.App || typeof this.App !== 'object') {
    this.App = {};
}
(function () {
  'use strict';

  var width = $('#world-map').width(),
      height = $('#world-map').height()

  var projection = d3.geo.mercator()
    .scale(900)
    .translate([width / 2, height / 2])
    .precision(.1);

  var path = d3.geo.path()
      .projection(projection);

  var graticule = d3.geo.graticule();

  var zoom = d3.behavior.zoom(true)
      .scale(projection.scale())
      .scaleExtent([100, 2000])
      .on("zoom", zoomed);

  var svg = d3.select("#world-map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

  svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

  svg.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

  svg.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere");

  svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json("data/world-110m.json", function(error, world) {
    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
  
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