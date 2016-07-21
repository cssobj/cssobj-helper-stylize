/**
 * @fileOverview cssobj plugin for apply style into browser head
 * @name cssobj-plugin-post-stylize.js • src
 * @author James Yang [jamesyang999@gmail.com]
 * @license MIT
*/

import {random} from '../node_modules/cssobj-helper/lib/cssobj-helper.js'

function stylize (element, sheet) {
  if (element['data-cachedCSS'] === sheet) return
  element['data-cachedCSS'] = sheet
  if (element.styleSheet) {
    element.styleSheet.cssText = sheet
  } else {
    // empty all style when re-apply new style
    while(element.firstChild) element.removeChild(element.firstChild)
    element.appendChild(document.createTextNode(sheet))
  }
}

function createDOM (id, option) {
  var el = document.createElement('style')
  document.getElementsByTagName('head')[0].appendChild(el)
  el.setAttribute('id', id)
  if (option && typeof option == 'object' && option.attrs)
    for (var i in option.attrs) {
      el.setAttribute(i, option.attrs[i])
    }
  return el
}

export default function addStyleToHead (option) {
  option = option || {}
  if (!option.name) option.name = random()
  option.name += ''
  var id = 'stylize_cssobj' + option.name.replace(/[^a-zA-Z0-9$_]/g, '')
  return function (result) {
    var styleDom = document.getElementById(id) || createDOM(id, option)
    stylize(styleDom, result.css)
    return result
  }
}


