/**
 * i2b2 login using a CAS ticket as the credential in place of a password.
 * 
 * @author: Dan Connolly <dconnolly@kumc.edu>
 *
 * umm... not sure what these mean...
 * @inherits    i2b2
 * @namespace           i2b2
 */

/* see JSLint, The JavaScript Code Quality Tool http://www.jslint.com/ */
/*jslint browser: true, undef: true, strict: true */
/*global alert */
/*global i2b2, i2b2_scopedCallback */
"use strict";

/**
 * doCASLogin gets username, ticket, and domain from URL and calls PM:Login
 */
i2b2.PM.doCASLogin = function() {
    var match;
    var adr = location.href;

    match = /ticket=([^&#]*)/.exec(adr);
    var ticket = match ? match[1] : null;
    if (!ticket) {
        // alert()? that's how we're doing error handling? hmm.
        alert("login failed: no CAS ticket URL parameter");
        return;
    }

    match = /user=([^&#]*)/.exec(adr);
    var username = match ? match[1] : null;
    if (!username) {
        alert("login failed: no user URL parameter");
        return;
    }

    match = /domain=([^&#]*)/.exec(adr);
    var domainname = match ? match[1] : null;
    if (!domainname) {
        alert("login failed: no domain name URL parameter");
        return;
    }

    var domain = i2b2.PM.model.Domains[domainname];

    if (!domain) {
        alert('login failed: no such domain i2b2 config: ' + domainname);
        return;
    }

    i2b2.h.LoadingMask.show(); // GUI goes busy

    var callback = new i2b2_scopedCallback(i2b2.PM._processUserConfig, i2b2.PM);
    var parameters = {
        domain: domainname, 
        is_shrine: Boolean.parseTo(domain.isSHRINE),
        project: domain.project,
        username: username,
        password_text: ticket
    };
    var transportopts = {
        url: domain.urlCellPM,
        user: username,
        password: ticket,
        domain: domainname,
        project: domain.project
    };

    i2b2.PM.ajax.getUserAuth("PM:Login", parameters, callback, transportopts);
};


