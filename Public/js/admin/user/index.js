define(['jquery','fun'],function(j,f){
    var  bind = {};
    bind.checkd = function(){ /* 赋值选中 */
        var data = eval('window.' + TS.data_var+'.where');
        var res = {};
        for(var i in data){
            for(var j in data[i]){
                res['where['+i+']['+j+']'] = data[i][j].replace(/\%/g,'');
            }
        }
        f.checkd(res);
    }




    function init(){
        for(var i in bind){
            bind[i]();
        }
    }
    return {
        init:init
    };
});