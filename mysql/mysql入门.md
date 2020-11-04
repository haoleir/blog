# MySQL入门
### 在Mac OS X启动和停止MySQL服务的命令



启动MySQL服务

```mysql
sudo /usr/local/mysql/support-files/mysql.server start
```



停止MySQL服务

```mysql
sudo /usr/local/mysql/support-files/mysql.server stop
```



重启MySQL服务

```mysql
sudo /usr/local/mysql/support-files/mysql.server restart
```



启动客户端

```mysql
mysql -h主机名  -u用户名 -p密码

如：mysql -hlocalhost -uroot -p123456
或者：mysql --host=localhost --user=root --password=123456
```



---

### 数据库的基本操作

```mysql
CREATE DATABASE IF NOT EXISTS 数据库名;

SHOW DATABASES;

USE xiaohaizi;

DROP DATABASE IF EXISTS 数据库名;
```


---

### 表的基本操作

创建表
```mysql
CREATE TABLE IF NOT EXISTS 表名 (
    列名1    数据类型    [列的属性],
    列名2    数据类型    [列的属性],
    ...
    列名n    数据类型    [列的属性]
) COMMENT '表的注释信息';

如：
CREATE TABLE first_table (
    first_column INT,
    second_column VARCHAR(100)
);
```



删除表

```mysql
DROP TABLE IF EXISTS 表1, 表2, ..., 表n;
```



查看表结构

```mysql
DESCRIBE 表名;
DESC 表名;
EXPLAIN 表名;
SHOW COLUMNS FROM 表名;
SHOW FIELDS FROM 表名;

SHOW CREATE TABLE 表名\G;
```



修改表名

```mysql
ALTER TABLE 旧表名 RENAME TO 新表名;

RENAME TABLE 旧表名1 TO 新表名1, 旧表名2 TO 新表名2, ... 旧表名n TO 新表名n;
```



增加列

```mysql
ALTER TABLE 表名 ADD COLUMN 列名 数据类型 [列的属性];

如： ALTER TABLE first_table ADD COLUMN third_column CHAR(4) ;
```



增加列到特定位置

添加到第一列：

```mysql
ALTER TABLE 表名 ADD COLUMN 列名 列的类型 [列的属性] FIRST;
```



添加到指定列的后边：

```mysql
ALTER TABLE 表名 ADD COLUMN 列名 列的类型 [列的属性] AFTER 指定列名;
```


删除列

```mysql
ALTER TABLE 表名 DROP COLUMN 列名;
```



修改列信息

```mysql
方式一：
ALTER TABLE 表名 MODIFY 列名 新数据类型 [新属性];

方式二：
ALTER TABLE 表名 CHANGE 旧列名 新列名 新数据类型 [新属性];
```



修改列排列位置

将列设为表的第一列：

```mysql
ALTER TABLE 表名 MODIFY 列名 列的类型 列的属性 FIRST;
```


将列放到指定列的后边：

```mysql
ALTER TABLE 表名 MODIFY 列名 列的类型 列的属性 AFTER 指定列名;
```


一条语句中包含多个修改操作

```mysql
ALTER TABLE 表名 操作1, 操作2, ..., 操作n;
```
---
### 列的属性

简单的查询语句

```mysql
SELECT * FROM 表名;
```



简单插入语句

```mysql
INSERT INTO 表名(列1, 列2, ...) VALUES(列1的值，列2的值, ...);
```



批量插入

```mysql
INSERT INTO 表名(列1,列2, ...) VAULES(列1的值，列2的值, ...), (列1的值，列2的值, ...), (列1的值，列2的值, ...), ...;
```



非空，默认值

```mysql
CREATE TABLE first_table (
    first_column INT NOT NULL,
    second_column VARCHAR(100) DEFAULT 'abc'
);
```



主键

```mysql
CREATE TABLE student_score (
    number INT,
    subject VARCHAR(30),
    score TINYINT,
    PRIMARY KEY (number, subject)
);
```



UNIQUE属性

