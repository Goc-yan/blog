CREATE TABLE 'articles'(
  'id' BIGINT(20) AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
  'title' varchar(128)  NOT NULL COMMENT '标题',
  'createDate' varchar(16)  NOT NULL COMMENT '创建时间',
  'updateDate' varchar(16)  NOT NULL COMMENT '更新时间',
  'category' varchar(16) NOT NULL COMMENT '分类',
  'tags' varchar(64) NOT NULL COMMENT '标签',
  'content' text NOT NULL COMMENT '文章'
) DEFAULT CHARSET=utf8 COMMENT='文章包';

CREATE TABLE 'category'(
  'id' BIGINT(20) AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
  'category' varchar(6)  NOT NULL COMMENT '标签名'
) DEFAULT CHARSET=utf8 COMMENT='文章分类包';

CREATE TABLE 'tags'(
  'id' BIGINT(20) AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
  'tagName' varchar(6)  NOT NULL COMMENT '标签名'
) DEFAULT CHARSET=utf8 COMMENT='文章标签包';
