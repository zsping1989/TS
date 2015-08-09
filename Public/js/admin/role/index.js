
define(['jquery','fun','layer','artTemplate'],function(j,f,layer,artTemplate){
    TS.addLink();
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


    f.onclick('.user-list', function () { /* 成员查询 */
        var $this = this;
            f.ajax(f.U('userList'), function (data) {
                if (data.status == 'info') {
                    layer.open({
                        type: 1,
                        title :['成员列表','text-align: center;'],
                        closeBtn: 2,
                        skin: 'yourclass',
                        content: artTemplate('userList',data),
                        area: ['600px','50%'],
                        skin:'radis10'
                    });
                }else{
                    f.alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:3});
                }
            }, $this,{'id':$this.attr('data-id')}, 'post');
        return false;
    }, 1);


    function init(){
        for(var i in bind){
            bind[i]();
        }
    }
    return {
        init:init
    };
});