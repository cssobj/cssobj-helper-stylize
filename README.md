# cssobj-helper-stylize

[![Join the chat at https://gitter.im/css-in-js/cssobj](https://badges.gitter.im/css-in-js/cssobj.svg)](https://gitter.im/css-in-js/cssobj)

Apply css text into browser's style tag, can work with [cssobj-plugin-gencss](https://github.com/cssobj/cssobj-plugin-gencss).

## Usage

``` javascript
var cssobj_core = require('cssobj-core')
var gencss = require('cssobj-plugin-gencss')
var stylize = require('cssobj-helper-stylize')
var cssobj = cssobj_core({
    plugins: [gencss()],
    onUpdate: stylize({id: 'mycss'})
  })
cssobj(obj)

// generated css text will be insert into <head>
```

## Install

``` javascript
npm install cssobj/cssobj-helper-stylize
```

## API

### `stylize(option?: object) -> (result){}`

Return a function accept `result` and insert `result.css` into `<style>` tag.

### `option`

 - `id` : {string} The id for `<style>` tag, if omit, will using random string.

 - `attrs` : {object} The key/val to apply to `<style>` tag as attributes.

### *RETURN*

A function can be used in cssobj `onUpdate` option.


## Example

``` javascript
// in cssobj({ onUpdate:.... })

onUpdate: stylize({name:'index-page-style'})

onUpdate: stylize({name:'index-page-style', attrs:{type:'text/css', media:'screen'} })
```

## Difference between helper-cssom

This helper take simplicy first, just update all css text into `<style>` tag, may have performance issues.

[plugin-cssom](https://github.com/cssobj/cssobj-plugin-cssom) take effiency first, it create every css rule and patch rules with `result.diff`

If you want apply cssobj once, and don't update result frequently, use `plugin-gencss` + `helper-stylize`

If you want update result frequently, use `plugin-cssom`, it optimized for this type of usage.



