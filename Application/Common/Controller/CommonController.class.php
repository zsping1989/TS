<?php
namespace Common\Controller;
use Think\Controller;
class CommonController extends Controller {
    private $maxAge = 86400; //浏览器缓存页面一天
    protected $allTitle = '我的网站'; //页面主title
    protected $title = ''; //页面title,用于拼接
    protected $page = 1; //页码
    protected $stitacEdition = 20150616011; //全站静态文件版本控制
    private $dataHandleFront = false; //前端是否还需要对数据进行处理
    protected $errorInfo = array(); //错误信息记录
    protected $header = '';//导航标签
    protected $data = array();
    protected $mustLogin = true;
    protected $userInfo = array();
    protected $status = 'info';//返回成功与否
    protected $statusTitle = '';
    protected $statusContent = '';

    
    public function __construct(){
        parent::__construct();
        if($this->mustLogin){ //登录验证
            if(MODULE_NAME=='Admin'){
                $this->checkAdminLogin();
            }else{
                $this->checkHomeLogin();
            }
        }
        if(MODULE_NAME=='Admin' || MODULE_NAME=='Create'){
            $this->userInfo = session('adminUserInfo');
            $this->setAdminHeader();
        }else{
            $this->userInfo = session('userInfo');
        }
        $this->page = $_REQUEST['p'] > 1 ? intval($_REQUEST['p']) : 1;
        $this->setTitle($this->title);

    }


    private function powerList(){ /* 获取菜单列表 */
        $where['status'] = 1;
        $where['deep'] = array('lt',3);
        return D('Power','Admin')->where($where)->order('lft ASC')->select();
    }


    public function index(){ /* 列表页面 */
        $request = I('request.');
        $flog = true;
        $options = array();
        $model_name = CONTROLLER_NAME;
        foreach($request['where'] as $k=>$where){ /* 查询条件为空值时,删除查询条件 */
            if(!is_array(current($where))){
                if(!$where[1] && !$where[2]){
                    unset($request['where'][$k]);
                }
            }else{
                foreach($where as $kk=>$value){
                    if(!$value[1] && !$value[2]){
                        unset($request['where'][$k][$kk]);
                    }
                }
            }
        }
        $this->indexSelectBefore($request,$options,$model_name);
        $data = D($model_name)->getLimit($this->page,$options);
        $this->indexSelectLater($request,$data,$flog);
        $this->displays($data,$flog);
    }


    public function edit(){ /* 用户编辑,添加页面 */
        $request = I('request.');
        $data = array();
        $flog = false;
        $model_name = CONTROLLER_NAME;
        if($request['id']){
            $options = array();
            $this->editSelectBefore($request,$options,$model_name);
            $data = D($model_name)->getOne($options);
            $this->editSelectLater($request,$data,$flog);
        }
        $this->editShowBefore($request,$data,$flog);
        $this->displays($data,$flog);
    }
    

    public function doEdit(){ /* 用户操作 */
        $this->setAjax();
        $request = I('request.');
        $save = array();
        $data = array();
        $flog = true;
        $model_name = CONTROLLER_NAME;
        if($request['id']>0){
            $this->statusContent = '修改成功!';
            $this->doEditSaveBefore($request,$save,$model_name);
            if(D($model_name)->data($save)->save()===false){
                $this->statusTitle = '修改失败!';
                $this->setError(D($model_name)->getError());
            }
            $this->doEditSaveLater($request,$data,$flog);
        }else{
            $this->statusContent = '添加成功!';
            $this->doEditAddBefore($request,$save,$model_name);
            $data['id'] = D($model_name)->data($save)->add();
            if($data['id']===false){
                $this->statusTitle = '添加失败!';
                $this->setError(D($model_name)->getError());
            }
            $this->doEditAddLater($request,$data,$flog);
        }
        $this->displays($data);
    }


    public function remove(){
        $this->setAjax();
        $request = I('request.');
        $model_name = CONTROLLER_NAME;
        $options = array();
        $flog = true;
        $this->statusContent = '删除成功';
        if(!is_array($request['id']) && !preg_match('/,/',$request['id'])){
            $options['where'] = array('id'=>array('eq',$request['id']));
        }else{
            $options['where'] = array('id'=>array('in',$request['id']));
        }
        $this->removeBefore($request,$options,$model_name);
        if(!D($model_name)->removeData($options,$request['status'])){

            $this->statusTitle = '删除失败!';
            $this->setError(D($model_name)->getError());
            $this->setError(D($model_name)->getLastSql());
        }
        $this->removeLater($request,$data,$flog);
        $this->displays($data,$flog);
    }


