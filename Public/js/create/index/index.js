/**
 * Created by zhang on 15-6-13.
 */
/* 先加载样式 */
define(['jquery','artTemplate','fun'],function(j,artTemplate,f){
    TS.addLink();
    var  bind = {};
    f.onclick('form .create',function(){
        var $this = this;
        var $form = $this.parents('form');
        f.ajax($form.attr('action'),function(data) {
            f.alt({status:data.status,statusTitle:data.statusTitle,content:data.content,close:6});
        }, $this, $form.serialize(), 'post');
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