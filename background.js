// Remove German Gender Language
// v2.4
// License: GPL 3.0

var settings = "";

function updateMode() {
    browser.storage.local.get(function(res) {
        if (res.aktiv === undefined ) {            
            browser.storage.local.set({ aktiv: 1 });
            browser.storage.local.get(function(resagain) {
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
        browser.browserAction.setBadgeText({
            text: "" + displayednumber + "",
            tabId: sender.tab.id
        });
		browser.browserAction.setBadgeBackgroundColor({'color': 'darkslategray'});
		browser.browserAction.setBadgeTextColor({'color': 'white'});
}

function updateIcon() {
    browser.storage.local.get(function(res) {
        if (res.aktiv == 2) {
            browser.browserAction.setTitle({ title: 'Änderungen farbig hervorheben' });
            browser.browserAction.setIcon({ path: 'button/gendericon_red.png' });
        } else if (res.aktiv === 1) {
                browser.browserAction.setTitle({ title: 'Filterung aktiv' });
                browser.browserAction.setIcon({ path: 'button/gendericon_black.png' });
        } else { 
		browser.browserAction.setTitle({ title: 'Deaktiviert' });
                 browser.browserAction.setIcon({ path: 'button/gendericon_off.png' });
		}
    });
} 

function buttonClick() {
    browser.storage.local.get(function(res) {
		if (res.aktiv === 1 ) {
            browser.storage.local.set({ aktiv: 2 });
        } else if (res.aktiv === 2 ) {
            browser.storage.local.set({ aktiv: 0 });
		} else {
            browser.storage.local.set({ aktiv: 1 });
		}
        updateIcon();
		browser.tabs.reload();
    });
}

updateMode();

//Empfange Daten vom Content-Script
browser.runtime.onMessage.addListener(zeigeZahl);

//Ein/aus bei Toolbar Klick
browser.browserAction.onClicked.addListener(buttonClick);
