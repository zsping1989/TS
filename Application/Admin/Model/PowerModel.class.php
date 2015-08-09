<?php
namespace Admin\Model;


namespace Admin\Model;

use Common\Model\TreeModel;
use Think\Model;

class PowerModel extends TreeModel{
    protected $_validate= array(
    );
    protected $_auto = array (
        array('url','trim',3,'function') //去掉两边空格
    );



}