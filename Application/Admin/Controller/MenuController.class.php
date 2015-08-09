<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class MenuController extends CommonController {
    protected $title = "菜单管理";


    public function moveTop(){ /* 将节点向上移动 */
        $this->setAjax();
        $request = I('request.');
        $this->statusContent = '置顶成功!';
        if(!($request['id'])){
            $this->statusTitle = '置顶失败';
            $this->setError('参数错误!');
        }else{
            $near_id = D('Power')->getChilds($request['pid']);
            if (!($request['id'] == $near_id[0]['id'] || D('Power')->moveNear($request['id'], $near_id[0]['id']))) {
                $this->setError('置顶失败!');
            }
        }
        $this->displays();
    }

    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['where'] = $request['where'];
        $options['order'] = array_merge(array('lft'=>'ASC'),$request['order']?$request['order']:array());
        $model_name = "Power";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "Power";
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
        $this->setTitle("权限");
        $this->assigns('tree',D('Power')->getAllChilds());
    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        $model_name = "Power";
        $save = $request;
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){

    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        $model_name = "Power";
        $save = $request;
    }


    protected function doEditAddLater(&$request,&$data,&$flog){

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "Power";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}