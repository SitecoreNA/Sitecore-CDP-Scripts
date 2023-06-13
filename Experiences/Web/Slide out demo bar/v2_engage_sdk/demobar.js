// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Engage.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// Add FontAwesome to the page
var fontAwesomeScriptElement = document.createElement('script');
fontAwesomeScriptElement.src = 'https://kit.fontawesome.com/b19590b5e3.js';
document.body.appendChild(fontAwesomeScriptElement);

// make space in the body for the experience
insertHTMLAfter('body');

/* code to operate the demobar */
var bxContent = document.getElementById('bx-demobar');
var bxDemobarOpenToggle = bxContent.querySelector('.bx-demobar__openToggle');
bxDemobarOpenToggle.onclick = function () {
    if (!bxContent.classList.contains('open')) {
        bxContent.classList.add('open');
    }
};
var bxDemobarClose = bxContent.querySelector('.bx-demobar__closeButton');
bxDemobarClose.onclick = function () {
    if (bxContent.classList.contains('open')) {
        bxContent.classList.remove('open');
    }
    // Refresh guest sidebar web experience after closing demo panel
    if (window.refreshGuestSidebarWebExperience && typeof window.refreshGuestSidebarWebExperience === "function") {
        window.refreshGuestSidebarWebExperience();
    }
};

/* code to make accordion work */
const accordionBtns = document.querySelectorAll(".demobar-accordion-button");

accordionBtns.forEach((accordion) => {
    accordion.onclick = function () {
        this.parentElement.classList.toggle("is-open");

        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            //this is if the accordion is open
            content.style.maxHeight = null;
        } else {
            //if the accordion is currently closed
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };
});

/* toast */
function showToast() {
    var toast = document.getElementById("saveMsg");
    toast.style = "display:block";
    setTimeout(() => { toast.style = "display:none"; }, 1500);
}

/* bind for buttons */
document.getElementById("identifyUserButton").onclick = identifyUser;
document.getElementById("additionalIdentityDataButton").onclick = additionalIdentityData;
document.getElementById("addToCartButton").onclick = addToCart;
document.getElementById("forceCloseButton").onclick = sendForceClose;
document.getElementById("customEventButton").onclick = sendCustomEvent;
document.getElementById("checkoutCartButton").onclick = checkoutCartEvent;
document.getElementById("clearCartButton").onclick = clearCartEvent;
document.getElementById("anonymousButton").onclick = anonymousEvent;

/* Event methods */
function identifyUser(event) {
    event.preventDefault();
    var identityProvider = document.getElementById("identifyProviderName").value;
    var identityValue = document.getElementById("identifyUserName").value
    var eventData = {
        channel: document.getElementById("Channel").value,
        currency: document.getElementById("Currency").value,
        pos: document.getElementById("PointOfSale").value,
        language: document.getElementById("Language").value,
        page: window.location.pathname,
        identifiers: [
            {
                provider: identityProvider,
                id: identityValue,
            }
        ],
    };
    window.engage.identity(eventData);
    showToast();
    localStorage.setItem("scDemoBar_identityProvider", identityProvider);
    localStorage.setItem("scDemoBar_identityValue", identityValue);
    return false;
}

function additionalIdentityData(event) {
    if (localStorage.getItem("scDemoBar_identityProvider") === null || localStorage.getItem("scDemoBar_identityValue") === null) {
        alert("Send Itentity Event First");
    } else {
        event.preventDefault();
        var eventData = {
            channel: document.getElementById("Channel").value,
            currency: document.getElementById("Currency").value,
            pos: document.getElementById("PointOfSale").value,
            language: document.getElementById("Language").value,
            page: window.location.pathname,
            identifiers: [
                {
                    provider: localStorage.getItem("scDemoBar_identityProvider"),
                    id: localStorage.getItem("scDemoBar_identityValue"),
                }
            ],
            email: document.getElementById("identifyUserEmail").value,
            firstName: document.getElementById("identifyUserFirstName").value,
            lastName: document.getElementById("identifyUserLastName").value,
            gender: document.getElementById("identifyUserGender").value,
            mobile: document.getElementById("identifyUserMobile").value,
        };
        window.engage.identity(eventData);
        showToast();
        return false;
    }
}


