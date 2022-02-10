// ==UserScript==
// @name Sitecore CDP base script - yoursite
// @namespace http://tampermonkey.net/
// @version 0.2
// @description Generic Load Sitecore CDP Tampermonkey scripts
// @author Chris Castle
// @match https://*.yoursite.com/*
// @grant  none
// ==/UserScript==

(function() {
    'use strict';
    //Sitecore CDP settings
    const SITECORECDP_CLIENT_KEY = "add your client key";  
    const SITECORECDP_REST_API_BASIC_AUTH = "Basic ..." // add yours here
    const SITECORECDP_POINT_OF_SALE = "StandardDemo"; //  do not change
    const SITECORECDP_API_TARGET = "https://api-us.boxever.com/v1.2"; //  select your emdpoint
    const SITECORECDP_WEB_FLOW_TARGET = "https://d35vb5cccm4xzp.cloudfront.net"; //  do not change
    const SITECORECDP_JS_LIB_SRC = "https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js"; //  do not change
    const SITECORECDP_COOKIE_DOMAIN = '*.thosmoser.com'; //replace TLD with your client/prospect
    const CURRENCY = "USD";

    //Script settings
    const SEND_VIEW_EVENT = true;

    window._boxever_settings = {
        client_key: SITECORECDP_CLIENT_KEY,
        target: SITECORECDP_API_TARGET,
        pointOfSale: SITECORECDP_POINT_OF_SALE,
        cookie_domain: SITECORECDP_COOKIE_DOMAIN,
        web_flow_target: SITECORECDP_WEB_FLOW_TARGET,
    };

    loadScCdpLib();
    if (SEND_VIEW_EVENT) {
        delayUntilBrowserIdIsAvailable(sendViewEvent);
    }

    function loadScCdpLib(callback) {
        console.log('Sitecore CDP Tampermonkey script - loadScCdpLib');
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = SITECORECDP_JS_LIB_SRC;
        scriptElement.async = false;
        document.head.appendChild(scriptElement);
    }

    function sendViewEvent() {
        console.log('Sitecore CDP Tampermonkey script - sendViewEvent');
        var viewEvent = {
            "browser_id": Boxever.getID(),
            "channel": "WEB",
            "type": "VIEW",
            "language": "EN",
            "currency": CURRENCY,
            "page": window.location.pathname + window.location.search,
            "pos": SITECORECDP_POINT_OF_SALE,
            "session_data": {
                "uri": window.location.pathname
            }
        };
        viewEvent = Boxever.addUTMParams(viewEvent);
        Boxever.eventCreate(viewEvent, function(data) {}, 'json');
        console.log('view event');
    }

    function delayUntilBrowserIdIsAvailable(functionToDelay) {
        if (window.Boxever == null || window.Boxever == undefined || window.Boxever === "undefined" || window.Boxever.getID() === "anonymous") {
            const timeToWaitInMilliseconds = 300;
            console.log('Sitecore CDP browserId is not yet available. Waiting ${timeToWaitInMilliseconds}ms before retrying.');
            window.setTimeout(delayUntilBrowserIdIsAvailable, timeToWaitInMilliseconds, functionToDelay);
        } else {
            functionToDelay();
        }
    }

})();