<?php
/**
 * Created by PhpStorm.
 * User: zhang
 * Date: 14-11-24
 * Time: 下午10:39
 */

namespace Common\Model;


use Think\Model;

class BaseModel extends Model{
    /* 关联常量定义 */
    const   HAS_ONE     =   1; //一对一(关系表中一定有一条记录与主表对应) where连接  (管理员表的每条数据信息来自用户表)
    const   BELONGS_TO  =   2; //一对一(关系表中可能存在一条记录与主表对应) 关系表属于主表 join left连接 (用户表中可能有些用户是管理员)
    const   HAS_MANY    =   3; //一对多(关系表中多条记录对应主表) (后台用户的操作日志)
    const   MAY_MANY_TO =   4; //多对一(主表中多条记录可能对应关联表中的一条记录) (操作日志对应用户表,可能是匿名的)
    const   MANY_TO     =   5; //多对一(主表中多条记录一定对应关联表中的一条记录) (不支持匿名下单的订单表跟用户之间的关系)

    protected    $_link = array();

    public function __construct(){
        $this->setAuto();
        parent::__construct();
    }


    public function setAuto(){
        $common_auto = array (
            array('status','1'),                                          // 新增的时候把status字段设置为1
            array('utime','time',3,'function'),                           // 对update_time字段在更新的时候写入当前时间戳
            array('ctime','time',1,'function'),                           //创建时间
        );
        $common_validate = array(
            array('id','number','id必须是数字',2,'',2)                     //验证id
        );
        $this->_auto = array_merge($common_auto,$this->_auto);
        $this->_validate = array_merge($common_validate,$this->_validate);
    }


    public function add($data=array()){ /* 添加数据 */
       $data or $data = $this->data;
       return $this->create($data,1) ? parent::add() : false; //添加时验证
    }

    public function save($data=array()){ /* 保存数据 */
        $data or $data = $this->data;
        return $this->create($data,2) ? parent::save() : false; //保存时验证这段
    }


    public function getOne($options = array(),$status = false){ /* 获取一条数据 */
        $options = $this->handleOptions($options,$status);
        return $this->table($options['table'])
                    ->field($options['field'])
                    ->where($options['whereStr'])
                    ->where($options['where'])
                    ->group($options['group'])
                    ->join($options['join'])
                    ->find();
    }


    public function getAll($options = array(),$status = false){ /* 查询所有数据 */
        $options = $this->handleOptions($options,$status);
        //dump_exit($options);
        return $this->table($options['table'])
                    ->field($options['field'])
                    ->where($options['whereStr'])
                    ->where($options['where'])
                    ->group($options['group'])
                    ->join($options['join'])
                    ->select();
    }


    public function getLimit($page = 1,$options = array(),$status = false){ /* 查询列表数据 */
        $options = $this->handleOptions($options,$status);
        $result['count'] = $this->table($options['table'])
                                ->where($options['where'])
                                ->where($options['whereStr'])
                                ->join($options['join'])
                                ->group($options['group'])
                                ->count();
        $pageCount = ceil($result['count']/C('pageSize'));
        $pageCount = $pageCount ? $pageCount :1;
        $page = $page > $pageCount ? $pageCount: $page;
        $result['data'] = $this->table($options['table'])
                                ->field($options['field'])
                                ->where($options['where'])
                                ->where($options['whereStr'])
                                ->join($options['join'])
                                ->page($page.','.C('pageSize'))
                                ->order($options['order'])
                                ->group($options['group'])
                                ->select();
        return $result;
    }

