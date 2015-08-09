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
    protected $_link = array( //关系表
        'AdminUser'=>array(
            'relation_type'        =>self::BELONGS_TO, //关系表(admin_user表)用户表中可能有些用户是管理员
            'relation_table'       => 'admin_user',//关联表
            'relation_alias'       => 'au',//关联表别名
            'relation_field'       =>'uid',//关联表关联字段
            'main_table'           => 'user',//主表
            'main_field'           =>'id', //主表关联字段
            'main_alias'          =>'u'
        ),
        'AdminUserLog'=>array(
            'relation_type'        =>self::HAS_MANY, //关系表(admin_user表)用户表中可能有些用户是管理员
            'relation_table'       => 'admin_user_log',//关联表
            'relation_alias'       => 'aul',//关联表别名
            'relation_field'       =>'uid',//关联表关联字段
            'main_table'           => 'user',//主表
            'main_field'           =>'id', //主表关联字段
            'main_alias'          =>'u'
        )
    );



}