```mysql
如果表中为某个列或者列组合定义了UNIQUE属性的话，MySQL会对我们插入的记录做校验，如果新插入记录在该列或者列组合的值已经在表中存在了，那就会报错！
CREATE TABLE student_info (
    number INT PRIMARY KEY,
    name VARCHAR(5),
    sex ENUM('男', '女'),
    id_number CHAR(18),
    department VARCHAR(30),
    major VARCHAR(30),
    enrollment_time DATE,
    UNIQUE KEY uk_id_number (id_number)
);

主键和UNIQUE约束的区别
​```mysql
主键和UNIQUE约束都能保证某个列或者列组合的唯一性，但是：
一张表中只能定义一个主键，却可以定义多个UNIQUE约束！
规定：主键列不允许存放NULL，而声明了UNIQUE属性的列可以存放NULL，而且NULL可以重复地出现在多条记录中！
```



外键

```mysql
CONSTRAINT [外键名称] FOREIGN KEY(列1, 列2, ...) REFERENCES 父表名(父列1, 父列2, ...);

CREATE TABLE student_score (
    number INT,
    subject VARCHAR(30),
    score TINYINT,
    PRIMARY KEY (number, subject),
    CONSTRAINT FOREIGN KEY(number) REFERENCES student_info(number)
);
```



AUTO_INCREMENT属性

```mysql
CREATE TABLE first_table (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_column INT,
    second_column VARCHAR(100) DEFAULT 'abc'
);


在为列定义AUTO_INCREMENT属性的时候需要注意这几点：
一个表中最多有一个具有AUTO_INCREMENT属性的列。
具有AUTO_INCREMENT属性的列必须建立索引。主键和具有UNIQUE属性的列会自动建立索引。
拥有AUTO_INCREMENT属性的列就不能再通过指定DEFAULT属性来指定默认值。
一般拥有AUTO_INCREMENT属性的列都是作为主键的属性，来自动生成唯一标识一条记录的主键值。
```



影响展示外观的ZEROFILL属性

```mysql
对于无符号整数类型的列，我们可以在查询数据的时候让数字左边补0，如果想实现这个效果需要给该列加一个ZEROFILL属性

CREATE TABLE zerofill_table (
    i1 INT UNSIGNED ZEROFILL,
    i2 INT UNSIGNED
);
```

---
### 简单查询

去除单列的重复结果
```mysql
SELECT DISTINCT 列名 FROM 表名;
```



去除多列的重复结果

```mysql
SELECT DISTINCT 列名1, 列名2, ... 列名n  FROM 表名;
```



限制查询结果条数

```mysql
LIMIT 开始行, 限制条数;

SELECT number, name, id_number, major FROM student_info LIMIT 0, 2;
```



对查询结果排序

```mysql
ORDER BY 列名 ASC|DESC
```


按照多个列的值进行排序

```mysql
ORDER BY 列1 ASC|DESC, 列2 ASC|DESC ...

SELECT * FROM student_score ORDER BY subject, score DESC;


