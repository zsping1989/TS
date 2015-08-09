
define(['jquery','fun'],function(j,f){
    TS.addLink();
    var  bind = {};
    bind.checkd = function(){ /* 赋值选中 */
        var data = eval('window.' + TS.data_var+'.where');
        var res = {};
        for(var i in data){
            res['ts-field'] = i;
            res['ts-select-type'] = data[i][0];
            res['ts-value'] = res['ts-select-type']=='like' ? data[i][1].replace(/\%/g,'') : data[i][1];
        }
        f.checkd(res);
    }


    f.click('.ts_forbid',function(){ /* 禁用用户 */
        var $this = this;
        var data = {'id':$this.attr('id'),'status':$this.attr('data-status')};
        f.ajax(f.U('remove'),function(data){
            var content = $.trim($this.html());
            if(data.status=='info'){
                content +='成功!';
                if($this.attr('data-status')==2){
                    $this.attr('data-status','1');
                    $this.html('启用');
                }else{
                    $this.attr('data-status','2');
                    $this.html('禁用');
                }
                data.content = '';
            }else{
                content +='失败!';
            }
            f.alt({status:data.status,statusTitle:content,content:'　'+data.content,close:3});
        },$this,data,'post');
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