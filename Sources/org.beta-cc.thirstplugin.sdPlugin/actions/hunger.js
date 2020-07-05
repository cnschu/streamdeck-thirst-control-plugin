/*******
** all hunger related functions who are not part of the vampire-object
*/
function connect_hunger () {
	$SD.on('org.beta-cc.thirstplugin.sethunger.willAppear', jsonObj => setHunger.onWillAppear(jsonObj));
	$SD.on('org.beta-cc.thirstplugin.sethunger.keyUp', jsonObj => setHunger.onKeyUp(jsonObj));
	$SD.on('org.beta-cc.thirstplugin.sethunger.didReceiveSettings', jsonObj => setHunger.onDidReceiveSettings(jsonObj));

	$SD.on('org.beta-cc.thirstplugin.inchunger.keyUp', jsonObj => incHunger.onKeyUp(jsonObj));

	$SD.on('org.beta-cc.thirstplugin.dechunger.keyUp', jsonObj => decHunger.onKeyUp(jsonObj));

	$SD.on('org.beta-cc.thirstplugin.disphunger.willAppear', jsonObj => dispHunger.onWillAppear(jsonObj));
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
    onKeyUp: function (jsn) {
		vampire.hunger = vampire.hunger + 1;
		if (vampire.hunger>5) {vampire.hunger = 5;};
		vampire.refreshHungerDisplays();
    },
};

var decHunger = {
    onKeyUp: function (jsn) {
		vampire.hunger = vampire.hunger - 1;
		if (vampire.hunger<0) {vampire.hunger = 0;};
		vampire.refreshHungerDisplays();
    },
};

var dispHunger = {
    onWillAppear: function (jsn) {
        // register the context for refresh
		vampire.addhdnc(jsn.context);
		vampire.refreshHungerDisplay(jsn.context);
	},
};