可以让ORDER BY语句和LIMIT语句结合使用，不过 ORDER BY 语句必须放在 LIMIT 语句前边
SELECT * FROM student_score ORDER BY score LIMIT 1;
```

---


带搜索条件的查询

查询学号不在20180102~20180104这个区间内的所有学生信息

```mysql
SELECT number, name, id_number, major FROM student_info WHERE number NOT BETWEEN 20180102 AND 20180104;
```



查询专业不在“软件工程”和“飞行器设计”的学生信息

```mysql
SELECT number, name, id_number, major FROM student_info WHERE major NOT IN ('软件工程', '飞行器设计');
```



不能直接使用普通的操作符来与NULL值进行比较，必须使用IS NULL或者IS NOT NULL！

```mysql
SELECT number, name, id_number, major FROM student_info WHERE name IS NOT NULL;
```



查询学生名字里边包含了一个'香'字

```mysql
SELECT number, name, id_number, major FROM student_info WHERE name LIKE '%香%';
```



组合聚集函数

```mysql
SELECT COUNT(*) AS 成绩记录总数, MAX(score) AS 最高成绩, MIN(score) AS 最低成绩, AVG(score) AS 平均成绩 FROM student_score;
```



使用DISTINCT过滤掉重复数据

```mysql
SELECT COUNT(DISTINCT major) FROM student_info;
```

---
### 分组查询



按照subject中的值将所有的记录分成两组，然后分别对每个分组中记录的score列调用AVG函数进行数据统计。

```mysql
SELECT subject, AVG(score) FROM student_score GROUP BY subject;
```



查询平均分大于73分的课程

```mysql
SELECT subject, AVG(score) FROM student_score GROUP BY subject HAVING AVG(score) > 73;
```



分组和排序

```mysql
按照各个学科的平均分从大到小降序排序
SELECT subject, AVG(score) AS avg_score FROM student_score GROUP BY subject ORDER BY avg_score DESC;
```



嵌套分组

```mysql
SELECT department, major, COUNT(*) FROM student_info GROUP BY department, major;


SELECT concat('专业：', major), COUNT(*) FROM student_info GROUP BY concat('专业：', major);
```



简单查询语句中各子句的顺序

```mysql
SELECT [DISTINCT] 查询列表
[FROM 表名]
[WHERE 布尔表达式]
[GROUP BY 分组列表 ]
[HAVING 分组过滤条件]
[ORDER BY 排序列表]
[LIMIT 开始行, 限制条数]

其中中括号[]中的内容表示可以省略
```

---
### 子查询

标量子查询单纯的代表一个值
```mysql
SELECT * FROM student_score WHERE number > (SELECT number FROM student_info WHERE name = '杜琦燕');
```



列子查询

```mysql
SELECT * FROM student_score WHERE number IN (SELECT number FROM student_info WHERE major = '计算机科学与工程');
```



行子查询

```mysql
SELECT * FROM student_score WHERE (number, subject) = (SELECT number, '母猪的产后护理' FROM student_info LIMIT 1);
```



表子查询

```mysql
SELECT * FROM student_score WHERE (number, subject) IN (SELECT number, '母猪的产后护理' FROM student_info WHERE major = '计算机科学与工程');
```



EXISTS和NOT EXISTS子查询

```mysql
SELECT * FROM student_score WHERE EXISTS (SELECT * FROM student_info WHERE number = 20180108);
```



相关子查询

```mysql
如，我们想查看一些学生的基本信息，但是前提是这些学生在student_score表中有成绩记录
SELECT number, name, id_number, major FROM student_info WHERE EXISTS (SELECT * FROM student_score WHERE student_score.number = student_info.number);
```



在student_score表的'母猪的产后护理'这门课的成绩中，有哪些超过了平均分的记录

```mysql
SELECT * FROM student_score WHERE subject = '母猪的产后护理' AND score > AVG(score);
ERROR 1111 (HY000): Invalid use of group function
报错了。为啥呢？因为聚集函数是用来对分组做数据统计的（如果没有GROUP BY语句那么意味着只有一个分组），而WHERE子句是以记录为单位来执行过滤操作的，在WHERE子句执行完成之后才会得到分组，也就是说：聚集函数不能放到WHERE子句中！

SELECT * FROM student_score WHERE subject = '母猪的产后护理' AND score > (SELECT AVG(score) FROM student_score WHERE subject = '母猪的产后护理');
我们使用子查询先统计出了'母猪的产后护理'这门课的平均分，然后再到外层查询中使用这个平均分组成的表达式来作为搜索条件去查找大于平均分的记录。
```

---
### 连接查询

内连接和外连接的概念：
```mysql
对于内连接的两个表，驱动表中的记录在被驱动表中找不到匹配的记录，该记录不会加入到最后的结果集，我们上边提到的连接都是所谓的内连接。
对于外连接的两个表，驱动表中的记录即使在被驱动表中没有匹配的记录，也仍然需要加入到结果集。

