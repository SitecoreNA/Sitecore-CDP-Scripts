// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// make space in the body for the experience
insertHTMLAfter('body');

/* code to operate the databar */ 
var bxContent = document.getElementById('bx-databar');
setTimeout(function () {
  // bxContent.classList.add('open');
});

var bxdemobarClose = bxContent.querySelector('.bx-databar-close-btn');
bxdemobarClose.onclick = function () {
  if (bxContent.classList.contains('open')) {
    bxContent.classList.remove('open');
  }
  else {
      bxContent.classList.add('open');
  }
};

/* code to make accordion work */
const accordionBtns = document.querySelectorAll(".databar-accordion");

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
      content.style.height = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});
