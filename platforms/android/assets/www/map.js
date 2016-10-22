//____________________________________________________________________________________________________________________
//_____________________________________________________MAP____________________________________________________________
var updateTimer3 = null;



updateTimer3 = setInterval(liveCoordinates, 250);


function liveCoordinates(){
        var lat = JSON.parse(localStorage.getItem("lat"));
        var lng = JSON.parse(localStorage.getItem("lng"));
        return [lng, lat];
}



mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhZGluOTgiLCJhIjoiY2l0YmVhdXVjMDAyZDJ0bzMycGJ0MTduayJ9.ZwQ9HQBUFK-nHMUAeADPEQ';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/aladin98/cithdb079001h2hrs0bs4ytdp',
  // initial position in [long, lat] format
  center: [8.729393, 47.349892],
  // initial zoom
  zoom: 21,
  interactive: true
});


var nav = new mapboxgl.Navigation({position: 'top-left'}); // position is optional
map.addControl(nav);


map.on('style.load', function (e) {


 

    map.addSource('beacons', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [8.729383, 47.349945]
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [8.729393, 47.349892]
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [8.72944, 47.349924]
                }
            }]
        }
    });
    long = liveCoordinates()[0];
    laat = liveCoordinates()[1];
    console.log(laat);
    console.log(long);   

    map.addSource('position', {
    "type": "geojson",
    "data": {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [long, laat]
	            }
	        }]
	    }
	});

    map.addLayer({
        "id": "beacons",
        "source": "beacons",
        "type": "circle",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#007cbf"
        }
    });

        map.addLayer({
        "id": "position",
        "source": "position",
        "type": "circle",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#ff0074"
        }
    });


});