/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 50540
Source Host           : 127.0.0.1:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2015-08-11 18:10:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_table_relation`
-- ----------------------------
DROP TABLE IF EXISTS `t_table_relation`;
CREATE TABLE `t_table_relation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `main_table` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '主表ID|required,number',
  `main_field` varchar(255) NOT NULL DEFAULT '' COMMENT '主表关联字段|required,noNumber',
  `relation_table` int(11) NOT NULL DEFAULT '0' COMMENT '关系表ID|required,number',
  `relation_field` varchar(255) NOT NULL DEFAULT '' COMMENT '关系表关联字段|required,noNumber',
  `indirect_table` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '多对多间接表|number',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '关系类型:1-一对一(HAS_ONE关联字段在关联表),2-一对一或一对多(BELONGS_TO关联字段在主表),3-一对多(HAS_MANY关联字段在关联表),4-多对多(MANY_TO_MANY关联字段在中间表)|required,number/radio',
  `ctime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间/time',
  `utime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间/time',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '状态:0-已删除,1-正常/radio',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='模型关系';

-- ----------------------------
-- Records of t_table_relation
-- ----------------------------
INSERT INTO `t_table_relation` VALUES ('6', '1', 'main_table', '1', 'relation_table', '2', '4', '1438695595', '1438695595', '1');
INSERT INTO `t_table_relation` VALUES ('23', '3', 'id', '4', 'uid', '0', '1', '0', '0', '1');
INSERT INTO `t_table_relation` VALUES ('24', '3', 'id', '9', 'uid', '0', '3', '0', '0', '1');
INSERT INTO `t_table_relation` VALUES ('25', '4', 'uid', '3', 'id', '0', '2', '0', '0', '1');
INSERT INTO `t_table_relation` VALUES ('26', '4', 'a_u_id', '5', 'rid', '6', '4', '0', '0', '1');
INSERT INTO `t_table_relation` VALUES ('27', '5', 'rid', '7', 'pid', '8', '4', '0', '0', '1');
