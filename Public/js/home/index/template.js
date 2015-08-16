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
    /*v:16*/
    template("index", function($data, $filename) {
        try {
            var $utils = this, $helpers = $utils.$helpers, $line = 0, $escape = $utils.$escape, $out = "";
            return $out += '<div class="ts-container"> <div class="fluidHeight container_12"> <div class="sliderContainer"> <div class="iosSlider"> <div class="slider"> <div class="item item1"> <div class="inner"> <div class="text1"><span>Join our campaigns and give <br>hope to homeless people</span></div> </div> </div> <div class="item item2"> <div class="inner"> <div class="text1"><span>Make the right choice! <br>Help those who are in need.</span></div> </div> </div> <div class="item item3"> <div class="inner"> <div class="text1"><span>Our mission is to engage more people in the fight <br> for better life of needy people</span></div> </div> </div> </div> </div> <div class="slideSelectors"> <div class="item selected"></div> <div class="item"></div> <div class="item"></div> </div> </div> </div>  <div class="content"><div class="ic">More Website Templates @ TemplateMonster.com - March 24, 2014!</div> <div class="container_12"> <div class="grid_6"> <h2>满足我们的团队</h2> <img src="', 
            $line = 35, $out += $escape($helpers.C("_IMG_")), $out += 'page1_img1.jpg" alt="" class="img_inner fleft"> <div class="extra_wrapper"> <p class="col2"><a href="#">权威评选机构 </a> </p> 促进大家更友爱 <br> <a href="#" class="btn">了解更多</a> </div> <div class="clear"></div> </div> <div class="grid_5 prefix_1"> <h2>我们的使命</h2> <div class="rel1"> <p>在这里 <span class="col1">你可以免费发布自己的主题加入竞选.</span></p> 这类主题需要什么条件吗? 寻找生活中的幸福的一瞬间,人们的榜样在这里. </div> <a href="#" class="btn">了解更多</a> </div> </div> <div class="hor"></div> <div class="container_12"> <div class="grid_3"> <h2>最新消息</h2> <ul class="list"> <li> <time datetime="2014-01-01">29<span>Jan</span></time> <div class="extra_wrapper"> <div class="title col2"><a href="#">Vivamuagna</a></div> amus at magn malesuada fauc </div> </li> <li> <time datetime="2014-01-01">02<span>Feb</span></time> <div class="extra_wrapper"> <div class="title col2"><a href="#">Dereamuagne</a></div> amus at magn malesuada faut </div> </li> <li> <time datetime="2014-01-01">20<span>Feb</span></time> <div class="extra_wrapper"> <div class="title col2"><a href="#">Hovamuagrt</a></div> emus at mago malesuada fau </div> </li> <li> <time datetime="2014-01-01">05<span>Mar</span></time> <div class="extra_wrapper"> <div class="title col2"><a href="#">Meloamuar</a></div> ferus at magne malesuada faui </div> </li> </ul> <blockquote class="bq1"> <div class="title">推 荐</div> <p>Nulla vel viverra auctorleo magna sodales felis, quis malesuada nibh odio ut </p> <div class="col2">Sandra Wood</div> </blockquote> </div> <div class="grid_9"> <h2>我们的竞选</h2> <section> <ul id="da-thumbs" class="da-thumbs"> <li> <a href="#"> <img src="', 
            $line = 103, $out += $escape($helpers.C("_IMG_")), $out += 'th1.jpg" alt="" /> <div><span>Helping Adults</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 109, $out += $escape($helpers.C("_IMG_")), $out += 'th2.jpg" alt="" /> <div><span>Helping Children</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 115, $out += $escape($helpers.C("_IMG_")), $out += 'th3.jpg" alt="" /> <div><span>Empowering Women</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 121, $out += $escape($helpers.C("_IMG_")), $out += 'th4.jpg" alt="" /> <div><span>Homes for Veterans</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 127, $out += $escape($helpers.C("_IMG_")), $out += 'th5.jpg" alt="" /> <div><span>Saving Lives</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 133, $out += $escape($helpers.C("_IMG_")), $out += 'th6.jpg" alt="" /> <div><span>Invest in Kids</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 139, $out += $escape($helpers.C("_IMG_")), $out += 'th7.jpg" alt="" /> <div><span>Healthy Nutrition</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 145, $out += $escape($helpers.C("_IMG_")), $out += 'th8.jpg" alt="" /> <div><span>Educated World</span></div> </a> </li> <li> <a href="#"> <img src="', 
            $line = 151, $out += $escape($helpers.C("_IMG_")), $out += 'th9.jpg" alt="" /> <div><span>Against Hunger</span></div> </a> </li> </ul> </section> </div> </div> </div> <div class="bottom_block"> <div class="container_12"> <div class="grid_4"> <h3>Stay Informed</h3> <div class="text1">Subscribe to Our Newsletter</div> <form id="newsletter"> <div class="rel"> <div class="success">Your subscribe request has been sent!</div> <label class="email"> <input type="email" value="Enter your Email" > <span class="error">*This is not a valid email address.</span> </label> </div> <a href="#" class="btn" data-type="submit">Submit</a> </form> </div> <div class="grid_5 prefix_3"> <h3>Stay Connected</h3> <div class="text1">Follow Us on Social Media Accounts </div> Cras facilisis, nulla vel viverra auctor, leo magna sodales felis, quis malesuada nibh odio ut velit. Proin pharetra <div class="socials"> <a href="#"><div class="fa fa-twitter"></div></a> <a href="#"><div class="fa fa-facebook"></div></a> <a href="#"><div class="fa fa-pinterest-square"></div></a> <a href="#"><div class="fa fa-google-plus"></div></a> <a href="#"><div class="fa fa-instagram"></div></a> </div> </div> </div> </div> </div>', 
            new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="ts-container">\r\n    <div class="fluidHeight container_12">\r\n        <div class="sliderContainer">\r\n            <div class="iosSlider">\r\n                <div class="slider">\r\n                    <div class="item item1">\r\n                        <div class="inner">\r\n                            <div class="text1"><span>Join our campaigns and give <br>hope to homeless people</span></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="item item2">\r\n                        <div class="inner">\r\n                            <div class="text1"><span>Make the right choice! <br>Help those who are in need.</span></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="item item3">\r\n                        <div class="inner">\r\n                            <div class="text1"><span>Our mission is to engage more people in the fight <br> for better life of needy people</span></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="slideSelectors">\r\n                <div class="item selected"></div>\r\n                <div class="item"></div>\r\n                <div class="item"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--==============================Content=================================-->\r\n    <div class="content"><div class="ic">More Website Templates @ TemplateMonster.com - March 24, 2014!</div>\r\n        <div class="container_12">\r\n            <div class="grid_6">\r\n                <h2>满足我们的团队</h2>\r\n                <img src="{{\'_IMG_\' | C}}page1_img1.jpg" alt="" class="img_inner fleft">\r\n                <div class="extra_wrapper">\r\n                    <p class="col2"><a href="#">权威评选机构 </a>\r\n                    </p>\r\n                    促进大家更友爱 <br>\r\n                    <a href="#" class="btn">了解更多</a>\r\n                </div>\r\n                <div class="clear"></div>\r\n            </div>\r\n\r\n            <div class="grid_5 prefix_1">\r\n                <h2>我们的使命</h2>\r\n                <div class="rel1">\r\n                    <p>在这里 <span class="col1">你可以免费发布自己的主题加入竞选.</span></p>\r\n                    这类主题需要什么条件吗? 寻找生活中的幸福的一瞬间,人们的榜样在这里.\r\n                </div>\r\n                <a href="#" class="btn">了解更多</a>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="hor"></div>\r\n        <div class="container_12">\r\n            <div class="grid_3">\r\n                <h2>最新消息</h2>\r\n                <ul class="list">\r\n                    <li>\r\n                        <time datetime="2014-01-01">29<span>Jan</span></time>\r\n                        <div class="extra_wrapper">\r\n                            <div class="title col2"><a href="#">Vivamuagna</a></div>\r\n                            amus at magn\r\n                            malesuada fauc\r\n                        </div>\r\n                    </li>\r\n                    <li>\r\n                        <time datetime="2014-01-01">02<span>Feb</span></time>\r\n                        <div class="extra_wrapper">\r\n                            <div class="title col2"><a href="#">Dereamuagne</a></div>\r\n                            amus at magn\r\n                            malesuada faut\r\n                        </div>\r\n                    </li>\r\n                    <li>\r\n                        <time datetime="2014-01-01">20<span>Feb</span></time>\r\n                        <div class="extra_wrapper">\r\n                            <div class="title col2"><a href="#">Hovamuagrt</a></div>\r\n                            emus at mago malesuada fau\r\n                        </div>\r\n                    </li>\r\n                    <li>\r\n                        <time datetime="2014-01-01">05<span>Mar</span></time>\r\n                        <div class="extra_wrapper">\r\n                            <div class="title col2"><a href="#">Meloamuar</a></div>\r\n                            ferus at magne malesuada faui\r\n                        </div>\r\n                    </li>\r\n                </ul>\r\n                <blockquote class="bq1">\r\n                    <div class="title">推　荐</div>\r\n                    <p>Nulla vel viverra auctorleo magna sodales felis, quis malesuada nibh odio ut </p>\r\n                    <div class="col2">Sandra Wood</div>\r\n                </blockquote>\r\n            </div>\r\n            <div class="grid_9">\r\n                <h2>我们的竞选</h2>\r\n                <section>\r\n                    <ul id="da-thumbs" class="da-thumbs">\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th1.jpg" alt="" />\r\n                                <div><span>Helping Adults</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th2.jpg" alt="" />\r\n                                <div><span>Helping Children</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th3.jpg" alt="" />\r\n                                <div><span>Empowering Women</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th4.jpg" alt="" />\r\n                                <div><span>Homes for Veterans</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th5.jpg" alt="" />\r\n                                <div><span>Saving Lives</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th6.jpg" alt="" />\r\n                                <div><span>Invest in Kids</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th7.jpg" alt="" />\r\n                                <div><span>Healthy Nutrition</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th8.jpg" alt="" />\r\n                                <div><span>Educated World</span></div>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a href="#">\r\n                                <img src="{{\'_IMG_\' | C}}th9.jpg" alt="" />\r\n                                <div><span>Against Hunger</span></div>\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </section>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="bottom_block">\r\n        <div class="container_12">\r\n            <div class="grid_4">\r\n                <h3>Stay Informed</h3>\r\n                <div class="text1">Subscribe to Our Newsletter</div>\r\n                <form id="newsletter">\r\n                    <div class="rel">\r\n                        <div class="success">Your subscribe request has been sent!</div>\r\n                        <label class="email">\r\n                            <input type="email" value="Enter your Email" >\r\n                            <span class="error">*This is not a valid email address.</span>\r\n                        </label>\r\n                    </div>\r\n                    <a href="#" class="btn" data-type="submit">Submit</a>\r\n                </form>\r\n            </div>\r\n            <div class="grid_5 prefix_3">\r\n                <h3>Stay Connected</h3>\r\n                <div class="text1">Follow Us on Social Media Accounts </div>\r\n                Cras facilisis, nulla vel viverra auctor, leo magna sodales felis, quis malesuada nibh odio ut velit. Proin pharetra\r\n                <div class="socials">\r\n                    <a href="#"><div class="fa fa-twitter"></div></a>\r\n                    <a href="#"><div class="fa fa-facebook"></div></a>\r\n                    <a href="#"><div class="fa fa-pinterest-square"></div></a>\r\n                    <a href="#"><div class="fa fa-google-plus"></div></a>\r\n                    <a href="#"><div class="fa fa-instagram"></div></a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
}();