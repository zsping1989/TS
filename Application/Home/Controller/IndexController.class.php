<?php
namespace Home\Controller;
use Common\Controller\CommonController;
class IndexController extends CommonController {
    protected $mustLogin = false;

    public function verify(){ //获取验证码
        $img=new \Think\Verify(array(
            'useCurve'  =>  false,
            'fontSize'  =>  30,
            'length'    =>  4,
        ));
        return $img->entry();
    }


    public function index(){
        $this->displays();
    }







}