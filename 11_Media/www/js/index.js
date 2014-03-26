(function() {

    $(document).on("pageinit", "#home", function(e) {
        e.preventDefault();
        console.log("pageinit -> #home");

        var mediaFileName = null;

        var refreshList = function() {
            $("#info_listview").listview('refresh');
        };

        $(document).on("pageshow", "#home", function(e) {   
            console.log("pageshow #home");
            e.preventDefault(); // event nicht weiter ausführen

            $("#play_btn").button();
            $("#take_btn").button();

            initButton();

            // - device ready
            document.addEventListener('deviceready', function() {
            }, false);
        });

        var initButton = function() {
            $("#play_btn").button('disable');
            $("#play_btn").button('refresh');

            $("#take_btn").button('enable');
            $("#take_btn").button('refresh');
        };

        var disableButton = function() {
            $("#take_btn").button('disable');
            $("#take_btn").button('refresh');

            $("#play_btn").button('disable');
            $("#play_btn").button('refresh');
        };

        var enableButton = function() {
            $("#play_btn").button('enable');
            $("#play_btn").button('refresh');

            $("#take_btn").button('enable');
            $("#take_btn").button('refresh');
        };

        var onAudioStatus = function(currentState) {
            var statusText = "";

            switch (currentState) {
                case Media.MEDIA_NONE:
                    statusText = "keiner";
                    break;
                case Media.MEDIA_STARTING:
                    statusText = "gestarted";
                    break;
                case Media.MEDIA_RUNNING:
                    statusText = "läuft";
                    break;
                case Media.MEDIA_PAUSED:
                    statusText = "pause";
                    break;
                case Media.MEDIA_STOPPED:
                    statusText = "stopped";
                    break;
                default:
                    statusText = "nicht definiert";
                    break;
            }

            $("#audio_status").empty();
            $("#audio_status").append(statusText);

        };

        var onSuccess = function() {
            console.log("sucess finish record audio");

            enableButton();
        };

        var onError = function(error) {
            console.log(error);

            initButton();
        };

        $("#take_btn").on("click", function() {
            console.log("button take");
            e.preventDefault();

            if (device.platform === 'iOS') {
                mediaFileName = "audio.wav";
            } else {
                mediaFileName = "myrecording.amr";
            }

            console.log("take " + mediaFileName);

            disableButton();

            var mediaRec = new Media(mediaFileName, onSuccess, onError, onAudioStatus);

            // Record audio
            mediaRec.startRecord();

            // Stop recording after 10 seconds
            setTimeout(function() {
                mediaRec.stopRecord();
            }, 10000);
        });

        var onPlaySuccess = function() {
            console.log("finish playing");

            enableButton();
        };

        var onPlayError = function(error) {
            console.log(error);

            initButton();
        };

        $('#play_btn').on("click", function() {
            var mediaPlay = new Media(mediaFileName, onPlaySuccess, onPlayError, onAudioStatus);

            disableButton();

            mediaPlay.play();
        });
    });
})();