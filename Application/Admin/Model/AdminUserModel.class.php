<?php
namespace Admin\Model;


use Common\Model\BaseModel;
use Think\Model;

class AdminUserModel extends BaseModel{
    protected $_validate= array(
        array('uid','','该用户已是后台管理员！',1,'unique',1), // 在新增时验证
        array('uid','','用户已经存在！',0,'unique',2)
    );
    protected $line = array(
        array('User','AdminUserLog'),
        array('AdminUserRole','Role','RolePower','Power')
    );
    protected $_link = array( //关系表
        'User'=>array(
            'relation_type'=>self::HAS_ONE, //关系表(用户表)一定有一条记录关联主表(管理员表)
            'relation_table'       => 'user',//关联表
            'relation_alias'       => 'u',//关联表别名
            'relation_field'=>'id',//关联表关联字段
            'main_table'       => 'admin_user',//主表
            'main_field'=>'uid', //主表关联字段
            'main_alias'=>'au'
        )
    );



}