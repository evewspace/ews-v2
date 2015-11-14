'use strict';

var EveWspace = require('../../app');

EveWspace.directive('ewsMap', ['$window', '$d3', function ($window, $d3) {
  return {
    restict: 'A',
    replace: false,
    scope: {
      ewsModel: '=',
      selectedSystem: '='
    },
    link: function (scope, iElem, iAttrs) {

      // Define the SVG element
      var svg = $d3.select(iElem[0])
        .append('svg')
        .attr({
          width: '100%',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 ' + iElem[0].clientWidth + ' ' + iElem[0].clientHeight,
          preserveAspectRatio: 'xMinYMid meet',
          style: 'padding: 30px 20px'
        });

      // Create a tree layout
      var tree = $d3.layout.tree()
        .size([iElem[0].clientHeight, iElem[0].clientWidth]);

      // Create the diagonal behavior
      var diagonal = $d3.svg.diagonal()
        .projection(function (d) {
          return [d.y, d.x];
        });

      // Add a group element to the SVG element to handle the zoom behavior
      var container = svg.append('g');

      // Define the zoom behavior
      var zoom = $d3.behavior.zoom()
        .scaleExtent([0.75, 10])
        .on('zoom', function () {
          container.attr({
            transform: 'translate(' + $d3.event.translate + ')scale(' + $d3.event.scale + ')'
          });
        });

      // Add the zoom behavior to the SVG element
      svg.call(zoom);

      /**
       * Render the map
       *
       * @param data
       */
      scope.render = function (data) {

        // Clean up any existing maps
        container.selectAll('path').remove();
        container.selectAll('g').remove();

        // Create the system nodes and links
        var nodes = tree.nodes(data);
        var links = tree.links(nodes);

        // Make the links
        var link = container.selectAll('.link')
          .data(links)
          .enter()
            .append('path')
            .attr({
              class: 'link',
              d: $d3.svg.diagonal()
            });

        // Make the nodes groups
        var node = container.selectAll('.node')
          .data(nodes)
          .enter()
            .append('g')
            .attr({
              class: 'node',
              id: function (d) {
                return d.id;
              }
            });

        // Make the circle elements
        node.append('circle')
          .attr('r', 7)
          .style('fill', 'lightblue');

        // Make the text labels for the nodes
        node.append('text')
          .attr('dx', -7)
          .attr('dy', -15)
          .style({
            'text-anchor': 'start'
          })
          .text(function (d) {
            return d.label;
          });
      }

      // apply the scope again on resize
      $window.onresize = function () {
        return scope.$apply();
      }

      // Watch for changes to the map data and window size
      scope.$watchGroup([
        scope.ewsModel,
        $window.innerWidth
      ], function (newVals, oldVals) {
        if(scope.ewsModel.children.length > 0) {
          scope.render(scope.ewsModel);
        }
      });
    }
  }
}]);
