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
    /*v:19*/
    template("index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, order = $data.order, $each = $utils.$each, data = $data.data, page = ($data.row, 
            $data.i, $data.page), pageCount = $data.pageCount, $1 = $data.$1, $2 = $data.$2, $out = "";
            return $out += '<div class="ts-container"> <div class="clearfix searchspin"> <dl style="height: 30px;"> <dt>筛选条件:</dt> <dd> <form action="" method="get"> 条件筛选: <select name="ts-field"> <option value="id">角色id</option> <option value="name">名称</option> <option value="description">描述</option> <option value="ctime">创建时间</option> <option value="utime">修改时间</option> <option value="status">状态</option> </select> <select class="ts-select-type" name="where[id][0]"> <option value="eq">=</option> <option value="gt">&gt;</option> <option value="lt">&lt;</option> <option value="like">像</option> </select> <input class="ts-value" name="where[id][1]" value=""> <button class="btn btn-primary btn-xs ts-search">收索</button> <br/> <br/> </form> </dd> </dl> <a class="kehu uploadify-button" href="', 
            $line = 29, $out += $escape($helpers.F("U", "edit")), $out += '" role="button">添加角色</a> </div> <div class="spin-cont"> <form action="" method="get" class="data-list"> <table class="table table-hover table-bordered"> <tr class="active"> <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th> <th ts-order="id" class="ts-order" order-desc="', 
            $line = 37, "desc" == order.id ? ($out += "1", $line = 37) : ($out += "0", $line = 37), 
            $out += '"> 角色id <a>', $line = 38, "desc" == order.id ? ($out += "▼", $line = 38) : ($out += "▲", 
            $line = 38), $out += '</a> </th> <th ts-order="name" class="ts-order" order-desc="', 
            $line = 41, "desc" == order.name ? ($out += "1", $line = 41) : ($out += "0", $line = 41), 
            $out += '"> 名称 <a>', $line = 42, "desc" == order.name ? ($out += "▼", $line = 42) : ($out += "▲", 
            $line = 42), $out += '</a> </th> <th ts-order="description" class="ts-order" order-desc="', 
            $line = 45, "desc" == order.description ? ($out += "1", $line = 45) : ($out += "0", 
            $line = 45), $out += '"> 描述 <a>', $line = 46, "desc" == order.description ? ($out += "▼", 
            $line = 46) : ($out += "▲", $line = 46), $out += '</a> </th> <th ts-order="ctime" class="ts-order" order-desc="', 
            $line = 49, "desc" == order.ctime ? ($out += "1", $line = 49) : ($out += "0", $line = 49), 
            $out += '"> 创建时间 <a>', $line = 50, "desc" == order.ctime ? ($out += "▼", $line = 50) : ($out += "▲", 
            $line = 50), $out += '</a> </th> <th ts-order="utime" class="ts-order" order-desc="', 
            $line = 53, "desc" == order.utime ? ($out += "1", $line = 53) : ($out += "0", $line = 53), 
            $out += '"> 修改时间 <a>', $line = 54, "desc" == order.utime ? ($out += "▼", $line = 54) : ($out += "▲", 
            $line = 54), $out += '</a> </th> <th style="width: 150px">操作</th> </tr> ', $line = 58, 
            $each(data, function(row) {
                $out += " <tr> <td>", $line = 60, 1 != row.id && ($out += '<input name="id[]" type="checkbox" value="', 
                $line = 60, $out += $escape(row.id), $out += '">', $line = 60), $out += "</td> <td> ", 
                $line = 62, $out += $escape(row.id), $out += " </td> <td> ", $line = 65, $out += $escape(row.name), 
                $out += " </td> <td> ", $line = 68, $out += $escape(row.description), $out += " </td> <td> ", 
                $line = 71, $out += $escape($helpers.F("dateFormat", row.ctime, "yyyy-MM-dd hh:mm:ss")), 
                $out += " </td> <td> ", $line = 75, $out += $escape($helpers.F("dateFormat", row.utime, "yyyy-MM-dd hh:mm:ss")), 
                $out += ' </td> <td><a class="gray" href="', $line = 77, $out += $escape($helpers.F("U", "edit")), 
                $out += "?id=", $line = 77, $out += $escape(row.id), $out += '">修改</a>&nbsp;&nbsp; <a class="gray user-list" data-id="', 
                $line = 78, $out += $escape(row.id), $out += '" href="', $line = 78, $out += $escape($helpers.F("U", "userList")), 
                $out += "?id=", $line = 78, $out += $escape(row.id), $out += '">成员列表</a> ', $line = 79, 
                1 != row.id && ($out += '&nbsp;&nbsp; <a href="#" class="ts_remove gray" id="', 
                $line = 80, $out += $escape(row.id), $out += '"> 删除 </a> ', $line = 83), $out += " </td> </tr> ", 
                $line = 86;
            }), $out += ' </table> </form> <div class="clearfix mt16"> <button class="gray-btn remove_select" type="button">删除选中</button> <nav style="float: right"> <ul class="pagination"> <li ', 
            $line = 94, 1 == page && ($out += 'class="disabled"', $line = 94), $out += '><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li> ', 
            $line = 96, page - 3 > 0 && ($out += ' <li><a href="#">', $line = 97, $out += $escape(page - 3), 
            $out += "</a></li> ", $line = 98), $out += " ", $line = 99, page - 2 > 0 && ($out += ' <li><a href="#">', 
            $line = 100, $out += $escape(page - 2), $out += "</a></li> ", $line = 101), $out += " ", 
            $line = 102, page - 1 > 0 && ($out += ' <li><a href="#">', $line = 103, $out += $escape(page - 1), 
            $out += "</a></li> ", $line = 104), $out += ' <li class="active"><a href="#">', 
            $line = 105, $out += $escape(page), $out += "</a></li> ", $line = 106, pageCount >= page + 1 && ($out += ' <li><a href="">', 
            $line = 107, $out += $escape(page + 1), $out += "</a></li> ", $line = 108), $out += " ", 
            $line = 109, pageCount >= page + 2 && ($out += ' <li><a href="#">', $line = 110, 
            $out += $escape(page + 2), $out += "</a></li> ", $line = 111), $out += " ", $line = 112, 
            pageCount >= page + 3 && ($out += ' <li><a href="#">', $line = 113, $out += $escape(page + 3), 
            $out += "</a></li> ", $line = 114), $out += " <li ", $line = 116, page == pageCount && ($out += 'class="disabled"', 
            $line = 116), $out += '><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li> </ul> </nav> </div> </div> </div> <script id="userList" type="text/html"> <div class="spin-cont"> <table class="table table-hover table-bordered"> <tr class="active"><th>用户名</th><th>姓名</th></tr> ', 
            $line = 129, $out += $escape($1), $out += "if data.length", $line = 129, $out += $escape($2), 
            $out += " ", $line = 130, $out += $escape($1), $out += "each data as row i", $line = 130, 
            $out += $escape($2), $out += " <tr><td>", $line = 131, $out += $escape($1), $out += "row.uname", 
            $line = 131, $out += $escape($2), $out += "</td><td>", $line = 131, $out += $escape($1), 
            $out += "row.name", $line = 131, $out += $escape($2), $out += "</td></tr> ", $line = 132, 
            $out += $escape($1), $out += "/each", $line = 132, $out += $escape($2), $out += " ", 
            $line = 133, $out += $escape($1), $out += "else", $line = 133, $out += $escape($2), 
            $out += ' <tr><td colspan="2"><h3>暂时还没有成员</h3></td></tr> ', $line = 135, $out += $escape($1), 
            $out += "/if", $line = 135, $out += $escape($2), $out += " </table> </div> </script> ", 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="clearfix searchspin">\r\n        <dl style="height: 30px;">\r\n            <dt>筛选条件:</dt>\r\n            <dd>\r\n                <form action="" method="get">\r\n                    条件筛选:\r\n                    <select name="ts-field">\r\n                        <option value="id">角色id</option>\r\n                        <option value="name">名称</option>\r\n                        <option value="description">描述</option>\r\n                        <option value="ctime">创建时间</option>\r\n                        <option value="utime">修改时间</option>\r\n                        <option value="status">状态</option>\r\n                    </select>\r\n                    <select class="ts-select-type" name="where[id][0]">\r\n                        <option value="eq">=</option>\r\n                        <option value="gt">&gt;</option>\r\n                        <option value="lt">&lt;</option>\r\n                        <option value="like">像</option>\r\n                    </select>\r\n                    <input class="ts-value" name="where[id][1]" value="">\r\n                    <button class="btn btn-primary btn-xs ts-search">收索</button>\r\n                    <br/>\r\n                    <br/>\r\n                </form>\r\n            </dd>\r\n        </dl>\r\n        <a class="kehu uploadify-button" href="{{\'U\' | F:\'edit\'}}" role="button">添加角色</a>\r\n    </div>\r\n    <div class="spin-cont">\r\n        <form action="" method="get" class="data-list">\r\n            <table class="table table-hover table-bordered">\r\n                <tr class="active">\r\n                    <th style="width: 35px;"><input class="select-all" type="checkbox" value=""></th>\r\n                    <th ts-order="id" class="ts-order"\r\n                        order-desc="{{if order.id==\'desc\'}}1{{else}}0{{/if}}">\r\n                        角色id <a>{{if order.id==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="name" class="ts-order"\r\n                        order-desc="{{if order.name==\'desc\'}}1{{else}}0{{/if}}">\r\n                        名称 <a>{{if order.name==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="description" class="ts-order"\r\n                        order-desc="{{if order.description==\'desc\'}}1{{else}}0{{/if}}">\r\n                        描述 <a>{{if order.description==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="ctime" class="ts-order"\r\n                        order-desc="{{if order.ctime==\'desc\'}}1{{else}}0{{/if}}">\r\n                        创建时间 <a>{{if order.ctime==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th ts-order="utime" class="ts-order"\r\n                        order-desc="{{if order.utime==\'desc\'}}1{{else}}0{{/if}}">\r\n                        修改时间 <a>{{if order.utime==\'desc\'}}▼{{else}}▲{{/if}}</a>\r\n                    </th>\r\n                    <th style="width: 150px">操作</th>\r\n                </tr>\r\n                {{each data as row i}}\r\n                <tr>\r\n                    <td>{{if row.id!=1}}<input name="id[]" type="checkbox" value="{{row.id}}">{{/if}}</td>\r\n                    <td>\r\n                        {{row.id}}\r\n                    </td>\r\n                    <td>\r\n                        {{row.name}}\r\n                    </td>\r\n                    <td>\r\n                        {{row.description}}\r\n                    </td>\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.ctime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n\r\n                    <td>\r\n                        {{\'dateFormat\' | F:row.utime,\'yyyy-MM-dd hh:mm:ss\'}}\r\n                    </td>\r\n                    <td><a class="gray" href="{{\'U\' | F:\'edit\'}}?id={{row.id}}">修改</a>&nbsp;&nbsp;\r\n                        <a class="gray user-list" data-id="{{row.id}}" href="{{\'U\' | F:\'userList\'}}?id={{row.id}}">成员列表</a>\r\n                        {{if row.id!=1}}&nbsp;&nbsp;\r\n                        <a href="#" class="ts_remove gray" id="{{row.id}}">\r\n                            删除\r\n                        </a>\r\n                        {{/if}}\r\n                    </td>\r\n                </tr>\r\n                {{/each}}\r\n            </table>\r\n        </form>\r\n        <div class="clearfix mt16">\r\n            <button class="gray-btn remove_select" type="button">删除选中</button>\r\n            <nav style="float: right">\r\n                <ul class="pagination">\r\n                    <li\r\n                    {{if page==1}}class="disabled"{{/if}}><a href="#" aria-label="Previous"><span\r\n                        aria-hidden="true">«</span></a></li>\r\n                    {{if (page-3)>0}}\r\n                    <li><a href="#">{{page-3}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-2)>0}}\r\n                    <li><a href="#">{{page-2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page-1)>0}}\r\n                    <li><a href="#">{{page-1}}</a></li>\r\n                    {{/if}}\r\n                    <li class="active"><a href="#">{{page}}</a></li>\r\n                    {{if (page+1)<=pageCount}}\r\n                    <li><a href="">{{page+1}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+2)<=pageCount}}\r\n                    <li><a href="#">{{page+2}}</a></li>\r\n                    {{/if}}\r\n                    {{if (page+3)<=pageCount}}\r\n                    <li><a href="#">{{page+3}}</a></li>\r\n                    {{/if}}\r\n                    <li\r\n                    {{if page==pageCount}}class="disabled"{{/if}}><a href="#" aria-label="Next"><span\r\n                        aria-hidden="true">»</span></a></li>\r\n                </ul>\r\n            </nav>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<script id="userList" type="text/html">\r\n    <div class="spin-cont">\r\n        <table class="table table-hover table-bordered">\r\n            <tr class="active"><th>用户名</th><th>姓名</th></tr>\r\n            {{$1}}if data.length{{$2}}\r\n                {{$1}}each data as row i{{$2}}\r\n                <tr><td>{{$1}}row.uname{{$2}}</td><td>{{$1}}row.name{{$2}}</td></tr>\r\n                {{$1}}/each{{$2}}\r\n            {{$1}}else{{$2}}\r\n               <tr><td colspan="2"><h3>暂时还没有成员</h3></td></tr>\r\n            {{$1}}/if{{$2}}\r\n        </table>\r\n    </div>\r\n</script>\r\n\r\n\r\n\r\n'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    }), /*v:25*/
    template("edit", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, id = $data.id, $escape = $utils.$escape, $each = $utils.$each, power = $data.power, $out = ($data.row, 
            $data.i, "");
            return $out += '<div class="ts-container"> <div class="spin-cont"> <div class="user-hd"> <h2>', 
            $line = 4, id ? ($out += "编辑", $line = 4) : ($out += "添加", $line = 4), $out += '角色</h2> <a class="kehu" href="#"> 返回 </a> </div> <div class="user_zl"> <div class="container-fluid"> <form action="', 
            $line = 12, $out += $escape($helpers.F("U", "doEdit")), $out += '" id="edit" method="get"> <dl class="clearfix"> <dt>名称：</dt> <dd> <input name="name" class="bg-input w229" type="text" value=""></dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt>描述：</dt> <dd> <textarea name="description" class="bg-textarea w229"></textarea> </dd> <dd class="error_message"></dd> </dl> <dl class="clearfix"> <dt>角色权限：</dt> <dd class="permission_list"> ', 
            $line = 30, $each(power, function(row) {
                $out += " ", $line = 31, row.lft != row.rght - 1 && ($out += ' <div class="clear"></div> ', 
                $line = 33), $out += ' <div class="level_', $line = 35, $out += $escape(row.deep), 
                $out += '"> <label> <input name="power_ids[]" ', $line = 37, 1 == id && ($out += 'disabled="disabled"', 
                $line = 37), $out += ' value="', $line = 37, $out += $escape(row.id), $out += '" type="checkbox"> <span>', 
                $line = 38, $out += $escape(row.name), $out += "</span> </label> </div> ", $line = 41;
            }), $out += ' </dd> </dl> <dl class="clearfix"> <dt></dt> <dd> <input name="id" type="hidden" value=""> <button class="btn btn-success" type="submit">提交</button> <button class="btn btn-info" type="reset">重置</button> </dd> </dl> </form> </div> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="spin-cont">\r\n        <div class="user-hd">\r\n            <h2>{{if id}}编辑{{else}}添加{{/if}}角色</h2>\r\n            <a class="kehu" href="#">\r\n                返回\r\n            </a>\r\n\r\n        </div>\r\n        <div class="user_zl">\r\n            <div class="container-fluid">\r\n                <form action="{{\'U\' | F:\'doEdit\'}}" id="edit" method="get">\r\n                    <dl class="clearfix">\r\n                        <dt>名称：</dt>\r\n                        <dd>\r\n                            <input name="name" class="bg-input w229" type="text" value=""></dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n                    <dl class="clearfix">\r\n                        <dt>描述：</dt>\r\n                        <dd>\r\n                            <textarea name="description" class="bg-textarea w229"></textarea>\r\n                        </dd>\r\n                        <dd class="error_message"></dd>\r\n                    </dl>\r\n\r\n                    <dl class="clearfix">\r\n                        <dt>角色权限：</dt>\r\n                        <dd class="permission_list">\r\n                            {{each power as row i}}\r\n                                {{if row.lft!=row.rght-1}}\r\n                                <div class="clear"></div>\r\n                                {{/if}}\r\n\r\n                                <div class="level_{{row.deep}}">\r\n                                    <label>\r\n                                        <input name="power_ids[]" {{if id==1}}disabled="disabled"{{/if}} value="{{row.id}}" type="checkbox">\r\n                                        <span>{{row.name}}</span>\r\n                                    </label>\r\n                                </div>\r\n                            {{/each}}\r\n                        </dd>\r\n                    </dl>\r\n                    <dl class="clearfix">\r\n                        <dt></dt>\r\n                        <dd>\r\n                            <input name="id" type="hidden" value="">\r\n                            <button class="btn btn-success" type="submit">提交</button>\r\n                            <button class="btn btn-info" type="reset">重置</button>\r\n                        </dd>\r\n                    </dl>\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();