    private function checkAdminLogin(){ /* 后台登录检查 */
        if(!session('isLoggedAdmin') || session('ipAdmin')!=$_SERVER['REMOTE_ADDR']){
            jump(U('Login/index'),'',0);
            exit;
        }
    }


    private function checkHomeLogin(){ /* 前台登录检查 */
        /* 自动登录功能 */
        if(!session('isLogged') && cookie('autoLogin') && cookie('uid')){
            $options['table'] = array(trueTab('User')=>'u');
            $options['where'] = array('id'=>cookie('uid'),'u.status=1');
            $user = D()->table($options['table'])->where($options['where'])->find();
            if($user['ip']!=$_SERVER['REMOTE_ADDR'] && U()!='/index.php/Home/Login/index.html'){
                 jump(U('Home/Login/index'),'',0);
                 exit;
            }elseif(md5(md5($user['password'].$user['key']))==cookie('autoLogin')){
                setcookie('PHPSESSID',$_COOKIE['PHPSESSID'],time()+3600*24*365,'/');
                session('isLogged',$user['id']); //user的id
                session('userInfo',$user);
                session('ip',$_SERVER['REMOTE_ADDR']);
            }
        }

        if(!session('isLogged') || session('ip')!=$_SERVER['REMOTE_ADDR']){
            jump(U('Login/index'),'',0);
            exit;
        }
    }




    protected function assigns($str,$data){
        $this->data[$str] = $data;
    }



    protected function setError($str){
        $this->status = 'warning';
        if(!$str){ return false; }
        $this->errorInfo[] = $str;
    }


    protected function getStatus(){
        $data['status'] = $this->status;
        $data['statusTitle'] = $this->statusTitle;
        if($this->status=='warning'){
            $data['content'] = implode('<br />',$this->errorInfo);
        }else{
            $data['content'] = $this->statusContent;
        }
        return $data;
    }


    protected function setAjax(){ /* 防止非本站域名操作 */
        $res = explode('/',preg_replace('/^http:\/\/[\w]{0,}[\.]([A-Za-z0-9_]{1,})/','$1',$_SERVER['HTTP_REFERER']));
        $_GET['ajax'] = 1;
        if(!(in_array($res[0],C('allow_url')) || (IS_AJAX && IS_POST) || CONTROLLER_NAME=='Upload')){
            $this->setError('非法操作!');
            $this->displays();
        }
    }


    protected function setDataHande(){ /* 设置前端是否还需要数据处理 */
        $this->dataHandleFront = true;
    }


    protected function setCross($domain='*'){ /* 设置跨域ajax请求 */
        header('Access-Control-Allow-Origin:'.$domain);
    }



    protected function setTitle($title){ /* 设置title */
        if(!$title){
            return ;
        }
        $this->allTitle =$title.'-'.$this->allTitle;
    }


    protected function displays($data = null,$flog=true){  /* 前端模板数据显示 */
        $result = array_merge($this->getStatus(),$this->data);
        $result['title'] = $this->allTitle;
        $result['count'] = count($data); //数据条数
        $result['handleDate'] = $this->dataHandleFront;
        $result['pageCount'] = (isset($data['count']) && $data['count']>0)? ceil($data['count']/C('pageSize')) : 1;
        $result['page'] = $this->page > $result['pageCount'] ? $result['pageCount'] : $this->page; //数据页码
        if($flog){
            foreach($data as $k=>$row){
                $result[$k] = $row;
            }
        }else{
            $result['data'] = $data; //数据
        }
        if($_GET['callback']){ //jsonp格式
            exit($_GET['callback'].'('.json_encode($result).');');
        }elseif($_GET['define']){ //cmd格式
            if($_GET['define']=='TS'){
                exit('TS.define(function(){ return '.json_encode($result).'})');
            }
            exit('define(function(){ return '.json_encode($result).'})');
        }elseif($_GET['script']){  //javascript格式
            $script = explode('.',$_GET['script']);
            if(count($script)==1){
                exit('var '.$script[0].' = '.json_encode($result).';');
            }else{
                exit('var '.$script[0].' = {};'.$script[0].'.'.$script[1].' = '.json_encode($result).';');
            }
        }elseif($_GET['ajax'] || $_SERVER['HTTP_HOST']=='data.test.com'){ //ajax请求
            $this->ajaxReturn($result);
        }
        $this->shows(json_encode($result));
    }



