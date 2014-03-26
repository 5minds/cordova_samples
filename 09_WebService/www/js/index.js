(function() {

    $(document).on("pageinit", "#home", function(e) {
        e.preventDefault();
        console.log("pageinit -> #home");

        var url = "http://heise.de.feedsportal.com/c/35207/f/653902/index.rss";

        var refreshList = function() {
            $("#info_listview").listview('refresh');

            $(".open_browser").on("click", function(e) {
                console.log("open browser clicked");
                e.preventDefault();

                var link = $(e.target).data("link");
                console.log(link);
                console.log(e);

                window.open(link, '_system', 'location=yes');
            });
        };

        $(document).on("pageshow", "#home", function(e) {   
            console.log("pageshow #home");
            e.preventDefault(); // event nicht weiter ausführen

            // - device ready
            document.addEventListener('deviceready', function() {
            }, false);
        });

        var loadRSSFeed = function() {
            $("#info_listview").empty();

            var success = function(xml) {
                $(xml).find("channel > item").each(function() {
                    var title = $(this).find("title").text();
                    var link = $(this).find("link").text();

                    $("<li><a class='open_browser' href='#'><p data-link='" + link + "'>" + title + "</p></a></li>").appendTo("#info_listview");
                });

                refreshList(); // - list aktualisieren
            };

            var error = function(error) {
                console.log("xml request error");
                console.log(error);
            }

            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                dataType: 'xml',
                success: success,
                error: error
            });

        };

        $("#load_btn").on("click", function() {
            console.log("button load");
            e.preventDefault();

            loadRSSFeed();
        });

    });
})();