在MySQL中，根据选取驱动表的不同，外连接仍然可以细分为2种：
左外连接
选取左侧的表为驱动表。

右外连接
选取右侧的表为驱动表。

放在不同地方的过滤条件是有不同语义的：
WHERE子句中的过滤条件
WHERE子句中的过滤条件就是我们平时见的那种，不论是内连接还是外连接，凡是不符合WHERE子句中的过滤条件的记录都不会被加入最后的结果集。

ON子句中的过滤条件
对于外连接的驱动表的记录来说，如果无法在被驱动表中找到匹配ON子句中的过滤条件的记录，那么该记录仍然会被加入到结果集中，对应的被驱动表记录的各个字段使用NULL值填充。

内连接中的WHERE子句和ON子句是等价的。
一般情况下，我们都把只涉及单表的过滤条件放到WHERE子句中，把涉及两表的过滤条件都放到ON子句中，我们也一般把放到ON子句中的过滤条件也称之为连接条件。
```



左（外）连接的语法

```mysql
SELECT * FROM t1 LEFT [OUTER] JOIN t2 ON 连接条件 [WHERE 普通过滤条件];
如：SELECT student_info.number, name, major, subject, score FROM student_info LEFT JOIN student_score ON student_info.number = student_score.number;

内连接的语法
​```mysql
SELECT * FROM t1 [INNER | CROSS] JOIN t2 [ON 连接条件] [WHERE 普通过滤条件];

也就是说在MySQL中，下边这几种内连接的写法都是等价的：
SELECT * FROM t1 JOIN t2;
SELECT * FROM t1 INNER JOIN t2;
SELECT * FROM t1 CROSS JOIN t2;
上边的这些写法和直接把需要连接的表名放到FROM语句之后，用逗号,分隔开的写法是等价的：
SELECT * FROM t1, t2;

对于内连接来说，驱动表和被驱动表是可以互换的，并不会影响最后的查询结果。但是对于外连接来说，由于驱动表中的记录即使在被驱动表中找不到符合ON子句连接条件的记录也会被加入结果集，所以此时驱动表和被驱动表的关系就很重要了，也就是说左外连接和右外连接的驱动表和被驱动表不能轻易互换。
```
---
### 组合查询

使用UNION来将两个查询语句连在一起
```mysql
SELECT m1 FROM t1 WHERE m1 < 2 UNION SELECT m1 FROM t1 WHERE m1 > 2;
使用UNION连接起来的各个查询语句的查询列表中位置相同的表达式的类型应该是相同的

使用UNION来合并多个查询的记录会默认过滤掉重复的记录。如果我们想要保留重复记录，可以使用UNION ALL来连接多个查询：
SELECT m1, n1 FROM t1 UNION ALL SELECT m2, n2 FROM t2;

SELECT m1, n1 FROM t1 UNION SELECT m2, n2 FROM t2 ORDER BY m1 DESC LIMIT 2;
```
---
数据的插入、删除和更新

插入数据
插入完整的记录
```mysql
INSERT INTO 表名 VALUES(列1的值，列2的值, ..., 列n的值);

插入记录的一部分
我们在插入记录的时候，某些列的值可以被省略，但是这个列必须满足下边列出的某个条件之一：
该列允许存储NULL值；
该列有DEFAULT属性，给出了默认值
```



批量插入记录

```mysql
INSERT INTO first_table(first_column, second_column) VALUES(7, 'ggg'), (8, 'hhh');
```



将某个查询的结果集插入表中

```mysql
INSERT INTO second_table(s, i) SELECT second_column, first_column FROM first_table WHERE first_column < 5;
INSERT语句指定的列要和查询列表中的表达式一一对应。比方说上边的INSERT语句指定的列是s, i，对应于查询语句中的second_column, first_column。
```



INSERT IGNORE

