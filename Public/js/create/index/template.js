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
    /*v:54*/
    template("index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, $out = "";
            return $out += '<div class="ts-container"> <div class="clearfix searchspin"> <div class="container-fluid"> <div class="row-fluid"> <div class="span12"> <div class="page-header"> <h1 style="text-align: center">欢迎使用代码生成工具</h1> </div> </div> </div> </div> <div class="spin-cont"> <form action="', 
            $line = 13, $out += $escape($helpers.F("U", "create")), $out += '" method="get"> <table class="table table-hover table-bordered"> <tr> <th>选项</th> <th>值</th> <th>说明</th> </tr> <tr> <td>模块名</td> <td><input name="m_name" type="text"></td> <td>必填:用于代码生成路径</td> </tr> <tr> <td>控制器名</td> <td><input name="c_name" type="text"></td> <td>必填:用于代码生成路径及Controller文件;</td> </tr> <tr> <td>方法名</td> <td><input name="a_name" type="text" value="index"></td> <td>必填:用于代码生成路径及生成前端js,文件等</td> </tr> <tr> <td>数据表名</td> <td><input name="t_name" type="text"></td> <td>必填:用于获取数据表信息(不需要前缀)</td> </tr> <tr> <td>title</td> <td><input name="title" type="text" value=""></td> <td>选填:页面的二级title</td> </tr> <tr> <td>是否必须登录才能访问:</td> <td> <input type="radio" name="mustLogin" checked="checked" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="mustLogin" value="0">&nbsp;否</td> <td>选填:添加,修改数据时验证数据</td> </tr> <tr> <td>是否创建数据MODEL类:</td> <td> <input type="radio" name="model" checked="checked" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="model" value="0">&nbsp;否</td> <td>选填:选择是否生成Model类</td> </tr> <tr> <td>是否创建前端model处理数据:</td> <td> <input type="radio" name="proscenium_model" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="proscenium_model" checked="checked" value="0">&nbsp;否</td> <td>选填:生成前端model在前端处理数据</td> </tr> <tr> <td>是否前端验证字段:</td> <td> <input type="radio" name="validata" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="validata" checked="checked" value="0">&nbsp;否</td> <td>选填:添加或修改数据时前端验证字段</td> </tr> </table> <br /> <div style="text-align: center"> <button type="button" class="btn btn-primary btn-large create">生成</button> <button type="reset" class="btn btn-info btn-large">重置</button> </div> </form> </div> </div> </div> ', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="clearfix searchspin">\r\n    <div class="container-fluid">\r\n        <div class="row-fluid">\r\n            <div class="span12">\r\n                <div class="page-header">\r\n                    <h1 style="text-align: center">欢迎使用代码生成工具</h1>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n        <div class="spin-cont">\r\n            <form action="{{\'U\' | F:\'create\'}}" method="get">\r\n                <table class="table table-hover table-bordered">\r\n                    <tr>\r\n                        <th>选项</th>\r\n                        <th>值</th>\r\n                        <th>说明</th>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>模块名</td>\r\n                        <td><input name="m_name" type="text"></td>\r\n                        <td>必填:用于代码生成路径</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>控制器名</td>\r\n                        <td><input name="c_name" type="text"></td>\r\n                        <td>必填:用于代码生成路径及Controller文件;</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>方法名</td>\r\n                        <td><input name="a_name" type="text" value="index"></td>\r\n                        <td>必填:用于代码生成路径及生成前端js,文件等</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>数据表名</td>\r\n                        <td><input name="t_name" type="text"></td>\r\n                        <td>必填:用于获取数据表信息(不需要前缀)</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>title</td>\r\n                        <td><input name="title" type="text" value=""></td>\r\n                        <td>选填:页面的二级title</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>是否必须登录才能访问:</td>\r\n                        <td>\r\n                            <input type="radio" name="mustLogin" checked="checked" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            <input type="radio" name="mustLogin" value="0">&nbsp;否</td>\r\n                        <td>选填:添加,修改数据时验证数据</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>是否创建数据MODEL类:</td>\r\n                        <td>\r\n                            <input type="radio" name="model" checked="checked" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            <input type="radio" name="model" value="0">&nbsp;否</td>\r\n                        <td>选填:选择是否生成Model类</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>是否创建前端model处理数据:</td>\r\n                        <td>\r\n                            <input type="radio" name="proscenium_model" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            <input type="radio" name="proscenium_model" checked="checked" value="0">&nbsp;否</td>\r\n                        <td>选填:生成前端model在前端处理数据</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>是否前端验证字段:</td>\r\n                        <td>\r\n                            <input type="radio" name="validata" value="1">&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            <input type="radio" name="validata" checked="checked" value="0">&nbsp;否</td>\r\n                        <td>选填:添加或修改数据时前端验证字段</td>\r\n                    </tr>\r\n                </table>\r\n                <br />\r\n                <div style="text-align: center">\r\n                    <button type="button" class="btn btn-primary btn-large create">生成</button>\r\n                    <button type="reset" class="btn btn-info btn-large">重置</button>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();