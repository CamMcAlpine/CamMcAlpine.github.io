var map = L.map('map').setView([41.62756980846162, -71.00556234602631], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

map.removeControl(map.attributionControl);
map.removeControl(map.zoomControl);

var popup = L.popup();

function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(map);
}

function onCPress(e)
{
    var key = e.key;
    console.log(key);
}


map.on('click', onMapClick);
map.on('keydown', onCPress)