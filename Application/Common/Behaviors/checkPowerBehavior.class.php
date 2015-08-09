<?php
/**
 * Created by PhpStorm.
 * User: zhang
 * Date: 14-11-14
 * Time: 下午3:50
 */

namespace Common\Behaviors;

//检验后台操作权限,以及登录权限
use Admin\Model\UserModel;
use Think\Behavior;

class checkPowerBehavior extends Behavior{
    public function run(&$param){
        /* 自动登录功能 */
        if(MODULE_NAME=='Admin' && !session('isLoggedAdmin') && cookie('autoLogin') && cookie('uid')){
            $options['where'] = array('u.id'=>cookie('uid'),'au.status=1');
            $options['table'] = array('t_user'=>'u',trueTab('AdminUser')=>'au');
            $user = D()->table($options['table'])->where('au.uid=u.id')->where($options['where'])->find();
            if($user['ip']!=$_SERVER['REMOTE_ADDR']&& U()!='/index.php/Admin/Login/index.html'){
                jump(U('Login/index'),'',0);
                exit;
            }elseif(md5(md5($user['password'].$user['key']))==cookie('autoLogin')){
                setcookie('PHPSESSID',$_COOKIE['PHPSESSID'],time()+3600*24*365,'/');
                session('isLoggedAdmin',$user['id']); //admin_user的id

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
            }
        }

        if (MODULE_NAME == 'Admin') {
            /* 操作日志 */
            $data['ctime'] = NOW_TIME;
            $data['ip'] = get_client_ip();
            $data['url'] = U();
            $data['uid'] = session('isLoggedAdmin');
            $data['parameters'] = json_encode($_REQUEST);
            D()->table(trueTab('adminUserLog'))->data($data)->add();
            $whiteList = array(
                '/index.php/Admin/Login/index.html',
                '/index.php/Admin/Login/doLogin.html',
                '/index.php/Admin/Index/index.html'
            );
            /* 检查用户权限 */
            $p = session('power') ? session('power') : array();
            if(!in_array(U(),array_merge($p,$whiteList))){
                $reslut['status'] = 'warning';
                $reslut['content'] = '你还没有访问权限,请联系管理员!';
                if($_GET['ajax'] || $_SERVER['HTTP_HOST']=='data.test.com'){
                    header('Content-Type:application/json; charset=utf-8');
                    //exit(json_encode($reslut));
                }
                //exit('你还没有访问权限,请联系管理员!<a href="/index.php/Admin/Login/index.html">登录</a>');
            }
        }
    }
} 