//____________________________________________________________________________________________________________________________
//_____________________________________________________POSITIONING____________________________________________________________

var updateTimer = null;
var updateTimer2 = null;

updateTimer = setInterval(getTrilateration, 250);
updateTimer2 = setInterval(utmToLatLng, 250);










//window.position1 = {e:479560.91, n: 5244088.92};
//window.position2 = {e:479561.64, n: 5244083.03};
//window.position3 = {e:479565.21, n: 5244086.58};




//from https://gist.github.com/kdzwinel/8235348
function getTrilateration() {

    var xa = 479560.91;
    var ya = 5244088.92;
    var xb = 479561.64;
    var yb = 5244083.03;
    var xc = 479565.21;
    var yc = 5244086.58;
    var dist = JSON.parse(localStorage.getItem("distances"));
    //console.log(dist);
    var ra = dist[0];
    var rb = dist[1];
    var rc = dist[2];

    var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
    var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
    var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
    var x = ((y * (ya - yb)) - T) / (xb - xa);

    window.localStorage.setItem("east", JSON.stringify(x));
    window.localStorage.setItem("north", JSON.stringify(y));
};







//from http://stackoverflow.com/questions/343865/how-to-convert-from-utm-to-latlng-in-python-or-javascript/27388998#27388998
function utmToLatLng(){
        northernHemisphere = true;
        var zone = 32;
        var easting = JSON.parse(localStorage.getItem("east"));
        var northing = JSON.parse(localStorage.getItem("north"));



        if (!northernHemisphere){
            northing = 10000000 - northing;
        }

        var a = 6378137;
        var e = 0.081819191;
        var e1sq = 0.006739497;
        var k0 = 0.9996;

        var arc = northing / k0;
        var mu = arc / (a * (1 - Math.pow(e, 2) / 4.0 - 3 * Math.pow(e, 4) / 64.0 - 5 * Math.pow(e, 6) / 256.0));

        var ei = (1 - Math.pow((1 - e * e), (1 / 2.0))) / (1 + Math.pow((1 - e * e), (1 / 2.0)));

        var ca = 3 * ei / 2 - 27 * Math.pow(ei, 3) / 32.0;

        var cb = 21 * Math.pow(ei, 2) / 16 - 55 * Math.pow(ei, 4) / 32;
        var cc = 151 * Math.pow(ei, 3) / 96;
        var cd = 1097 * Math.pow(ei, 4) / 512;
        var phi1 = mu + ca * Math.sin(2 * mu) + cb * Math.sin(4 * mu) + cc * Math.sin(6 * mu) + cd * Math.sin(8 * mu);

        var n0 = a / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (1 / 2.0));

        var r0 = a * (1 - e * e) / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (3 / 2.0));
        var fact1 = n0 * Math.tan(phi1) / r0;

        var _a1 = 500000 - easting;
        var dd0 = _a1 / (n0 * k0);
        var fact2 = dd0 * dd0 / 2;

        var t0 = Math.pow(Math.tan(phi1), 2);
        var Q0 = e1sq * Math.pow(Math.cos(phi1), 2);
        var fact3 = (5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * Math.pow(dd0, 4) / 24;

        var fact4 = (61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0) * Math.pow(dd0, 6) / 720;

        var lof1 = _a1 / (n0 * k0);
        var lof2 = (1 + 2 * t0 + Q0) * Math.pow(dd0, 3) / 6.0;
        var lof3 = (5 - 2 * Q0 + 28 * t0 - 3 * Math.pow(Q0, 2) + 8 * e1sq + 24 * Math.pow(t0, 2)) * Math.pow(dd0, 5) / 120;
        var _a2 = (lof1 - lof2 + lof3) / Math.cos(phi1);
        var _a3 = _a2 * 180 / Math.PI;

        var latitude = 180 * (phi1 - fact1 * (fact2 + fact3 + fact4)) / Math.PI;

        if (!northernHemisphere){
          latitude = -latitude;
        }

        var longitude = ((zone > 0) && (6 * zone - 183.0) || 3.0) - _a3;




    window.localStorage.setItem("lat", JSON.stringify(latitude));
    window.localStorage.setItem("lng", JSON.stringify(longitude)); 

  };



