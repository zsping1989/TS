<?php

return array(
    //'app_begin' => array('Behavior\CheckLangBehavior') //多语言配置加载
    //记录日志,需要使用sission
    'action_begin'=>array(
        'Common\\Behaviors\\checkPowerBehavior' //权限检查
    )
);