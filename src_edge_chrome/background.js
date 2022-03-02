// Remove German Gender Language
// v5.9.6
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
        chrome.browserAction.setBadgeText({
            text: "" + displayednumber + "",
            tabId: sender.tab.id
        });
		chrome.browserAction.setBadgeBackgroundColor({'color': 'darkslategray'});
		//chrome.browserAction.setBadgeTextColor({'color': 'white'});
}

function updateIcon() {
    chrome.storage.local.get(function(res) {
        if (res.aktiv == 2) {
            chrome.browserAction.setTitle({ title: 'Änderungen farbig hervorheben' });
            chrome.browserAction.setIcon({ path: 'button/gendericon_red.png' });
        } else if (res.aktiv === 1) {
                chrome.browserAction.setTitle({ title: 'Filterung aktiv' });
                chrome.browserAction.setIcon({ path: 'button/gendericon_black.png' });
        } else { 
		chrome.browserAction.setTitle({ title: 'Deaktiviert' });
                 chrome.browserAction.setIcon({ path: 'button/gendericon_off.png' });
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
chrome.browserAction.onClicked.addListener(buttonClick);
