
let map1;
let map2;
let viewoptions;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleLineSymbol",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleFillSymbol"
  ], function(Map, MapView,
     BasemapToggle, Graphic,
      Point, SimpleMarkerSymbol,
      Polyline, SimpleLineSymbol,
      Polygon, SimpleFillSymbol) {

      map1 = new Map({basemap: 'topo'})
      map2 = new Map({basemap: 'satellite'})
      view = new MapView ({
        container: 'viewDiv',
          map: map1,
          zoom: 15,
          center: [-78.7921855, 35.7059748
      ]})

      let basemapToggle = new BasemapToggle({
        view: view,
        secondMap: 'satellite'
      })
      view.ui.add(basemapToggle, 'bottom-right')
      let point = new Point({
        longitude: -78.7921855,
        latitude: 35.7059748
      })
      let markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119,40],
        outline: {
          color: [100, 50, 80],
          width: 1
        }
      })
      let pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      })
      view.graphics.add(pointGraphic)

      let polyline = new Polyline({
        paths: [
          [-78.7922, 35.7059748],
          [-80, 35.7059748]
      ]
      })
      var lineSymbol = new SimpleLineSymbol({
        color: [226, 119, 40],
        width: 4
      });
      var polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol
      })
      view.graphics.add(polylineGraphic);

      // add in the latitude and longitude
      var coordsWidget = document.createElement("div");
      coordsWidget.id = "coordsWidget";
      coordsWidget.className = "esri-widget esri-component";
      coordsWidget.style.padding = "7px 15px 5px";
    
      view.ui.add(coordsWidget, "bottom-right");

      function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
            " | Scale 1:" + Math.round(view.scale * 1) / 1 +
            " | Zoom " + view.zoom;
        coordsWidget.innerHTML = coords;
      }

      view.watch(["stationary"], function() {
        showCoordinates(view.center);
      });
    
      view.on(["pointer-move"], function(evt) {
        showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
      });
    })