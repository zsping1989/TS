<?php
namespace Admin\Model;

use Common\Model\BaseModel;
use Think\Model;

class UserModel extends BaseModel{
    protected $_validate= array(

    );
    protected $_auto = array (

    );
    protected $_link = array(
'AdminUser'=>array(
            'mapping_type'  =>self::HAS_ONE,
            'class_name'         => 'AdminUser',

    'foreign_key'        => 'uid',
            'as_fields'          =>null,
            'mapping_name'       =>'AdminUser',

            'condition'         =>'`status`>0',
            'relation_tb'       => 'admin_user',
            'relation_alias'       => 'au',
            'relation_field'       =>'uid',
            'main_table'         => 'user',
            'main_field'         =>'id',
            'main_alias'         =>'u'
    ),'AdminUserLog'=>array(
            'mapping_type'  =>self::HAS_MANY,
            'class_name'         => 'AdminUserLog',

                'foreign_key'        => 'uid',
            'parent_key'         =>null,
            'mapping_fields'          =>null,
            'mapping_order'      =>'id DESC',
            'mapping_limit'      =>'20',
            'mapping_name'       =>'AdminUserLog',
        
            'condition'         =>'`status`>0',
            'relation_tb'       => 'admin_user_log',
            'relation_alias'       => 'aul',
            'relation_field'       =>'uid',
            'main_table'         => 'user',
            'main_field'         =>'id',
            'main_alias'         =>'u'
    ),    );



}