(function() {

	$(document).on("pageinit", "#home", function() {
		console.log("pageinit #home -> called.");

		var refreshList = function() {
			$("#info_listview").listview('refresh');
		};

		var onBatteryStatus = function(info) {
			console.log("onBatteryStatus -> called.");

			$("#batterie_level").empty();
			$("#batterie_level").append(info.level);

			$("#batterie_isplugged").empty();
			$("#batterie_isplugged").append(info.isPlugged);

			// UI aktualisieren!!
			refreshList();
		};

		var showNetworkStatus = function() {
			console.log("showNetworkStatus -> called");
			
			var currentStatus = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';

			$("#network_type").empty();
			$("#network_type").append(states[currentStatus]);
			refreshList();
		};

		var onOnline = function() {
			console.log("onOnline -> called");

			$("#network_status").empty();
			$("#network_status").append("online");

			showNetworkStatus();
		};

		var onOffline = function() {
			console.log("onOffline -> called");

			$("#network_status").empty();
			$("#network_status").append("online");

			showNetworkStatus();
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