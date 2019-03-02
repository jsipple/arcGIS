require([
    "esri/Map",
    "esri/views/MapView",
    //*** ADD ***//
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "dojo/domReady!"
    //*** ADD ***//
  ], function(Map, MapView, BasemapToggle, BasemapGallery) {
  var map = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.71511,34.09042],
    zoom: 15,
    //*** ADD ***//
    camera: {
      tilt: 45,
      position: {
        x: -118.71,
        y: 33.75,
        z: 25000 // meters
      }
    }
  });
  var basemapToggle = new BasemapToggle({
    view: view,
    secondMap: "satellite"
  });
  view.ui.add(basemapToggle, "bottom-right"); // Add to the view
  var basemapGallery = new BasemapGallery({
    view: view,
    source: {
      portal: {
        url: "http://www.arcgis.com",
        useVectorBasemaps: false  // Load vector tile basemaps
      }
    }
  });
  view.ui.add(basemapToggle, "bottom-right");
});