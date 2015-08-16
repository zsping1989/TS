<?php
namespace Create\Controller;
use Think\Controller;
use Common\Controller\CommonController;
class IndexController extends CommonController {
    protected  $title = '代码工厂';



    public function index(){ /* 后台创建入口 */
        $this->stitacEdition = time();
        $this->setTitle('后台创建');
        $this->displays([]);
    }


    public function create(){
        //$this->setAjax();
        $request = I('request.');
        $this->statusContent = '生成代码成功!';
        if(!($request['m_name'] && $request['c_name'] && $request['a_name'] && $request['t_name'])){
            $this->setError('信息不完整!');
            $this->displays();
        }

        $c_name = ucfirst($request['c_name']);
        $m_name = ucfirst($request['m_name']);
        $title = $request['title'];
        foreach($request as $k=>$v){
            $request[$k] = $this->lower($v);
        }
        $tpl_dir = MODULE_PATH.'View/'.$m_name.'/'; //模板所在目录
        $view_dir = ROOT_PATH.'Public/js/'.$this->lower($request['m_name']).'/'.$this->lower($c_name).'/';
        $model_dir = APP_PATH.$m_name."/Model/";
        $controller_dir = APP_PATH.$m_name."/Controller/";
        $request['model_name'] = $this->table2name($request['t_name']);
        $request['title'] = $title;
        $request['M_name'] = $m_name;
        $request['C_name'] = $c_name;
        $request['php'] = '<?php';
        $request['root'] = ROOT_PATH;

        $create = array(
            'controller'=>array(
                'tpl' => 'controller', //使用的模板
                'dir' => $controller_dir, //生成文件所在目录
                'file' => $c_name.'Controller.class.php' //文件名
            ),
            'model'=>array(
                'tpl' => 'model',
                'dir' => $model_dir,
                'file' => $request['model_name'].'Model.class.php'
            ),
            'view'=>array(
                'tpl' => is_file($tpl_dir.$request['a_name'].'.html') ? $request['a_name'] : 'view',
                'dir' => $view_dir,
                'file' => $request['a_name'].'.html'
            ),
            'js'=>array(
                'tpl' => $request['validata'] ? 'validatajs' : 'js',
                'dir' => $view_dir,
                'file' => $request['a_name'].'.js'
            ),
            'p_model'=>array(
                'tpl' => is_file($tpl_dir.$request['a_name'].'-model.html') ? $request['a_name'].'-model' : 'p_model',
                'dir' => $view_dir,
                'file' => $request['a_name'].'-model.js'
            ),
            'bat'=>array(
                'tpl' => 'bat',
                'dir' => $view_dir,
                'file' => $request['m_name'].'-'.$request['c_name'].'.bat'
            )
        );

        if(!$request['model']){
            unset($create['model']);
        }

        if(!$request['proscenium_model']){
            unset($create['p_model']);
        }

        $request['comment'] = $this->getComment(C('DB_PREFIX').$request['t_name']); //获取数据库备注信息
        $table = D('table')->getOne(array('where'=>array('table'=>array('eq',$request['t_name'])),'field'=>array('id','alias')));//获取表信息
        $request['tables'] = $this->idToKey(D('table')->getAll(array('field'=>array('id','table','alias'))));
        $request['relation'] = D('TableRelation')
            ->where('`status`>0 AND `main_table` = '.$table['id'].' OR (`type`=4 AND `status`>0 AND `relation_table`='.$table['id'].')')
            ->select();
        foreach($request['relation'] as $k=>$v){
            if($v['type']==4 && $v['relation_table']==$table['id']){
                $t = $v['relation_table'];
                $request['relation'][$k]['relation_table'] = $request['relation'][$k]['main_table'];
                $request['relation'][$k]['main_table'] = $t;
                $t = $v['relation_field'];
                $request['relation'][$k]['relation_field'] = $request['relation'][$k]['main_field'];
                $request['relation'][$k]['main_field'] = $t;
            }
        }
        foreach($request['comment']['field'] as $field=>$row){
            if($row['restrain']){
                $request['restrain'][] = $field.':'.json_encode($row['restrain']);
            }}
        $request['restrain'] = implode(',',$request['restrain']);
        $this->assign($request);
        foreach($create as $k=>$row){
            $tpl_model = ucfirst($request['m_name']);
            if(!is_file($tpl_dir.$row['tpl'].'.html')){
                 $tpl_model = 'Public';
            }
            $this->createFile($tpl_model.'/'.$row['tpl'],$row['dir'],$row['file']);
        }
        $this->displays();
    }


    protected function table2name($table_name){
        $arr = explode("_",$table_name); //先拆分
        $arr = array_map("ucfirst",$arr); //将首字母大写
        return implode('',$arr); //再通过''合并
    }


    public function getComment($trueTableName){ /* 数据表备注信息 */
        $db = M();
        $sql = "SELECT TABLE_COMMENT FROM information_schema.`TABLES` WHERE TABLE_SCHEMA='".C('DB_NAME')."' AND TABLE_NAME='{$trueTableName}'";
        $result1 = $db->query($sql);
        $result['table_comment'] = $result1[0]['table_comment'];
        $result['types'] = array();
        $sql = "show full COLUMNS from {$trueTableName}";
        $rows = $db->query($sql);

        $arr = array();
        foreach($rows as $k=>$row){
            if(strtolower($row['key'])=='pri'){
                $result['pk'] = $row['field'];
            }
            $comment = explode('/',$row['comment']);
            $arr[$row['field']]['type'] = isset($comment[1])?$comment[1]:'text'; //类型
            if(!in_array($arr[$row['field']]['type'],$result['types'])){
                $result['types'][] = $arr[$row['field']]['type'];
            }
            $comment = explode('|',$comment[0]);
            if(isset($comment[1])){ //处理约束
                $restrain = explode(',',$comment[1]);
                $res = array();
                foreach($restrain as $kk => $value){
                    $v = explode('-',$value);
                    $res[$v[0]] = isset($v[1]) ? preg_replace('/(.+)\\\(.+)/','[$1,$2]',$v[1]): 'true';
                }
                $arr[$row['field']]['restrain'] = $res;
            }
            $comment = explode(':',$comment[0]);
            $arr[$row['field']]['comment'] = $comment[0];
            if(isset($comment[1])){
                $value = explode(',',$comment[1]);
                $res = array();
                foreach($value as $k => $ro){
                    $v = explode('-',$ro);
                    $res[$v[1]] = $v[0];
                }
                $arr[$row['field']]['value'] = $res;
            }
        }
        $result['field'] = $arr;
        return $result;
    }

/*
 * tpl:使用模板
 * dir:生成文件的文件夹
 * file:生成文件的文件名
 * */
    protected function createFile($tpl,$dir,$file){ /* 重写用于生成模板 */
        is_dir($dir) or mkdir($dir,0777,true); //创建文件夹
        if(!is_file($dir.$file)){ //需要生成的目标文件不存在才生成
            ob_start();
            $this->display($tpl); //读取模板
            $view_bat_code = ob_get_clean();
            file_put_contents($dir.$file,$view_bat_code) or $this->setError($dir.$file.'代码生成失败');
        }
    }
    protected function lower($str){
        $res = preg_replace('/([A-Z])/','_$1',$str);
        $res = preg_split('/_/',$res,false,1);
        $res = implode('_',$res);
        return strtolower($res);
    }
}