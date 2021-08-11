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
//voc->volatile organic compound
//pm2.5 particulate matter 
//lux jyoti tivrata 
// rh relative humidity
var southWest = L.latLng(-89.98155760646617, -180),
  northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

myMap.setMaxBounds(bounds);
document.getElementById("submit").addEventListener("click", () => {
  var api ='./data.json'
  let device = document.getElementById("device").value;
  // api = api.replace("{device}", device);
  // console.log(device);
  fetch(api)
    .then((response) => response.json())
    .then((x) => {
      let [a]= x.filter(d => d.result.id==device)
        document.getElementById("pm25").innerText = a.result.PM25;
        document.getElementById("co").innerText = a.result.CO;
        document.getElementById("co2").innerText = a.result.CO2;
        document.getElementById("o3").innerText = a.result.O3;
        document.getElementById("voc").innerText = a.result.VOC;


        var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
        var yValues = x.map(d=>d.result.PM25)
        new Chart("singleChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderColor: "rgb(0,0,0)",
                    data: yValues
                }]
            },
            options: {
                legend: { display: false }
            }
        });
    })
    .catch((e) => alert('device not found'));
});
var e = document.getElementsByClassName("item");
var m = document.getElementsByClassName("message");
m[0].style.display ='block'
e[0].id = "active";
for (let i = 0; i < 4; i++) {
  e[i].addEventListener("click", () => {
    for (let j = 0; j < 4; j++) {
      if(e[i].innerText==m[j].id){
        m[j].style.display = 'block'
      }else{
        m[j].style.display ='none'
      }
    }
    let x = document.getElementById("active");
    if (x) {
      x.id = "";
    }
    e[i].id = "active";
  });
}
