<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class LoginController extends CommonController {
    protected $mustLogin = false; //不需要登录
    protected $title = '欢迎登录';

    public function index(){ /* 登录页面 */
        $this->stitacEdition = time();
        $this->displays();
    }

    public function setAdminHeader(){

    }

    public function doLogin(){ /* 执行登录操作 */
        $this->setAjax();
        setcookie('PHPSESSID',$_COOKIE['PHPSESSID'],time()+3600*24*365,'/');
        $request = I('request.');
        $this->statusTitle = '登录失败!';
        if(!$request['uname']){
            $this->setError('用户名不能为空!');
        }
        if(!$request['password']){
            $this->setError('密码不能为空!');
        }
        if($request['uname'] && $request['password'] && check_verify($_REQUEST['verify'])){
            $options['where'] = array(-1=>'obj.uid=u.id','uname'=>$request['uname']);
            $options['table'] = array('t_user'=>'u');
            $user = D('AdminUser')->getOne($options);
            if(!$user){
                $this->setError('用户不存在!');
            }elseif($user['status']==1 && $user['password']==md5($_REQUEST['password'])){
                session('isLoggedAdmin',$user['id']);
                $roles = D()->table(array(
                    trueTab('AdminUserRole')=>'aur',
                    trueTab('Role')=>'r'))
                    ->where('aur.rid=r.id AND aur.a_u_id='.$user['id'])->field('r.name')->select();
                foreach($roles as $k=>$row){
                    $role[] = $row['name'];
                }
                $user['role'] = implode('|',$role);
                session('adminUserInfo',$user);
                session('ipAdmin',$_SERVER['REMOTE_ADDR']);
                $save['id'] = $user['uid'];
                $save['ip'] = $_SERVER['REMOTE_ADDR'];
                D('User')->data($save)->save(); //记录登录ip
                cookie('uid',$user['uid'],3600*24*30*6); //用户id
                if($request['remember']){
                  cookie('autoLogin',md5(md5($user['password'].$user['key'])),3600*24*30*6); //加密密码
                }
                /* 查询用户权限 */
                $super = D('AdminUserRole')->where('rid AND a_u_id='.$user['id'])->find();//判断是否是超级管理员
                if($super){
                    $power = D('Power')->field('url')->select();
                }else{
                    $table = array(
                        trueTab('power')=>'p',
                        trueTab('RolePower')=>'rp',
                        trueTab('AdminUserRole')=>'aur',
                        trueTab('Role')=>'r'
                    );
                    $power = D()->where('rp.pid=p.id
                        AND aur.rid=rp.rid
                        AND r.id=aur.rid
                        AND r.status=1
                        AND p.status=1
                        AND aur.a_u_id='.$user['id'])
                        ->field('url')
                        ->table($table)
                        ->distinct(true)
                        ->select();
                }
                foreach($power as $key => $value){
                    $powers[] = $value['url'];
                }
                session('power',$powers);

                $this->statusTitle = '登录成功!';
            }elseif($user['status']==2){
                $this->setError('帐号已被禁用!');
            }else{
                $this->setError('密码不正确!');
            }
        }else{
            $this->setError('验证码错误!');
        }
        $this->displays();
    }




}

