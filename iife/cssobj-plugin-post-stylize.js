var cssobj_plugin_post_stylize = (function () {
  'use strict';

  /**
   * @fileOverview cssobj plugin for apply style into browser head
   * @name cssobj-plugin-post-stylize.js • src
   * @author James Yang [jamesyang999@gmail.com]
   * @license MIT
   * @usage
   cssobj(obj, {
   post:[cssobj_plugin_post_stylize({name:'gaga', attrs: {media: 'screen'}})]
   })
  */

  function escapeHTML (str) {
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

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
    return element
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

  function addStyleToHead (option) {
    option = option || {}
    if (!option.name) option.name = +new Date() + ''
    var id = 'style_cssobj_' + escapeHTML(option.name)
    var updateID = id + '_update'
    var updateDom
    var styleDom = document.getElementById(id) || createDOM(id, option)
    return function (result) {
      result.on('update', function (css) {
        updateDom = document.getElementById(updateID) || createDOM(updateID, option)
        stylize(updateDom, css)
      })
      if(updateDom) stylize(updateDom, '')
      return stylize(styleDom, result.css)
    }
  }

  return addStyleToHead;

}());