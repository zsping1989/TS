<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class RoleController extends CommonController {
    protected $title = "角色管理";

    public function userList(){ /* 查询角色列表 */
        $this->setAjax();
        $request = I('request.');
        $table = array(
            trueTab('AdminUserRole')=>'aur',
            trueTab('User')=>'u',
            trueTab('AdminUser')=>'au'
        );
        $data['data'] = D('AdminUserRole')
            ->table($table)
            ->where('u.id=au.uid AND au.id=aur.a_u_id AND au.status=1 AND aur.rid='.$request['id'])
            ->field('au.id,u.name,u.uname')
            ->select();
        $data['data'] = $data['data'] ? $data['data'] : array();
        if($data['data']===false){
            $this->setError('查询失败!');
        }
        $this->displays($data);

    }

    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['where'] = $request['where'];
        $options['order'] = $request['order'];
        $model_name = "Role";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "Role";
        $options['where'] = array('id'=>$request['id']);
    }


    protected function editSelectLater(&$request,&$data,&$flog){
        if(!$data){
            $this->error('数据不存在!');
        }
        $this->assigns('id',$data['id']);
        //查询角色拥有权限
        if($data['id']==1){ //超级管理员
            $power_id = D('Power')->field('id AS pid ')->select();
        }else{
            $power_id = D('RolePower')->where('rid='.$data['id'])->field('pid')->select();
        }
        foreach($power_id as $k=>$row){
            $power_ids[] = $row['pid'];
        }
        $data['power_ids'] = $power_ids;
        $flog = false;
    }


    protected function editShowBefore(&$request,&$data,&$flog){
        $this->setTitle("角色");
        //显示权限列表
        $this->assigns('power',D('Power')->getAllChilds());

    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        $model_name = "Role";
        $save = $request;
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){
        if($request['id']!=1){ //超级管理员不需要修改
            D()->startTrans();
            D('RolePower')->where('rid='.$request['id'])->delete();
            if($request['power_ids']){
                foreach($request['power_ids'] as $k=>$pid){
                    $rolePower[$k]['rid'] = $request['id'];
                    $rolePower[$k]['pid'] = $pid;
                }
                if(D('RolePower')->addAll($rolePower)===false){
                    $this->setError('修改失败!');
                    D()->rollback();
                }
            }
            D()->commit();
        }
    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        $model_name = "Role";
        $save = $request;
        D()->startTrans();
    }


    protected function doEditAddLater(&$request,&$data,&$flog){
        if($data['id']){
            foreach($request['power_ids'] as $k=>$pid){
                $rolePower[$k]['rid'] = $data['id'];
                $rolePower[$k]['pid'] = $pid;
            }
            if(D('RolePower')->addAll($rolePower)!==false){
                D()->commit();
            }else{
                $this->setError('添加失败');
            }

        }

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "Role";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}