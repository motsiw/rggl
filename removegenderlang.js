// Remove German Gender Language
// v6.0.6
// License: GPL v3.3


// Einstellungen laden
browser.storage.local.get(function(settings) {

	if (spracheWebsite())
	{
		console.log("RGGL - Deutschsprachige Webseite erkannt.");
		if (settings.aktiv) removeGender(settings.aktiv);
	}
	else
	{
		console.log("RGGL - Webseite nicht als deutschsprachig erkannt.");
		browser.runtime.sendMessage({
			count: '-',
			type: "count"
		});
	}
});

// ermitteln, ob Webseite auf Deutsch ist
function spracheWebsite() {
  	var rueckgabe=0;
	var docxmllang = document.getElementsByTagName('html')[0].getAttribute('xml:lang');
	var doclang = document.getElementsByTagName('html')[0].getAttribute('lang');
	doclang = String(doclang).toLowerCase()+String(docxmllang).toLowerCase();
	var metalang = document.querySelectorAll('meta[content="de"]');
	var metalang1 = document.querySelectorAll('meta[content="DE"]');
	var metalang2 = document.querySelectorAll('meta[content="de-de"]');
	var metalang3 = document.querySelectorAll('meta[content="de-at"]');
	var metalang4 = document.querySelectorAll('meta[content="de-DE"]');
	var metalang5 = document.querySelectorAll('meta[content="de-AT"]');
	var metalang6 = document.querySelectorAll('meta[content="de-CH"]');
	var metalang7 = document.querySelectorAll('meta[content="de-ch"]');
	if (doclang.indexOf("de") != -1 || doclang.indexOf("at") != -1  || doclang.indexOf("ch") != -1 || metalang.length > 0 || metalang1.length > 0 || metalang2.length > 0 || metalang3.length > 0 || metalang4.length > 0 || metalang5.length > 0 || metalang6.length > 0 || metalang7.length > 0)
	{
		rueckgabe = 1;
	}
	return rueckgabe;
}

