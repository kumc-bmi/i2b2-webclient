/**
 * i2b2 login using pre-authorization credentials in the URL.
 * 
 * @author: Dan Connolly <dconnolly@kumc.edu>
 *
 * @todo: figure out what to do if PM:Login fails; maybe include a link
 *        back to the portal or something?
 */

/* see JSLint, The JavaScript Code Quality Tool http://www.jslint.com/ */
/*jslint browser: true, undef: true, strict: true */
/*global alert */
/*global i2b2, i2b2_scopedCallback */
"use strict";

if (undefined==i2b2) { var i2b2 = {}; }
if (undefined==i2b2.PM) { i2b2.PM = {}; }	

i2b2.PM.pre_authz = function(){
    var match;
    var here = location.href;

    match = /user_id=([^&#]*)/.exec(here);
    var user_id = match ? match[1] : null;

    match = /password=([^&#]*)/.exec(here);
    var password = match ? match[1] : null;

    if (user_id && password) {
	return {user_id: user_id,
		password: password}
    } else {
	return null;
    }
}


/**
 * authz_login calls PM:Login, given user_id, psasword creds
 */
i2b2.PM.authz_login = function(creds) {
    var domain = i2b2.PM.model.Domains[0];  // KLUDGE: take the 1st one

    i2b2.PM.model.url = domain.urlCellPM;
    i2b2.PM.model.allow_analysis = _flag(domain.allowAnalysis, true);
    i2b2.PM.model.login_debugging = _flag(domain.debug, true);

    i2b2.h.LoadingMask.show(); // GUI goes busy

    var callback = new i2b2_scopedCallback(i2b2.PM._processUserConfig, i2b2.PM);
    var parameters = {
        domain: domain.domain, 
        is_shrine: Boolean.parseTo(domain.isSHRINE),
        project: domain.project,
        username: creds.user_id,
        password_text: creds.password
    };
    var transportopts = {
        url: domain.urlCellPM,
        user: creds.user_id,
        password: creds.password,
        domain: domain.domain,
        project: domain.project
    };

    _make_dialog();
    i2b2.PM.ajax.getUserAuth("PM:Login", parameters, callback, transportopts);
};


function _flag(expr, fallback){
    if (expr != undefined) {
	return Boolean.parseTo(expr);
    } else {
	return fallback;
    }
}


/**
 * i2b2.PM._processUserConfig assumes the dialog exists, so...
 */
function _make_dialog() {
    if (!$("i2b2_login_modal_dialog")) {
	var htmlFrag = i2b2.PM.model.html.loginDialog;
	Element.insert(document.body,htmlFrag);

	if (!i2b2.PM.view.modal.login) {
	    i2b2.PM.view.modal.login = new YAHOO.widget.Panel("i2b2_login_modal_dialog", {
		    zindex: 700,
		    width: "501px",
		    fixedcenter: true,
		    constraintoviewport: true,
		    close: false,
		    draggable: true
		});
	    // connect the form to the PM controller
	    i2b2.PM.udlogin = {};
	    i2b2.PM.udlogin.inputUser = $('loginusr');
	    i2b2.PM.udlogin.inputPass = $('loginpass');
	    i2b2.PM.udlogin.inputDomain = $('logindomain');
	}
    }
}

//Override logout
i2b2.PM.doLogout = function() {
    window.location.href = '/heron/';
}
