// Remove German Gender Language
// v2.6
// License: GPL v3.0


// Einstellungen laden
browser.storage.local.get(function(settings) {
  if (settings.aktiv) removeGender(settings.aktiv);
});


function removeGender(sollrot) {

	// Zeitnahme der Abarbeitung starten
	console.time('RGGL');

	var result = document.querySelectorAll("span, p, li, i, b, em, a, h1, h2, h3, h4, h5, h6, figcaption, td, blockquote");

	console.log("RGGL - prüfe "+result.length+" Seitenelemente");
	var i;
	var str;
	var rot1="";
	var rot2="";
	var rot3="";
	var oldstr="";
	var changes=0;
	var x=0;
	var oldohnehrefclassstyle="";
	var strohnehrefclassstyle="";

	 
	 if (sollrot == 2) {
		rot1="<span style='color:blue;background-color: yellow;'>";
		rot2="</span>";
		rot3="_";
	 } 
	
	for (i = 0; i < result.length; i++) {
	  str = result[i].innerHTML;
	  
	  // Weiche Trennstriche entfernen (taz)
	  str = str.replace(/­/g,"");
	  oldstr = str;
		
	  
	  // Konstruktionen wie Der/die oder sie:er durch das generische Maskulinum ersetzen
	  str = str.replace(/(der|Der)(\/|\_|\:|\*)die([ ,).“"!-])/g,rot1+"$1$3"+rot2);
	  str = str.replace(/er(\/|\_|\:|\*)sie([ ,).“"!-]|$)/g,rot1+"man$2"+rot2);
	  str = str.replace(/Er(\/|\_|\:|\*)sie([ ,).“"!-]|$)/g,rot1+"Man$2"+rot2);
	  str = str.replace(/(die|Die)(\/|\_|\:|\*)der([ ,).“"!-])/g,rot1+"der$3"+rot2);
	  str = str.replace(/(sie|Sie)(\/|\_|\:|\*)er([ ,).“"!-]|$)/g,rot1+"man$3"+rot2);
	  str = str.replace(/(dem|Dem)(\/|\_|\:|\*)der([ ,).“"!-]|$)/g,rot1+"dem$3"+rot2);
	  str = str.replace(/(der|Der)(\/|\_|\:|\*)dem([ ,).“"!-])/g,rot1+"dem$3"+rot2); 
	  str = str.replace(/(ein|Ein)(\/|\_|\:|\*)eine([ ,).“"!-]|$)/g,rot1+"ein$3"+rot2);
	  str = str.replace(/(eine|Eine)(\/|\_|\:|\*)ein([ ,).“"!-])/g,rot1+"ein$3"+rot2); 



	  // Spezialfälle mit Umlauten je nach Geschlecht lösen
	  str = str.replace(/(b|B)äuer(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1auer$2");
	  str = str.replace(/(n|N)ärr(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1arr$2");
	  str = str.replace(/(h|H)ünd(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1und$2");
	  str = str.replace(/(k|K)ätz(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1atz$2");
	  str = str.replace(/(f|F)ranzös(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1ranzos$2");
	  str = str.replace(/(p|P)rinzess(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1rinz$2");
	  str = str.replace(/(i|I)srael(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1sraelis$2");
	  str = str.replace(/(g|G)räf(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1raf$2");
	  str = str.replace(/(s|S)chwäger(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1chwager$2");
	  str = str.replace(/(w|W)estfäl(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1estfal$2");
	  str = str.replace(/(s|S)chwän(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1chwan$2");
	  
	  
	  
	  // Spezialfälle: Wörter, die auf -erer/-erin enden
	  str = str.replace(/(w|W)ander(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1anderer$2");
	  str = str.replace(/(f|F)örder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1örderer$2");
	  str = str.replace(/(e|E)rober(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1roberer$2");
	  str = str.replace(/(l|L)äster(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$1ästerer$2");
	  str = str.replace(/(r|R)uder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$uderer$2");
	  str = str.replace(/(s|S)chlender(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$chlenderer$2");
	  str = str.replace(/(w|W)ilder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$ilderer$2");
	  str = str.replace(/(k|K)letter(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$letterer$2");
	  str = str.replace(/(z|Z)auber(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$auberer$2");
	  str = str.replace(/(p|P)lünder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$lünderer$2");
	  str = str.replace(/(b|B)ewunder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$ewunderer$2");
	  str = str.replace(/(h|H)erausforder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$erausforderer$2");
	  str = str.replace(/(h|H)inder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$inderer$2");
	  str = str.replace(/(p|P)lauder(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$lauderer$2");
	  str = str.replace(/(m|M)euter(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$euterer$2");
	  str = str.replace(/(v|V)eräußer(\:in|\*in|\/\-in|\_in|\(in|In)/g,"$eräußerer$2");
	  
	  
	  
	  // aus ein(e) wird ein, aus Liebe:r wird Lieber, zusammen mit Nomen:
	  str = str.replace(/(ein|Ein)(\:e|\/\-e|\*e|\_e|\(e\)) (.*?)(\:in|\*in|\_in|\/\-in|\(in\))([ ,).“"!\--]|$)/g,rot1+"$1 $3$5"+rot2);
	  str = str.replace(/(eine|Eine)(\:n|\/\-n|\*n|\_n|\(n\))([ ,).“"!\--]|$)/g,rot1+"$1n$3"+rot2);
	  str = str.replace(/(jede|liebe|Jede|Liebe|geehrte|Geehrte)(\:r|\/\-r|\*r|\_r|\(r\)) (.*?)(\:in|\*in|\_in|\/\-in|\(in\))([ ,).“"!\--]|$)/g,rot1+"$1r $3$5"+rot2);
	  str = str.replace(/(ein|Ein)(\:e|\/\-e|\*e|\_e|\(e\))([ ,).“"!\--]|$)/g,rot1+"$1$3"+rot2);
	  
	  
	  
	  // freistehende jede(r), jede_r, manche(r)
	  str = str.replace(/(jede|Jede|manche|Manche|keine|Keine|eine|Eine|einzelne|Einzelne|einzige|Einzige|eigene|Eigene)(\:r|\/\-r|\*r|\_r|\(r\))([ ,).“"!\--]|$)/g,rot1+"$1r$3"+rot2);
	  
	  
	  
	  // frau
	  str = str.replace(/ frau([ ,).“"!\--]|$)/g,rot1+" man$1"+rot2);
	  str = str.replace(/(man|Man)(\/|\_|\:|\*)frau([ ,).“"!-])/g,rot1+"$1$3"+rot2);
	  str = str.replace(/(Frau)(\/|\_|\:|\*)man([ ,).“"!-])/g,rot1+"Man$3"+rot2);
	  str = str.replace(/(frau)(\/|\_|\:|\*)man([ ,).“"!-])/g,rot1+"man$3"+rot2);
	  
	  
	  
	  // Jüdinnen/Juden bzw. Juden/Jüdinnen
	  str = str.replace(/([ ,).“"!-])([a-zA-ZüöäßÜÖÄ]*)(innen)[\/\*\:\-\_]([a-zA-ZüöäßÜÖÄ]*)(en)([ ,).“"!-])/g,rot1+"$1$4$5$6"+rot2);
	  str = str.replace(/([ ,).“"!-])([a-zA-ZüöäßÜÖÄ]*)(en)[\/\*\:\-\_]([a-zA-ZüöäßÜÖÄ]*)(innen)([ ,).“"!-])/g,rot1+"$1$4$5$6"+rot2);
	  
	  
	  
	  // geklammertes Binnen-(inn) entfernen
	  str = str.replace(/([a-züöäß])\(inn\)([a-züöäß]|$)/g,rot1+"$1$2"+rot2);
	  
	  
	  
	  // Sonderkonstrukt Staatsbürger:innenschaft
	  str = str.replace(/([a-züöäß])(\*|\:|\_)innen(schaft)([ ,).“"!\--]|$)/g,rot1+"$1$3$4"+rot2);
	  
	  

	  // und hier die Mehrzahl für Bauern und Nachbarn
	  str = str.replace(/(auer|achbar)(\:|\*|\/\-|\_)(innen)([ ,).“"!\--]|$)/gi,rot1+"$1n$4"+rot2);
	  str = str.replace(/([A-Za-zÜÖÄüöäß])(auer|achbar)(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$2n$4"+rot2);
	  
	  

	  // Bei Nomen, die auf -eur, -pst oder -bst enden, wird das :innen durch en ersetzt
	  // wenn ein Vorsatzwort den Dativ vorgibt
	  // Beispiel: Ingenieur:innen => Ingenieure, DomteurInnen => Dompteure, Päpst:innen => Päpste
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([A-Za-züöäÖÜÄß]*)(eur|pst|bst|hund|dar)(\:|\*|\/\-|\_)(innen)([ ,).“"!\--]|$)/gi,rot1+"$1$2 $3$4en$7"+rot2);
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([A-Za-züöäÖÜÄß]*)(eur|pst|bst|hund|Hund|dar)(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$2 $3$4en$6"+rot2);



	  // Bei Nomen, die auf -eur, -pst oder -bst enden, wird das :innen durch e ersetzt
	  // Beispiel: Ingenieur:innen => Ingenieure, DomteurInnen => Dompteure, Päpst:innen => Päpste
	  str = str.replace(/(eur|pst|bst|hund|Hund|dar)(\:|\*|\/\-|\_)(innen)([ ,).“"!\--]|$)/g,rot1+"$1e$4"+rot2);
	  str = str.replace(/([a-züöäß])(eur|pst|bst|hund|Hund|dar)(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$2e$4"+rot2);
	  
	  
	  
	  // Bestimmte Vorsatzwörter und -silben deuten auf den Dativ, dann wird *innen zu en, außer das Nomen endet auf 'r'
	  // Beispiel: unter Therapeut*innen => unter Therapeuten
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht
	  
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/gi,rot1+"$1$2 $3en$5"+rot2);
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])Innen([ ,).“"!\--]|$)/g,rot1+"$1$2 $3en$4"+rot2);
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])(\:in|\*in|\_in|\/\-in|\(in\))([ ,).“"!\--]|$)/gi,rot1+"$1$2 $3en$5"+rot2);
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|che|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])In([ ,).“"!\--]|$)/g,rot1+"$1$2 $3en$4"+rot2);
	  
	  
	  
	  // Dasselbe für den Genitiv
	  str = str.replace(/(der|ner|ter|nger)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/gi,rot1+"$1$2 $3en$5"+rot2);
	  str = str.replace(/(der|ner|ter|nger)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*[bcdfghjklmnpqstvwxz])Innen([ ,).“"!\--]|$)/g,rot1+"$1$2 $3en$4"+rot2);
	  
	  
	  
	  // Bei Nomen, die auf -or, -ist, -leg, -nom usw. enden, wird das :innen durch en ersetzt.
	  // Beispiel: Astronom*innen => Astronomen, KollegInnen => Kollegen
	  str = str.replace(/(or|ist|leg|nom|log|pert|naut|fahr|rat|dat|gog|oss|äst|ent|lyst|graf|zos|atz|ess|fal|grant|peut)(\:|\*|\/\-|\_)(innen)([ ,).“"!\--]|$)/gi,rot1+"$1en$4"+rot2);
	  str = str.replace(/([a-zA-ZüöäÜÖÄß])(or|ist|leg|nom|log|pert|naut|fahr|rat|dat|gog|oss|äst|ent|lyst|graf|zos|atz|ess|fal|grant|peut)(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$2en$4"+rot2);
	  
	  
	  
	  // und hier die Einzahl für Kolleg*in, Astrolog*in, Expert*in, Dämagog*in, Genoss*in, Kätz*in
	  str = str.replace(/(leg|log|pert|gog|oss|äst|atz)(\:|\*|\/\-|\_)(in)([ ,).“"!\--]|$)/gi,rot1+"$1e$4"+rot2);
	  str = str.replace(/([a-züöäß])(leg|log|pert|gog|oss|äst|atz)(In)([ ,).“"!\--]|$)/g,rot1+"$1$2e$4"+rot2);
	  
	  
	  
	  // Klienten und Kunden
	  str = str.replace(/(klient|kund)(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/gi,rot1+"$1en$3"+rot2);
	  str = str.replace(/(Klient|Kund)(Innen)([ ,).“"!-]|$)/g,rot1+"$1en$3"+rot2);

	  // Beamte, Ärzte und Hunde
	  str = str.replace(/(beamt|hund|ärzt|freund)(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/gi,rot1+"$1e$3"+rot2);
	  str = str.replace(/(Beamt|beamt|Hund|hund|ärzt|Ärzt|Freund|freund)(Innen)([ ,).“"!-]|$)/g,rot1+"$1e$3"+rot2);
	  
	  
	  
	  // Konstruktionen mit "zufolge"
	  str = str.replace(/([a-zA-ZüöäßÜÖÄ]*)(\:innen|\*innen|\_innen|\/\-innen|\(innen\)) zufolge([ ,).“"!\--]|$)/gi,rot1+"$1n zufolge$3"+rot2);
	  str = str.replace(/([a-zA-ZüöäßÜÖÄ]*)(Innen) zufolge([ ,).“"!\--]|$)/g,rot1+"$1n zufolge$3"+rot2);
	  
	  
	  
	  // Bestimmte Vorsatzwörter und -silben deuten auf den Dativ, dann wird *innen zu n, wenn das Nomen auf 'r' endet
	  // Beispiel: den Arbeiter:innen => den Arbeitern
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*?r)(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/gi,rot1+"$1$2 $3n$5"+rot2);
	  str = str.replace(/(den|von|mit|auf|unter|einen|chen|ten|len|ren|vor|zu|igen)(| [0-9,.]*?| zwei| drei| vier| fünf| sechs| sieben| acht| neun| zehn| elf| zwölf| zwanzig| dreißig| vierzig| fünfzig| hundert| tausend) ([a-zA-ZüöäßÜÖÄ]*?r)(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$2 $3n$5"+rot2);




	  // In alle übrigen Fällen wird das *innen schlicht entfernt
	  // Beispiel: Schüler_innen => Schüler
	  str = str.replace(/([a-züöäß])(\:innen|\*innen|\_innen|\/\-innen|\(innen\))([ ,).“"!\--]|$)/g,rot1+"$1$3"+rot2);
	  str = str.replace(/([a-züöäß])(Innen)([ ,).“"!\--]|$)/g,rot1+"$1$3"+rot2);
	  
	  
	  
	  // Ein freischwebendes *in wird ebenfalls entfernt
	  // Beispiel: Lehrer:in => Lehrer
	  str = str.replace(/([a-züöäß])(\:in|\*in|\_in|\/\-in|\(in\))([ ,).“"!\--]|$)/g,rot1+"$1$3"+rot2);
	  str = str.replace(/([a-züöäß])In([ ,).“"!\--]|$)/g,rot1+"$1$2"+rot2);
	  
	
	  // Korrektur Isaelisen, Franzos
	  str = str.replace(/sraelisen/g,"sraelis");
	  str = str.replace(/ranzos/g,"ranzose");
	  str = str.replace(/ein Katz([ ,\).“_"!\--]|$)/g,"eine Katze$1");



	  // prüfen, ob Änderungen innerhalb von href, class oder style-Attributen stattfanden. Wenn ja, wird auf die Korrektur vorsorglich verzichtet
	  oldohnehrefclassstyle = oldstr.replace(/(href|style|class|src|itemprop|onclick|onmouseover|xmlns|alt)=("|').*?("|')/g,"$1=$2$3");
	  strohnehrefclassstyle = str.replace(/(href|style|class|src|itemprop|onclick|onmouseover|xmlns|alt)=("|').*?("|')/g,"$1=$2$3");

	  // liefert den ersten Unterschied zwischen zwei Strings
	  function ersterUnterschied(stringa, stringb)
	  {
		var i = 0, fundstelle = 0;

		while (i < stringb.length)
		{
		  if (stringa[i] != stringb[i] || i == stringa.length) {
			 fundstelle = i;
			 break; 
		  } else i++;
		}
		return fundstelle;
	  }
	  
	  
	  if (oldohnehrefclassstyle != strohnehrefclassstyle) 
		{
			changes++;
			x=ersterUnterschied(oldohnehrefclassstyle, strohnehrefclassstyle);
			if (x < 50) x = 50;
			x-=50;
			if (oldohnehrefclassstyle.length < 100) console.log("%cRGGL #"+changes+" Tag "+result[i].nodeName+" - old: ..."+oldohnehrefclassstyle.substr(x)+"...", 'color: red;');
			else console.log("%cRGGL Change #"+changes+" Tag "+result[i].nodeName+" - old: ..."+oldohnehrefclassstyle.substr(x,100)+"...", 'color: red;');
			if (strohnehrefclassstyle.length < 100) console.log("%cRGGL Change #"+changes+" Tag "+result[i].nodeName+" - new: ..."+strohnehrefclassstyle.substr(x)+"...", 'color: green;');
			else console.log("%cRGGL Change #"+changes+" Tag "+result[i].nodeName+" - new: ..."+strohnehrefclassstyle.substr(x,100)+"...", 'color: green;');
			
			result[i].innerHTML = str;
		}
	  }
	  
	  // background-Skript über die Zahl der Ersetzungen informieren
	    browser.runtime.sendMessage({
            count: changes,
            type: "count"
        });
	  
	  // Zeit der Abarbeitung stoppen und Ergebnis in die Konsole schreiben
	  console.timeEnd('RGGL');
}


