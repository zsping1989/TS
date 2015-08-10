<?php
namespace Admin\Model;

use Common\Model\BaseModel;
use Think\Model;

class RoleModel extends BaseModel{
    protected $_validate= array(

    );
    protected $_auto = array (

    );
    protected $line = array(
        array('User','AdminUserLog'),
        array('AdminUserRole','Role','RolePower','Power')
    );
    protected $_link = array( //关系表
        'AdminUserRole'=>array(
            'relation_type'=>self::HAS_MANY,
            'relation_table'       => 'admin_user_role',
            'relation_alias'       => 'aur',
            'relation_field'=>'rid',
            'main_table'       => 'role',
            'main_field'=>'id',
            'main_alias'=>'r'
        ),
        'RolePower'=>array(
            'relation_type'=>self::HAS_MANY,
            'relation_table'       => 'admin_user_role',
            'relation_alias'       => 'aur',
            'relation_field'=>'rid',
            'main_table'       => 'role',
            'main_field'=>'id',
            'main_alias'=>'r'
        )
    );


}