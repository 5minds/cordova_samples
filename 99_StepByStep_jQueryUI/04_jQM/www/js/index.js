(function() {

	$(document).on("pageinit", "#home", function() {
		console.log("pageinit #home -> called.");

		$(document).on("pageshow", "#home", function() {
			console.log("pageshow #home -> called.");

			document.addEventListener("deviceready", function() {
				console.log("deviceready called.");

			}, false); // -> deviceready

		}); // -> pageshow -> #home

	}); // -> pageinit -> #home

});