<?php
namespace Admin\Model;

use Common\Model\BaseModel;
use Think\Model;

class AdminUserLogModel extends BaseModel{
    protected $_validate= array(

    );
    protected $_auto = array (

    );
    protected $line = array('User');
    protected $_link = array( //关系表
       /* 'User'=>array(
            'relation_type'=>self::MAY_MANY_TO, //关系表(用户表)一定有一条记录关联主表(管理员表)
            'relation_table'       => 'user',//关联表
            'relation_alias'       => 'u',//关联表别名
            'relation_field'       =>'id',//关联表关联字段
            'main_table'           => 'admin_user_log',//主表
            'main_field'           =>'uid', //主表关联字段
            'main_alias'           =>'aul'
        )*/
    );



}