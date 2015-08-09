<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class AdminUserController extends CommonController {
    protected $title = "后台用户管理";



    protected function indexSelectBefore(&$request,&$options,&$model_name){
        $options['field_alias'] = $request['ts-alias'];
        $options['where'] = $request['where'];
        $options['order'] = $request['order'];
        $options['table'] = array(trueTab('User')=>'u',trueTab('AdminUserRole')=>'aur',trueTab('Role')=>'r');
        $options['group'] = 'obj.id';
        $options['field'] = 'obj.*,u.uname,u.name,GROUP_CONCAT(r.name SEPARATOR "|") AS rname';
        $options['whereStr'] = 'u.id=obj.uid AND obj.id=aur.a_u_id AND aur.rid=r.id';
        $model_name = "AdminUser";
    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){
        $data['order'] = $request['order'] ? $request['order'] :array();
        $data['where'] = $request['where'] ? $request['where'] :array();
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){
        $model_name = "AdminUser";
        $options['where'] = array('id'=>$request['id']);
    }


    protected function editSelectLater(&$request,&$data,&$flog){
        if(!$data){
            $this->error('数据不存在!');
        }
        //查询用户对于的角色id
        $data['role_ids'] = twoArrOne(D('AdminUserRole')->where('a_u_id='.$data['id'])->field('rid')->select(),'rid');
        $this->assigns('id',$data['id']);
        $flog = false;
    }


    protected function editShowBefore(&$request,&$data,&$flog){
        //查询所有角色
        $this->assigns('roles', D('Role')->field('id,name,description')->where('status>0')->select());
        $this->setTitle("管理员");
    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){
        if(!$request['role_ids']){
            $this->setError('必须至少选择一个角色!');
            $this->displays();
        }
        $model_name = "AdminUser";
        $save = $request;
        D()->startTrans();
    }


    protected function doEditSaveLater(&$request,&$data,&$flog){
        if($this->status=='info' && D('AdminUserRole')->where('a_u_id='.$request['id'])->delete()!==false){
            $add = oneArrTwo($request['role_ids'],'rid','a_u_id',$request['id']);
            D('AdminUserRole')->addAll($add) !== false and D()->commit() or $this->setError('修改角色出错!');
        }
    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){
        if(!$request['role_ids']){
            $this->setError('必须至少选择一个角色!');
            $this->displays();
        }
        //先验证前端用户是否存在
        $user = D('User')->getOne(array('where'=>array('id'=>array('eq',$request['uid'])),'field'=>'id'));
        if(!$user){
            $this->setError('前端用户不存在!');
            $this->displays();
        }
        $model_name = "AdminUser";
        $save = $request;
        D()->startTrans();
    }


    protected function doEditAddLater(&$request,&$data,&$flog){
        if($this->status=='info'){
            foreach($request['role_ids'] as $k=>$v){
                $save[$k]['rid'] = $v;
                $save[$k]['a_u_id'] = $data['id'];
            }
            if(D('AdminUserRole')->addAll($save)!==false){
                D()->commit();
            }else{
                $this->statusTitle = '修改失败!';
                $this->setError(D('AdminUserRole')->getError());
            }
        }

    }


    protected function removeBefore(&$request,&$options,&$model_name){
        $model_name = "AdminUser";
    }


    protected function removeLater(&$request,&$data,&$flog){

    }

}