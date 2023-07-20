# What's here:

- [TM Script](https://github.com/Chris-Castle/Sitecore-CDP-Scripts/blob/master/_TM%20Script/v2_engage_sdk/engage-sdk-base-script.js)= The tampermonkey script which installs the Sitecore JS library and sends a view event on each page load (of course you can extend it)
 -  [Experiences/Web](https://github.com/Chris-Castle/Sitecore-CDP-Scripts/tree/master/Experiences/Web)2 Sitecore Web Experienes (demo bars) you can use for custom demos 
- [Library](https://github.com/Chris-Castle/Sitecore-CDP-Scripts/tree/master/Library)= JS code snippets you can use as Conditions, Decision Model programmables and real-time audience filters

# How to do a custom demo on any domain:

 1. You need to install the script in [_TM Script](https://github.com/Chris-Castle/Sitecore-CDP-Scripts/blob/master/_TM%20Script/v2_engage_sdk/engage-sdk-base-script.js)if the website you want
    to demo on does not already have the Sitecore JS library installed
 2. You need to "install" one or both of the Web Experiences (Demo bars) in
        [\[Experiences/Web\]](https://github.com/Chris-Castle/Sitecore-CDP-Scripts/tree/master/Experiences/Web)

If script is not working first check the Javascript console for errors and go [here](https://github.com/rjzflynnbx/tampermonkey-one-stop-shop) for troubleshooting common errors and workarounds