```mysql
对于那些是主键或者具有UNIQUE约束的列或者列组合来说，如果表中已存在的记录中没有与待插入记录在这些列或者列组合上重复的值，那么就把待插入记录插到表中，否则忽略此次插入操作。
INSERT IGNORE INTO first_table(first_column, second_column) VALUES(1, '哇哈哈') ;

INSERT ON DUPLICATE KEY UPDATE
对于那些是主键或者具有UNIQUE约束的列或者列组合来说，如果表中已存在的记录中没有与待插入记录在这些列或者列组合上重复的值，那么就把待插入记录插到表中，否则按照规定去更新那条重复的记录中某些列的值。
INSERT INTO first_table (first_column, second_column) VALUES(1, '哇哈哈') ON DUPLICATE KEY UPDATE second_column = '雪碧';
这个语句的意思就是，对于要插入的数据(1, '哇哈哈')来说，如果first_table表中已经存在first_column的列值为1的记录（因为first_column列具有UNIQUE约束），那么就把该记录的second_column列更新为'雪碧'

INSERT INTO first_table (first_column, second_column) VALUES(1, '哇哈哈') ON DUPLICATE KEY UPDATE second_column = VALUES(second_column);
其中的VALUES(second_column)就代表着待插入记录中second_column的值，本例中就是'哇哈哈'。
```



删除数据

```mysql
DELETE FROM 表名 [WHERE 表达式];
虽然删除语句的WHERE条件是可选的，但是如果不加WHERE条件的话将删除所有的记录。
DELETE FROM first_table WHERE first_column > 4;
DELETE FROM first_table ORDER BY first_column DESC LIMIT 1;
```



更新数据

```mysql
UPDATE 表名 SET 列1=值1, 列2=值2, ...,  列n=值n [WHERE 布尔表达式];
虽然更新语句的WHERE子句是可选的，但是如果不加WHERE子句的话将更新表中所有的记录。
```

---
### 视图

我们可以把视图理解为一个查询语句的别名，创建视图的语句如下：
```mysql
CREATE VIEW 视图名 AS 查询语句
```

视图也可以被称为虚拟表，因为我们可以对视图进行一些类似表的增删改查操作，只不过我们对视图的相关操作都会被映射到那个又臭又长的查询语句对应的底层的表上。



创建视图时指定自定义列名

```mysql
CREATE VIEW student_info_view(no, n, m) AS SELECT number, name, major FROM student_info;
```



查看有哪些视图

```mysql
SHOW TABLES;
```



查看视图的定义

```mysql
SHOW CREATE VIEW 视图名;
```



删除视图

```mysql
DROP VIEW 视图名
```
---
### 自定义变量和语句结束分隔符

在自定义变量前边必须加一个@符号
创建
SET @a = 1;
查询
SELECT @a;



语句结束分隔符

```mysql
mysql> delimiter EOF
mysql> SELECT * FROM t1 LIMIT 1;
    -> SELECT * FROM t2 LIMIT 1;
    -> SELECT * FROM t3 LIMIT 1;
    -> EOF
```



### 存储函数和存储过程



> 存储程序包括存储例程（存储函数与存储过程）、触发器和事件，其中存储例程是需要我们手动调用的，而触发器和事件是MySQL服务器在特定情况下自动调用的。



创建存储函数
```mysql
CREATE FUNCTION 存储函数名称([参数列表])
RETURNS 返回值类型
BEGIN
    函数体内容
END
```

```mysql
mysql> delimiter $
mysql> CREATE FUNCTION avg_score(s VARCHAR(100))
    -> RETURNS DOUBLE
    -> BEGIN
    ->     RETURN (SELECT AVG(score) FROM student_score WHERE subject = s);
    -> END $
Query OK, 0 rows affected (0.00 sec)

mysql> delimiter ;
```



存储函数的调用

```mysql
mysql> SELECT avg_score('母猪的产后护理');
```



如果我们想查看我们已经定义了多少个存储函数，可以使用下边这个语句：

```mysql
SHOW FUNCTION STATUS [LIKE 需要匹配的函数名]
```



想查看某个函数的具体是怎么定义的，可以使用这个语句：

