var app = angular.module('angular-mini-preview', []);
var prefix = 'ng-mini-preview';

var AngularMiniPreview = function(element, attrs) {
    this.element = element;
    this.attrs = attrs;
    this.element.addClass(prefix + '-anchor');
    this.generate();
};

AngularMiniPreview.prototype = {
    options: {
        width: 300,
        height: 200,
        scale: .25,
        load: 'preload'
    },
    generate: function() {
        this.generateElements();
        this.load();
    },
    generateElements: function() {
        var wrapper = angular
            .element('<div>')
            .addClass(prefix + '-wrapper');

        if (this.attrs.miniDirection == 'auto') { //auto
            var clientRect = this.element[0].getBoundingClientRect();
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
                    this.attrs.miniDirection = 'tl';
                } else {
                    this.attrs.miniDirection = 'tr';
                }

            } else {
                if (leftDistance > rightDistance) {
                    this.attrs.miniDirection = 'bl';
                } else {
                    this.attrs.miniDirection = 'br';
                }
            }
        }

        if (this.attrs.miniDirection == 'tr') { //top right
            wrapper.css({
                width: this.attrs.miniWidth || (this.options.width + 'px'),
                height: this.attrs.miniHeight || (this.options.height + 'px'),
                bottom: (this.element[0].height || this.element[0].offsetHeight) / 2 + 'px',
                left: (this.element[0].width || this.element[0].offsetWidth) / 2 + 'px'
            });
        } else if (this.attrs.miniDirection == 'tl') { // top left
            wrapper.css({
                width: this.attrs.miniWidth || (this.options.width + 'px'),
                height: this.attrs.miniHeight || (this.options.height + 'px'),
                bottom: (this.element[0].height || this.element[0].offsetHeight) / 2 + 'px',
                right: (this.element[0].width || this.element[0].offsetWidth) / 2 + 'px'
            });
        } else if (this.attrs.miniDirection == 'bl') { //bottom left
            wrapper.css({
                width: this.attrs.miniWidth || (this.options.width + 'px'),
                height: this.attrs.miniHeight || (this.options.height + 'px'),
                top: (this.element[0].height || this.element[0].offsetHeight) / 2 + 'px',
                right: (this.element[0].width || this.element[0].offsetWidth) / 2 + 'px'
            });
        } else { //bottom right
            wrapper.css({
                width: this.attrs.miniWidth || (this.options.width + 'px'),
                height: this.attrs.miniHeight || (this.options.height + 'px'),
                top: (this.element[0].height || this.element[0].offsetHeight) / 2 + 'px',
                left: (this.element[0].width || this.element[0].offsetWidth) / 2 + 'px'
            });
        }

        var loading = angular.element('<div>').addClass(prefix + '-loading');

        var frame = angular
            .element('<iframe>')
            .addClass(prefix + '-frame')
            .css({
                'width': 100 / this.options.scale + '%',
                'height': 100 / this.options.scale + '%',
                'transform': 'scale(' + this.options.scale + ')',
                '-ms-transform': 'scale(' + this.options.scale + ')',
                '-moz-transform': 'scale(' + this.options.scale + ')',
                '-webkit-transform': 'scale(' + this.options.scale + ')',
                '-o-transform': 'scale(' + this.options.scale + ')'
            });

        wrapper.append(loading);
        wrapper.append(frame);
        this.element.append(wrapper);
    },
    load: function() {
        var that = this;
        if (!!this.attrs.lazyLoad) {
            this.element.bind("mouseover", function() {
                that.preview();
            });
        } else {
            this.preview();
        }
    },
    preview: function() {
        var frame = this.element.find('iframe');
        if (!!this.attrs.lazyLoad) {
            this.element.bind("mouseout", function(e) {
                frame.attr('src', '');
            });
        }
        if (!!frame) {
            frame.attr('src', this.attrs.miniPreview || this.attrs.href);
        }
    }
};

app.directive('miniPreview', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            new AngularMiniPreview(element, attrs);
        }
    }
});