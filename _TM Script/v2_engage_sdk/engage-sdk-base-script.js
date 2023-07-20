// ==UserScript==
// @name Sitecore CDP/P base script - Multi-site - Engage
// @namespace http://tampermonkey.net/
// @version 0.2
// @description Generic Load Sitecore CDP Tampermonkey scripts
// @author Sitecore Presales
// @match https://*.yoursite.com/*
// @match https://*.yourothersite.com/*
// @match https://*.dupliacte-for-each-site-you-want-this-to-run-on.com/*
// @grant  none
// ==/UserScript==

(function () {
    'use strict';

    // Get the cookie domain

    //Choose the API_TARGET that matches your API region (Europe,USA,or Asia)
    const EU_API_TARGET = "https://api-engage-eu.sitecorecloud.io";
    const US_API_TARGET = "https://api-engage-us.sitecorecloud.io";
    const AP_API_TARGET = "https://api-engage-ap.sitecorecloud.io​";

    //Engage SDK settings
    const ENGAGE_COOKIE_DOMAIN = getCookieDomain() // Get's the cookie domain from the URL
    const ENGAGE_API_TARGET = AP_API_TARGET;
    const ENGAGE_CLIENT_KEY = "your env client key goes here";
    const ENGAGE_POINT_OF_SALE = "your env pos goes here";

    const CURRENCY = "AUD";
    const CHANNEL = "WEB"
    const LANG = "EN";

    main();

    var engage = undefined;

    function main(engage) {
        console.log("Loading Sitecore Engage SDK...")

        // Create and inject the <script> tag into the HTML
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://d1mj578wat5n4o.cloudfront.net/sitecore-engage-v.1.3.0.min.js";
        var x = document.querySelector("script");
        x.parentNode.insertBefore(s, x);

        // Initialize the Engage SDK & send a VIEW event on each page load
        s.addEventListener("load", async () => {
            var settings = {
                clientKey: ENGAGE_CLIENT_KEY,
                targetURL: ENGAGE_API_TARGET,
                pointOfSale: ENGAGE_POINT_OF_SALE,
                cookieDomain: ENGAGE_COOKIE_DOMAIN,
                cookieExpiryDays: 365,
                forceServerCookieMode: false,
                includeUTMParameters: true,
                webPersonalization: "true"
            };
            window.engage = await window.Engage.init(settings);

            var event = {
                channel: CHANNEL,
                language: LANG,
                currency: CURRENCY,
                page: window.location.pathname + window.location.search
            };
            // Send VIEW event
            window.engage.pageView(event);
            console.log("Sitecore Engage SDK Sent VIEW event")

            //temp solution for demobars as the Engage.settings object does not expose the cookieDomain
            localStorage.setItem("scDemoBar_cookieDomain", settings.cookieDomain);
        });
    }

    function getCookieDomain()
    {
        const top_level_domains = ['com', 'net', 'gov', 'org', 'edu', 'ie', 'sg']

        var url_parts = window.location.hostname.split('.')
        var past_top_level = false
        var site_domain = ''

        for(var i = url_parts.length - 1; i >= 0; i--)
        {
            var url_part = url_parts[i]
            site_domain = '.' + url_part + site_domain

            if(past_top_level)
            {
                break
            }

            past_top_level = top_level_domains.includes(url_part)
        }

        return site_domain
    }
})();

