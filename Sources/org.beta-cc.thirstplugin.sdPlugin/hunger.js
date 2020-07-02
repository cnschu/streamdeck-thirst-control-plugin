/*******
** all hunger related functions who are not part of the vampire-object
*/
function connect_hunger (jsn) {
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

    $SD.on('org.beta-cc.thirstplugin.disphunger.willAppear', jsonObj => dispHunger.onWillAppear(jsonObj));
	$SD.on('org.beta-cc.thirstplugin.disphunger.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] dechunger.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.disphunger.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] dechunger.propertyInspectorDidDisappear:');
    });
};

var setHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		if (parseInt(this.settings[jsn.context].hunger)>5) {this.settings[jsn.context].hunger = 5;} else if (parseInt(this.settings[jsn.context].hunger)<0) {this.settings[jsn.context].hunger = 0};
		vampire.hunger = parseInt(this.settings[jsn.context].hunger);
		vampire.refreshHungerDisplays();
    },
};

var incHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		vampire.hunger = vampire.hunger + 1;
		if (vampire.hunger>5) {vampire.hunger = 5;};
		vampire.refreshHungerDisplays();
    },
};

var decHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		vampire.hunger = vampire.hunger - 1;
		if (vampire.hunger<0) {vampire.hunger = 0;};
		vampire.refreshHungerDisplays();
    },
};

var dispHunger = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },
    onWillAppear: function (jsn) {
        // register the context for refresh
		vampire.addhdnc(jsn.context);
	},
};
