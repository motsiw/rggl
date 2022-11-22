// Remove German Gender Language
// v6.1.5
// License: GPL 3.2

var settings = "";

function updateMode() {
    chrome.storage.local.get(function(res) {
        if (res.aktiv === undefined ) {            
            chrome.storage.local.set({ aktiv: 1 });
            chrome.storage.local.get(function(resagain) {
                settings = resagain;
            });
        } else {
            settings = res;
        }
        updateIcon();
    });
}

function zeigeZahl(request, sender, sendResponse) {
        var displayednumber = request.count;
        chrome.action.setBadgeText({
            text: "" + displayednumber + "",
            tabId: sender.tab.id
        });
		chrome.action.setBadgeBackgroundColor({'color': 'darkslategray'});
		//chrome.action.setBadgeTextColor({'color': 'white'});
}

function updateIcon() {
    chrome.storage.local.get(function(res) {
        if (res.aktiv == 2) {
            chrome.action.setTitle({ title: 'Änderungen farbig hervorheben' });
            chrome.action.setIcon({ path: 'button/gendericon_red.png' });
        } else if (res.aktiv === 1) {
                chrome.action.setTitle({ title: 'Filterung aktiv' });
                chrome.action.setIcon({ path: 'button/gendericon_black.png' });
        } else { 
		chrome.action.setTitle({ title: 'Deaktiviert' });
                 chrome.action.setIcon({ path: 'button/gendericon_off.png' });
		}
    });
} 

function buttonClick() {
    chrome.storage.local.get(function(res) {
		if (res.aktiv === 1 ) {
            chrome.storage.local.set({ aktiv: 2 });
        } else if (res.aktiv === 2 ) {
            chrome.storage.local.set({ aktiv: 0 });
		} else {
            chrome.storage.local.set({ aktiv: 1 });
		}
        updateIcon();
		chrome.tabs.reload();
    });
}

updateMode();

//Empfange Daten vom Content-Script
chrome.runtime.onMessage.addListener(zeigeZahl);

//Ein/aus bei Toolbar Klick
chrome.action.onClicked.addListener(buttonClick);
