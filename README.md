
Remove German Gender Language
-----------------------------

v2.3 (05.06.2021)
Autor: Motsi Weech (motsi.weech ät protonmail.com)

Kleines Add-On für den Firefox.

Das Add-On entfernt folgendes:
* Gender-Sternchen (Anwender*innen)
* Gender-Doppelpunkt (Anwender:innen)
* Binnenmajuskel (AnwenderInnen)
* Gendergap (Anwender_innen)
* Schrägstrichlösung (Anwender/-innen)
* Klammerlösung (Anwender(innen))

Viele Spezialfälle werden berücksichtigt. Dadurch werden deutschsprachige Webseiten besser lesbar dargestellt. 
Das gilt auch für Zeitungs-Webseiten wie heise, TAZ, Die Zeit, Frankfurter Rundschau usw.

Die ZIP-Datei enthält das signierte Add-On sowie den Quellcode.

Bedienung:
In der Symbolleiste des Firefox erscheint ein neuer "Gender"-Knopf. Er wechselt die Farbe beim Klicken.
- schwarz: Gender-Konstruktionen werden gefiltert
- rot: Gender-Konstruktionmen werden gefiltert und die Änderungen farbig markiert
- x: Deaktiviert
- Der Knopf zeigt die Zahl der Änderungen auf der aktuellen Webseite.
- In der Konsole (F12) lassen sich alle Änderungen im Detail nachvollziehen (Tipp: Filtern nach rggl).

Installation:
XPI-Datei per Drag & Drop in den Firefox ziehen, Installation bestätigen.


Version History

2.3
- Code aufgeräumt
- erste öffentliche Version

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
