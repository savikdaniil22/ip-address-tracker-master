import 'babel-polyfill'
import {validateIp,addTileLayer,getAddress,addOffset} from './helpers/index';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../images/icon-location.svg'

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

ipInput.addEventListener('keydown',handleKey);
btn.addEventListener('click',getData);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30,40],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea,{
  center: [51.505, -0.09],
  zoom: 13,
});
addTileLayer(map);
L.marker([51.505, -0.09],{icon:markerIcon}).addTo(map)


function getData(){
  if(validateIp(ipInput.value)){
    getAddress(ipInput.value)
    .then(setInfo)
  }
}


function handleKey(e){
  if (e.key === 'Enter'){
    getData();
  }
}

function setInfo(mapData){
  const {lat, lng, country, region, timezone} = mapData.location;
 
  ipInfo.innerHTML = mapData.ip;
  locationInfo.innerHTML = country + ' ' + region;
  timezoneInfo.innerHTML = timezone;
  ispInfo.innerHTML = mapData.isp;

  map.setView([lat,lng]);
  L.marker([lat,lng],{icon:markerIcon}).addTo(map);

  if(matchMedia("(max-width:1023px)").matches){  
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded',() =>{
  getAddress('102.22.22.1').then(setInfo)
});


// 146.247.124.26
//20.29.11.11
//12.23.21.11