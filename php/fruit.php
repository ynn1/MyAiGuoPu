<?php
	
	header("content-type","text/html;charset=utf-8");
	
	$title = $_POST['title'];
	$jiage= $_POST['jiage'];
	$id = $_POST['id'];
	$num= $_POST['num'];
	$money= $_POST['money'];
	//建立连接
	$conn = mysql_connect("localhost","root","root");
	
	if($conn){
		echo("连接成功");
	}else{
		echo("连接失败");
	}
	
	//2、选择数据库
	mysql_select_db("aiguopu",$conn);
	
	//3、执行语句（插入数据）
	$sqlStr = "insert into fruit(id,title,jiage,num,money)
 values('".$id."','".$title."','".$jiage."','".$num."','".$money."')";
 
	mysql_query($sqlStr,$conn);
	
	//4、关闭数据库
	mysql_close($conn);


?>