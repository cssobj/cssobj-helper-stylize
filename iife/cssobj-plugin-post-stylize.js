var cssobj_plugin_post_stylize = (function () {
  'use strict';

  function stylize (element, sheet) {
    element.type = 'text/css'
    if (element.styleSheet) {
      element.styleSheet.cssText = sheet
    } else {
      // empty all style when re-apply new style
      while(element.firstChild) element.removeChild(element.firstChild)
      element.appendChild(document.createTextNode(sheet))
    }
    return element
  }

  var styleDom
  function addStyleToHead (sheet, option) {
    var id = 'head_style_cssobj'
    if (!styleDom) {
      var el = document.createElement('style')
      document.head.appendChild(el)
      styleDom = el
    }
    styleDom.setAttribute('id', id.replace(/\"/g, '&quot;').replace(/\'/g, '&apos;'))
    styleDom.setAttribute('type', 'text/css')
    if(option && typeof option=='object' && option.attrs)
      for(var i in option.attrs){
        styleDom.setAttribute(i, option.attrs[i])
      }
    return stylize(styleDom, sheet.css)
  }

  return addStyleToHead;

}());