<?php
namespace Home\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class LoginController extends CommonController {
    protected $mustLogin = false; //不需要登录
    protected $title = '欢迎登录';

    public function index(){ /* 登录页面 */
        $this->displays();
    }

    public function doLogin(){ /* 执行登录操作 */
        $this->setAjax();
        setcookie('PHPSESSID',$_COOKIE['PHPSESSID'],time()+3600*24*365,'/');
        $request = I('request.');
        $data['status'] = 'warning';
        $data['title'] = '登录失败!';
        if(!$request['uname']){
            $data['content'][] = '用户名不能为空!';
        }
        if(!$request['password']){
            $data['content'][] = '密码不能为空!';
        }
        if($request['uname'] && $request['password'] && check_verify($_REQUEST['verify'])){
            $options['where'] = array('uname'=>$request['uname']);
            $user = D('User')->getOne($options);
            if(!$user){
                $data['content'][] = '用户不存在!';
            }elseif($user['password']==md5($_REQUEST['password'])){
                session('isLogged',$user['id']);
                session('userInfo',$user);
                session('ip',$_SERVER['REMOTE_ADDR']);
                $save['id'] = $user['id'];
                $save['ip'] = $_SERVER['REMOTE_ADDR'];
                D('User')->data($save)->save(); //记录登录ip
                cookie('uid',$user['id'],3600*24*30*6); //用户id
                if($request['remember']){
                  cookie('autoLogin',md5(md5($user['password'].$user['key'])),3600*24*30*6); //加密密码
                }
                $data['status'] = 'info';
                $data['title'] = '登录成功!';
                $data['content'][] = '';
            }else{
                $data['content'][] = '密码不正确!';
            }
        }else{
            $data['content'][] = '验证码错误!';
        }
        $data['content'] = implode('<br />',$data['content']);
        $this->displays($data);
    }


    public function loginOut(){ /* 退出登录 */
        $this->setAjax();
        session(null);
        cookie('uid',null);
        cookie('autoLogin',null);
        $data['status'] = 'info';
        $data['title'] = '提示:';
        $data['content'] = '成功退出!';
        $this->displays($data);
    }

}