    private function handleLink($options = array()){ //关联操作
        if (!$options) return array();
        is_string($options['field']) and $field[] = $options['field'];
        foreach ($options['field'] as $key => $row) {
            if (is_array($row)) {
                array_walk($row, function (&$v, $k, $key) {
                    $key = $key ? $key : 'obj';
                    if (!strrpos($v, ')')) { //如果sql没有函数处理字段
                        $v = $v == '*' ? '`'.$key . '`.' . $v . '' : '`'.$key . '`.`' . str_ireplace(' as ','` AS `',$v) . '`';
                    }
                }, $this->_link[upper($key)]['relation_alias']);
                $field[] = implode(',', $row);
            } else {
                $table = strtolower($key)=='obj' ? '`obj`' : '`'. $this->_link[upper($key)]['relation_alias'].'`';
                $field[] = strrpos($row, '.')===false ? $table.'.'.$row : $row;
            }
            if ($this->_link[upper($key)] || strtolower($key) == 'obj') {
                switch ($this->_link[upper($key)]['relation_type']) {
                    case self::MANY_TO:
                    case self::HAS_ONE:
                        $whereStr = '`obj`.`' . $this->_link[upper($key)]['main_field'] . '`=' . $this->_link[upper($key)]['relation_alias'] . '.`' . $this->_link[upper($key)]['relation_field'] . '`';
                        $options['whereStr'] = $options['whereStr'] ? $options['whereStr'] . ' AND ' . $whereStr : $whereStr;
                        $options['table'] = $options['table'] ? $options['table'] : array();
                        $options['table'] = array_merge($options['table'], array(trueTab($key) => $this->_link[upper($key)]['relation_alias']));
                        $options['field_alias'] = 1;
                        break;
                    case self::BELONGS_TO:
                    case self::HAS_MANY:
                    case self::MAY_MANY_TO:
                        $options['join'] = $options['join'] ? $options['join'] :array();
                        $options['join'] = array_merge($options['join'],array('LEFT JOIN `'.trueTab($key).'` `'. $this->_link[upper($key)]['relation_alias'].'` ON `obj`.`'.$this->_link[upper($key)]['main_field'] .'` = `'.$this->_link[upper($key)]['relation_alias'].'`.`'.$this->_link[upper($key)]['relation_field'] .'`'));
                        $options['field_alias'] = 1;
                        break;


                    default:
                        //dump_exit(2);
                }
            }
        }
        $options['field'] = implode(',', $field);
        return $options;
    }


    private function handleOptions($options=array(),$status = false){ /* 处理查询参数 */
        $options = $this->handleLink($options);
        $whereStr = isset($options['whereStr']) ? $options['whereStr']:'1';
        if($options['field_alias'] && $options['where']){ //存在多表查询处理
            $options['whereStr'] = $this->jointSql($whereStr,$options['where']);
            unset($options['where']);
        }
        $options['where']['`obj`.`status`'] = $status===false ? array('gt',0) : intval($status);
        $this->alias('');
        $options['table'][$this->trueTableName] = '`obj`';
        return $options;
    }



    private function jointSql($sql,$where){ /* 多表查询sql拼接 */
        $exp = array('eq'=>'=','neq'=>'<>','gt'=>'>','egt'=>'>=','lt'=>'<','elt'=>'<=','like'=>'LIKE','between'=>'BETWEEN','in'=>'IN');
        $sqls[] = $sql;
        $alis='`obj`';
        foreach($where as $k=>$row){
            $expr = $exp[strtolower($row[0])];
            if(!is_array(current($row))){
                $sql = $alis.'.`'.$k.'`'.$exp[strtolower($row[0])];
                if($expr=='between'){
                    $sqls[] = $sql.$row[1][0].' AND '.$row[1][1];
                }elseif($expr=='in'){
                    $sqls[] = $sql.' ('.implode(',',$row[1]).')';
                }else{
                    $sqls[] = $sql.'"'.$row[1].'"';
                }
            }else{
                foreach($row as $alias => $v){
                    $sql = $alias.'.`'.$k.'`'.$exp[strtolower($v[0])];
                    if($expr=='between'){
                        $sqls[] = $sql.$v[1][0].' AND '.$v[1][1];
                    }elseif($expr=='in'){
                        $sqls[] = $sql.' ('.implode(',',$v[1]).')';
                    }else{
                        $sqls[] = $sql.'"'.$v[1].'"';
                    }
                }
            }
        }
        return implode(' AND ',$sqls);
    }


    public function removeData($options = array(),$status = 0){ /* 删除数据 */
        $data['status'] = $status ? $status : 0;
        return $this->where($options['where'])->data($data)->save();
    }



    public function getError(){ /* 返回自动验证的验证错误信息*/
        $error = $this->error;
        is_array($error) and $error = implode('<br/>　',$this->error);
        return $error;
    }




} 