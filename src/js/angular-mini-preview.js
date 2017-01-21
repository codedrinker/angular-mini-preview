var app = angular.module('angular-mini-preview', []);
var prefix = 'ng-mini-preview';

var AngularMiniPreview = function(element, attrs) {
    this.element = element;
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
            .addClass(prefix + '-wrapper')
            .css({
                width: this.options.width + 'px',
                height: this.options.height + 'px',
                top: (this.element[0].height || this.element[0].offsetHeight) / 2 + 'px',
                left: (this.element[0].width || this.element[0].offsetWidth) / 2 + 'px'
            });

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
        switch (this.options.load) {
            case 'preload':
                this.preview();
                break;
            default:
                throw 'Load setting not recognized: ' + this.options.load;
                break;
        }
    },
    preview: function() {
        var frame = this.element.find('iframe');
        if (!!frame) {
            frame.attr('src', this.element.attr('href'));
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