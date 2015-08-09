<?php
namespace Home\Controller;
use Common\Controller\CommonController;
use Think\Upload;

class UploadController extends CommonController {


   public function img(){
       $this->setAjax();
       $dir = I('request.dir','other');
       $config = array(
           'maxSize'       =>  1024*1024*2,
           'exts'          =>  array('jpg', 'gif', 'png', 'jpeg','bmp'),
           'rootPath'      => './Public/img/upload/',
           'savePath'      =>  $dir.'/'.date('Y',time()).'/'.date('m',time()).'/'.date('d',time()).'/',
           'subName'       => false,
           'saveName'      =>    array('uniqid','')
       );
       if($dir=='head_portrait'){
           $uid = I('request.uid','0');
           $config['savePath'] = $dir.'/'.intval($uid/1000000).'/'.intval($uid/10000).'/'.intval($uid/100).'/';
           $config['saveExt'] = 'jpg';
           $config['saveName'] = "$uid";
           $config['replace'] = true;
       }

       $uploader = new Upload($config);
       $info = $uploader->uploadOne($_FILES['Filedata']);
       if($info){
           $data['status'] = 'info';
           $data['title'] = "上传成功";
           $data['pic'] = 'upload/'.$info['savepath'].$info['savename'];  //得到上传后的路径
       }else{
           $data['status'] = 'warning';
           $data['title'] = "上传失败";
           $data['content'] = $uploader->getError();
       }
       $this->displays($data);
   }





}