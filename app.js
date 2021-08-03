const myMap = L.map("map").setView([20, 80], 4);
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileLayer = L.tileLayer(tileUrl, {
  attribution,
  minZoom: 3,
  maxZoom: 16,
  noWrap: true,
});
tileLayer.addTo(myMap);

var southWest = L.latLng(-89.98155760646617, -180),
  northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

myMap.setMaxBounds(bounds);
document.getElementById('submit').addEventListener('click',()=>{
  var api ='https://io.adafruit.com/api/v2/anurag004/feeds/{device}/data/retain?X-AIO-KEY=aio_yVFu33153a7DvzJ13IJmfbJvsHea'
  let device = document.getElementById('device').value
  api=api.replace('{device}',device)
  console.log(device)
  fetch(api)
  .then(response => response.text())
  .then(x => {
    x = x.slice(11,-6)
    x = x.replace(/'/g,'"')
    x = JSON.parse(x)
    document.getElementById('pm25').innerText=x.PM25
    document.getElementById('co').innerText=x.CO
    document.getElementById('co2').innerText=x.CO2
    document.getElementById('o3').innerText=x.O3
    console.log(x)
  }).catch(e=>alert('device not found'))
})