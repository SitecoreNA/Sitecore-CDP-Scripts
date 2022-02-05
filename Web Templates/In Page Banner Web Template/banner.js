// You can choose how you want to add your HTML by using insertHTMLBefore, insertHTMLAfter, or replaceHTML methods
// e.g insertHTMLAfter('.someClassName'); or insertHTMLAfter('body'); or replaceHTML('#myPageId')
var placement = '[[Placement | enum(before,after) | after | {  group: HTML, order: 4 } ]]';
var tag = '[[Tag | string | body | { group: HTML , required: true, order: 2 } ]]';

// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

if (placement == 'before') {
    insertHTMLBefore(tag);
}
else if(placement == 'after') {
    insertHTMLAfter(tag);
}
