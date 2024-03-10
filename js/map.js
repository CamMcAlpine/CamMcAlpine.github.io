var map = L.map('map').setView([41.62756980846162, -71.00556234602631], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


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