    private function shows($data){ /* 前端页面显示 */
        exit( '<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="'.C('__CSS__').'admin/public/reset.css">
    <link rel="stylesheet" type="text/css" href="'.C('__CSS__').'admin/public/guanlicenter.css">
    <link rel="stylesheet" type="text/css" href="'.C('__CSS__').'admin/public/backend.css">
    <meta http-equiv="Cache－Control：max－age＝' . $this->maxAge . '，must－revalidate">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>' . '
    <title>' . $this->allTitle . '</title>
</head>
<body>
'.$this->header.'
<div id="main-content">
    <div id="main" class="main">
        <div id="coutent"></div>
    </div>
</div>
<script>
    var data = ' . $data . ';
</script>' . '
<script src="' . C('__TOOLJS__') . 'require.js/2.1.18/require.min.js"
        data-main="' . C('__STATIC_URL__') . 'js/main.js?time=' . $this->stitacEdition . '"
        module-name="' . strtolower(MODULE_NAME) . '"
        controller-name="' . lower(CONTROLLER_NAME) . '"
        action-name="' . lower(ACTION_NAME) . '"
        edition="' . $this->stitacEdition . '"
        id="entrance"
        hand-date=""
        data-name="data"
        target="coutent"
        defer async="true">
</script>
</body>
</html>');
    }


    protected function editSelectBefore(&$request,&$options,&$model_name){

    }


    protected function editShowBefore(&$request,&$data,&$flog){

    }


    protected function editSelectLater(&$request,&$data,&$flog){

    }


    protected function indexSelectBefore(&$request,&$options,&$model_name){

    }


    protected function indexSelectLater(&$request,&$data,&$display_flog){

    }

    protected function doEditSaveBefore(&$request,&$save,&$model_name){

    }


    protected function doEditSaveLater(&$request,&$data,&$flog){

    }


    protected function doEditAddBefore(&$request,&$save,&$model_name){

    }


    protected function doEditAddLater(&$request,&$data,&$flog){

    }


    protected function removeBefore(&$request,&$options,&$model_name){

    }


    protected function removeLater(&$request,&$data,&$flog){

    }

    protected function setAdminHeader(){
        $munes = $this->powerList();
        $mune = '';
        foreach($munes as $k=>$row){
            if($row['deep']==1){
                if($k!=0){
                    $mune .='
           </ul>';
                }
                $mune .='
           <h3 class="side-main-menu">
                <span class="iconfont moive-icon"></span>'.$row['name'].'
           </h3>
           <ul class="side-sub-menu">';
            }else{
                $class = '';
                $url = explode('/',$row['url']);
                if($url[2].'/'.$url[3]==MODULE_NAME.'/'.CONTROLLER_NAME){
                    $class= 'active';
                }
                $mune .='
               <li class="'.$class.'"><a href="'.$row['url'].'" class="borderb-n">'.$row['name'].'</a></li>';
            }
        }


        $this->header = ' <div class="header">
        <div class="logo">
            <a href="/Admin/Index/index"  class="fl">影院后台管理系统</a>
            <span class="guanli-tit">后台管理系统</span>
        </div>
        <div class="userBar">
            <ul class="clearfix">
                <li class="pr38 userinfo_box">
                    <h3>
                        '.$this->userInfo["uname"].'
                        <span class="hello">↓</span>
                    </h3>
                    <div class="userinfo_menu">
                        <a href="/Admin/User/password">修改密码</a>
                        <a href="/Home/Login/logout">退出登录</a>
                    </div>
                </li>
                <li class="nav-list">
                    <h3>
                        角色：'.$this->userInfo["role"].'</h3>
                </li>
            </ul>
        </div>
    </div>
    <!-- hearder end  -->
    <!-- 左边栏 start  -->
    <div class="sidebar menu" id="subnav">
      '.$mune.'
            </ul>
    </div>';

    }


}