function addToCart(event) {
    event.preventDefault();
    const eventData = {
        channel: document.getElementById("Channel").value,
        currency: document.getElementById("Currency").value,
        pointOfSale: document.getElementById("PointOfSale").value,
        language: document.getElementById("Language").value,
        page: window.location.pathname,
        product: {
            name: document.getElementById("addProductName").value,
            type: document.getElementById("addProductType").value,
            item_id: "ITEM_1",
            productId: document.getElementById("addSKU").value,
            referenceId: document.getElementById("addSKU").value,
            orderedAt: new Date().toISOString(),
            quantity: document.getElementById("addQuantity").value,
            price: document.getElementById("addPrice").value,
            currency: document.getElementById("Currency").value,
            originalPrice: document.getElementById("addPrice").value,
            originalCurrencyCode: document.getElementById("Currency").value
        }
    };
    engage.event("ADD", eventData)
    showToast();
    return false;
}

function sendForceClose() {
    engage.event("FORCE_CLOSE", {});
    showToast();
    return false;
}

function sendCustomEvent() {

    const kv1 = document.getElementById("eventKVpair1").value;
    const kv1_values = kv1.split(",");

    const kv2 = document.getElementById("eventKVpair2").value;
    const kv2_values = kv2.split(",");

    const kv3 = document.getElementById("eventKVpair3").value;
    const kv3_values = kv3.split(",");

    const kv4 = document.getElementById("eventKVpair4").value;
    const kv4_values = kv4.split(",");

    const kv5 = document.getElementById("eventKVpair5").value;
    const kv5_values = kv5.split(",");

    var eventData = {}
    if (kv1 != null && kv1 != undefined && kv1 != "undefined") {
        eventData[kv1_values[0]] = kv1_values[1];
    }
    if (kv2 != null && kv2 != undefined && kv2 != "undefined") {
        eventData[kv2_values[0]] = kv2_values[1];
    }
    if (kv3 != null && kv3 != undefined && kv3 != "undefined") {
        eventData[kv3_values[0]] = kv3_values[1];
    }
    if (kv4 != null && kv4 != undefined && kv4 != "undefined") {
        eventData[kv4_values[0]] = kv4_values[1];
    }
    if (kv5 != null && kv5 != undefined && kv5 != "undefined") {
        eventData[kv5_values[0]] = kv5_values[1];
    }

    engage.event(document.getElementById("customType").value, eventData)
    showToast();
    return false;
}


function checkoutCartEvent() {
    const eventData = {
        channel: document.getElementById("Channel").value,
        language: document.getElementById("Language").value,
        currency: document.getElementById("Currency").value,
        pos: document.getElementById("PointOfSale").value,
        page: window.location.pathname,
        reference_id: document.getElementById("checkoutRef").value,
        status: document.getElementById("checkoutStatus").value
    }
    engage.event("CHECKOUT", eventData);
    showToast();
    return false;
}

function clearCartEvent() {
    const eventData = {
        channel: document.getElementById("Channel").value,
        language: document.getElementById("Language").value,
        currency: document.getElementById("Currency").value,
        pos: document.getElementById("PointOfSale").value,
        page: window.location.pathname,
    }
    engage.event("CLEAR_CART", eventData);
    showToast();
    return false;
}

function anonymousEvent() {
    var cookieDoman = localStorage.getItem("scDemoBar_cookieDomain");
    document.cookie = 'bid_' + Engage.settings.client_key + '=cookievalue=; path=/; domain=' + cookieDoman + '; expires=' + new Date(0).toUTCString();
    //TODO: delete local storage if exists?
}

