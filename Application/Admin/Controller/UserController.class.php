<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class UserController extends CommonController {
    protected $title = "用户管理";

    public function test(){
        $options['where'] = array('id'=>array('obj'=>array('eq',1)));
        ;
        dump_exit(D('User')->relation(true)->select());
        //$options['field'] = array('AdminUserLog'=>array('ip'),'obj'=>array('name','id'),'AdminUser'=>array('id as auid'));
        //D('User')->getLimit(1,$options);
        dump_exit(D('User')->getOne($options));
        dump_exit(D('User')->getLastSql());
    }
    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['where'] = $request['where'];
        $options['order'] = $request['order'];
        $model_name = "User";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "User";
        $options['where'] = array('id'=>$request['id']);
    }


    protected function editSelectLater(&$request,&$data,&$flog){
        if(!$data){
            $this->error('数据不存在!');
        }
        $this->assigns('id',$data['id']);
        $flog = false;
    }


    protected function editShowBefore(&$request,&$data,&$flog){
        $this->setTitle("用户信息");
    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        $save = $request;
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){

    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        $save = $request;
    }


    protected function doEditAddLater(&$request,&$data,&$flog){

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "User";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}