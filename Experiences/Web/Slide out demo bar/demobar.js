// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// make space in the body for the experience
insertHTMLAfter('body');


/* code to operate the demobar */ 
var bxContent = document.getElementById('bx-demobar');
setTimeout(function () {
  // bxContent.classList.add('open');
  //sendInteractionToBoxever('VIEWED');
});

var bxdemobarClose = bxContent.querySelector('.close__btn-close-icon');
bxdemobarClose.onclick = function () {
  if (bxContent.classList.contains('open')) {
    bxContent.classList.remove('open');
  }
  else {
      bxContent.classList.add('open');
  }
  //sendInteractionToBoxever('DISMISSED');
};


function sendInteractionToBoxever(interactionType) {
  var eventToSent = {
    channel: 'WEB',
    type: 'INTERACTION',
    pos: window._boxever_settings.pointOfSale,
    browser_id: Boxever.getID(),
    interactionID: 'BX_demobar',
    interactionType: interactionType,
  };
  Boxever.eventCreate(eventToSent, function (data) {}, 'json');
}


/* toast */
function showToast() {
 var toast = document.getElementById("saveMsg");
 toast.style = "display:block";
 setTimeout(() => { toast.style = "display:none";}, 1500);
}

/* bind for buttons */
document.getElementById("indentifyUserButton").onclick = identifyUser;
document.getElementById("addToCartButton").onclick = addToCart;
document.getElementById("forceCloseButton").onclick = sendForceClose;
document.getElementById("customEventButton").onclick = sendCustomEvent;
document.getElementById("checkoutCartButton").onclick = checkoutCartEvent;
document.getElementById("clearCartButton").onclick = clearCartEvent;

/* View Guest Link 
Boxever.browserShow(
    Boxever.getID(),
    Boxever.client_key,
    function (data) {
      var BoxeverGuestRefForPage = data.customer.ref;
      console.log(data.customer.ref);

      // turn on the view guest button
      var BoxeverUI = Boxever.target.replace("api", "app").replace("/v1.2", "");
      var viewGuestLink = document.getElementById("viewGuestLink");
      viewGuestLink.href = BoxeverUI + "/#/guests/" + BoxeverGuestRefForPage;
    },
    "json"
  );
*/

/* Event methods */
function identifyUser() {
  var identityEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    type: "IDENTITY",
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    page: window.location.pathname,
    pos: document.getElementById("PointOfSale").value,
    email: document.getElementById("identifyUserEmail").value,
    identifiers: [
      {
        provider: document.getElementById("identifyProviderName").value,
        id: document.getElementById("identifyUserName").value,
      },
    ],
  };

  identityEvent = Boxever.addUTMParams(identityEvent);
  Boxever.eventCreate(identityEvent, function (data) {}, "json");
  showToast();
  return false;
}


function addToCart() {
  console.log(Boxever);

  var addEvent = {
    channel: document.getElementById("Channel").value,
    type: "ADD",
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    page: window.location.pathname,
    pos: document.getElementById("PointOfSale").value,
    browser_id: Boxever.getID(),
    product: {
      type: document.getElementById("addProductType").value,
      item_id: "ITEM_1",
      name: document.getElementById("addProductName").value,
      currency: document.getElementById("Currency").value,
      price: document.getElementById("addPrice").value,
      product_id: document.getElementById("addSKU").value,
      origin: "",
      destination: "",
      flight_type: "",
      pax_type: "",
      quantity: document.getElementById("addQuantity").value,
    },
  };

  addEvent = Boxever.addUTMParams(addEvent);
  Boxever.eventCreate(addEvent, function (data) {}, "json");
  showToast();
  return false;
}

function sendForceClose() {
  var closeSessionEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    type: "FORCE_CLOSE",
    _bx_extended_message: "1",
  };

  Boxever.eventCreate(closeSessionEvent, function (data) {}, "json");
  showToast();
  return false;
}

function sendCustomEvent() {
  var customEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    type: document.getElementById("customType").value,
    pos: document.getElementById("PointOfSale").value,
  };

  Boxever.eventCreate(customEvent, function (data) {}, "json");
  showToast();
  return false;
}


function checkoutCartEvent() {
  var closeSessionEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    page: window.location.pathname,
    type: "CHECKOUT",
    reference_id: document.getElementById("checkoutRef").value,
    status: document.getElementById("checkoutStatus").value
  };

  Boxever.eventCreate(closeSessionEvent, function (data) {}, "json");
  showToast();
  return false;
}

function clearCartEvent() {
  var clearCartEvent = {
    browser_id: Boxever.getID(),
    channel: document.getElementById("Channel").value,
    language: document.getElementById("Language").value,
    currency: document.getElementById("Currency").value,
    pos: document.getElementById("PointOfSale").value,
    page: window.location.pathname,
    type: "CLEAR_CART",
  };

  Boxever.eventCreate(clearCartEvent, function (data) {}, "json");
  showToast();
  return false;
}



/* code to make accordion work */
const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});