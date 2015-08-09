<?php
/**
 * Created by PhpStorm.
 * User: zhang
 * Date: 14-11-24
 * Time: 下午10:39
 */

namespace Common\Model;


use Common\Service\NestedSetsService;
use Think\Model;

class TreeModel extends BaseModel{
    protected $nestend='';

    public function __construct(){
        parent::__construct();
        $db = new DbMysqlImpModel();
        $this->nestend = new NestedSetsService($db,$this->trueTableName,'lft','rght','parent_id','id','deep');
    }

    protected $_validate= array(
    );


    public function save(){ /* 修改 */
        $old_parent_id = $this->data['old_parent_id'];
        $parent_id = $this->data['parent_id'];
        unset($this->data['parent_id']);
        $id = $this->data['id'];
        $this->startTrans();
        if(parent::save()===false){
            $this->rollback();
            return false;
        };
        if($parent_id!=$old_parent_id && $old_parent_id){
            $result = $this->nestend->moveUnder($id,$parent_id);
            if($result===false){
                $this->rollback();
                return false;
            }
        }
        $this->commit();
        return true;
    }


    public function add(){ /* 添加 */
        $this->create($this->data);
        $data = $this->data;
        $parent_id = $data['parent_id'] ? $data['parent_id'] : 1;
        unset($data['parent_id']);
        unset($data['id']);
        return $this->nestend->insert($parent_id,$data,'bottom');
    }


    public function removeData($options = array()){ /* 删除 */
        $rows = $this->where($options['where'])->field('lft,rght')->select();
        $where['status'] = array('neq',0);
        $data['status'] = 0;
        $flog = false;
        $this->startTrans();
        foreach($rows as $k=>$row){
            $left = $rows[$k]['lft'];
            $right = $rows[$k]['rght'];
            $where['lft'] = array('egt',$left);
            $where['rght'] = array('elt',$right);
            $this->where($where);
            parent::save($data) !== false or $flog = true;
        }
        $flog ? $this->rollback() : $this->commit();
        return !$flog;
    }


    public function getChilds($id,$field){ /* 查询下一级子类 */
        $where['parent_id'] = $id ? $id : 1;
        $where['status'] = 1;
        return $this->field($field)->where($where)->order('lft')->select();
    }


    public function getAllChilds($id,$field){ /* 查询所有子类 */
        if($id){
            $parent = $this->where(array('id'=>$id))->field('lft,rght')->find();
            $where['rght'] = array('lt',$parent['rght']);
            $where['lft'] = array('gt',$parent['lft']);
        }else{
            $where['lft'] = array('gt',0);
        }
        $where['status'] = array('gt',0);
        return $this->field($field)->where($where)->order('lft')->select();
    }


    public function moveNear($id,$near_id,$position = 'before'){ /* 移动到某个节点后或前 */
        $this->startTrans();
        $result = $this->nestend->moveNear($id,$near_id,$position) and $this->commit();
        return $result;
    }



}