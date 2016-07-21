// random string, should used across all cssobj plugins
var random = (function () {
  var count = 0
  return function () {
    count++
    return '_' + Math.floor(Math.random() * Math.pow(2, 32)).toString(36) + count + '_'
  }
})()

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

function addStyleToHead (option) {
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

export default addStyleToHead;