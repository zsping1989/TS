<?php
namespace Create\Model;

use Common\Model\BaseModel;
use Think\Model;

class TableRelationModel extends BaseModel{
    protected $_validate= array(
        array('main_table','number','主表ID必须是t_table表内的id字段！',1,'',1),
        array('main_table','number','主表ID必须是t_table表内的id字段!',0,'',2),
        array('relation_table','number','关系表ID必须是t_table表内的id字段！',1,'',1),
        array('relation_table','number','关系表ID必须是t_table表内的id字段!',0,'',2),
        array('relation_table','checkTable','关系表不存在!',0,'callback',3),
        array('main_table','checkTable','主表不存在!',0,'callback',3),
        array('main_field','checkMainField','所填主表关联字段主表中不存在该字段!',1,'callback',1),
        array('main_field','checkMainField','所填主表关联字段主表中不存在该字段!',0,'callback',2),
        array('relation_field','checkRelationField','所填关联表关联字段关联表中不存在该字段!',1,'callback',1),
        array('relation_field','checkRelationField','所填关联表关联字段关联表中不存在该字段!',0,'callback',2)
    );
    protected $_auto = array (

    );

    public function checkTable($table){
        return !!D('Table')->getOne(array('where'=>array('id'=>array('eq',$table)),'field'=>'id'));
    }

    public function checkMainField($field){ //检查主表是否存在字段
        return $this->checkField($field,$this->data['main_table']);
    }

    public function checkRelationField($field){ //检查主表是否存在字段
        return $this->checkField($field,$this->data['relation_table']);
    }

    private function checkField($field,$table){
        $trueTableName = D('Table')->getOne(array('where'=>array('id'=>array('eq',$table)),'field'=>'table'));
        $trueTableName = trueTab($trueTableName['table']);
        $sql = "SHOW FIELDS FROM {$trueTableName}";
        $result = M()->query($sql);
        foreach($result as $row){
            if($row['field']==trim($field)) return true;
        }
        return false;
    }



}