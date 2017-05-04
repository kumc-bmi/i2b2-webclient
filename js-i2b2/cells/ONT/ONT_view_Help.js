/**
 * @projectDescription	View controller for ONT's "Help" tab.
 * @inherits 	i2b2.ONT.view
 * @namespace	i2b2.ONT.view.help
 * @author		Brennan Connolly, Nick Benik, Griffin Weber MD PhD
 * @version 	1.0
 * ----------------------------------------------------------------------------------------
 * updated 7-29-16: experimented with hiding showXML and showOptions buttons when help tab is selected [Brennan Connolly]
 */
console.group('Load & Execute component file: ONT > view > Help');
console.time('execute time');


// create and save the view object
i2b2.ONT.view.help = new i2b2Base_cellViewController(i2b2.ONT, 'help');
i2b2.ONT.view.help.visible = false;
i2b2.ONT.view.help.modifier = false;
this.currentTab = 'names';

// ================================================================================================== //
i2b2.ONT.view.help.showOptions = function(subScreen) {
    //Nothing to show here. Method left as empty to avoid error messages when it's called.
}

// ================================================================================================== //
i2b2.ONT.view.help.showView = function() {
	$('tabHelp').addClassName('active');
	$('ontHelpDisp').style.display = 'block';
	//$$('#ontTopTabs a.debug').forEach(function(e) { e.hide() })
    //$$('#ontTopTabs a.options').forEach(function(e) { e.hide() })
    //$$('#ontTopTabs a.options').forEach(function(e) { ??? })
}

// ================================================================================================== //
i2b2.ONT.view.help.hideView = function() {
	$('tabHelp').removeClassName('active');
	$('ontHelpDisp').style.display = 'none';
	//$$('#ontTopTabs a.debug').forEach(function(e) { e.show() })
    //$$('#ontTopTabs a.options').forEach(function(e) { e.show() })
    //$$('#ontTopTabs a.options').forEach(function(e) { ??? })
}

console.timeEnd('execute time');
console.groupEnd();