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
	
    $SD.on('org.beta-cc.thirstplugin.sethunger.willAppear', jsonObj => setHunger.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sethunger.keyUp', jsonObj => setHunger.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sethunger.didReceiveSettings', jsonObj => setHunger.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.sethunger.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] sethunger.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.sethunger.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] sethunger.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.inchunger.willAppear', jsonObj => incHunger.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.inchunger.keyUp', jsonObj => incHunger.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.inchunger.didReceiveSettings', jsonObj => incHunger.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.inchunger.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] inchunger.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.inchunger.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] inchunger.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.dechunger.willAppear', jsonObj => decHunger.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.dechunger.keyUp', jsonObj => decHunger.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.dechunger.didReceiveSettings', jsonObj => decHunger.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.dechunger.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] dechunger.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.dechunger.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] dechunger.propertyInspectorDidDisappear:');
    });
};

/** ACTIONS */
var vampire = {
	hunger:1,
	bp:1,
}
var sendMessage = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js]sendMessage.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] sendMessage.onWillAppear:", jsn.payload.settings);
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
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js]setHunger.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] setHunger.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] setHunger.keyUp: ", jsn.payload.settings);
		console.log("[app.js] incHunger.keyUp: old hunger = ", vampire.hunger);
		
		if (parseInt(this.settings[jsn.context].hunger)>5) {this.settings[jsn.context].hunger = 5;} else if (parseInt(this.settings[jsn.context].hunger)<0) {this.settings[jsn.context].hunger = 0};

		vampire.hunger = parseInt(this.settings[jsn.context].hunger);
		console.log("[app.js] setHunger.keyUp: new hunger = ", vampire.hunger);
    },
};

var incHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js] incHunger.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] incHunger.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] incHunger.keyUp: ", jsn.payload.settings);
		console.log("[app.js] incHunger.keyUp: old hunger = ", parseInt(vampire.hunger));
		vampire.hunger = vampire.hunger + 1;
		if (vampire.hunger>5) {vampire.hunger = 5;};
		console.log("[app.js] incHunger.keyUp: new hunger = ", parseInt(vampire.hunger));
    },
};

var decHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[app.js] decHunger.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] decHunger.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] decHunger.keyUp: ", jsn.payload.settings);
		console.log("[app.js] decHunger.keyUp: old hunger = ", parseInt(vampire.hunger));
		vampire.hunger = vampire.hunger - 1;
		if (vampire.hunger<0) {vampire.hunger = 0;};
		console.log("[app.js] decHunger.keyUp: new hunger = ", parseInt(vampire.hunger));
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