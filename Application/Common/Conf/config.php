<?php
define('URL','http://static.test.com/');
return array(
    //'配置项'=>'配置值'

    /* 数据库设置 */
    'DB_TYPE'               =>  'mysql',                                                          //数据库类型
    'DB_HOST'               =>  'localhost',                                                     //服务器地址
    'DB_NAME'               =>  'test',                                                        //数据库名
    'DB_USER'               =>  'root',                                                          //用户名
    'DB_PWD'                =>  '123',                                                         //密码
    'DB_PORT'               =>  '3306',                                                          //端口
    'DB_PREFIX'             =>  't_',                                                             //数据库表前缀
    "pageSize"              =>  20,
    'SESSION_PREFIX'        =>  'testS_',
    'COOKIE_PREFIX'         =>  'testC_',      // Cookie前缀 避免冲突
    /* 静态文件路径配置 */
    'TMPL_PARSE_STRING' => array(
        '__CSS__' =>   URL."css/",                                                      //css文件
        '__IMG__' =>   URL."img/",                                                      //图片文件
        '__TOOLJS__' =>   URL."tooljs/",                                               //三方插件js
        '__JS__' =>   URL."js/",                                                        //应用js
    ),
    '__TOOLJS__'=>URL.'tooljs/',
    '__STATIC_URL__'=>URL,
    '__TOOLJS__'=>URL.'tooljs/',
    '__CSS__'=>URL.'css/',
    /*'SHOW_PAGE_TRACE'=>true,
    'TRACE_PAGE_TABS' => array(
        'base' => '基本',
        'file' => '文件',
        'think' => '流程',
        'error' => '错误',
        'sql' => 'SQL',
        'debug' => '调试'
    ),*/
    'allow_url'=>array('test.com')


);