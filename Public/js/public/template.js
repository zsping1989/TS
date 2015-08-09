/*TMODJS:{"debug":true,"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:21*/
    template("public", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, $1 = $data.$1, $2 = $data.$2, $out = "";
            return $out += ' <script id="dialog" type="text/html"> <div class="self ', $line = 3, 
            $out += $escape($1), $out += "if !shade", $line = 3, $out += $escape($2), $out += "dialog-close", 
            $line = 3, $out += $escape($1), $out += "/if", $line = 3, $out += $escape($2), $out += '"> <div style="display: block;" class="modal fade in"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close close-self"><span>×</span></button> <h4 class="modal-title">', 
            $line = 9, $out += $escape($1), $out += "#title", $line = 9, $out += $escape($2), 
            $out += '</h4> </div> <div class="modal-body"> ', $line = 12, $out += $escape($1), 
            $out += "#content", $line = 12, $out += $escape($2), $out += ' </div> <div class="modal-footer"> <button type="button" class="btn btn-default close-self">关闭</button> <button type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div> ', 
            $line = 22, $out += $escape($1), $out += "if shade", $line = 22, $out += $escape($2), 
            $out += ' <div class="modal-backdrop fade in"></div> ', $line = 24, $out += $escape($1), 
            $out += "/if", $line = 24, $out += $escape($2), $out += ' </div> </script> <script id="alt" type="text/html"> <div class="self modal-dialog"> <div class="alert alert-', 
            $line = 30, $out += $escape($1), $out += "status", $line = 30, $out += $escape($2), 
            $out += '"> <button type="button" class="close close-self">×</button> <span> <h4> ', 
            $line = 34, $out += $escape($1), $out += "if !statusTitle", $line = 34, $out += $escape($2), 
            $out += " ", $line = 35, $out += $escape($1), $out += "if status=='warning'", $line = 35, 
            $out += $escape($2), $out += "警告:", $line = 35, $out += $escape($1), $out += "else", 
            $line = 35, $out += $escape($2), $out += "提示:", $line = 35, $out += $escape($1), 
            $out += "/if", $line = 35, $out += $escape($2), $out += " ", $line = 36, $out += $escape($1), 
            $out += "else", $line = 36, $out += $escape($2), $out += " ", $line = 37, $out += $escape($1), 
            $out += "statusTitle", $line = 37, $out += $escape($2), $out += " ", $line = 38, 
            $out += $escape($1), $out += "/if", $line = 38, $out += $escape($2), $out += " </h4> ", 
            $line = 40, $out += $escape($1), $out += "#content", $line = 40, $out += $escape($2), 
            $out += " </span> </div> </div> </script> ", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<!--弹窗模板-->\r\n<script id="dialog" type="text/html">\r\n    <div class="self {{$1}}if !shade{{$2}}dialog-close{{$1}}/if{{$2}}">\r\n        <div style="display: block;" class="modal fade in">\r\n            <div class="modal-dialog">\r\n                <div class="modal-content">\r\n                    <div class="modal-header">\r\n                        <button type="button" class="close close-self"><span>×</span></button>\r\n                        <h4 class="modal-title">{{$1}}#title{{$2}}</h4>\r\n                    </div>\r\n                    <div class="modal-body">\r\n                        {{$1}}#content{{$2}}\r\n                    </div>\r\n                    <div class="modal-footer">\r\n                        <button type="button" class="btn btn-default close-self">关闭</button>\r\n                        <button type="button" class="btn btn-primary">Save changes</button>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        {{$1}}if shade{{$2}}\r\n        <div class="modal-backdrop fade in"></div>\r\n        {{$1}}/if{{$2}}\r\n    </div>\r\n</script>\r\n\r\n<script id="alt" type="text/html">\r\n    <div class="self modal-dialog">\r\n        <div class="alert alert-{{$1}}status{{$2}}">\r\n            <button type="button" class="close close-self">×</button>\r\n            <span>\r\n                <h4>\r\n                    {{$1}}if !statusTitle{{$2}}\r\n                        {{$1}}if status==\'warning\'{{$2}}警告:{{$1}}else{{$2}}提示:{{$1}}/if{{$2}}\r\n                    {{$1}}else{{$2}}\r\n                        {{$1}}statusTitle{{$2}}\r\n                    {{$1}}/if{{$2}}\r\n                </h4>\r\n                {{$1}}#content{{$2}}\r\n            </span>\r\n        </div>\r\n    </div>\r\n</script>\r\n\r\n\r\n\r\n\r\n\r\n\r\n'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();