
Remove German Gender Language
-----------------------------

v3.3 (04.12.2021)

Autor: Motsi Weech (motsi.weech ät protonmail.com)

Kleines Add-On für den Chrome / Microsoft Edge.
Lizenz: GNU GENERAL PUBLIC LICENSE Version 3

Das Add-On entfernt folgendes:
* Gender-Sternchen (Anwender*innen)
* Gender-Doppelpunkt (Anwender:innen)
* Binnenmajuskel (AnwenderInnen)
* Gendergap (Anwender_innen)
* Schrägstrichlösung (Anwender/-innen)
* Klammerlösung (Anwender(innen))

Viele Spezialfälle werden berücksichtigt. Dadurch werden deutschsprachige Webseiten besser lesbar dargestellt. 
Das gilt auch für Zeitungs-Webseiten wie heise, taz, Die Zeit, Frankfurter Rundschau usw.

Bedienung:
In der Symbolleiste des Firefox erscheint ein neuer "Gender"-Knopf. Er wechselt die Farbe beim Klicken.
- schwarz: Gender-Konstruktionen werden gefiltert
- rot: Gender-Konstruktionmen werden gefiltert und die Änderungen farbig markiert
- x: Deaktiviert
- Der Knopf zeigt die Zahl der geänderten Elemente auf der aktuellen Webseite.
- In der Konsole (F12) lassen sich alle Änderungen im Detail nachvollziehen (Tipp: Filtern nach rggl).

Installation:
https://addons.mozilla.org/de/firefox/addon/remove-german-gender-language/ (Firefox)

To be published (Chrome / Microsoft Edge)


Version History

3.3
- Ergänzt: Schweden
- Ergänzt: ihre*n
- Bugfix: Gynäkolog

3.2
- Ergänzt: Anwälte, Funktionäre, Visionäre, Sekretäre
- Bugfix: Kosovaren

3.1
- Ergänzt: Chef*innen => Chefs
- Ergänzt: Kapitän*innen => Kapitäne

3.0
- Ergänzt: Kommilitonen, Zeugen, Kosovare
- Bugfix: Satzzeichen '?' verhinderte Korrektur
- Bugfix: erzählen Berufsanfänger
- Bugfix: Juden:Jüdinnen wurde zu Jüdinnen - versehentlich generisches Femininum benutzt ;)

2.9
- Ergänzt: Jüd*innen, Griech*innen
- Bugfix: Satzzeichen 'Doppelpunkt' verhinderte Korrektur
- Kompatibilität maximiert / weniger obtrusiv (Text-Nodes anstatt innerHTML)

2.8
- Ergänzt: Nomaden
- Bugfix: Franzosee
- Bugfix: LinkedIn

2.7
- Muslime, Kurden, Wölfinnen, Türken, Gefährten, Freund*innenkreis, 
- Irinnen, Afghaninnen, Ungarinnen, Kasachinnen, Kongolesinnen, Rumänen
- Sonderbehandlung taz: Vokale + Trema werden zu Umlauten konvertiert

2.6
- Performance verbessert
- Bugfix

2.5
- Sonderfälle ergänzt 
  (Wilderer, Zauberer, Plünderer, Bewunderer, Herausforderer, Hinderer, Plauderer, Meuterer, Veräußerer)
- Verbesserung bei weichen Trennstrichen (taz)
- farbliche Hervorhebung verbessert
- schönere Icons

2.4
- erste öffentliche Version

2.3
- Code aufgeräumt

2.2
- Kleinere Korrekturen

2.1
- Bessere Farben für Hervorhebung von Änderungen

2.0
- Button zeigt jetzt die Zahl der Änderungen mittels Badge
- Button schaltet zwischen drei Modi:
  - Filterung aktiv (Standard) => Symbol schwarz
  - Änderungen farbig hervorheben => Symbol rot
  - Deaktiviert => Symbol "ausge-X-t"

1.9
- Zahlwörter hinzughefügt (Mit 30.000 Einwohner*innen... => Mit 30.000 Einwohnern)

1.8
- Beamt*innen hinzugefügt
- Sonderfälle mit Umlaute in den weiblichen Formen
- Nachbarn hinzugefügt

1.7
- Vorfahr*innen/Nachfahr*innen hinzugefügt
- man/frau und frau:man
- Dativ + 'zufolge' hinzugefügt

1.6:
- weiche/bedingte Trennstriche verbessert
- Analyst*innen hinzugefügt

1.5:
- Zeitmessung hinzugefügt
- Konsolenausgabe farbig und auf das Wesentliche reduziert
- weiche/bedingte Trennstriche werden unterstützt

1.4:
- kleinere Fehler beseitigt
- Bäuer*innen werden unterstützt

1.3:
- Knopf hinzugefügt (tut aber noch nichts)
- diverse sprachliche Korrekturen
