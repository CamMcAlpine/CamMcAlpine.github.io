var map = L.map('map').setView([41.62756980846162, -71.00556234602631], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

map.removeControl(map.attributionControl);
map.removeControl(map.zoomControl);

var latlngs = [[]];
var lines = 0;
var markerNum = 0;
var polyline = null;

var popup = L.popup();

function onMapClick(e) {
    var marker = L.marker(e.latlng, {draggable: true}).addTo(map);
    latlngs[lines].push(marker.getLatLng());
    marker.on('move', updateLine);
    markerNum = (markerNum + 1) % 2;
    if(markerNum == 0){
        lines++;
        latlngs.push([]);
    }
    if (polyline) {
        map.removeLayer(polyline);
    }
    polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
}

function updateLine() {
    polyline.setLatLngs(latlngs);
}

function onCPress(e)
{
    var key = e.key;
    console.log(key);
}


map.on('click', onMapClick);
map.on('keydown', onCPress)
