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

        var searchContacts = function(search_value) {

            var onSuccess = function(contacts) {
                $("#info_listview").empty();

                for (var i=0; i < contacts.length; i++) {
                    var currentContact = contacts[i];

                    var displayName = "<h2>" + currentContact.displayName + "</h2>";
                    var emails = "";

                    // currentContacts.emails != 'undefined' && currentContacts.emails != null ...
                    if (!!currentContact.emails) {

                        for (var j=0; j < currentContact.emails.length; j++) {
                            console.log("emails: " + j);

                            var currentEmail = currentContact.emails[j];

                            emails = emails + "<p>" + currentEmail.type + ": <a href='mailto:" + currentEmail.value + "'>" + currentEmail.value + "</a></p>";
                        }
                    }


                    $("<li>" + displayName + emails + "</li>").appendTo("#info_listview");
                }

            };

            var onError = function(error) {
                $("#info_listview").empty();
                $("<li><h2>" + error + "</h2></li>").appendTo("#info_listview");
            };

            var options = new ContactFindOptions();
            options.filter = search_value;
            options.multiple = true;
            var filter = ["displayName", "emails"];

            navigator.contacts.find(filter, onSuccess, onError, options);
        };

        $("#search_btn").on("click", function() {
            console.log("button search");
            e.preventDefault();

            var search_value = $("#search_input").val();

            console.log("search for: " + search_value);

            searchContacts(search_value);

            refreshList();
        });

    });
})();