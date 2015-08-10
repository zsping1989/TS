<?php
namespace Admin\Model;


namespace Admin\Model;

use Common\Model\TreeModel;
use Think\Model;

class PowerModel extends TreeModel{
    protected $_validate= array(
    );
    protected $_auto = array (
        array('url','trim',3,'function')
    );
    protected $line =array('RolePower','Role','AdminUserRole','AdminUser','User','AdminUserLog');
    protected $_link = array(
        'RolePower'=>array(
            'relation_type'=>self::HAS_MANY,
            'relation_table'       => 'role_power',
            'relation_alias'       => 'rp',
            'relation_field'=>'pid',
            'main_table'       => 'power',
            'main_field'=>'id',
            'main_alias'=>'p'
        )
    );




}