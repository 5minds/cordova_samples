(function() {

	$(document).on("pageinit", "#home", function() {
		console.log("pageinit #home -> called.");


		var onBatteryStatus = function(info) {
			console.log("onBatteryStatus -> called.");
		};

		var showNetworkStatus = function() {
			console.log("showNetworkStatus -> called");

		};

		var onOnline = function() {
			console.log("onOnline -> called");

		};

		var onOffline = function() {
			console.log("onOffline -> called");
		};

		$(document).on("pageshow", "#home", function() {
			console.log("pageshow #home -> called.");

			document.addEventListener("deviceready", function() {
				console.log("deviceready called.");

				window.addEventListener("batterystatus", onBatteryStatus, false);

				showNetworkStatus();
				document.addEventListener("online", onOnline, false);
				document.addEventListener("offline", onOffline, false);
			}, false); // -> deviceready

		}); // -> pageshow -> #home

	}); // -> pageinit -> #home

});