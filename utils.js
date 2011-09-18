    function Unique(arr) {
        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) o[arr[i]] = arr[i];
        for (i in o) r.push(o[i]);
        return r;
    }
    Array.prototype.unique = Unique;

    function css(a){
        var sheets = document.styleSheets, o = {};
        for(var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for(var r in rules) {
                if(a.is(rules[r].selectorText)) {
                    o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
                }
            }
        }
        return o;
    }
    function css2json(css){
        var s = {};
        if(!css) return s;
        if(css instanceof CSSStyleDeclaration) {
            for(var i in css) {
                if((css[i]).toLowerCase) {
                    s[(css[i]).toLowerCase()] = (css[css[i]]);
                }
            }
        } else if(typeof css == "string") {
            css = css.split("; ");
            for (var i in css) {
                var l = css[i].split(": ");
                s[l[0].toLowerCase()] = (l[1]);
            };
        }
        return s;
    }
    function bind(scope, fn) {
        return function () {
            fn.apply(scope, arguments);
        };
    }
    jQuery.fn.outerHTML = function() {
        return $('<div></div>').append( this.clone() ).html();
    }
    function friendlyDate(date){
        var now = new Date();
        var span = new TimeSpan(now - date);
        if (span.totalDays(true) > 2)
            return span.totalDays(true) + " dias atrás";
        if (span.totalDays(true) == 2)
            return "anteontem";
        if (span.totalDays(true) == 1)
            return "ontem";
        if (span.totalHours(true) >= 2)
            return span.totalHours(true) + "h atrás";
        if (span.totalHours(true) == 1)
            return "1h atrás";
        if (span.totalMinutes(true) >= 1)
            return span.totalMinutes(true) + "min. atrás";
        return "nesse instante";
    }