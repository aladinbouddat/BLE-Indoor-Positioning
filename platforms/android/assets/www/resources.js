

var app = (function()
{
	// Application object.
	var app = {};

	var distances = {};

	// Dictionary of beacons.
	var beacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;


	app.initialize = function()
	{
		document.addEventListener(
			'deviceready',
			function() { evothings.scriptsLoaded(onDeviceReady) },
			false);
	};

	function onDeviceReady()
	{
		// Start tracking beacons!
		setTimeout(startScan, 250);

		// Display refresh timer.
		updateTimer = setInterval(displayBeaconList, 400);
	}

	function startScan()
	{
		// Called continuously when ranging beacons.
		evothings.eddystone.startScan(
			function(beacon)
			{
				// Insert/update beacon table entry.
				beacon.timeStamp = Date.now();
				beacons[beacon.address] = beacon;
			},
			function(error)
			{
				console.log('Eddystone Scan error: ' + JSON.stringify(error));
			});
	}

	function getDistance(beacon)
	{
		var distance = evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi);
			return distance;
	}

	function  getRssi(beacon){
		
		return beacon.rssi;
	};

	function getSortedBeaconList(beacons)
	{
		var beaconList = [];
		for (var key in beacons)
		{
			beaconList.push(beacons[key]);
		}
		beaconList.sort(function(beacon1, beacon2)
		{
			return beacon1.bid < beacon2.bid;
		});
		return beaconList;
	}

	function displayBeaconList()
	{

		// Update beacon display list.
		var timeNow = Date.now();
		distances = [];
		allrssi = [];
		$.each(getSortedBeaconList(beacons), function(index, beacon)
		{

				distances.push(getDistance(beacon));
				allrssi.push(getRssi(beacon));

});

if (allrssi[0] != null){
;}
	


	window.localStorage.setItem("distances", JSON.stringify(distances));
	console.log(distances);

};







	return app;
})();


app.initialize();
