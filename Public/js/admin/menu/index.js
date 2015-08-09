define(['jquery','fun','layer'],function(j,f,layer){
    TS.addLink();
    var  bind = {};

    f.onclick('.ts-moveUp', function () { /* 移动节点位置 */
        var $this = j(this);
        var data = {
            'id':$this.parents('tr').find('input[name=id\\[\\]]').val(),
            'pid':$this.attr('data-pid')
        }
        layer.confirm('你确定要置顶么？', {icon: 3}, function(index){
            layer.close(index);
            f.ajax(f.U('moveTop'), function (data){
                f.alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:3});
                j('.ts-search').trigger('click');
            }, $this,data, 'post');
        });
        return false;
    },1);




    function init(){
        for(var i in bind){
            bind[i]();
        }
    }
    return {
        init:init
    };
});