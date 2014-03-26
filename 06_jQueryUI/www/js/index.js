(function() {

    $(document).on("pageinit", "#home", function(e) {
        console.log("pageinit -> #home");

        $(document).on("pageshow", "#home", function(e) {   
            console.log("pageshow #home");
            e.preventDefault(); // event nicht weiter ausführen

            var refreshList = function() {
                $("#info_listview").listview('refresh');
            };

            // - Battery-Status
            var onBatteryStatus = function (info) {
                console.log("onBatteryStatus");

                // - Version ohne jQuery/jQuery.mobie
                // var levelElement = document.getElementById('batterie_level') -> $('#batterie_level')
                // levelElement.innerHTML = info.level
                //
                // - Performanz optimierte Variante
                // $("#batterie_level")
                //    .empty();
                //    .append(info.level);
                // - alternative Performanz optimierte Variante
                // var batterieLevelElement$ = $("#batterie_level");
                // batterieLevelElement$.empty()
                // batterieLevelElement$.append(info.level)
                $("#batterie_level").empty();
                $("#batterie_level").append(info.level);

                $("#batterie_isplugged").empty();
                $("#batterie_isplugged").append(info.isPlugged);

                // UI aktualisieren!!
                refreshList();
            };


            // - Network Information
            var showNetworkStatus = function() {
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

            var goOnline = function() {
                $("#network_status").empty();
                $("#network_status").append("online");

                showNetworkStatus();
            };

            var goOffline = function() {
                $("#network_status").empty();
                 $("#network_status").append("offline");
                showNetworkStatus();
            };

            // - device ready
            document.addEventListener('deviceready', function() {
                window.addEventListener("batterystatus", onBatteryStatus, false);

                showNetworkStatus();
                document.addEventListener("online", goOnline, false);
                document.addEventListener("offline", goOffline, false);
            }, false);

        });

    });
})();