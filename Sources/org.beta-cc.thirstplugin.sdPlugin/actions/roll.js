function connect_roll () {
    $SD.on('org.beta-cc.thirstplugin.rollflat.willAppear', jsonObj => rollFlat.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollflat.keyUp', jsonObj => rollFlat.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollflat.didReceiveSettings', jsonObj => rollFlat.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollflat.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[roll.js] rollflat.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.rollflat.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[roll.js] rollflat.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.rollhunger.willAppear', jsonObj => rollHunger.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollhunger.keyUp', jsonObj => rollHunger.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollhunger.didReceiveSettings', jsonObj => rollHunger.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rollhunger.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[roll.js] rollhunger.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.rollhunger.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[roll.js] rollhunger.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.rolldiscipline.willAppear', jsonObj => rollDiscipline.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rolldiscipline.keyUp', jsonObj => rollDiscipline.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rolldiscipline.didReceiveSettings', jsonObj => rollDiscipline.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.rolldiscipline.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[roll.js] rolldiscipline.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.rolldiscipline.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[roll.js] rolldiscipline.propertyInspectorDidDisappear:');
    });

}

var rollFlat = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[roll.js] rollFlat.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] rollFlat.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] rollFlat.keyUp: ", jsn.payload.settings, this.settings);
		sendDiscordMessage(jsn,this.settings[jsn.context].webhook, "!v " + String(this.settings[jsn.context].dice));
    },
};

var rollHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[roll.js] rollHunger.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[app.js] rollHunger.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[app.js] rollHunger.keyUp: ", jsn.payload.settings, this.settings);
		sendDiscordMessage(jsn,this.settings[jsn.context].webhook, "!v " + String(this.settings[jsn.context].dice) + " " + String(vampire.hunger));
    },
};

var rollDiscipline = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        console.log('%c%s', 'color: white; background: red; font-size: 15px;', '[roll.js] rollHunger.onDidReceiveSettings:');
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        console.log("[roll.js] rollHunger.onWillAppear:", jsn.payload.settings);
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
        console.log("[roll.js] rollDiscipline.keyUp: ", jsn.payload.settings, this.settings);
		sendDiscordMessage(jsn,this.settings[jsn.context].webhook, "!v " + String(parseInt(this.settings[jsn.context].dice) + parseInt(vampire.bpdisciplinebonus[vampire.bp])) + " " + String(vampire.hunger));
    },
};