function removeGender(sollrot) {

	// Zeitnahme der Abarbeitung starten
	console.time('RGGL');
	
	
	var result = [];
	var checkme = '';
	var n;

	var walk = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT, {
				acceptNode: function(node) {
							return NodeFilter.FILTER_ACCEPT;
				}
			},
			false);
	while (n = walk.nextNode()) 
	{ 
		checkme = n.parentElement.tagName.toLowerCase();
		if (sollrot == 1)
		{
			if (checkme == 'div' || checkme == 'span' || checkme == 'p' || checkme == 'li' || checkme == 'b' || checkme == 'i' || checkme == 'em' || checkme == 'a' || checkme == 'h1' || checkme == 'h2' || checkme == 'h3' || checkme == 'h4' || checkme == 'h5' || checkme == 'h6' || checkme == 'figcaption' || checkme == 'td' || checkme == 'blockquote' || checkme == 'mark' || checkme == 'strong')
			{
				result.push(n); 
			}
		}
		if (sollrot == 2)
		{
			if (checkme == 'span' || checkme == 'p' || checkme == 'li' || checkme == 'b' || checkme == 'i' || checkme == 'em' || checkme == 'a' || checkme == 'h1' || checkme == 'h2' || checkme == 'h3' || checkme == 'h4' || checkme == 'h5' || checkme == 'h6' || checkme == 'figcaption' || checkme == 'td' || checkme == 'blockquote' || checkme == 'mark' || checkme == 'strong')
			{
				result.push(n.parentElement);
			}
		}		
	};


	console.log("RGGL - pr??fe "+result.length+" Seitenelemente");
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
	  if (sollrot == 2) str = result[i].innerHTML;
	  else str = result[i].data;
	  
	  // Sonderbehandlung taz: Weiche Trennstriche entfernen
	  str = str.replace(/??/g,"");
	  // Sonderbehandlung taz / PS-Fonts: Vokale plus Trema zu richtigen Umlauten machen
	  str = str.replace(/u\u0308/g,"??");
	  str = str.replace(/U\u0308/g,"??");
	  str = str.replace(/o\o0308/g,"??");
	  str = str.replace(/O\O0308/g,"??");
	  str = str.replace(/??\a0308/g,"??");
	  str = str.replace(/??\A0308/g,"??");
	  
	  // LinkedIn und AddIn retten
	  str = str.replace(/LinkedIn/g,"Linkedin");
	  str = str.replace(/AddIn/g,"Add-in");
	  str = str.replace(/PlugIn/g,"Plug-in");
	  str = str.replace(/DriveIn/g,"Drive-in");

	  oldstr = str;
		
	  
	  // Konstruktionen wie Der/die oder sie:er durch das generische Maskulinum ersetzen
	  str = str.replace(/(der|Der)(\/|\_|\:|\*|\??)die([ ,).:???\?"!-])/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(den|Den)(\/|\_|\:|\*|\??)die([ ,).:???\?"!-])/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(d|D)ie(\/|\_|\:|\*|\??)den([ ,).:???\?"!-])/g,rot1+"$1en"+rot2+"$3");
	  str = str.replace(/(er|Er)(\/|\_|\:|\*|\??)sie([ ,).:???\?"!-]|$)/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(d|D)ie(\/|\_|\:|\*|\??)der([ ,).:???\?"!-])/g,rot1+"$1er"+rot2+"$3");
	  str = str.replace(/sie(\/|\_|\:|\*|\??)er([ ,).:???\?"!-]|$)/g,rot1+"er$2"+rot2);
	  str = str.replace(/Sie(\/|\_|\:|\*|\??)er([ ,).:???\?"!-]|$)/g,rot1+"Er$2"+rot2);
	  str = str.replace(/(d|D)em(\/|\_|\:|\*|\??)der([ ,).:???\?"!-]|$)/g,rot1+"$1em"+rot2+"$3");
	  str = str.replace(/(s|S)einem(\/|\_|\:|\*|\??)ihrem([ ,).:???\?"!-]|$)/g,rot1+"$1einem"+rot2+"$3");
	  str = str.replace(/ihrem(\/|\_|\:|\*|\??)seinem([ ,).:???\?"!-]|$)/g,rot1+"seinem"+rot2+"$2");
	  str = str.replace(/(s|S)einen(\/|\_|\:|\*|\??)ihren([ ,).:???\?"!-]|$)/g,rot1+"$1einen"+rot2+"$3");
	  str = str.replace(/ihren(\/|\_|\:|\*|\??)seinen([ ,).:???\?"!-]|$)/g,rot1+"seinen"+rot2+"$2");
	  str = str.replace(/(d|D)er(\/|\_|\:|\*|\??)dem([ ,).:???\?"!-])/g,rot1+"$1em"+rot2+"$3"); 
	  str = str.replace(/(i|I)hm(\/|\_|\:|\*|\??)ihr([ ,).:???\?"!-])/g,rot1+"$1hm"+rot2+"$3"); 
	  str = str.replace(/(i|I)hr(\/|\_|\:|\*|\??)ihm([ ,).:???\?"!-])/g,rot1+"$1hm"+rot2+"$3"); 
	  str = str.replace(/(e|E)in(\/|\_|\:|\*|\??)eine([ ,).:???\?"!-]|$)/g,rot1+"$1in"+rot2+"$3");
	  str = str.replace(/(e|E)ine(\/|\_|\:|\*|\??)ein([ ,).:???\?"!-])/g,rot1+"$1in"+rot2+"$3"); 
	  str = str.replace(/(e|E)inem(\/|\_|\:|\*|\??)einer([ ,).:???\?"!-])/g,rot1+"$1inem"+rot2+"$3"); 
	  str = str.replace(/(e|E)iner(\/|\_|\:|\*|\??)einem([ ,).:???\?"!-])/g,rot1+"$1inem"+rot2+"$3"); 


	  // Spezialf??lle mit Umlauten je nach Geschlecht l??sen
	  str = str.replace(/(b|B)??uer(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1auer$2");
	  str = str.replace(/??rzt(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))([ ,).:???\?"!-])/g,"Arzt$2");
	  str = str.replace(/??rzt(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))([ ,).:???\?"!-])/g,"arzt$2");
	  str = str.replace(/(a|A)nw??lt(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))([ ,).:???\?"!-])/g,"$1nwalt$3");
	  str = str.replace(/(n|N)??rr(\??in|\:in|\*in|\/\-in||\/in|In|\_in|\(in|In\))/g,"$1arr$2");
	  str = str.replace(/(h|H)??nd(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1und$2");
	  str = str.replace(/(k|K)??tz(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1atz$2");
	  str = str.replace(/(f|F)ranz??s(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1ranzos$2");
	  str = str.replace(/(p|P)rinzess(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1rinz$2");
	  str = str.replace(/(i|I)srael(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1sraelis$2");
	  str = str.replace(/(g|G)r??f(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1raf$2");
	  str = str.replace(/(s|S)chw??ger(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1chwager$2");
	  str = str.replace(/(w|W)estf??l(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1estfal$2");
	  str = str.replace(/(s|S)chw??n(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In\))/g,"$1chwan$2");
	  str = str.replace(/(k|K)??ch(\??in|\:in|\*in|\/\-in|\/in|In|\_in|\(in|In)([ ,).:???\?"!\-\/\<\&]|$)/g,"$1och$2$3");
	  
	  
	  // Spezialf??lle: W??rter, die auf -erer/-erin enden
	  str = str.replace(/(w|W)ander(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1anderer$2");
	  str = str.replace(/(f|F)??rder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1??rderer$2");
	  str = str.replace(/(e|E)rober(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1roberer$2");
	  str = str.replace(/(l|L)??ster(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1??sterer$2");
	  str = str.replace(/(r|R)uder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1uderer$2");
	  str = str.replace(/(s|S)chlender(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1chlenderer$2");
	  str = str.replace(/(w|W)ilder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1ilderer$2");
	  str = str.replace(/(k|K)letter(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$letterer$2");
	  str = str.replace(/(z|Z)auber(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1auberer$2");
	  str = str.replace(/(p|P)l??nder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$l??nderer$2");
	  str = str.replace(/(b|B)ewunder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1ewunderer$2");
	  str = str.replace(/(h|H)erausforder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1erausforderer$2");
	  str = str.replace(/(h|H)inder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1inderer$2");
	  str = str.replace(/(p|P)lauder(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$lauderer$2");
	  str = str.replace(/(m|M)euter(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1euterer$2");
	  str = str.replace(/(v|V)er??u??er(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1er??u??erer$2");
	  str = str.replace(/(f|F)??tter(\??in|\:in|\*in|\/\-in|\_in|\/in|\(in|In\))/g,"$1??tterer$2");
	  

	  // Partizipien
	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderte| tausende| dass| weil| f??r| durch) Studierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Studenten"+rot2+"$2");
	  str = str.replace(/([D|d]er) Studierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Student"+rot2+"$2");
	  str = str.replace(/([E|e]in|[K|k]ein) Studierender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Student"+rot2+"$2");
	  str = str.replace(/([D|d]ie|[E|e]ine|[K|k]eine) Studierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Studentin"+rot2+"$2");
	  str = str.replace(/(Studierenden)(zahl|verband|vereinigung|werk|heim|anteil|schaft|ausweis|wohnheim|verbindung|vertretung|gruppe|\-WG)/g,rot1+"Studenten"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[V|v]ieler|[E|e]iniger|[V|v]iele|[E|e]inige|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|ein paar|Teil der|Zahl der| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderten| tausenden| mit| die| bei| diese| von) (Studierender|Studierenden)([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Studenten"+rot2+"$3");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderte| tausende| dass| weil| f??r| durch) Dozierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Dozenten"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[V|v]ieler|[E|e]iniger|[V|v]iele|[E|e]inige|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|ein paar|Teil der|Zahl der| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderten| tausenden| mit| die| bei| diese| von) (Dozierender|Dozierenden)([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Dozenten"+rot2+"$3");
	  
	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderte| tausende| dass| weil| f??r| durch) Demonstrierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Demonstranten"+rot2+"$2");
	  str = str.replace(/(Demonstrierenden)(zahl|anteil|vertretung|gruppe)/g,rot1+"Demonstranten"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[V|v]ieler|[E|e]iniger|[V|v]iele|[E|e]inige|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|ein paar|Teil der|Zahl der| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| hunderten| tausenden| mit| die| bei| diese| von) (Demonstrierender|Demonstrierenden)([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Demonstranten"+rot2+"$3");
	  
	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Helfende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Helfer"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Helfenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Helfern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Helfender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Helfer"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Forschende([ ,).:???\?"!\-\/\<\&]|$)/gi,"$1 "+rot1+"Forscher"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Forschenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Forschern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Forschender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Forscher"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Mitarbeitende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Mitarbeiter"+rot2+"$2");
	  str = str.replace(/(Mitarbeitenden)(zahl|verband|vereinigung|anteil|ausweis|vertretung|gruppe|schaft)/g,rot1+"Mitarbeiter"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Mitarbeitenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Mitarbeitern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Mitarbeitender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Mitarbeiter"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Pflegende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Pfleger"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Pflegenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Pflegern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Pflegender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Pfleger"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Lesende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Leser"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Lesenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Lesern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Lesender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Leser"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Kritisierende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Kritiker"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Kritisierenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Kritikern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Kritisierender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"Kritiker"+rot2+"$2");

	  str = str.replace(/([V|v]iele|[E|e]inige|[M|m]ehrere|[A|a]lle|[W|w]enige|[E|e]tliche|[E|e]in paar) Kunstschaffende([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"K??nstler"+rot2+"$2");
	  str = str.replace(/([V|v]iele|[V|v]ielen|[E|e]inigen|[E|e]inige|[M|m]ehreren|[A|a]llen|[A|a]lle|[W|w]enige|[E|e]tliche|[D|d]iversen|[W|w]enigen|[E|e]tlichen|[M|m]eisten|[W|w]enigsten|[E|e]in paar|Zahl der|Teil der) Kunstschaffenden([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"K??nstlern"+rot2+"$2");
	  str = str.replace(/([V|v]ieler|[E|e]iniger|[M|m]ehrerer|[A|a]ller|[D|d]iverser|[W|w]eniger|[E|e]tlicher|[E|e]in paar) Kunstschaffender([ ,).:???\?"!\-\/\<\&]|$)/g,"$1 "+rot1+"K??nstler"+rot2+"$2");

	  // Ihre*n, jede*n, seine*n
	  str = str.replace(/(i|I)hre(\??n|\:n|\*n|\/\-n|\_n|\(n\)|N)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1hren"+rot2+"$3");
	  str = str.replace(/(j|J)ede(\??n|\:n|\*n|\/\-n|\_n|\(n\)|N)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1eden"+rot2+"$3");
	  str = str.replace(/(s|S)eine(\??n|\:n|\*n|\/\-n|\_n|\(n\)|N)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1einen"+rot2+"$3");
	  str = str.replace(/(w|W)elche(\??n|\:n|\*n|\/\-n|\_n|\(n\)|N)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1elchen"+rot2+"$3");
	  
	  // aus ein(e) wird ein, aus Liebe:r wird Lieber, zusammen mit Nomen:
	  str = str.replace(/(eine|Eine)(\??n|\:n|\/\-n|\/n|\*n|N|\_n|\(n\))([ ,).:???\?"!\-\/\<\&]|$)/g,"$1n$3");
	  str = str.replace(/(ein|Ein)(\??e|\:e|\/\-e|\/e|\*e|E|\_e|\(e\))([ ,).:???\?"!\-\/\<\&]|$)/g,"$1$3");
	  
	  // freistehende jede(r), jede_r, manche(r)
	  str = str.replace(/(e)(\??r|\:r|\/\-r|\/r|\*r|\_r|\(r\))([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1r"+rot2+"$3");
	  
	  // frau
	  str = str.replace(/ frau([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+" man$1"+rot2);
	  str = str.replace(/(man|Man)(\??|\/|\/\-|\_|\:|\*)frau([ ,).:???\?"!-])/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(mann|Mann)(\??|\/|\/\-|\_|\:|\*)frau([ ,).:???\?"!-])/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(Frau)(\??|\/|\/\-|\_|\:|\*)man([ ,).:???\?"!-])/g,rot1+"Man"+rot2+"$3");
	  str = str.replace(/(frau)(\??|\/|\/\-|\_|\:|\*)man([ ,).:???\?"!-])/g,rot1+"man"+rot2+"$3");
	  
	  // J??dinnen/Juden bzw. Juden/J??dinnen
	  str = str.replace(/([ ,).:???\?"!-])([a-zA-Z??????????????]*?)(innen)[\??\/\*\:\-\_]([a-zA-Z??????????????]*?)(en)([ ,).:???\?"!-])/g,rot1+"$1$4$5"+rot2+"$6");
	  str = str.replace(/([ ,).:???\?"!-])([a-zA-Z??????????????]*?)(en)[\??\/\*\:\-\_]([a-zA-Z??????????????]*?)(innen)([ ,).:???\?"!-])/g,rot1+"$1$2$3"+rot2+"$6");
	  
	  // geklammertes Binnen-(inn) entfernen
	  str = str.replace(/([a-z????????])\(inn\)([a-z????????]|$)/g,rot1+"$1$2"+rot2);
	  
	  // Sonderkonstrukt Freun*Innenkreis(e)
	  str = str.replace(/(freund|Freund)(\??|\*|\:|\_)innen(kreis)(|e)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1es$3$4"+rot2+"$5");
	  str = str.replace(/(freund|Freund)Innen(kreis)(|e)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1es$2$3"+rot2+"$4");

	  // und hier die Mehrzahl f??r Bauern und Nachbarn
	  str = str.replace(/(bauer|achbar)(\??|\:|\*|\/\-|\/|\_)(innen)([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1n"+rot2+"$4");
	  str = str.replace(/([A-Za-z??????????????])(Bauer|bauer|achbar)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2n"+rot2+"$4");
	  
	  // Juden
	  str = str.replace(/(J|j)??d(\??|\:|\*|\/\-|\/|\_)(innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1uden"+rot2+"$4");
	  str = str.replace(/(J|j)??d(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1uden"+rot2+"$3");	  
	  
	  // Sinti und Roma
	  str = str.replace(/(S|s)inti(\??|\:|\*|\/\-|\/|\_)(zze)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1inti"+rot2+"$4");
	  str = str.replace(/(S|s)inti\(zze\)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1inti"+rot2+"$3");	 
	  str = str.replace(/(R|r)om(\??|\:|\*|\/\-|\/|\_)(nja)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1oma"+rot2+"$4");
	  str = str.replace(/(R|r)om\(nja\)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1oma"+rot2+"$3");	 
	  str = str.replace(/(R|r)oma(\??|\:|\*|\/\-|\/|\_)(nja)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1oma"+rot2+"$4");
	  str = str.replace(/(R|r)oma\(nja\)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1oma"+rot2+"$3");	 
	  
	  
	  // Prinz*essin und Prinz(essin)
	  str = str.replace(/(rinz)(\??|\*|\:|\_)essin([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1"+rot2+"$3");
	  str = str.replace(/(rinz)\(essin\)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1"+rot2+"$2");
	  

	  // Komposita aufl??sen
	  str = str.replace(/([a-z????????])(Innen|\*innen|\:innen|\_innen|\??innen)([a-z????????])/g,"$1$2 %%%$3");

	  // Gruppen-N im Nominativ mit ganz bestimmten Artikeln (Verwandten, Beamten, Bekannten, Angestellten)
	  str = str.replace(/(die|ihre|meine|unsere|seine|keine|manche)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend) (Beamt|Verwandt|Bekannt|Angestellt)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1$2 $3en"+rot2+"$5");
	  str = str.replace(/(die|ihre|meine|unsere|seine|keine|manche)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend) (Beamt|Verwandt|Bekannt|Angestellt)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2 $3en"+rot2+"$5");

	  // Anglizismen, m??nnlicher Plural mit "s" (Chef:innen => Chefs)
	  str = str.replace(/(chef|Chef)(\??|\:|\*|\/\-|\/|\_)(innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1s"+rot2+"$4");
	  str = str.replace(/(chef|Chef)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1s"+rot2+"$3");	  

	  // Bestimmte Vorsatzw??rter und -silben deuten auf den Dativ, dann wird *innen zu en, au??er das Nomen endet auf 'r'
	  // Beispiel: unter Therapeut*innen => unter Therapeuten
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht

	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1$2$3 $4en"+rot2+"$6");
	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])Innen([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2$3 $4en"+rot2+"$5");


	  // Bestimmte Vorsatzw??rter und -silben deuten auf den Dativ, dann wird *innen zu en, Spezialf??lle
	  // Beispiel: unter Autor*innen => unter Autoren
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht
	  
	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?)(or|fahr|gar|eur|dar|t??r|n??r|tar|ssar|gur|ivar|agier)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1$2$3 $4$5en"+rot2+"$7");
	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?)(or|fahr|gar|eur|dar|t??r|n??r|tar|ssar|gur|ivar|agier)Innen([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2$3 $4$5en"+rot2+"$6");

	  // Bestimmte Vorsatzw??rter und -silben deuten auf den Akkusativ, dann wird *innen entfernt, wenn das Nomen auf 'r' endet
	  // Beispiel: Angriffe auf Arbeiter*innen => Angriffe auf Arbeiter
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht
	  str = str.replace(/(??bergriffen auf|??bergriffe auf|??bergriff auf|Angriffe auf|Angriffen auf|Angriff auf|Druck auf|Bezug auf|Wirkung auf)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?r)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1$2$3 $4"+rot2+"$6");
	  str = str.replace(/(??bergriffen auf|??bergriffe auf|??bergriff auf|Angriffe auf|Angriffen auf|Angriff auf|Druck auf|Bezug auf|Wirkung auf)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?r)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2$3 $4"+rot2+"$6");

	  // Bestimmte Vorsatzw??rter und -silben deuten auf den Dativ, dann wird *innen zu n, wenn das Nomen auf 'r' endet
	  // Beispiel: den Arbeiter:innen => den Arbeitern
	  // gilt auch, wenn eine Zahl oder ein Zahlwort dazwischen steht

	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?r)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1$2$3 $4n"+rot2+"$6");
	  str = str.replace(/( den|von|mit|auf|unter|elen| vor|zu|igen| aus| an|bei|au??er|nach|samt|seit|llen|nchen|meinen|seinen|keinen| laut|unseren|ihren| neben)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?r)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2$3 $4n"+rot2+"$6");


	  // Dativ-Konstruktionen mit "zufolge", wenn das Nomen nicht auf 'r' endet
	  str = str.replace(/([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\)) zufolge([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1en zufolge$3"+rot2);
	  str = str.replace(/([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])(Innen) zufolge([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1en zufolge"+rot2+"$3");

	  // Dativ-Konstruktionen mit "zufolge", wenn das Nomen auf 'r' endet
	  str = str.replace(/([a-zA-Z??????????????\-]*?r)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\)) zufolge([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1n zufolge$3"+rot2);
	  str = str.replace(/([a-zA-Z??????????????\-]*?r)(Innen) zufolge([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1n zufolge"+rot2+"$3");

	  // Dasselbe f??r den Genitiv bei Nomen, die auf -eur, -pst oder -bst enden, wird das :innen durch e ersetzt
	  str = str.replace(/( der|ner|nger|rer)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?)(eur|pst|bst|hund|dar|??lf|pit??n|t??r|n??r|w??lt|d??t|slim|eamt|annt|llt|reund|rzt|ssar|wirt|eind|ivar)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,"$1$2"+rot1+"$3 $4$5e"+rot2+"$7");
	  str = str.replace(/( der|ner|nger|rer)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?)(eur|pst|bst|hund|Hund|dar|??lf|pit??n|t??r|n??r|w??lt|d??t|slim|eamt|annt|llt|reund|rzt|ssar|Wirt|wirt|eind|ivar)Innen([ ,).:???\?"!\-\/\<\&]|$)/g,"$1$2"+rot1+"$3 $4$5e"+rot2+"$6");
 
	  // Genitiv plural bei den ??brigen Nomen - innen wird durch en ersetzt
	  str = str.replace(/( der|ner|nger|rer)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,"$1$2"+rot1+"$3 $4en"+rot2+"$6");
	  str = str.replace(/( der|ner|nger|rer)(| fast| beinahe| mehr als| weniger als| rund| aufgerundet| abgerundet| durchschnittlich| knapp)(| [0-9,.]+?| zwei| drei| vier| f??nf| sechs| sieben| acht| neun| zehn| elf| zw??lf| zwanzig| drei??ig| vierzig| f??nfzig| hundert| tausend| [a-zA-Z??????????????]*?en) ([a-zA-Z??????????????\-]*?[bcdfghjklmnpqstvwxz])Innen([ ,).:???\?"!\-\/\<\&]|$)/g,"$1$2"+rot1+"$3 $4en"+rot2+"$5");


	  // Nominativ / Akkusativ plural: Bei Nomen, die auf -eur, -pst oder -bst enden, wird das :innen durch e ersetzt
	  // Beispiel: Ingenieur:innen => Ingenieure, DomteurInnen => Dompteure, P??pst:innen => P??pste
	  str = str.replace(/(G??st|g??st|Wirt|wirt|eur|pst|bst|hund|dar|??lf|pit??n|t??r|n??r|w??lt|d??t|slim|eamt|annt|llt|reund|eind|rzt|k??ch|K??ch|r??t|ssar|ivar|nar|agier)(\??|\:|\*|\/\-|\/|\_)(innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1e"+rot2+"$4");
	  str = str.replace(/([a-z????????])(G??st|g??st|eur|pst|bst|hund|dar|??lf|pit??n|t??r|n??r|w??lt|d??t|slim|eamt|annt|llt|reund|eind|rzt|k??ch|K??ch|r??t|ssar|wirt|Wirt|ivar|nar|agier)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2e"+rot2+"$4");
	  str = str.replace(/( )(Hund|K??ch|Wirt)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2e"+rot2+"$4");
	  
	  // Nominativ / Akkusativ plural: Bei Nomen, die auf -or, -ist, -leg, -nom, -iech usw. enden, wird das :innen durch en ersetzt.
	  // Beispiel: Astronom*innen => Astronomen, KollegInnen => Kollegen
	  str = str.replace(/(pars|sell|orb|ries|ilot|esid|nes|les|klav|isst|krut|igur|erad|or|ist|leg|nom|log|pert|naut|fahr|rat|dat|gog|oss|??st|ent|lyst|graf|zos|atz|ess|fal|ant|peut|urd|kund|klient|f??hrt|??rk|ghan|gar|inn|d??n|m??n|asach|les|sbek|bell|mad|iech|iton|ovar|eug|wed|tekt|ir|eld|siat|russ|soph|mand|erb|lik|thlet|atar|eran|names|bet|arr|rinz|hirt|iot|brit)(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1en"+rot2+"$3");
	  str = str.replace(/(pars|sell|orb|ries|ilot|esid|nes|les|klav|isst|krut|igur|erad|or|ist|leg|nom|log|pert|naut|fahr|rat|dat|gog|oss|??st|ent|lyst|graf|zos|atz|ess|fal|ant|peut|urd|lient|f??hrt|??rk|ghan|gar|inn|d??n|D??n|m??n|asach|les|sbek|bell|mad|iech|iton|ovar|eug|wed|tekt|ir|Ir|eld|siat|Russ|Wei??russ|kund|Kund|soph|mand|erb|Erb|lik|thlet|atar|eran|names|bet|arr|rinz|hirt|Hirt|iot|brit|Brit)(Innen)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1en"+rot2+"$3");

	  // Einzahl Dativ/Akkusativ f??r Kolleg*in, Astrolog*in, Expert*in, D??magog*in, Genoss*in, K??tz*in, Zeug*in, Beamt*in
	  str = str.replace(/(dem|einen|den|einem|diesen|diesem|nchen|elen|igen|nchem) ([a-zA-Z??????????????]*?)(tient|sell|igur|leg|log|pert|gog|oss|??st|atz|eug|eamt|hirt|peut|ilot)(\??in|\:in|\*in|\_in|\/\-in|\/in|\(in\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1 $2$3en"+rot2+"$5");
	  str = str.replace(/(dem|einen|den|einem|diesen|diesem|nchen|elen|igen|nchem) ([a-zA-Z??????????????]*?)(tient|sell|igur|leg|log|pert|gog|oss|??st|atz|eug|eamt|hirt|Hirt|peut|ilot)In([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1 $2$3en"+rot2+"$4");
	  
	  // Einzahl Nominativ f??r Kolleg*in, Astrolog*in, Expert*in, D??magog*in, Genoss*in, K??tz*in, Zeug*in
	  str = str.replace(/(kund|pars|sell|leg|log|pert|gog|oss|??st|atz|eug|esid|ries|orb)(\??|\:|\*|\/\-|\/|\_)(in)([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1e"+rot2+"$4");
	  str = str.replace(/([a-z????????])(Kund|kund|pars|sell|leg|log|pert|gog|oss|??st|atz|eug|esid|ries|orb)(In)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2e"+rot2+"$4");
	  
	   // und hier die Einzahl f??r Beamter, Verwandter
	  str = str.replace(/(amt|ndt)(\??|\:|\*|\/\-|\/|\_)(in)([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1er"+rot2+"$4");
	  str = str.replace(/([a-z????????])(amt|ndt)(In)([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1$2er"+rot2+"$4"); 

	   // und hier die Einzahl f??r Abgeordnete*r, Erwachsene*r
	  str = str.replace(/(dnete|wachsene)(\??|\:|\*|\/\-|\/|\_)(r)([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1r"+rot2+"$4");

	  // Komposita wiederherstellen
	  str = str.replace(/ \%\%\%([a-z????????])/g,"$1");

	  // In alle ??brigen F??llen wird das *innen schlicht entfernt
	  // Beispiel: Sch??ler_innen => Sch??ler
	  str = str.replace(/([a-z????????])(\??innen|\:innen|\*innen|\_innen|\/\-innen|\/innen|\(innen\))/g,rot1+"$1"+rot2);
	  str = str.replace(/([a-z????????])(Innen)/g,rot1+"$1"+rot2);
	  	  
	  
	  // Ein freischwebendes *in wird ebenfalls entfernt; ein Adjektiv davor wird m??nnlich
	  // Beispiel: als freie Jornalist:in => als freier Journalist, Lehrer:in => Lehrer
	  str = str.replace(/(ein|mein|sein|dein|unser|ihr)e ([a-zA-Z??????????????\-]*?e) ([a-zA-Z??????????????\-]*?)(\??in|\:in|\*in|\_in|\/\-in|\/in|\(in\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1 $2r $3"+rot2+"$5");
	  str = str.replace(/(ein|mein|sein|dein|unser|ihr)e ([a-zA-Z??????????????\-]*?e) ([a-zA-Z??????????????\-]*?)In([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1 $2r $3"+rot2+"$4");

	  str = str.replace(/(als|wie) ([a-zA-Z??????????????\-]*?e) ([a-zA-Z??????????????\-]*?)(\??in|\:in|\*in|\_in|\/\-in|\/in|\(in\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1 $2r $3"+rot2+"$5");
	  str = str.replace(/(als|wie) ([a-zA-Z??????????????\-]*?e) ([a-zA-Z??????????????\-]*?)In([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1 $2r $3"+rot2+"$4");
	  
	  str = str.replace(/([a-z????????])(\??in|\:in|\*in|\_in|\/\-in|\/in|\(in\))([ ,).:???\?"!\-\/\<\&]|$)/gi,rot1+"$1"+rot2+"$3");
	  str = str.replace(/([a-z????????])In([ ,).:???\?"!\-\/\<\&]|$)/g,rot1+"$1"+rot2+"$2");
	  
	
	  // Korrektur Isaelisen, Franzos
	  str = str.replace(/sraelisen/g,"sraelis");
	  str = str.replace(/ranzos([ ,).:???\?"!\-\/\<\&]|$)/g,"ranzose$1");
	  str = str.replace(/ein Katz([ ,).:???\?"!\-\/\<\&]|$)/g,"eine Katze$1");



	  // pr??fen, ob ??nderungen innerhalb von href, class oder style-Attributen stattfanden. Wenn ja, wird auf die Korrektur vorsorglich verzichtet
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
			
			if (sollrot == 2) result[i].innerHTML = str;
			else result[i].data = str;
		}
	  }
	  
	  // background-Skript ??ber die Zahl der Ersetzungen informieren
	    browser.runtime.sendMessage({
            count: changes,
            type: "count"
        });
	  
	  // Zeit der Abarbeitung stoppen und Ergebnis in die Konsole schreiben
	  console.timeEnd('RGGL');
}


