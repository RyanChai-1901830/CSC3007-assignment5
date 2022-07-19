// Setting up the map
let tiles = new L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 11,
    //Do not remove this attribution
    attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
        'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
});

let map = new L.Map("map", {
        center: [1.347833, 103.809357],
        zoom: 11,
        maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
    })
    .addLayer(tiles);

// api url
const api_url = "https://api.data.gov.sg/v1/environment/psi";

// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();

    // console.log("here");
    // console.log(data.items[0].readings.psi_twenty_four_hourly.length);

    // Display JSON data into table
    // display_data(data);
    // console.log(data);
    // console.log(data.items[0].update_timestamp);
    // console.log("space");
    // console.log(data.region_metadata);
    // console.log("space 2");
    // console.log(data.region_metadata[0].label_location);
    // console.log(data.items[0].readings.psi_twenty_four_hourly);
    region_data = data.region_metadata;
    psi_data = data.items[0].readings.psi_twenty_four_hourly;
    set_lat_long(region_data, psi_data);

}
// Calling that async function
getapi(api_url);
set_lat_long()

function set_lat_long(region_data, psi_data) {
    // console.log("func")
    for (var key in region_data) {
        for (var pkey in psi_data) {
            if (pkey == region_data[key].name) {

                var popup_text = "Singapore Region: ".bold() + (region_data[key].name).toUpperCase() + " \nPSI: ".bold() + psi_data[pkey];
                var psi_text = psi_data[pkey];
                // var marker = L.marker([region_data[key].label_location.latitude, region_data[key].label_location.longitude], {
                //         alt: 'SG'
                //     }).addTo(map) // "Kyiv" is the accessible name of this marker
                //     .bindPopup(popup_text);

                // var circle = L.circle([region_data[key].label_location.latitude, region_data[key].label_location.longitude], {
                //     icon: myIcon,
                //     fontSize: 24,
                //     color: 'red',
                //     fillColor: '#f03',
                //     fillOpacity: 0.5,
                //     radius: 1000
                // }).addTo(map);
                circle = L.marker([region_data[key].label_location.latitude, region_data[key].label_location.longitude], {
                    icon: L.divIcon({
                        className: 'marker',
                        html: psi_text,
                    })
                });
                circle.addTo(map);


            }
        }
    }
}