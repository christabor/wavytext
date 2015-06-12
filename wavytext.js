/*!
 * WavyText - a jquery plugin for making wavy, colorful text.
 * (c) 2015 Chris Tabor <dxdstudio@gmail.com>
 * See license for information
 * Licensed under MIT.
 * <3
 * http://github.com/christabor/wavytext
 */
 (function($){
    $.fn.wavyText = function(opts) {
        var defaults = {
            prefixes: ['-ms-', '-webkit-', '-o-', '-moz-', ''],
            animation_name: 'funkyGrad',
            transition_speed: '0.8s',
            keyframes: {
                '0': ['0', 'red'],
                '20': ['10px', 'orange'],
                '40': ['20px', 'yellow'],
                '60': ['25px', 'green'],
                '80': ['10px', 'blue'],
                '100': ['0', 'purple']
            },
            char_classes: [],
            style_id: 'wavy-text-custom'
        };
        opts = $.extend(defaults, opts);
        var PROPS = [
            '-webkit-user-select: none;', /* prevent buggy behavior because of selection of text */
            '-moz-user-select: none;',
            '-ms-user-select: none;',
            'pointer-events: none;',
            'display: inline-block;',
            'outline: 0;',
            'position: relative;',
            '-webkit-animation-timing-function: linear;',
            '-webkit-animation-iteration-count: infinite;',
            '-webkit-animation-name: ' + opts.animation_name + ';',
            'animation-timing-function: linear;',
            'animation-iteration-count: infinite;',
            'animation-name: ' + opts.animation_name + ';',
            '-webkit-animation-duration: ' + opts.transition_speed + ';',
            '-moz-animation-duration: ' + opts.transition_speed + ';',
            '-ms-animation-duration: ' + opts.transition_speed + ';',
            '-o-animation-duration: ' + opts.transition_speed + ';',
            'animation-duration: ' + opts.transition_speed + ';'
        ].join('');

        function _makeAnimationCSS(prefixes) {
            var str = '';
            var fg = $.map(opts.keyframes, function(css_props, percent){
                var position = 'top:' + css_props[0] + ';';
                var color = 'color:' + css_props[1] + ';';
                return percent + '% {' + position + color + '}';
            });
            $.each(opts.prefixes, function(_, prefix){
                str += '@' + prefix + 'keyframes ' + opts.animation_name + ' { ' + fg.join('') + '}';
            });
            return str;
        }

        function styleLetters(els) {
            $(els).each(function(k, el){
                var el = $(el);
                var letters = el.text().split('');
                el.empty();
                for(var i = 0; i < letters.length; i++) {
                    var delay = i * 0.1;
                    var delay_css = $.map(opts.prefixes, function(prefix, _){
                        return prefix + 'animation-delay:' + delay + 's;';
                    });
                    el.append('<span class="funk ' + opts.char_classes.join(' ') + '" style="' + delay_css.join('') + ' ">' + letters[i] + '</span>');
                }
            });
        }

        function init(els) {
            var $style = $('<style></style>');
            var funk_el_props = '.funk {' + PROPS + '}';
            if($('#' + opts.style_id).length > 0) $('#' + opts.style_id).remove();
            $style.attr({
                'type': 'text/css',
                'id': opts.style_id
            }).html(_makeAnimationCSS(opts.prefixes) + funk_el_props);
            $('head').append($style);
            styleLetters(els);
        }
        init(this);
    }
})(jQuery);
