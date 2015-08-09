/**
 * Created by zhang on 15-6-13.
 */
define(TS.modelCore,function(template,glob){
    function init(){
        function strUper(str){ /* 把有下划线的单词大写 */
            str = str.toLowerCase();
            var strs=str.split("_");
            var result = '';
            for(var i in strs){
                result += strs[i].replace(/\b(\w)|\s(\w)/g, function(m){
                    return m.toUpperCase();
                });
            }
            return result;
        }


        function U(url, params,type) { /* 拼接数据地址 */
            if('undefined'!=typeof type){
                var website = TS['_DATA_URL_']+'index.php/';
            }else{
                var website = TS['path_info']['protocol']+'://'+TS['path_info']['host']+'/'+'index.php/';
            }
            if('undefined'==typeof url){
                url = '';
            }
            var url1 = url;
            if(!url1){
                website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+strUper(eval('TS["'+TS['c_var']+'"]'))+'/'+eval('TS["'+TS['a_var']+'"]')+'.html';
            }else{
                var url = url.split('/');
                var len = url.length;
                if(len<=1){
                    website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+strUper(eval('TS["'+TS['c_var']+'"]'))+'/'+url[0]+'.html';
                }else if(len==2){
                    website += strUper(eval('TS["'+TS['m_var']+'"]'))+'/'+url[0]+'/'+url[1]+'.html';
                }else if(len>=3){
                    website += url1+'.html';
                }
            }
            if('undefined'!=typeof params){
                website += '?'+params;
            }
            return website;
        }
        try{
            glob.data = glob.disposeData(eval('window.'+TS.data_var));
            var M = glob.M;
        }catch (e){
            var M = {};
        }

        function dateFormat(date, format) {//格式化时间方法
            if(typeof(format)!='string'){
                var now = new Date();
                var timestamp = now - (date * 1000);
                if (timestamp < 60000) {
                    var timeNum = Math.floor(timestamp / 1000);
                    if (timeNum < 1) {
                        return '刚刚';
                    }
                    return timeNum + '秒前';
                } else if (timestamp < 60000 * 60) {
                    return Math.floor(timestamp / 60000) + '分钟前';
                } else if (timestamp < 60000 * 60 * 24) {
                    return Math.floor(timestamp / (60000 * 60)) + '小时前';
                } else if (timestamp < 60000 * 60 * 24 * 30) {
                    return Math.floor(timestamp / (60000 * 60 * 24)) + '天前';
                } else if (timestamp < 60000 * 60 * 24 * 30 * 12) {
                    return Math.floor(timestamp / (60000 * 60 * 24 * 30)) + '月前';
                } else {
                    return Math.floor(timestamp / (60000 * 60 * 24 * 30 * 12)) + '年前';
                }
            }
            date = new Date(date * 1000);
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                }
                else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        }

        //模板加载成功直接渲染模板
        function F(fn) { //模板中调用外部函数方法,最多支持10个参数传入
            try {
                return eval(fn)(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
            } catch (e) {
                try {
                    return eval('M.'+fn)(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
                }catch(e){
                    dumps(e);
                    return String(e);
                }
            }
        };
        function V(variate,value) { //模板中访问外部变量
            if(value !== undefined){
                eval('this.'+variate+' = '+value);
                return '';
            }
            try {
                return eval('this.'+variate);
            } catch (e) {
                dumps(e);
                return String(e);
            }
        }
        function C(variate,value) { //模板中访问外部变量
            if(value !== undefined){
                eval('TS.'+variate+' = '+value);
                return '';
            }
            try {
                return eval('TS.'+variate);
            } catch (e) {
                dumps(e);
                return String(e);
            }
        }
        function deep(num){
            var str = '|';
            for(var i= 1;i<num;++i){
                str +='—';
            }
            if(num>1){
                return str;
            }
            return '';
        }
        template.helper('V', V); //模板绑定访问外部变量方法
        template.helper('C', C); //模板绑定访问外部变量方法
        template.helper('F', F); //模板绑定调用外部函数方法
        template.helper('U', U); //模板绑定调用外部函数方法
        try{
            var data = eval('window.'+TS.data_var);
            if(typeof data === 'undefined'){
                data = {};
            }
        }catch (e){
            var data = {};
        }
        data.M = M; //内部方法对象
        data.$1 = '{{'; //用于模板中创建模板后续使用
        data.$2 = '}}';
        var html = template(TS.a,data);
        dumps(data);
        if(TS.target == 'body' || !TS.target || !window.document.getElementById(TS.target)){
            //当未设置目标位置或者设置错误时,页面直接渲染整个页面
            window.document.getElementsByTagName('body')[0].innerHTML = html;
        }else{
            window.document.getElementById(TS.target).innerHTML = html;
        }
    }
    init();
    return {
        init : init
    }

});




