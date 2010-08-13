/**
 * i2b2 login using a CAS ticket as the credential in place of a password.
 * 
 * @author: Dan Connolly <dconnolly@kumc.edu>
 *
 * umm... not sure what these mean...
 * @inherits    i2b2
 * @namespace           i2b2
 *
 * @todo: figure out what to do if PM:Login fails; maybe include a link
 *        back to the portal or something?
 */

/* see JSLint, The JavaScript Code Quality Tool http://www.jslint.com/ */
/*jslint browser: true, undef: true, strict: true */
/*global alert */
/*global i2b2, i2b2_scopedCallback */
"use strict";

/**
 * doCASLogin gets username, ticket, and domain from URL and calls PM:Login
 */
i2b2.PM.doCASLogin = function(domainname) {
    var match, i;
    var adr = location.href;

    var service = adr.split("?")[0];

    match = /ticket=([^&#]*)/.exec(adr);
    var ticket = match ? match[1] : null;
    if (!ticket) {
        // alert()? that's how we're doing error handling? hmm.
        alert("login failed: no CAS ticket URL parameter");
        return;
    }

    var domain, domains = i2b2.PM.model.Domains;
    for (i = 0; i < domains.length; i++) {
	if (domains[i].name == domainname) {
	    domain = domains[i];
	    break;
	}
    }
    if (!domain) {
        alert('login failed: no such domain in i2b2 config: ' + domainname);
        return;
    }

    i2b2.h.LoadingMask.show(); // GUI goes busy

    var callback = new i2b2_scopedCallback(i2b2.PM._processUserConfig, i2b2.PM);
    var parameters = {
        domain: domain.domain, 
        is_shrine: Boolean.parseTo(domain.isSHRINE),
        project: domain.project,
        username: service,
        password_text: ticket
    };
    var transportopts = {
        url: domain.urlCellPM,
        user: service,
        password: ticket,
        domain: domain.domain,
        project: domain.project
    };

    _make_dialog();
    i2b2.PM.ajax.getUserAuth("PM:Login", parameters, callback, transportopts);
};


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
