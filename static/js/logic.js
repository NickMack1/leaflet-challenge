var queryURLquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryURLplates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

var color0 = "limegreen";
var color1 = "chartreuse";
var color2 = "yellow";
var color3 = "orange";
var color4 = "darkorange";
var color5 = "red";
var legend = L.control();

d3.json(queryURLquakes, function(data) {
    loadPlates(data.features);
});

function loadPlates(earthquakeData) {
    d3.json(queryURLplates, function(data) {
        createFeatures(earthquakeData, data.features);
    });    
}

function createFeatures(earthquakeData, plateData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function handleFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    function getGeoJsonMarkerOptions(feature) {
        color = color5;
        if (feature.properties.mag <= 1) {
            color = color1;
        } else if (feature.properties.mag <= 2) {
            color = color2;
        } else if (feature.properties.mag <= 3) {
            color = color3;
        } else if (feature.properties.mag <= 4) {
            color = color4;
        }

        return {
            radius: feature.properties.mag * 5,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }}