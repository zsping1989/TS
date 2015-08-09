<?php
namespace Create\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class ModelController extends CommonController {
    protected $title = "模型结构";
    protected $mustLogin = false;


    /* 模型图动态生成的js */
    public function modelGraphJs(){
        $table = D('Table')->getAll();
        $this->display();
    }


    public function modelGraph(){
        $this->displays();
    }

    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['where'] = $request['where'];
        $options['order'] = $request['order'];
        $model_name = "TableRelation";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "TableRelation";
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
        $this->setTitle("模型关系");
    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        $model_name = "TableRelation";
        $save = $request;
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){

    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        $model_name = "TableRelation";
        $save = $request;
    }


    protected function doEditAddLater(&$request,&$data,&$flog){

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "TableRelation";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}