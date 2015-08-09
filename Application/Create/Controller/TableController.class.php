<?php
namespace Create\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class TableController extends CommonController {
    protected $title = "数据表";
    protected $mustLogin = false;

    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['where'] = $request['where'];
        $options['order'] = $request['order'];
        $model_name = "Table";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "Table";
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
        $this->setTitle("数据表");
    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        $model_name = "Table";
        $save = $request;
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){

    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        $model_name = "Table";
        $save = $request;
    }


    protected function doEditAddLater(&$request,&$data,&$flog){

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "Table";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}