/* global $CC, Utils, $SD */

// is called after plugin is registered, carries current websocket an env variables in the JSON
$SD.on('connected', (jsonObj) => connected(jsonObj));

function connected(jsn) {
    console.log('[app.js] connected');
	
	// connect the events in other .js files
	connect_hunger();
	connect_roll();
	connect_bp();
	
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

/*****
** global object to contain the character data
*/
var vampire = {
	hunger:1,
	bp:1,
	hdnc:[], // Hunger-Display (numeric) context = hdnc; each numeric hunger display registers his context here by calling .addhdnc(context)
	bpdnc:[],// Blood Potency-Display (numeric) context = bpdnc; each numeric blood potency display registers his context here by calling .addbpdnc(context)
	bpdisciplinebonus:[0,0,1,1,2,2,3,3,4], // bonus from blood potency to discipline
	addhdnc: function (context) {
		// nur hinzufügen, wenn noch nicht vorhanden
		if (this.hdnc.find(element => element == context) != -1) {
			this.hdnc.push(context);
		};
	},
	addbpdnc: function (context) {
		// nur hinzufügen, wenn noch nicht vorhanden
		if (this.bpdnc.find(element => element == context) != -1) {
			this.bpdnc.push(context);
		};
	},
	
	
	refreshHungerDisplay: function(context, index) {
		$SD.api.setTitle(context, String(vampire.hunger), DestinationEnum.HARDWARE_AND_SOFTWARE);
	},

	/*****
	** refresh all Hunger displays
	*/
	refreshHungerDisplays: function() {
		// First refresh all numeric displays
		this.hdnc.forEach(
			function(context, index){
				$SD.api.setTitle(context, String(vampire.hunger), DestinationEnum.HARDWARE_AND_SOFTWARE);
			}
		)
	},
	
	/*****
	** refresh one BP display 
	*/
/*
	refreshBPDisplay: function(context){
		$SD.api.setTitle(context, String(vampire.bp), DestinationEnum.HARDWARE_AND_SOFTWARE);
	},
*/
	/*****
	** refresh all BP displays
	*/
	refreshBPDisplays: function() {
		console.log("[app.js] refreshBPDisplays: invoked", this.bpdnc);
		// First refresh all numeric displays
		this.bpdnc.forEach(
			function(context, index){
				$SD.api.setTitle(context, String(vampire.bp), DestinationEnum.HARDWARE_AND_SOFTWARE);
			}
		)
	}
}


/*****
** ACTIONS
*/

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


/*****
** util functions
*/

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