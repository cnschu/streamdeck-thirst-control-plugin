/* global $CC, Utils, $SD */

// is called after plugin is registered, carries current websocket an env variables in the JSON
$SD.on('connected', (jsonObj) => connected(jsonObj));

function connected(jsn) {
    console.log('[app.js] connected');
	/** subscribe to the willAppear and other events */
    $SD.on('org.beta-cc.thirstplugin.sendmessage.willAppear', jsonObj => sendMessage.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sendmessage.keyUp', jsonObj => sendMessage.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sendmessage.didReceiveSettings', jsonObj => sendMessage.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sendmessage.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] sendmessage.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.sendmessage.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] sendmessage.propertyInspectorDidDisappear:');
    });
};

/** ACTIONS */

var sendMessage = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js]onDidReceiveSettings:');

        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] sendMessage.onWillAppear", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] sendMessage.keyUp: ", jsn.payload.settings);
		sendDiscordMessage(jsn,this.settings[jsn.context].webhook,this.settings[jsn.context].message);
    },
};

var setHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js]onDidReceiveSettings:');

        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] sendMessage.onWillAppear", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] sendMessage.keyUp: ", jsn.payload.settings);
		sendDiscordMessage(jsn,this.settings[jsn.context].webhook,this.settings[jsn.context].message);
    },
};

function sendDiscordMessage(jsn, webhook,message){
	console.log("[app.js] sendDiscordMessage(): ", jsn, webhook, message);
	var payload = { "content": message };
	$.ajaxSetup({
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			console.log('[app.js] Sending event: showOk');
			$SD.api.showOk(jsn.context);
		},
		failure: function(data) {
			console.log('[app.js] Sending event: showAlert');
			$SD.api.showAlert(jsn.context);
		},
		error: function(data) {
			console.log('[app.js] Sending event: showAlert');
			$SD.api.showAlert(jsn.context);
		},
	});
	$.post(webhook, JSON.stringify(payload));
};