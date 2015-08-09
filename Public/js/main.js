/**
 * Created by zhangshiping on 15-6-13.
 * 全站通用页面加载调用
 * 张世平
 */
(function (){
    /* 全局对象封装---防止冲突 */
    var url = parseURL(window.location.href);
    var totalStation = {
        m_var : 'm', //框架使用的模块变量名
        c_var : 'c', //框架使用的控制器变量名
        a_var : 'a', //框架使用的方法变量名
        data_var : window.document.getElementById('entrance').getAttribute('data-name') || 'data',
        m : window.document.getElementById('entrance').getAttribute('module-name').toLowerCase(), //模块
        c : window.document.getElementById('entrance').getAttribute('controller-name').toLowerCase(), //控制器
        a : window.document.getElementById('entrance').getAttribute('action-name').toLowerCase(), //方法名
        target : window.document.getElementById('entrance').getAttribute('target') || 'body', //出的页面存放位置
        define : define,
        path_info : url , //页面路径信息
        _DATA_URL_:'http://data.test.com/', //数据地址
        _STATIC_URL_:'http://static.test.com/', //静态文件地址
        _CSS_ : 'http://static.test.com/css/', //样式地址
        _JS_ : 'http://static.test.com/js/', //样式地址
        _TOOLJS_ : 'http://static.test.com/tooljs/', //三方js库
        _IMG_ : 'http://static.test.com/img/', //图片地址
        entrance : window.document.getElementById('entrance').getAttribute('edition'), //js,css等版本号,用于更新浏览器的静态文件
        addLink : function(){ //样式加载
            if('undefined' !== typeof $){
                $(TS['link']).appendTo('head');
            }else if(navigator.userAgent.indexOf('MSIE') >=0 ){ //ie兼容
                requirejs(['jquery'],function(j){
                    $(TS['link']).appendTo('head');
                })
            }else{
                TS['head'] = window.document.getElementsByTagName('head')[0];
                TS['head'].innerHTML = TS['head'].innerHTML + TS['link'];
            }

        }
    };
    try{
        if(!this[totalStation.data_var]){
            this[totalStation.data_var] = {};
        }
    }catch (e){
        this[totalStation.data_var] = {};
    }
    var hdata = window.document.getElementById('entrance').getAttribute('hand-date');
    totalStation.handDate = (!!hdata) || eval('this.'+totalStation.data_var+'.handleDate');
    if(hdata=='false'){
        totalStation.handDate = false;
    }
    /* 如果对象id未入对应的控制器,模块,方法等信息,将自动从url中获取 */
    totalStation.m = totalStation.m || url.segments[0] || 'Home'; //模块
    if(totalStation.m == 'index.php'){ //index.php?a=&m=&c=& 处理此类url
        totalStation.m = url.segments[1] || url.params[totalStation.m_var] || 'home';
        totalStation.c = url.segments[2] || url.params[totalStation.c_var] || 'index';
        totalStation.a = url.segments[3] || url.params[totalStation.a_var] || 'index';
    }else{ //admin/index/index.html  处理静态文件类的url
        totalStation.c = totalStation.c || url.segments[1] || 'index', //控制器
        totalStation.a = totalStation.a || url.segments[2] || 'index' //方法
    }
    totalStation.a = totalStation.a.split('.')[0]; //截取掉后缀名
    totalStation.links = { //公共样式
        "joint" : '<link rel="stylesheet" href="'+totalStation._CSS_+'joint/joint.min.css">',
        'ztree' : '<link rel="stylesheet" href="'+totalStation._CSS_+'ztree/zTreeStyle.css">',
        'layer.ext' : '<link rel="stylesheet" href="'+totalStation._CSS_+'layer/skin/layer.ext.css">',
        'layer' : '<link rel="stylesheet" href="'+totalStation._CSS_+'layer/skin/layer.css">',
        'uploadify' : '<link rel="stylesheet" href="'+totalStation._CSS_+'uploadify/uploadify.css">',
        'bootstrap2' : '<link rel="stylesheet" href="'+totalStation._CSS_+'bootstrap/2.0.4/css/bootstrap.min.css">',
        'bootstrap3' : '<link rel="stylesheet" href="'+totalStation._CSS_+'bootstrap/3.3.4/bootstrap.min.css">',
        'boot-time' : '<link rel="stylesheet" href="'+totalStation._CSS_+'bootstrap/3.3.4/bootstrap-datetimepicker.min.css">',
        'common' : '<link rel="stylesheet" href="'+totalStation._CSS_+'common.css?time='+totalStation['entrance']+'">',
        'self' : '<link rel="stylesheet" href="'+totalStation._CSS_+totalStation.m+'/'+totalStation.c+'/'+totalStation.a+'.css?time='+totalStation['entrance']+'">',
        'self-common' : '<link rel="stylesheet" href="'+totalStation._CSS_+totalStation.m+'/'+totalStation.c+'/common.css?time='+totalStation['entrance']+'">',
        'backend' : '<link rel="stylesheet" href="'+totalStation._CSS_+totalStation.m+'/public/backend.css?time='+totalStation['entrance']+'">',
        'guanli' : '<link rel="stylesheet" href="'+totalStation._CSS_+totalStation.m+'/public/guanlicenter.css?time='+totalStation['entrance']+'">',
        'reset': '<link rel="stylesheet" href="'+totalStation._CSS_+totalStation.m+'/public/reset.css?time='+totalStation['entrance']+'">'
    }
    try{
        for(var i in TS){
            totalStation[i] = TS[i]; //开放到外部修改配置
        }
    }catch (e){
    }
    requirejs.config({
        paths: {
            "underscore" :totalStation._TOOLJS_+'underscore/underscore.min',
            "joint":totalStation._TOOLJS_+'joint/joint',
            "lodash":totalStation._TOOLJS_+'lodash/lodash.min',
            "backbone":totalStation._TOOLJS_+'backbone/backbone.min',
            "ztree": totalStation._TOOLJS_+'ztree/jquery.ztree.core-3.5.min',
            "uploadify": totalStation._TOOLJS_+'uploadify/jquery.uploadify.min',
            "seajs": totalStation._TOOLJS_+'seajs/3.0.1/sea',
            "less": totalStation._TOOLJS_+'less.js/2.5.1/less.min',
            "bootstrap": totalStation._TOOLJS_+'bootstrap/3.3.4/bootstrap.min',
            "boot_time" : totalStation._TOOLJS_+'bootstrap/3.3.4/bootstrap-datetimepicker.min',
            "boot_time_cn" : totalStation._TOOLJS_+'bootstrap/3.3.4/bootstrap-datetimepicker-cn.min',
            "angular": totalStation._TOOLJS_+'angular.js/1.4.0-rc.2/angular.min',
            "fun" : totalStation._STATIC_URL_+'js/public/functions.js?time='+totalStation['entrance'],
            "cookie" : totalStation._TOOLJS_+'jquery-cookie/1.4.1/jquery.cookie.min',
            "jquery" : totalStation._TOOLJS_+"jquery/2.1.4/jquery.min",
            "layer" : totalStation._TOOLJS_+"layer/layer",
            "validate" : totalStation._TOOLJS_+"jquery-validate/1.13.1/jquery.validate.min",
            "validate_cn" : totalStation._TOOLJS_+"jquery-validate/1.13.1/validate_cn",
            "artTemplate" : totalStation._TOOLJS_+"artTemplate.js/3.0.0/template.min",
            "pubtpl" : totalStation._STATIC_URL_+'js/public/template.js?time='+totalStation['entrance'], //模板模板渲染
            "template" : totalStation._STATIC_URL_+'js/'+totalStation.m+'/'+totalStation.c+'/'+'template.js?time='+totalStation['entrance'], //模板模板渲染
            "handDate" : totalStation._STATIC_URL_+'js/'+totalStation.m+'/'+totalStation.c+'/'+totalStation.a+'-model.js?time='+totalStation['entrance'], //数据处理
            "model" : totalStation._STATIC_URL_+'js/main-model.js?time='+totalStation['entrance'], //模板渲染
            "contoller" : totalStation._STATIC_URL_+'js/'+totalStation.m+'/'+totalStation.c+'/'+totalStation.a+'.js?time='+totalStation['entrance'] //事件绑定
        }
    });
    if(totalStation.a=='model_graph'){
        requirejs.config({
                paths:{
                    "contoller" : 'http://www.test.com/index.php/Create/Model/modelGraphJs.html?a='+Math.random()  //事件绑定
                }});
    }
    totalStation.core = ['jquery','contoller','template','model']; //核心加载--不允许外部配置
    totalStation.modelCore = ['template'];
    if(totalStation.handDate){ //数据处理加载对应的model
        totalStation.modelCore[1] = 'handDate';
    }
    window.TS = totalStation; //将此对象赋值给window对象,共全局使用

    requirejs(totalStation.core, function (j,contoller,template,model){
        contoller.init(); //初始化页面事件
        if("undefined" !== typeof TS['youerDefine']){
            window.define = TS['youerDefine'];
            TS['youerDefine'] = undefined;
        }
    });
    /* 获取路径参数 */
    function parseURL(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }

})();

/* 调试打印 */
function dumps(){
    for (var i = 0; i < arguments.length; ++i) {
        console.log(arguments[i]);
    }
}
