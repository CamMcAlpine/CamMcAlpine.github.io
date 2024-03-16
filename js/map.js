var map = L.map('map').setView([41.62756980846162, -71.00556234602631], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

map.removeControl(map.attributionControl);
map.removeControl(map.zoomControl);

var latlngs = [[]];
var lines = 0;
var markers = [];
var markerNum = 0;
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    var marker = L.marker(e.latlng, {draggable: true}).addTo(map);
    map.addLayer(marker);
    marker.on('drag', onDrag);
    markers.push(marker);
    latlngs[lines].push(marker.getLatLng());
    refresh();
    if(markerNum % 2 == 1){
        latlngs.push([]);
    }
    console.log(markerNum);
    console.log(markers.length);
}

function refresh(){
    if (map.hasLayer(polyline)){
        map.removeLayer(polyline);
    }
    markerNum = markers.length;
    lines = latlngs.length-1;
    polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
}

function onDrag(e)
{
    console.log(L);
}

function onCPress(e)
{
    var key = e.originalEvent.key;
    if(key = 'c')
    {
        for(var i = 0; i < markers.length; i++)
        {
            map.removeLayer(markers[i]);
        }
        map.removeLayer(polyline);
        latlngs = [[]];
        markers = [];
        refresh();
    }
}


map.on('click', onMapClick);

map.on('keydown', onCPress)
