define(['jquery','fun','validate_cn'],function(j,f,v){
    TS.addLink();
    var  bind = {};


    bind.checkd = function(){ /* 赋值选中 */
        var data = eval('window.' + TS.data_var+'.data');
        f.checkd(data);
    }


    bind.verify = function(){ /* 表单验证 */
        j("#edit").validate({
            rules: {
                name:{required:true}            },
            messages: {
               name:{"required":"true"}            }});
    }






    f.onclick('#edit [type="submit"]:button',function(){ /* 提交数据 */
        var $form = j("#edit");
        var $this = this;
        if($form.valid()){
            f.ajax($form.attr('action'),function(data){
                if(data.status=='info' && data.info=='添加成功'){
                    $form.find('[type="reset"]:button').trigger('click');
                }else if(data.status=='info'){
                    window.setTimeout(function(){
                    window.location.href= f.U('index');
                    },2000);
                }
            data.content = data.content || '';
            f.alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:3});
            },$this,$form.serialize(),'post');
        }
        $this.data('click',0);
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