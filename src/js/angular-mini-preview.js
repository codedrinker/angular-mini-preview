var app = angular.module('angular-mini-preview', []);

app.directive('miniPreview', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var prefix = 'ng-mini-preview';
            var defaultOptions = {
                width: 300,
                height: 200,
                scale: .25
            };
            element.addClass(prefix + '-anchor');

            var wrapper = angular.element('<div>').addClass(prefix + '-wrapper');
            if (attrs.miniDirection == 'auto') { //auto
                var clientRect = element[0].getBoundingClientRect();
                var topDistance = clientRect.top;
                var winWidth, winHeight;
                if (window.innerWidth) {
                    winWidth = window.innerWidth;
                } else if ((document.body) && (document.body.clientWidth)) {
                    winWidth = document.body.clientWidth;
                }
                if (window.innerHeight) {
                    winHeight = window.innerHeight;
                } else if ((document.body) && (document.body.clientHeight)) {
                    winHeight = document.body.clientHeight;
                }
                var bottomDistance = winHeight - clientRect.bottom;
                var leftDistance = clientRect.left;
                var rightDistance = winWidth - clientRect.right;
                if (topDistance > bottomDistance) {
                    if (leftDistance > rightDistance) {
                        attrs.miniDirection = 'tl';
                    } else {
                        attrs.miniDirection = 'tr';
                    }

                } else {
                    if (leftDistance > rightDistance) {
                        attrs.miniDirection = 'bl';
                    } else {
                        attrs.miniDirection = 'br';
                    }
                }
            }

            if (attrs.miniDirection == 'tr') { //top right
                wrapper.css({
                    width: attrs.miniWidth || (defaultOptions.width + 'px'),
                    height: attrs.miniHeight || (defaultOptions.height + 'px'),
                    bottom: (element[0].height || element[0].offsetHeight) / 2 + 'px',
                    left: (element[0].width || element[0].offsetWidth) / 2 + 'px'
                });
            } else if (attrs.miniDirection == 'tl') { // top left
                wrapper.css({
                    width: attrs.miniWidth || (defaultOptions.width + 'px'),
                    height: attrs.miniHeight || (defaultOptions.height + 'px'),
                    bottom: (element[0].height || element[0].offsetHeight) / 2 + 'px',
                    right: (element[0].width || element[0].offsetWidth) / 2 + 'px'
                });
            } else if (attrs.miniDirection == 'bl') { //bottom left
                wrapper.css({
                    width: attrs.miniWidth || (defaultOptions.width + 'px'),
                    height: attrs.miniHeight || (defaultOptions.height + 'px'),
                    top: (element[0].height || element[0].offsetHeight) / 2 + 'px',
                    right: (element[0].width || element[0].offsetWidth) / 2 + 'px'
                });
            } else { //bottom right
                wrapper.css({
                    width: attrs.miniWidth || (defaultOptions.width + 'px'),
                    height: attrs.miniHeight || (defaultOptions.height + 'px'),
                    top: (element[0].height || element[0].offsetHeight) / 2 + 'px',
                    left: (element[0].width || element[0].offsetWidth) / 2 + 'px'
                });
            }

            var loading = angular.element('<div>').addClass(prefix + '-loading');
            var frame = angular
                .element('<iframe>')
                .addClass(prefix + '-frame')
                .css({
                    'width': 100 / 0.25 + '%',
                    'height': 100 / 0.25 + '%',
                    'transform': 'scale(0.25)',
                    '-ms-transform': 'scale(0.25)',
                    '-moz-transform': 'scale(0.25)',
                    '-webkit-transform': 'scale(0.25)',
                    '-o-transform': 'scale(0.25)'
                });

            wrapper.append(loading);
            wrapper.append(frame);
            element.append(wrapper);

            if (!!attrs.lazyLoad) {
                element.bind("mouseover", function () {
                    var frame = element.find('iframe');
                    element.bind("mouseout", function (e) {
                        frame.attr('src', '');
                    });
                    if (!!frame) {
                        frame.attr('src', attrs.miniPreview || attrs.href);
                    }
                });
            } else {
                var frame = element.find('iframe');
                element.bind("mouseout", function (e) {
                    frame.attr('src', '');
                });
                if (!!frame) {
                    frame.attr('src', attrs.miniPreview || attrs.href);
                }
            }
        }
    }
});