![](https://img.shields.io/badge/bower-1.0.7-green.svg) ![](https://img.shields.io/badge/npm-1.0.7-red.svg) ![](https://img.shields.io/github/license/mashape/apistatus.svg)

# angular-mini-preview
An AngularJS directive, you can preview image, link when hover on the element.

# Demo
![Angular Mini Preview Demo](https://codedrinker.github.io/repository/asserts/angular-mini-preview-1.0.7.gif)

## Usage

Install with Bower(Or NPM):

```bash
bower install angular-mini-preview

OR

npm install angular-mini-preview
```

Then reference the minified script:

```html
<script src="bower_components/angular-mini-preview/dist/js/angular-mini-preview.min.js"></script>
<link rel="stylesheet" href="bower_components/angular-mini-preview/dist/css/angular-mini-preview.min.css">

OR

<script src="node_modules/angular-mini-preview/dist/js/angular-mini-preview.min.js"></script>
<link rel="stylesheet" href="node_modules/angular-mini-preview/dist/css/angular-mini-preview.min.css">

```

Specify the angular mini preview as a dependency of your application:

```js
var app = angular.module('app', ['angular-mini-preview']);
```

Now just use mini-preview in any html:
```html
<a href="https://codedrinker.github.com" mini-preview>
```
More
```html
<a href="https://codedrinker.github.com" mini-preview="https://codedrinker.github.com">
<a href="https://codedrinker.github.com" mini-preview="https://codedrinker.github.com" lazy-load="true">
<a href="https://codedrinker.github.com" mini-preview="https://codedrinker.github.com" lazy-load="true" mini-width="300px">
```

# Road Map
###### 1.0.0 Preview Link.
###### 1.0.1 Refactor project dependencies.
###### 1.0.2 Support Angular expression in A tag href.
###### 1.0.3 Support customize link address. (eg. mini-preview="https://codedrinker.github.com").
###### 1.0.4 Support customize height and width, and 'lazy-load' attr to generate 'Preview' dialog once hover one the link area.
###### 1.0.5 Support popup direction, use mini-direction='tr|tl|bl|br' to set the popup dialog position, the default value is 'bl'.
###### 1.0.6 Support auto direction which can auto adjust the direction depends on the window resizing.

# MIT License

Copyright (c) 2016 Chunlei Wang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
