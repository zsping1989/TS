/**
 * Created by zhang on 15-6-13.
 */
define(function(){
    var handleData = {
    };

    /* 模板中需要用的函数 */
   var M = {

    }




    
    var glob = {
        M : M,
        disposeData : disposeData
    }

    /* 处理数据 */
    function disposeData(data){
        for(var i in handleData){
            data = handleData[i](data);
        }
        return data;
    }
    return glob;
});