<?php
function dump_exit($var, $echo=true, $label=null, $strict=true){ //打印并退出
    header('Content-Type: text/html; charset=utf-8');
    dump($var, $echo=true, $label=null, $strict=true);exit;
}



function check_verify($code, $id = ''){ //验证验证码
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}


function jump($url='',$msg='',$time=3){ //跳转方法
    if(!headers_sent()&&$time==0){
        header("Location: $url");
    }else{
        if(empty($url)){
            $str =  <<<JS
             <script type='text/javascript'>
                window.setTimeout(function(){
                     history.back(-1)
                 },{$time}000)
             </script>
JS;
        }else{
            $str =  <<<JS
             <script type='text/javascript'>
                 window.setTimeout(function(){
                    location.href='{$url}'
                 },{$time}000)
             </script>
JS;
        }
        if($time!==0){
            $str.=$msg;
        }
        echo $str;
    }
    exit;
}

function lower($str){
    $res = preg_replace('/([A-Z])/','_$1',$str);
    $res = preg_split('/_/',$res,false,1);
    $res = implode('_',$res);
    return strtolower($res);
}
function upper($str){ /* 把有下划线的单词大写 */
    if(strrpos($str, '_')){
        $str = strtolower($str);
    }
    $str = explode('_',$str);
    array_walk($str,function(&$v,$k){$v = ucfirst($v);});
    return implode('',$str);
}

function randStr($len=4) {
    $chars='ABDEFGHJKLMNPQRSTVWXYabdefghijkmnpqrstvwxy23456789#%*';
    mt_srand((double)microtime()*1000000*getmypid());
    $password='';
    while(strlen($password)<$len)
        $password.=substr($chars,(mt_rand()%strlen($chars)),1);
    return $password;
}

function trueTab($tab){
   return $tab ? C('DB_PREFIX').lower($tab) : false;
}


function filter($str){ /* sql过滤 */
    return $str ? str_replace(' ','',htmlspecialchars(strip_tags($str))) : false;
}


function twoArrOne($twoArr,$key){ /* 二维数组转换成一唯数组 */
    if(!$twoArr){
        return array();
    }
    foreach($twoArr as $k=>$row){
        $result[] = $row[$key];
    }
    return $result;
}

function oneArrTwo($oneArr,$key,$key1,$value){ /* 一唯数组拼接成二维数组 */
    $result = array();
    foreach($oneArr as $k=>$v){
        $result[$k][$key] = $v;
        $result[$k][$key1] = $value;
    }
    return $result;
}