```mysql
SHOW CREATE FUNCTION 函数名
```



如果想删除某个存储函数，使用这个语句：

```mysql
DROP FUNCTION 函数名
```



在函数体中定义局部变量

```mysql
DECLARE 变量名1, 变量名2, ... 数据类型 [DEFAULT 默认值];
```



函数体中的局部变量名不允许加@前缀

```mysql
mysql> delimiter $;
mysql> CREATE FUNCTION var_demo()
-> RETURNS INT
-> BEGIN
->     DECLARE c INT;
->     SET c = 5;
->     RETURN c;
-> END $
Query OK, 0 rows affected (0.00 sec)

mysql> delimiter ;
```



判断语句

```mysql
IF 表达式 THEN
    处理语句列表
[ELSEIF 表达式 THEN
    处理语句列表]
... # 这里可以有多个ELSEIF语句
[ELSE
    处理语句列表]
END IF;
```

举一个包含IF语句的存储函数的例子：
```mysql
mysql> delimiter $
mysql> CREATE FUNCTION condition_demo(i INT)
-> RETURNS VARCHAR(10)
-> BEGIN
->     DECLARE result VARCHAR(10);
->     IF i = 1 THEN
->         SET result = '结果是1';
->     ELSEIF i = 2 THEN
->         SET result = '结果是2';
->     ELSEIF i = 3 THEN
->         SET result = '结果是3';
->     ELSE
->         SET result = '非法参数';
->     END IF;
->     RETURN result;
-> END $
Query OK, 0 rows affected (0.00 sec)

mysql> delimiter ;
```



循环语句

```mysql
WHILE 表达式 DO
    处理语句列表
END WHILE;
```

比如我们想定义一个计算从1到n这n个数的和（假设n大于0）的存储函数，可以这么写：
```mysql
mysql> delimiter $
mysql> CREATE FUNCTION sum_all(n INT UNSIGNED)
-> RETURNS INT
-> BEGIN
->     DECLARE result INT DEFAULT 0;
->     DECLARE i INT DEFAULT 1;
->     WHILE i <= n DO
->         SET result = result + i;
->         SET i = i + 1;
->     END WHILE;
->     RETURN result;
-> END $
Query OK, 0 rows affected (0.00 sec)

mysql> delimiter ;
```



REPEAT循环语句
REPEAT循环语句和WHILE循环语句类似，只是形式上变了一下：

```mysql
REPEAT
    处理语句列表
UNTIL 表达式 END REPEAT;
```



WHILE循环语句先判断表达式的值，再执行处理语句，REPEAT循环语句先执行处理语句，再判断表达式的值，所以至少执行一次处理语句，所以如果sum_all函数用REPEAT循环改写，可以写成这样：

```mysql
CREATE FUNCTION sum_all(n INT UNSIGNED)
RETURNS INT
BEGIN
    DECLARE result INT DEFAULT 0;
    DECLARE i INT DEFAULT 1;
    REPEAT
        SET result = result + i;
        SET i = i + 1;
    UNTIL i > n END REPEAT;
    RETURN result;
END
```



LOOP循环语句

```mysql
LOOP
    处理语句列表
END LOOP;
```

比方说我们可以这样改写sum_all函数：
```mysql
CREATE FUNCTION sum_all(n INT UNSIGNED)
RETURNS INT
BEGIN
    DECLARE result INT DEFAULT 0;
    DECLARE i INT DEFAULT 1;
    LOOP
        IF i > n THEN
            RETURN result;
        END IF;
        SET result = result + i;
        SET i = i + 1;
    END LOOP;
END
```



如果我们仅仅想结束循环，而不是使用RETURN语句直接将函数返回，那么可以使用LEAVE语句。不过使用LEAVE时，需要先在LOOP语句前边放置一个所谓的标记，比方说我们使用LEAVE语句再改写sum_all函数：

