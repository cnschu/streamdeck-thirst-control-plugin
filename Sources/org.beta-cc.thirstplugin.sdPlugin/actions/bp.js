/*******
** all bp related functions who are not part of the vampire-object
*/
function connect_bp () {
    $SD.on('org.beta-cc.thirstplugin.setbp.willAppear', jsonObj => setBP.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.setbp.keyUp', jsonObj => setBP.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.setbp.didReceiveSettings', jsonObj => setBP.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.setbp.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] setbp.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.setbp.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] setbp.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.incbp.willAppear', jsonObj => incBP.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.incbp.keyUp', jsonObj => incBP.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.incbp.didReceiveSettings', jsonObj => incBP.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.incbp.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] incbp.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.incbp.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] incbp.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.decbp.willAppear', jsonObj => decBP.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.decbp.keyUp', jsonObj => decBP.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.decbp.didReceiveSettings', jsonObj => decBP.onDidReceiveSettings(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.decbp.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] decbp.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.decbp.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] decbp.propertyInspectorDidDisappear:');
    });

    $SD.on('org.beta-cc.thirstplugin.dispbp.willAppear', jsonObj => dispBP.onWillAppear(jsonObj));
	$SD.on('org.beta-cc.thirstplugin.dispbp.propertyInspectorDidAppear', jsonObj => {
        console.log('%c%s', 'color: white; background: black; font-size: 13px;', '[app.js] decbp.propertyInspectorDidAppear:');
    });
    $SD.on('org.beta-cc.thirstplugin.dispbp.propertyInspectorDidDisappear', (jsonObj) => {
        console.log('%c%s', 'color: white; background: red; font-size: 13px;', '[app.js] decbp.propertyInspectorDidDisappear:');
    });
};

var setBP = {
    settings:{},

    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		if (parseInt(this.settings[jsn.context].bp)>8) {this.settings[jsn.context].bp = 8;} else if (parseInt(this.settings[jsn.context].bp)<1) {this.settings[jsn.context].bp = 1};
		vampire.bp = parseInt(this.settings[jsn.context].bp);
		vampire.refreshBPDisplays();
    },
};

var incBP = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		vampire.bp = vampire.bp + 1;
		if (vampire.bp>8) {vampire.bp = 8;};
		vampire.refreshBPDisplays();
    },
};

var decBP = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },

    onWillAppear: function (jsn) {
        this.settings[jsn.context] = jsn.payload.settings;
	},

    onKeyUp: function (jsn) {
		vampire.bp = vampire.bp - 1;
		if (vampire.bp<1) {vampire.bp = 1;};
		vampire.refreshBPDisplays();
    },
};

var dispBP = {
    settings:{},
    onDidReceiveSettings: function(jsn) {
        this.settings[jsn.context] = Utils.getProp(jsn, 'payload.settings', {});
    },
    onWillAppear: function (jsn) {
        console.log("[app.js] dispBP.onWillAppear invoked", this.bpdnc);
		// register the context for refresh
		vampire.addbpdnc(jsn.context);
		vampire.refreshBPDisplays();
	},
};
