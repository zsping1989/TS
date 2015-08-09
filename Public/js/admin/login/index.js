/**
 * Created by zhang on 15-6-13.
 */
/* 先加载样式 */
TS['link'] = TS['links']['self']+TS['links']['layer'];
TS.addLink();

define(['jquery','validate_cn','layer','fun'],function(j,v,l,f){

    var  bind = {};
    bind.focus = function(){ /* 点击输入框事件 */
        j(".login-form").on("focus", "input", function(){
            j(this).closest('.item').addClass('focus');
        }).on("blur","input",function(){
            j(this).closest('.item').removeClass('focus');
        });
    }


    bind.verify = function () { /* 表单验证 */
        j(".login-form").validate({
            rules: {
                uname: {
                    required: true
                },
                password: {
                    required: true,
                    rangelength: [6, 18]
                }, verify: {
                    required: true,
                    rangelength: [4,4]
                }
            },
            messages: {
                uname: {"required": "请输入用户名"},
                password: {
                    "required": "必须输入密码",
                    "rangelength": "输入密码不正确"
                    },
                verify: {
                    "required": "请输入验证码",
                    "rangelength": "验证码长度不符"}
            },
            errorPlacement: function(error, element) {
                layer.tips(error.html(), element.parent(),{tipsMore: true});
            }
        });
    }


    f.onclick('form [type="submit"]:button', function () { /* 提交数据 */
        var $form = this.parents('form');
        var $this = this;
        if ($form.valid()){
            f.ajax($form.attr('action'), function (data) {
                if(data.status=='info'){
                   window.location.href = f.U('Index/index');
                }else if(data.status){
                    j('.verifyimg').trigger('click');
                    layer.tips(data.statusTitle+':<br />'+data.content, $this);
                }else{
                    j('.verifyimg').trigger('click');
                    layer.tips('警告'+':<br />'+'系统错误', $this);
                }
            }, $this, $form.serialize(), 'post');
        }
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