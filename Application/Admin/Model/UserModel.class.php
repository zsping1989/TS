<?php
namespace Admin\Model;

use Common\Model\BaseModel;
use Think\Model;

class UserModel extends BaseModel{
    protected $_validate= array(
        array('uname','','用户已经存在！',1,'unique',1), // 在新增时验证
        array('name','2,16','姓名长度必须在2-16之间',2,'length',1),
        array('repassword','password','两次输入密码不一致',1,'confirm',1),
        array('email','email','必须是电子邮箱格式',2,'',1),
        array('email','email','必须是电子邮箱格式',2,'',2), // 在修改时
        array('name','2,16','姓名长度必须在2-16之间',2,'length',2),
        array('uname','','用户已经存在！',0,'unique',2),
    );
    protected $_auto = array (
        array('password','md5',1,'function') , //对password字段在新增和编辑的时候使md5函数处理
        array('key','randStr',1,'function') //随机字符串key
    );
    protected $_line = array();
    protected $_link = array(
        'AdminUser' => array(
            'mapping_type' => self::HAS_ONE,
            'class_name' => 'AdminUser',
            'foreign_key' => 'uid',
            'as_fields' => null,
            'mapping_name' => 'AdminUser',
            'condition' => '`status`>0',
            'relation_tb' => 'admin_user',
            'relation_alias' => 'au',
            'relation_field' => 'uid',
            'main_table' => 'user',
            'main_field' => 'id',
            'main_alias' => 'u'
        ), 'AdminUserLog' => array(
            'mapping_type' => self::HAS_MANY,
            'class_name' => 'AdminUserLog',
            'foreign_key' => 'uid',
            'parent_key' => null,
            'mapping_fields' => null,
            'mapping_order' => 'id DESC',
            'mapping_limit' => '20',
            'mapping_name' => 'AdminUserLog',
            'condition' => '`status`>0',
            'relation_tb' => 'admin_user_log',
            'relation_alias' => 'aul',
            'relation_field' => 'uid',
            'main_table' => 'user',
            'main_field' => 'id',
            'main_alias' => 'u'
        ),);



}