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
    /*v:37*/
    template("edit", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, data = $data.data, id = $data.id, $out = "";
            return $out += '<div class="ts-container"> <div class="spin-cont"> <div class="user-hd"> <h2>编辑权限</h2> <a class="kehu" href="#"> 返回 </a> </div> <div class="user_zl"> <div class="container-fluid"> <form action="', 
            $line = 11, $out += $escape($helpers.F("U", "doEdit")), $out += '" id="edit" method="get"> <dl class="clearfix"> <dt>权限名称：</dt> <dd> <input name="name" class="bg-input w229" type="text" value=""></dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt>权限url地址：</dt> <dd> <input name="url" class="bg-input w229" type="text" value=""></dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt>父id：</dt> <dd> <input name="parent_id" type="hidden" value=""> <input name="old_parent_id" type="hidden" value=""> <ul id="tree" class="ztree" style="width:229px; overflow:auto;"></ul> </dd> <dd class="error_message"></dd> </dl> ', 
            $line = 34, (data.deep < 3 || !id) && ($out += ' <dl class="clearfix"> <dt>是否显示：</dt> <dd> <input name="status" type="radio" checked="checked" value="1">是 <input name="status" type="radio" value="2">否 </dd> <dd class="error_message"></dd> </dl> ', 
            $line = 44), $out += ' <dl class="clearfix"> <dt></dt> <dd> <input name="id" type="hidden" value=""> <button class="btn btn-success" type="submit">提交</button> <button class="btn btn-info" type="reset">重置</button> </dd> </dl> </form> </div> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="spin-cont">\r\n        <div class="user-hd">\r\n            <h2>编辑权限</h2>\r\n            <a class="kehu" href="#">\r\n                返回\r\n            </a>\r\n        </div>\r\n        <div class="user_zl">\r\n            <div class="container-fluid">\r\n                <form action="{{\'U\' | F:\'doEdit\'}}" id="edit" method="get">\r\n                    <dl class="clearfix">\r\n                        <dt>权限名称：</dt>\r\n                        <dd>\r\n                            <input name="name" class="bg-input w229" type="text" value=""></dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n\r\n                    <dl class="clearfix">\r\n                        <dt>权限url地址：</dt>\r\n                        <dd>\r\n                            <input name="url" class="bg-input w229" type="text" value=""></dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n                    <dl class="clearfix">\r\n                        <dt>父id：</dt>\r\n                        <dd>\r\n                            <input name="parent_id" type="hidden" value="">\r\n                            <input name="old_parent_id" type="hidden" value="">\r\n                            <ul id="tree" class="ztree" style="width:229px; overflow:auto;"></ul>\r\n                        </dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n                    {{if data.deep<3 || !id}}\r\n                    <dl class="clearfix">\r\n                        <dt>是否显示：</dt>\r\n                        <dd>\r\n                            <input name="status" type="radio" checked="checked" value="1">是\r\n                            <input name="status" type="radio" value="2">否\r\n                        </dd>\r\n\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n                    {{/if}}\r\n                    <dl class="clearfix">\r\n                        <dt></dt>\r\n                        <dd>\r\n                            <input name="id" type="hidden" value="">\r\n                            <button class="btn btn-success" type="submit">提交</button>\r\n                            <button class="btn btn-info" type="reset">重置</button>\r\n                        </dd>\r\n                    </dl>\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:38*/
    template("index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, $each = $utils.$each, data = $data.data, page = ($data.row, 
            $data.i, $data.page), pageCount = $data.pageCount, $out = "";
            return $out += '<div class="ts-container"> <div class="clearfix searchspin"> <dl style="height: 30px;"> <dt>筛选条件:</dt> <dd> <form action="" method="get"> 条件筛选: <select name="ts-field"> <option value="id">权限id</option> <option value="name">权限名称</option> <option value="url">权限url地址</option> <option value="deep">层级</option> <option value="parent_id">父id</option> <option value="ctime">创建时间</option> <option value="utime">修改时间</option> <option value="status">状态</option> </select> <select class="ts-select-type" name="where[id][0]"> <option value="eq">=</option> <option value="gt">&gt;</option> <option value="lt">&lt;</option> <option value="like">像</option> </select> <input class="ts-value" name="where[id][1]" value=""> <button class="btn btn-primary btn-xs ts-search">收索</button> <br/> <br/> </form> </dd> </dl> <a class="kehu uploadify-button" href="', 
            $line = 31, $out += $escape($helpers.F("U", "edit")), $out += '" role="button">添加菜单</a> </div> <div class="spin-cont"> <form action="" method="get" class="data-list"> <table class="table table-hover table-bordered"> <tr class="active"> <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th> <th> 权限id </th> <th> 权限名称 </th> <th> 权限url地址 </th> <th> 创建时间 </th> <th> 修改时间 </th> <th> 位置更改 </th> <th> 是否显示 </th> <th style="width: 105px">操作</th> </tr> ', 
            $line = 61, $each(data, function(row) {
                $out += ' <tr> <td><input name="id[]" type="checkbox" value="', $line = 64, $out += $escape(row.id), 
                $out += '"></td> <td> ', $line = 66, $out += $escape(row.id), $out += ' </td> <td class="spin-tit"> ', 
                $line = 69, $out += $escape($helpers.F("deep", row.deep)), $line = 69, $out += $escape(row.name), 
                $out += ' </td> <td class="spin-tit"> ', $line = 72, $out += $escape(row.url), $out += " </td> <td> ", 
                $line = 75, $out += $escape($helpers.F("dateFormat", row.ctime, "yyyy-MM-dd hh:mm:ss")), 
                $out += " </td> <td> ", $line = 78, $out += $escape($helpers.F("dateFormat", row.utime, "yyyy-MM-dd hh:mm:ss")), 
                $out += ' </td> <td> <a class="ts-moveUp" data-pid="', $line = 81, $out += $escape(row.parent_id), 
                $out += '">置顶</a> </td> <td> ', $line = 84, 1 == row.status && row.deep < 3 ? ($out += "是", 
                $line = 84) : ($out += "否", $line = 84), $out += ' </td> <td><a class="gray" href="', 
                $line = 86, $out += $escape($helpers.F("U", "edit")), $out += "?id=", $line = 86, 
                $out += $escape(row.id), $out += '" role="button">修改</a> &nbsp;&nbsp; <a href="#" class="ts_remove gray" id="', 
                $line = 89, $out += $escape(row.id), $out += '"> 删除 </a> </td> </tr> ', $line = 95;
            }), $out += ' </table> </form> <div class="clearfix mt16"> <button class="gray-btn remove_select" type="button">删除选中</button> <nav style="float: right"> <ul class="pagination"> <li ', 
            $line = 103, 1 == page && ($out += 'class="disabled"', $line = 103), $out += '><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li> ', 
            $line = 105, page - 3 > 0 && ($out += ' <li><a href="#">', $line = 106, $out += $escape(page - 3), 
            $out += "</a></li> ", $line = 107), $out += " ", $line = 108, page - 2 > 0 && ($out += ' <li><a href="#">', 
            $line = 109, $out += $escape(page - 2), $out += "</a></li> ", $line = 110), $out += " ", 
            $line = 111, page - 1 > 0 && ($out += ' <li><a href="#">', $line = 112, $out += $escape(page - 1), 
            $out += "</a></li> ", $line = 113), $out += ' <li class="active"><a href="#">', 
            $line = 114, $out += $escape(page), $out += "</a></li> ", $line = 115, pageCount >= page + 1 && ($out += ' <li><a href="">', 
            $line = 116, $out += $escape(page + 1), $out += "</a></li> ", $line = 117), $out += " ", 
            $line = 118, pageCount >= page + 2 && ($out += ' <li><a href="#">', $line = 119, 
            $out += $escape(page + 2), $out += "</a></li> ", $line = 120), $out += " ", $line = 121, 
            pageCount >= page + 3 && ($out += ' <li><a href="#">', $line = 122, $out += $escape(page + 3), 
            $out += "</a></li> ", $line = 123), $out += " <li ", $line = 125, page == pageCount && ($out += 'class="disabled"', 
            $line = 125), $out += '><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li> </ul> </nav> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="clearfix searchspin">\r\n        <dl style="height: 30px;">\r\n            <dt>筛选条件:</dt>\r\n            <dd>\r\n                <form action="" method="get">\r\n                    条件筛选:\r\n                    <select name="ts-field">\r\n                        <option value="id">权限id</option>\r\n                        <option value="name">权限名称</option>\r\n                        <option value="url">权限url地址</option>\r\n                        <option value="deep">层级</option>\r\n                        <option value="parent_id">父id</option>\r\n                        <option value="ctime">创建时间</option>\r\n                        <option value="utime">修改时间</option>\r\n                        <option value="status">状态</option>\r\n                    </select>\r\n                    <select class="ts-select-type" name="where[id][0]">\r\n                        <option value="eq">=</option>\r\n                        <option value="gt">&gt;</option>\r\n                        <option value="lt">&lt;</option>\r\n                        <option value="like">像</option>\r\n                    </select>\r\n                    <input class="ts-value" name="where[id][1]" value="">\r\n                    <button class="btn btn-primary btn-xs ts-search">收索</button>\r\n                    <br/>\r\n                    <br/>\r\n                </form>\r\n            </dd>\r\n        </dl>\r\n        <a class="kehu uploadify-button" href="{{\'U\' | F:\'edit\'}}" role="button">添加菜单</a>\r\n    </div>\r\n    <div class="spin-cont">\r\n        <form action="" method="get" class="data-list">\r\n            <table class="table table-hover table-bordered">\r\n                <tr class="active">\r\n                    <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th>\r\n                    <th>\r\n                        权限id\r\n                    </th>\r\n                    <th>\r\n                        权限名称\r\n                    </th>\r\n                    <th>\r\n                        权限url地址\r\n                    </th>\r\n                    <th>\r\n                        创建时间\r\n                    </th>\r\n                    <th>\r\n                        修改时间\r\n                    </th>\r\n                    <th>\r\n                        位置更改\r\n                    </th>\r\n                    <th>\r\n                        是否显示\r\n                    </th>\r\n                    <th style="width: 105px">操作</th>\r\n                </tr>\r\n                {{each data as row i}}\r\n\r\n                <tr>\r\n                    <td><input name="id[]" type="checkbox" value="{{row.id}}"></td>\r\n                    <td>\r\n                        {{row.id}}\r\n                    </td>\r\n                    <td class="spin-tit">\r\n                        {{\'deep\' | F:row.deep}}{{row.name}}\r\n                    </td>\r\n                    <td class="spin-tit">\r\n                        {{row.url}}\r\n                    </td>\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.ctime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.utime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n                    <td>\r\n                        <a class="ts-moveUp" data-pid="{{row.parent_id}}">置顶</a>\r\n                    </td>\r\n                    <td>\r\n                        {{if row.status==1 && row.deep<3}}是{{else}}否{{/if}}\r\n                    </td>\r\n                    <td><a class="gray" href="{{\'U\' | F:\'edit\'}}?id={{row.id}}"\r\n                           role="button">修改</a>\r\n                        &nbsp;&nbsp;\r\n                        <a href="#" class="ts_remove gray" id="{{row.id}}">\r\n                            删除\r\n                        </a>\r\n\r\n                    </td>\r\n                </tr>\r\n                {{/each}}\r\n            </table>\r\n        </form>\r\n        <div class="clearfix mt16">\r\n            <button class="gray-btn remove_select" type="button">删除选中</button>\r\n            <nav style="float: right">\r\n                <ul class="pagination">\r\n                    <li\r\n                    {{if page==1}}class="disabled"{{/if}}><a href="#" aria-label="Previous"><span\r\n                        aria-hidden="true">«</span></a></li>\r\n                    {{if (page-3)>0}}\r\n                    <li><a href="#">{{page-3}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-2)>0}}\r\n                    <li><a href="#">{{page-2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-1)>0}}\r\n                    <li><a href="#">{{page-1}}</a></li>\r\n                    {{/if}}\r\n                    <li class="active"><a href="#">{{page}}</a></li>\r\n                    {{if (page+1)<=pageCount}}\r\n                    <li><a href="">{{page+1}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+2)<=pageCount}}\r\n                    <li><a href="#">{{page+2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+3)<=pageCount}}\r\n                    <li><a href="#">{{page+3}}</a></li>\r\n                    {{/if}}\r\n                    <li\r\n                    {{if page==pageCount}}class="disabled"{{/if}}><a href="#" aria-label="Next"><span\r\n                        aria-hidden="true">»</span></a></li>\r\n                </ul>\r\n            </nav>\r\n            \r\n        </div>\r\n    </div>\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();