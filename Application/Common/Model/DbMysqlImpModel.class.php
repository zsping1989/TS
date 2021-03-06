<?php
/**
 * Created by PhpStorm.
 * User: zhang
 * Date: 14-11-30
 * Time: 下午5:27
 */

namespace Common\Model;


class DbMysqlImpModel implements DbMysqlModel{
    /**
     * DB connect
     *
     * @access public
     *
     * @return resource connection link
     */
    public function connect()
    {
        // TODO: Implement connect() method.
    }

    /**
     * Disconnect from DB
     *
     * @access public
     *
     * @return viod
     */
    public function disconnect()
    {
        // TODO: Implement disconnect() method.
    }

    /**
     * Free result
     *
     * @access public
     * @param resource $result query resourse
     *
     * @return viod
     */
    public function free($result)
    {
        // TODO: Implement free() method.
    }

    /**
     * Execute simple query
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return resource|bool query result
     */
    public function query($sql, array $args = array())
    {
        $all_sql = $this->buildSQL(func_get_args());
        M()->execute($all_sql);
    }

    /**
     * Insert query method
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return int|false last insert id
     */
    public function insert($sql, array $args = array())
    {
        /**
         * insert into 表名(id,name,age) values(null,'张三',29)
         * insert into 表名 set id = null, name='张三',age=29
         */

        /**
         * 'INSERT INTO ?T SET ?%', $this->tableName, $data             $data = >array('name'=>'张三','age'=>29)
         *
         *
         * 'INSERT INTO 表名 SET  name='张三',age=29'
         */
        $params = func_get_args();

        //1.取出第一个参数作为sql
        $sql = array_shift($params);  //INSERT INTO ?T SET ?%
        //2.取出第二个参数作为表名
        $table_name = array_shift($params);  //$this->tableName
        //3.将第二个参数的表名($this->tableName)替换到?T
        $sql = str_replace('?T',$table_name,$sql); //INSERT INTO 表名 SET ?%
        //4.取出第三个参数
        $values = array_shift($params);//array('name'=>'张三','age'=>29)   `name`='张三', `age`='29'
        $vSQL = '';
        foreach($values as $k=>$v){
            $vSQL.="`$k`='$v',";
        }
        $vSQL = rtrim($vSQL,',');
        //>>5.将data拼出来的sql替换到?%
        $all_sql = str_replace('?%',$vSQL,$sql);
        return M()->execute($all_sql);
    }

    /**
     * Update query method
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return int|false affected rows
     */
    public function update($sql, array $args = array())
    {
        // TODO: Implement update() method.

    }

    /**
     * Get all query result rows as associated array
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return array associated data array (two level array)
     */
    public function getAll($sql, array $args = array())
    {
        // TODO: Implement getAll() method.
        $all_sql = $this->buildSQL(func_get_args()); //得到getRow方法被调用时传递过来的所有参数
        $rows =  M()->query($all_sql);
        return $rows;
    }

    /**
     * Get all query result rows as associated array with first field as row key
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return array associated data array (two level array)
     */
    public function getAssoc($sql, array $args = array())
    {
        // TODO: Implement getAssoc() method.
    }

    /**
     * Get only first row from query
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return array associated data array
     */
    public function getRow($sql, array $args = array())
    {
        $all_sql = $this->buildSQL(func_get_args()); //得到getRow方法被调用时传递过来的所有参数
        $rows =  M()->query($all_sql);
        return $rows[0];
    }

    /**
     * @param $params ,包含第一个参数的所有参数
     */
    private function  buildSQL($params){
        $sql = array_shift($params); //这是去掉sql后的所有参数
        $sqls = preg_split('/\?[TFN]/',$sql); //这是sql的分割后的数组
        $all_sql = "";
        foreach($sqls as $k=>$sql){ //将两个数组按照位置合并成一个字符串
            $all_sql.="$sql".$params[$k];
        }
        return $all_sql;
    }

    /**
     * Get first column of query result
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments
     *
     * @return array one level data array
     */
    public function getCol($sql, array $args = array())
    {
        // TODO: Implement getCol() method.
    }

    /**
     * Get one first field value from query result
     *
     * @access public
     * @param string $sql SQL query
     * @param array $args query arguments   count()
     *
     * @return string field value
     */
    public function getOne($sql, array $args = array())
    {
        $all_sql = $this->buildSQL(func_get_args());
        $rows = M()->query($all_sql);
        $row = $rows[0]; //得到第一行.
        return  array_shift($row);//将唯一的一个值弹出
    }


} 