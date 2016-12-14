'use strict';

// helper functions for cssobj

// check n is numeric, or string of numeric


function own(o, k) {
  return {}.hasOwnProperty.call(o, k)
}

// set default option (not deeply)


// convert js prop into css prop (dashified)


// capitalize str


// repeat str for num times


// random string, should used across all cssobj plugins
var random = (function () {
  var count = 0;
  return function (prefix) {
    count++;
    return '_' + (prefix||'') + Math.floor(Math.random() * Math.pow(2, 32)).toString(36) + count + '_'
  }
})();

// extend obj from source, if it's no key in obj, create one


// ensure obj[k] as array, then push v into it
function arrayKV (obj, k, v, reverse, unique) {
  obj[k] = k in obj ? [].concat(obj[k]) : [];
  if(unique && obj[k].indexOf(v)>-1) return
  reverse ? obj[k].unshift(v) : obj[k].push(v);
}

// replace find in str, with rep function result


// get parents array from node (when it's passed the test)


// split selector etc. aware of css attributes


// checking for valid css value

/**
 * @fileOverview cssobj helper for apply style into browser head
 * @name cssobj-helper-post-stylize.js • src
 * @author James Yang [jamesyang999@gmail.com]
 * @license MIT
*/

function stylize (element, sheet) {
  if (element['data-cachedCSS'] === sheet) return
  element['data-cachedCSS'] = sheet;
  if (element.styleSheet) {
    element.styleSheet.cssText = sheet;
  } else {
    // empty all style when re-apply new style
    while(element.firstChild) element.removeChild(element.firstChild);
    element.appendChild(document.createTextNode(sheet));
  }
}

function createDOM (id, option) {
  var el = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(el);
  el.setAttribute('id', id);
  if (option && typeof option == 'object' && option.attrs)
    for (var i in option.attrs) {
      el.setAttribute(i, option.attrs[i]);
    }
  return el
}

function addStyleToHead (option) {
  option = option || {};

  var id = option.name
      ? (option.name+'').replace(/[^a-zA-Z0-9$_-]/g, '')
      : 'stylize_cssobj' + random();

  return {
    post: function (result) {
      var styleDom = document.getElementById(id) || createDOM(id, option);
      stylize(styleDom, result.css);
      return result
    }
  }
}

module.exports = addStyleToHead;
