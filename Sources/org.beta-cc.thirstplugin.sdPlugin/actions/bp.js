/*******
** all bp related functions who are not part of the vampire-object
*/
function connect_bp () {
    $SD.on('org.beta-cc.thirstplugin.setbp.willAppear', jsonObj => setBP.onWillAppear(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.setbp.keyUp', jsonObj => setBP.onKeyUp(jsonObj));
    $SD.on('org.beta-cc.thirstplugin.setbp.didReceiveSettings', jsonObj => setBP.onDidReceiveSettings(jsonObj));

    $SD.on('org.beta-cc.thirstplugin.incbp.keyUp', jsonObj => incBP.onKeyUp(jsonObj));

    $SD.on('org.beta-cc.thirstplugin.decbp.keyUp', jsonObj => decBP.onKeyUp(jsonObj));

    $SD.on('org.beta-cc.thirstplugin.dispbp.willAppear', jsonObj => dispBP.onWillAppear(jsonObj));
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
		if (parseInt(this.settings[jsn.context].bp)>8) {this.settings[jsn.context].bp = 8;} else if (parseInt(this.settings[jsn.context].bp)<0) {this.settings[jsn.context].bp = 0};
		vampire.bp = parseInt(this.settings[jsn.context].bp);
		vampire.refreshBPDisplays();
    },
};

var incBP = {
    onKeyUp: function (jsn) {
		vampire.bp = vampire.bp + 1;
		if (vampire.bp>8) {vampire.bp = 8;};
		vampire.refreshBPDisplays();
    },
};

var decBP = {
    onKeyUp: function (jsn) {
		vampire.bp = vampire.bp - 1;
		if (vampire.bp<0) {vampire.bp = 0;};
		vampire.refreshBPDisplays();
    },
};

var dispBP = {
    onWillAppear: function (jsn) {
        console.log("[app.js] dispBP.onWillAppear invoked", this.bpdnc);
		// register the context for refresh
		vampire.addbpdnc(jsn.context);
		vampire.refreshBPDisplay(jsn.context);
	},
};
