(function() {

    $(document).on("pageinit", "#home", function(e) {
        e.preventDefault();
        console.log("pageinit -> #home");

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

        var onSuccess = function(imageData) {
            $("#my_image").attr("src", "data:image/jpeg;base64," + imageData);
        };

        var onError = function(errorMessage) {
            window.alert(errorMessage);
        };

        $("#take_btn").on("click", function() {
            console.log("button take");
            e.preventDefault();

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            };

            navigator.camera.getPicture(onSuccess, onError, options);
        });
    });
})();