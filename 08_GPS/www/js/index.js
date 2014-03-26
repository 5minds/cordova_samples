(function() {

    $(document).on("pageinit", "#home", function(e) {
        e.preventDefault();
        console.log("pageinit -> #home");

        var gpsWatchId = null;
        var directionWatchId = null;

        var refreshList = function() {
            $("#info_listview").listview('refresh');
        };

        $(document).on("pageshow", "#home", function(e) {   
            console.log("pageshow #home");
            e.preventDefault(); // event nicht weiter ausführen

            // - device ready
            document.addEventListener('deviceready', function() {
            }, false);
        });

        var gpsSuccess = function(position) {
            console.log(position);

            $("#latitude").empty();
            $("#latitude").append(position.coords.latitude);

            $("#longitude").empty();
            $("#longitude").append(position.coords.longitude);

            // - clear error
            $("#gps_error").empty();

            $("#gps_lastupdate").empty();
            $("#gps_lastupdate").append(new Date().toLocaleString());

            refreshList();
        };

        var gpsError = function(error) {
            console.log(error);

            $("#gps_error").empty();
            $("#gps_error").append(error.message);

            refreshList();
        };

        var directionSuccess = function(direction) {
            console.log(direction);
            console.log(direction.magneticHeading);

            $("#direction").empty();
            $("#direction").append("" + direction.magneticHeading);

            $("#direction_error").empty();

            $("#direction_lastupdate").empty();
            $("#direction_lastupdate").append(new Date().toLocaleString());

            refreshList();
        };

        var directionError = function(error) {
            console.log(error);

            $("#direction").empty();
            $("#direction_error").append(error.message);

            refreshList();
        };

        var updateButtonState = function(started) {
            if (started) {
                $("#start_btn").button('disable');
                $("#start_btn").button('refresh');

                $("#stop_btn").button('enable');
                $("#stop_btn").button('refresh');
            } else {
                $("#start_btn").button('enable');
                $("#start_btn").button('refresh');
                
                $("#stop_btn").button('disable');
                $("#stop_btn").button('refresh');
            }
        };

        $("#start_btn").on("click", function() {
            console.log("button start");
            e.preventDefault();

            //- gps
            var gpsOptions = {maximumAge: 10000, timeout: 10000, enableHighAccuracy: true};
            gpsWatchId = navigator.geolocation.watchPosition(gpsSuccess, gpsError, gpsOptions);

            //- direction
            var directionOption = {frequency: 3000};
            directionWatchId = navigator.compass.watchHeading(directionSuccess, directionError, directionOption);

            updateButtonState(true);
        });

        $("#stop_btn").on("click", function() {
            console.log("button stop");
            e.preventDefault();

            if (gpsWatchId) {
                navigator.geolocation.clearWatch(gpsWatchId);
            }
            gpsWatchId = null;

            if (directionWatchId) {
                navigator.compass.clearWatch(directionWatchId);
            }
            directionWatchId = null;

            updateButtonState(false);
        });

    });
})();