```mysql
CREATE FUNCTION sum_all(n INT UNSIGNED)
RETURNS INT
BEGIN
    DECLARE result INT DEFAULT 0;
    DECLARE i INT DEFAULT 1;
    flag:LOOP
        IF i > n THEN
            LEAVE flag;
        END IF;
        SET result = result + i;
        SET i = i + 1;
    END LOOP flag;
    RETURN result;
END
```

#### 存储过程

> 存储函数侧重于执行这些语句并返回一个值，而存储过程更侧重于单纯的去执行这些语句。

创建存储过程
```mysql
CREATE PROCEDURE 存储过程名称([参数列表])
BEGIN
    需要执行的语句
END
```

如：
```mysql
mysql> delimiter $
mysql> CREATE PROCEDURE t1_operation(
    ->     m1_value INT,
    ->     n1_value CHAR(1)
    -> )
    -> BEGIN
    ->     SELECT * FROM t1;
    ->     INSERT INTO t1(m1, n1) VALUES(m1_value, n1_value);
    ->     SELECT * FROM t1;
    -> END $
Query OK, 0 rows affected (0.00 sec)

mysql> delimiter ;
```

存储过程的调用
```mysql
CALL 存储过程([参数列表]);
```



查看当前数据库中创建的存储过程都有哪些的语句：

```mysql
SHOW PROCEDURE STATUS [LIKE 需要匹配的存储过程名称]
```



查看某个存储过程具体是怎么定义的语句：

```mysql
SHOW CREATE PROCEDURE 存储过程名称
```



删除存储过程的语句：

```mysql
DROP PROCEDURE 存储过程名称
```



存储过程的参数前缀

```mysql
参数类型 [IN | OUT | INOUT] 参数名 数据类型
```

> 存储过程和存储函数的不同点
> 存储过程和存储函数非常类似，我们列举几个它们的不同点以加深大家的对这两者区别的印象：
> 存储函数在定义时需要显式用RETURNS语句标明返回的数据类型，而且在函数体中必须使用RETURN语句来显式指定返回的值，存储过程不需要。
> 存储函数只支持IN参数，而存储过程支持IN参数、OUT参数、和INOUT参数。
> 存储函数只能返回一个值，而存储过程可以通过设置多个OUT参数或者INOUT参数来返回多个结果。
> 存储函数执行过程中产生的结果集并不会被显示到客户端，而存储过程执行过程中产生的结果集会被显示到客户端。
> 存储函数直接在表达式中调用，而存储过程只能通过CALL语句来显式调用。



---
### 游标的使用

> 游标既可以用在存储函数中，也可以用在存储过程中，我们下边以存储过程为例来说明游标的使用方式，它的使用大致分成这么四个步骤：

1. 创建游标
2. 打开游标
3. 通过游标访问记录
4. 关闭游标

如：
```mysql
CREATE PROCEDURE cursor_demo()
BEGIN
    DECLARE m_value INT;
    DECLARE n_value CHAR(1);
    DECLARE record_count INT;
    DECLARE i INT DEFAULT 0;

    DECLARE t1_record_cursor CURSOR FOR SELECT m1, n1 FROM t1;
    
    SELECT COUNT(*) FROM t1 INTO record_count;
    
    OPEN t1_record_cursor;
    
    WHILE i < record_count DO
        FETCH t1_record_cursor INTO m_value, n_value;
        SELECT m_value, n_value;
        SET i = i + 1;
    END WHILE;
    
    CLOSE t1_record_cursor;
END
```

每调用一次 FETCH 语句，游标就移动到下一条记录的位置。

其实在FETCH语句获取不到记录的时候会触发一个事件，从而我们可以得知所有的记录都被获取过了，然后我们就可以去主动的停止循环。MySQL中响应这个事件的语句如下：

```mysql
DECLARE CONTINUE HANDLER FOR NOT FOUND 处理语句;
```

