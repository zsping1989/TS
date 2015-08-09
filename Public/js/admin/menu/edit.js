TS['link'] = TS['links']['ztree'];
TS.addLink();
define(['jquery','fun','validate_cn','ztree'],function(j,f,v,z){
    var  bind = {};
    function showIconForTree(treeId, treeNode) {
        return !treeNode.isParent;
    };
    bind.ztree = function(){
        var setting = {
            view: {
                showIcon: showIconForTree,
                showIcon:false
            },
            data: {
                simpleData: {
                    enable: true,
                    pIdKey: "parent_id"
                },
                key:{
                    url:'javascript:void(0);'
                }
            },
            callback:{
                onClick:function(event,treeid,treeNode){
                    j('[name=parent_id]').val([treeNode.id]);
                }
            }
        };
        var data = eval('window.' + TS.data_var+'.data') || [];
        var zNodes = eval('window.' + TS.data_var+'.tree');
        zNodes[0]['open']=1;
        j.fn.zTree.init(j("#tree"), setting, zNodes);
        var treeObj = j.fn.zTree.getZTreeObj("tree");
        var node =  treeObj.getNodeByParam('id',data['parent_id'],null);
        treeObj.selectNode(node);
    }

    bind.checkd = function(){ /* 赋值选中 */
        var data = eval('window.' + TS.data_var+'.data') || [];
        data['old_parent_id'] = data.parent_id;
        for(var i in data){
            var obj = j('[name="'+i+'"]');
            if(obj.length){
                obj.val([data[i]]);
            }else{
                j('[name="'+i+'\\[\\]"]').val([data[i]]);
            }
        }
    }


    bind.verify = function(){ /* 表单验证 */
        j("#edit").validate({
            rules: {
                name:{required:true},url:{required:true}
            },messages: {
               name:{"required":"必须填写名称!"},url:{"required":"url必填!"}
            },errorPlacement: function(error, element) {
                element.parents('dl').find('.error_message').append(error);
            }
        });
    }



    f.onclick('#edit [type="submit"]:button',function(){ /* 提交数据 */
        var $form = j("#edit");
        var $this = this;
        if($form.valid()){
            f.ajax($form.attr('action'),function(data){
                if(data.status=='info' && data.info=='添加成功'){
                    //$form.find('[type="reset"]:button').trigger('click');
                }else if(data.status=='info'){
                    window.setTimeout(function(){
                    window.location.href= f.U('index');
                    },2000);
                }
                f.alt({status:data.status,statusTitle:data.statusTitle,content:'　'+data.content,close:1});
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