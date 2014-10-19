# StepByStep Guide Cordova mit jQuery.mobile

Dieser StepByStep Guide dient zur Erstellung einer einfachen Mobile-App auf Basis Cordova und jQuery.mobile.

__WICHTIG__: _In den Beispielen im git-Repository sind die Plattformen und die entsprechenden Plugins nicht eingecheckt. Beim Testen der einzelnen Steps ist daher immer der **Step 01** auszuführen_.

_Hint: Häufiges Testen mit dem Emulator und prüfen der Anwendung mittels der Chrome-Developer-Tools vermeidet späteren Frust_.

## Step 01 (Verzeichnis 01_jQM)

Zuerst gilt es einen Cordova-Anwendung (_android_) zu erstellen, die den Batterie-Status (PluginId: _org.apache.cordova.battery-status_) und die Netzwerkverbindung (PluginId: _org.apache.cordova.network-information_) anzeigen und entsprechend aktualisiert:

1. `cordova create jQM de.fiveminds.de jQM`
1. `cordova platform add android`
1. `cordova plugins add org.apache.cordova.battery-status`
1. `cordova plugins add org.apache.cordova.network-information`

## Step 02 (Verzeichnis 02_jQM)

Nun ist der generierte Quellcode soweit anzupassen, dass alle überflüssigen Teile entfernt werden. 

Folgende Dateien werden geändert bzw. komplett entfernt:
- Das Verzeichnis _www/css_ löschen.
- Inhalt der Datei _www/js/index.js_ komplett entfernen.
- In der Datei _www/index.html_ den Tag für die CSS-Datei _css/index.css_ (ca. Zeile: 26) und das Script-Tag (ca. Zeile: 39-41) entfernen.
- In der Datei _www/index.html_ das div-Tag mit der CSS-Klasse _class="app"_ entfernen. 

## Step 03 (Verzeichnis 03_jQM)

Nun wird zur App jQuery.mobile hinzugefügt.

Folgende Schritte sind dazu notwendig:
1. jQuery (http://jquery.com) laden und in das _www/js_-Verzeichnis kopieren.
1. jQuery.mobile (http://jquerymobile.com) laden und das auspackte Verzeichnis in den Ordner _www_ kopieren.
1. Verweis auf die CSS-Datei in den Head-Bereich der Datei _www/index.html_ einfügen.
1. In der Datei _www/index.html_ ist dann noch der Verweis auf _jQuery.js_ und _jQuery.mobile.js_ (Reihenfolge beachten) einzufügen.

## Step 04 (Verzeichnis 04_jQM)

In diesem Step wird die UI und die Anbindung jQuery.mobile erstellt.

1. In der Datei _www/index.html_ wird der Rahmen der fertigen Anwendung eingefügt.
1. In der Datei _www/js/index.js_ wird die Initialisierung für jQuery.mobile-Anbindung eingefügt und der Cordova-Event _deviceready_ eingebunden.

## Step 05 (Verzeichnis 05_jQM)

Nun werden für die entsprechenden Plugins die Funktionen erstellt und entsprechend der Dokumentation die Events gebunden.

1. In der Datei _www/js/index.js_ sind die entsprechenden Funktionen erstellen (_onBatteryStatus_, _showNetworkStatus_, _onOnline_ und _onOffline_).
1. Im _deviceready_-Bereich sind die entsprechenden Events zu binden.

## Step 06 (Verzeichnis 06_jQM)

Im letzten Schritt werden nun die entsprechenden Informationen aus den Cordova-Objekten gelesen bzw. durch die Events bereitgestellt Informationen weiterverarbeitet und an UI-Elemente gebunden.

1. Die Funktionen entsprechenden Cordova-Beispiele implementieren.
1. Die entsprechenden Werte in die UI-Element schreiben.
1. Eine Funktion erstellen, damit die UI aktualisiert werden kann (siehe jQuery.mobile: **Listview**).
 