我们接下来再来改写一下cursor_demo存储过程：
```mysql
CREATE PROCEDURE cursor_demo()
BEGIN
    DECLARE m_value INT;
    DECLARE n_value CHAR(1);
    DECLARE not_done INT DEFAULT 1;

    DECLARE t1_record_cursor CURSOR FOR SELECT m1, n1 FROM t1;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET not_done = 0;
    
    OPEN t1_record_cursor;
    
    flag: LOOP
        FETCH t1_record_cursor INTO m_value, n_value;
        IF not_done = 0 THEN
            LEAVE flag;
        END IF;
        SELECT m_value, n_value, not_done;
    END LOOP flag;
    
    CLOSE t1_record_cursor;
END
```

---
### 触发器和事件

创建触发器
我们看一下定义触发器的语句：
```mysql
CREATE TRIGGER 触发器名
{BEFORE|AFTER}
{INSERT|DELETE|UPDATE}
ON 表名
FOR EACH ROW
BEGIN
    触发器内容
END
```

如：
```mysql
mysql> delimiter $
mysql> CREATE TRIGGER bi_t1
    -> BEFORE INSERT ON t1
    -> FOR EACH ROW
    -> BEGIN
    ->     IF NEW.m1 < 1 THEN
    ->         SET NEW.m1 = 1;
    ->     ELSEIF NEW.m1 > 10 THEN
    ->         SET NEW.m1 = 10;
    ->     END IF;
    -> END $
Query OK, 0 rows affected (0.02 sec)

mysql> delimiter ;
```

我们对t1表定义了一个名叫bi_t1的触发器，它的意思就是在对t1表插入新记录之前，对准备插入的每一条记录都会执行BEGIN ... END之间的语句，NEW.列名表示当前待插入记录指定列的值。



查看当前数据库中定义的所有触发器的语句：

```mysql
SHOW TRIGGERS;
```



查看某个具体的触发器的定义：

```mysql
SHOW CREATE TRIGGER 触发器名;
```



删除触发器：

```mysql
DROP TRIGGER 触发器名;
```
	> 触发器使用注意事项

1. 触发器内容中不能有输出结果集的语句。
2. 触发器内容中NEW代表记录的列的值可以被更改，OLD代表记录的列的值无法更改。（NEW代表新插入或着即将修改后的记录，修改它的列的值将影响INSERT和UPDATE语句执行后的结果，而OLD代表修改或删除之前的值，我们无法修改它。）
3. 如果我们的BEFORE触发器内容执行过程中遇到了错误，那这个触发器对应的具体语句将无法执行；如果具体的操作语句执行过程中遇到了错误，那与它对应的AFTER触发器的内容将无法执行。



#### 事件
> 有时候我们想让MySQL服务器在某个时间点或者每隔一段时间自动地执行一些语句，这时候就需要去创建一个事件。



创建事件
创建事件的语法如下：

```mysql
CREATE EVENT 事件名
ON SCHEDULE
{
    AT 某个确定的时间点| 
    EVERY 期望的时间间隔 [STARTS datetime][END datetime]
}
DO
BEGIN
    具体的语句
END
```
事件支持两种类型的自动执行方式：

1. 在某个确定的时间点执行。

比方说：
```mysql
CREATE EVENT insert_t1
ON SCHEDULE
AT DATE_ADD(NOW(), INTERVAL 2 DAY)
DO
BEGIN
    INSERT INTO t1(m1, n1) VALUES(6, 'f');
END
```
2. 每隔一段时间执行一次。
  比方说：
```mysql
CREATE EVENT insert_t1
ON SCHEDULE
EVERY 1 HOUR
DO
BEGIN
    INSERT INTO t1(m1, n1) VALUES(6, 'f');
END
```



查看和删除事件

```mysql
查看当前数据库中定义的所有事件的语句：
SHOW EVENTS;

查看某个具体的事件的定义：
SHOW CREATE EVENT 事件名;

删除事件：
DROP EVENT 事件名;

事件使用注意事项
默认情况下，MySQL服务器并不会帮助我们执行事件，除非我们使用下边的语句手动开启该功能：

mysql> SET GLOBAL event_scheduler = ON;
Query OK, 0 rows affected (0.00 sec)
```