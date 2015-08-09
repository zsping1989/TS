<?php
namespace Admin\Controller;
use Think\Controller;
use Common\Controller\CommonController;

class IndexController extends CommonController {
    protected $title = '后台管理';
    public function index(){
        $this->setTitle('主页');
        $data = array(
            array("title" => 'Paint pots', "quantity" => 8, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 544, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 99, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 8, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 544, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 19, "price" => 3.95 ),
            array("title" => 'Paint pots', "quantity" => 9, "price" => 3.95 )
        );
//sleep(5);
        $this->setCross();
        $this->setDataHande(); //让前端再处理数据
        $this->stitacEdition = time(); //调试开启静态文件随时刷新
        $this->displays($data,false); //分配数据显示
    }




}

