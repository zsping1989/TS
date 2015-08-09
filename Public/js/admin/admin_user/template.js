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
    /*v:24*/
    template("edit", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, id = $data.id, $escape = $utils.$escape, $each = $utils.$each, roles = $data.roles, $out = ($data.row, 
            $data.i, "");
            return $out += '<div class="ts-container"> <div class="spin-cont"> <div class="user-hd"> <h2>', 
            $line = 4, id ? ($out += "编辑", $line = 4) : ($out += "添加", $line = 4), $out += '管理员</h2> <a class="kehu" href="', 
            $line = 5, $out += $escape($helpers.F("U", "index")), $out += '"> 返回 </a> </div> <div class="user_zl"> <div class="container-fluid"> <form action="', 
            $line = 12, $out += $escape($helpers.F("U", "doEdit")), $out += '" id="edit" method="get"> <dl class="clearfix"> <dt>用户id：</dt> <dd> <input name="uid" class="bg-input w229" type="text" value=""></dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt>请选择管理员角色：</dt> <dd class="permission_list" style="width: 240px"> ', 
            $line = 22, $each(roles, function(row) {
                $out += ' <div class="clear"></div> <div><label class="level_1"> <input name="role_ids[]" value="', 
                $line = 24, $out += $escape(row.id), $out += '" type="checkbox"> <span>', $line = 25, 
                $out += $escape(row.name), $out += ":</span></label>", $line = 25, $out += $escape(row.description), 
                $out += "</div> ", $line = 26;
            }), $out += ' </dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt></dt> <dd> <input name="id" type="hidden" value=""> <button class="btn btn-success" type="submit">提交</button> <button class="btn btn-info" type="reset">重置</button> </dd> </dl> </form> </div> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="spin-cont">\r\n        <div class="user-hd">\r\n            <h2>{{if id}}编辑{{else}}添加{{/if}}管理员</h2>\r\n            <a class="kehu" href="{{\'U\' | F:\'index\'}}">\r\n                返回\r\n            </a>\r\n        </div>\r\n        \r\n        <div class="user_zl">\r\n            <div class="container-fluid">\r\n                <form action="{{\'U\' | F:\'doEdit\'}}" id="edit" method="get">\r\n                    <dl class="clearfix">\r\n                        <dt>用户id：</dt>\r\n                        <dd>\r\n                            <input name="uid" class="bg-input w229" type="text" value=""></dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n                    <dl class="clearfix">\r\n                        <dt>请选择管理员角色：</dt>\r\n                        <dd class="permission_list" style="width: 240px">\r\n                            {{each roles as row i}}\r\n                            <div class="clear"></div>\r\n                            <div><label class="level_1"> <input name="role_ids[]" value="{{row.id}}" type="checkbox">\r\n                                <span>{{row.name}}:</span></label>{{row.description}}</div>\r\n                            {{/each}}\r\n                        </dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n\r\n                    <dl class="clearfix">\r\n                        <dt></dt>\r\n                        <dd>\r\n                            <input name="id" type="hidden" value="">\r\n                            <button class="btn btn-success" type="submit">提交</button>\r\n                            <button class="btn btn-info" type="reset">重置</button>\r\n                        </dd>\r\n                    </dl>\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:54*/
    template("index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, order = $data.order, $each = $utils.$each, data = $data.data, page = ($data.row, 
            $data.i, $data.page), pageCount = $data.pageCount, $out = "";
            return $out += '<div class="ts-container"> <div class="clearfix searchspin"> <dl style="height: 30px;"> <dt>筛选条件:</dt> <dd> <form action="" method="get"> 条件筛选: <select name="ts-field"> <option value="id" alias="obj">ID</option> <option value="uname" alias="u">用户名</option> <option value="name" alias="r">角色</option> <option value="name" alias="u">姓名</option> </select> <select class="ts-select-type" name="where[id][0]"> <option value="eq">=</option> <option value="gt">&gt;</option> <option value="lt">&lt;</option> <option value="like">像</option> </select> <input name="ts-alias" type="hidden" value="1"> <input class="ts-value" name="where[id][1]" value=""> <button class="btn btn-primary btn-xs ts-search">收索</button> <br/> <br/> </form> </dd> </dl> <a class="kehu uploadify-button" href="', 
            $line = 29, $out += $escape($helpers.F("U", "edit")), $out += '" role="button">添加管理员</a> </div> <div class="spin-cont"> <form action="" method="get" class="data-list"> <table class="table table-hover table-bordered"> <tr class="active"> <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th> <th ts-order="obj.id" class="ts-order" order-desc="', 
            $line = 37, "desc" == order["obj.id"] ? ($out += "1", $line = 37) : ($out += "0", 
            $line = 37), $out += '"> ID <a>', $line = 38, "desc" == order["obj.id"] ? ($out += "▼", 
            $line = 38) : ($out += "▲", $line = 38), $out += '</a> </th> <th ts-order="uname" class="ts-order" order-desc="', 
            $line = 41, "desc" == order.uname ? ($out += "1", $line = 41) : ($out += "0", $line = 41), 
            $out += '"> 用户名 <a>', $line = 42, "desc" == order.uname ? ($out += "▼", $line = 42) : ($out += "▲", 
            $line = 42), $out += '</a> </th> <th ts-order="name" class="ts-order" order-desc="', 
            $line = 46, "desc" == order.name ? ($out += "1", $line = 46) : ($out += "0", $line = 46), 
            $out += '"> 姓名 <a>', $line = 47, "desc" == order.name ? ($out += "▼", $line = 47) : ($out += "▲", 
            $line = 47), $out += '</a> </th> <th ts-order="rname" class="ts-order" order-desc="', 
            $line = 50, "desc" == order.rname ? ($out += "1", $line = 50) : ($out += "0", $line = 50), 
            $out += '"> 角色 <a>', $line = 51, "desc" == order.rname ? ($out += "▼", $line = 51) : ($out += "▲", 
            $line = 51), $out += '</a> </th> <th ts-order="ctime" class="ts-order" order-desc="', 
            $line = 54, "desc" == order.ctime ? ($out += "1", $line = 54) : ($out += "0", $line = 54), 
            $out += '"> 创建时间 <a>', $line = 55, "desc" == order.ctime ? ($out += "▼", $line = 55) : ($out += "▲", 
            $line = 55), $out += '</a> </th> <th ts-order="utime" class="ts-order" order-desc="', 
            $line = 58, "desc" == order.utime ? ($out += "1", $line = 58) : ($out += "0", $line = 58), 
            $out += '"> 修改时间 <a>', $line = 59, "desc" == order.utime ? ($out += "▼", $line = 59) : ($out += "▲", 
            $line = 59), $out += '</a> </th> <th style="width: 125px">操作</th> </tr> ', $line = 64, 
            $each(data, function(row) {
                $out += " <tr> <td>", $line = 66, 1 != row.id && ($out += '<input name="id[]" type="checkbox" value="', 
                $line = 66, $out += $escape(row.id), $out += '">', $line = 66), $out += "</td> <td> ", 
                $line = 68, $out += $escape(row.id), $out += " </td> <td> ", $line = 71, $out += $escape(row.uname), 
                $out += " </td> <td> ", $line = 74, $out += $escape(row.name), $out += " </td> <td> ", 
                $line = 77, $out += $escape(row.rname), $out += " </td> <td> ", $line = 80, $out += $escape($helpers.F("dateFormat", row.ctime, "yyyy-MM-dd hh:mm:ss")), 
                $out += " </td> <td> ", $line = 83, $out += $escape($helpers.F("dateFormat", row.utime, "yyyy-MM-dd hh:mm:ss")), 
                $out += ' </td> <td><a class="gray" href="', $line = 85, $out += $escape($helpers.F("U", "edit")), 
                $out += "?id=", $line = 85, $out += $escape(row.id), $out += '" role="button">修改</a> ', 
                $line = 88, 1 != row.id && ($out += " ", $line = 89, 1 == row.status ? ($out += '&nbsp;&nbsp; <a href="#" class="ts_forbid gray" data-status="2" id="', 
                $line = 90, $out += $escape(row.id), $out += '"> 禁用 </a> ', $line = 94) : 2 == row.status && ($out += ' &nbsp;&nbsp; <a href="#" class="ts_forbid gray" data-status="1" id="', 
                $line = 96, $out += $escape(row.id), $out += '"> 启用 </a> ', $line = 99), $out += ' &nbsp;&nbsp; <a href="#" class="ts_remove gray" id="', 
                $line = 101, $out += $escape(row.id), $out += '"> 删除 </a> ', $line = 104), $out += " </td> </tr> ", 
                $line = 107;
            }), $out += ' </table> </form> <div class="clearfix mt16"> <button class="gray-btn remove_select" type="button">删除选中</button> <nav style="float: right"> <ul class="pagination"> <li ', 
            $line = 116, 1 == page && ($out += 'class="disabled"', $line = 116), $out += '><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li> ', 
            $line = 118, page - 3 > 0 && ($out += ' <li><a href="#">', $line = 119, $out += $escape(page - 3), 
            $out += "</a></li> ", $line = 120), $out += " ", $line = 121, page - 2 > 0 && ($out += ' <li><a href="#">', 
            $line = 122, $out += $escape(page - 2), $out += "</a></li> ", $line = 123), $out += " ", 
            $line = 124, page - 1 > 0 && ($out += ' <li><a href="#">', $line = 125, $out += $escape(page - 1), 
            $out += "</a></li> ", $line = 126), $out += ' <li class="active"><a href="#">', 
            $line = 127, $out += $escape(page), $out += "</a></li> ", $line = 128, pageCount >= page + 1 && ($out += ' <li><a href="">', 
            $line = 129, $out += $escape(page + 1), $out += "</a></li> ", $line = 130), $out += " ", 
            $line = 131, pageCount >= page + 2 && ($out += ' <li><a href="#">', $line = 132, 
            $out += $escape(page + 2), $out += "</a></li> ", $line = 133), $out += " ", $line = 134, 
            pageCount >= page + 3 && ($out += ' <li><a href="#">', $line = 135, $out += $escape(page + 3), 
            $out += "</a></li> ", $line = 136), $out += " <li ", $line = 138, page == pageCount && ($out += 'class="disabled"', 
            $line = 138), $out += '><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li> </ul> </nav> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="clearfix searchspin">\r\n        <dl style="height: 30px;">\r\n            <dt>筛选条件:</dt>\r\n            <dd>\r\n                <form action="" method="get">\r\n                    条件筛选:\r\n                    <select name="ts-field">\r\n                        <option value="id"  alias="obj">ID</option>\r\n                        <option value="uname"  alias="u">用户名</option>\r\n                        <option value="name" alias="r">角色</option>\r\n                        <option value="name" alias="u">姓名</option>\r\n                    </select>\r\n                    <select class="ts-select-type" name="where[id][0]">\r\n                        <option value="eq">=</option>\r\n                        <option value="gt">&gt;</option>\r\n                        <option value="lt">&lt;</option>\r\n                        <option value="like">像</option>\r\n                    </select>\r\n                    <input name="ts-alias" type="hidden" value="1">\r\n                    <input class="ts-value" name="where[id][1]" value="">\r\n                    <button class="btn btn-primary btn-xs ts-search">收索</button>\r\n                    <br/>\r\n                    <br/>\r\n                </form>\r\n            </dd>\r\n        </dl>\r\n\r\n        <a class="kehu uploadify-button" href="{{\'U\' | F:\'edit\'}}" role="button">添加管理员</a>\r\n    </div>\r\n    <div class="spin-cont">\r\n        <form action="" method="get" class="data-list">\r\n            <table class="table table-hover table-bordered">\r\n                <tr class="active">\r\n                    <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th>\r\n                    <th ts-order="obj.id" class="ts-order"\r\n                        order-desc="{{if order[\'obj.id\']==\'desc\'}}1{{else}}0{{/if}}">\r\n                        ID <a>{{if order[\'obj.id\']==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="uname" class="ts-order"\r\n                        order-desc="{{if order.uname==\'desc\'}}1{{else}}0{{/if}}">\r\n                        用户名 <a>{{if order.uname==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n\r\n                    <th ts-order="name" class="ts-order"\r\n                        order-desc="{{if order.name==\'desc\'}}1{{else}}0{{/if}}">\r\n                        姓名 <a>{{if order.name==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="rname" class="ts-order"\r\n                        order-desc="{{if order.rname==\'desc\'}}1{{else}}0{{/if}}">\r\n                        角色 <a>{{if order.rname==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="ctime" class="ts-order"\r\n                        order-desc="{{if order.ctime==\'desc\'}}1{{else}}0{{/if}}">\r\n                        创建时间 <a>{{if order.ctime==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="utime" class="ts-order"\r\n                        order-desc="{{if order.utime==\'desc\'}}1{{else}}0{{/if}}">\r\n                        修改时间 <a>{{if order.utime==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th style="width: 125px">操作</th>\r\n                </tr>\r\n\r\n                {{each data as row i}}\r\n                <tr>\r\n                    <td>{{if row.id!=1}}<input name="id[]" type="checkbox" value="{{row.id}}">{{/if}}</td>\r\n                    <td>\r\n                        {{row.id}}\r\n                    </td>\r\n                    <td>\r\n                        {{row.uname}}\r\n                    </td>\r\n                    <td>\r\n                        {{row.name}}\r\n                    </td>\r\n                    <td>\r\n                        {{row.rname}}\r\n                    </td>\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.ctime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.utime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n                    <td><a class="gray" href="{{\'U\' | F:\'edit\'}}?id={{row.id}}"\r\n                           role="button">修改</a>\r\n\r\n                        {{if row.id!=1}}\r\n                            {{if row.status==1}}&nbsp;&nbsp;\r\n                                <a href="#" class="ts_forbid gray" data-status="2" id="{{row.id}}">\r\n                                    禁用\r\n                                </a>\r\n\r\n                                {{else if row.status==2}}\r\n                                &nbsp;&nbsp;\r\n                                <a href="#" class="ts_forbid gray" data-status="1" id="{{row.id}}">\r\n                                    启用\r\n                                </a>\r\n                            {{/if}}\r\n                            &nbsp;&nbsp;\r\n                            <a href="#" class="ts_remove gray" id="{{row.id}}">\r\n                                删除\r\n                            </a>\r\n                        {{/if}}\r\n                    </td>\r\n                </tr>\r\n                {{/each}}\r\n            </table>\r\n        </form>\r\n\r\n        <div class="clearfix mt16">\r\n            <button class="gray-btn remove_select" type="button">删除选中</button>\r\n            <nav style="float: right">\r\n                <ul class="pagination">\r\n                    <li\r\n                    {{if page==1}}class="disabled"{{/if}}><a href="#" aria-label="Previous"><span\r\n                        aria-hidden="true">«</span></a></li>\r\n                    {{if (page-3)>0}}\r\n                    <li><a href="#">{{page-3}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-2)>0}}\r\n                    <li><a href="#">{{page-2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-1)>0}}\r\n                    <li><a href="#">{{page-1}}</a></li>\r\n                    {{/if}}\r\n                    <li class="active"><a href="#">{{page}}</a></li>\r\n                    {{if (page+1)<=pageCount}}\r\n                    <li><a href="">{{page+1}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+2)<=pageCount}}\r\n                    <li><a href="#">{{page+2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+3)<=pageCount}}\r\n                    <li><a href="#">{{page+3}}</a></li>\r\n                    {{/if}}\r\n                    <li\r\n                    {{if page==pageCount}}class="disabled"{{/if}}><a href="#" aria-label="Next"><span\r\n                        aria-hidden="true">»</span></a></li>\r\n                </ul>\r\n            </nav>\r\n        </div>\r\n\r\n    </div>\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();