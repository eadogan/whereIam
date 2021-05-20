import axios from 'axios';
import Mustache from 'mustache';


const form = document.querySelector('form')! ;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const mapTemplate = document.getElementById('map')!.innerHTML

declare var google: any;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const address = addressInput.value;

    //send this to API
   axios.get(
       `https://api.mapbox.com/geocoding/v5/mapbox.places/'${address}'.json?access_token=pk.eyJ1IjoiYXZmOTM2MTEiLCJhIjoiY2tuaGl0Z2k2Mnp3bTJxdGExand1d28xdCJ9.Kwo_E0OOh1e5AR5M3tUq_A`
       ).then((response) => {
           if(response.statusText !== 'OK') {
               throw new Error('Could not fetch location!');
           }
           const lat =  response.data.features[0].center[1];
           const lng = response.data.features[0].center[0];

           // Will update
           const  mapElement = document.getElementById('map')!;
           mapElement.setAttribute("href", `https://google.com/maps?q=${lat},${lng}`);           
       })
       .catch(err => {
           alert(err.message);
           console.log(err);
       })
}

form.addEventListener('submit', searchAddressHandler);