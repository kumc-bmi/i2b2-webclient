/**
 * @projectDescription	View controller for ONT's "Help" tab.
 * @inherits 	i2b2.ONT.view
 * @namespace	i2b2.ONT.view.help
 * @author		Brennan Connolly, Nick Benik, Griffin Weber MD PhD
 * @version 	1.0
 * ----------------------------------------------------------------------------------------
 * updated 7-27-16: Help tab created [Brennan Connolly]
 */
console.group('Load & Execute component file: ONT > view > Help');
console.time('execute time');


// create and save the view object
i2b2.ONT.view.help = new i2b2Base_cellViewController(i2b2.ONT, 'help');
i2b2.ONT.view.help.visible = false;
i2b2.ONT.view.help.modifier = false;
this.currentTab = 'names';

// ================================================================================================== //
i2b2.ONT.view.help.showView = function() {
	$('tabHelp').addClassName('active');
	$('ontHelpDisp').style.display = 'block';
}

// ================================================================================================== //
i2b2.ONT.view.help.hideView = function() {
	$('tabHelp').removeClassName('active');
	$('ontHelpDisp').style.display = 'none';
}

console.timeEnd('execute time');
console.groupEnd();