$(function(){
	$(".nav").load("nav.html");
	setTimeout(function(){
		$(".nav .center li:eq(0)").removeClass("active");
	},30)
	$(".footer").load("footer.html");
//			console.log($(".pwdtxt1").text());
	//选择登录还是注册
	$(".btn").click(function(){
		($(".btn").val()=="会员登录")?$(".btn").val("会员注册"):$(".btn").val("会员登录");
		if($(".btn").val()=="会员登录"){
			$(".dl").css({
				"display":"none"
			});
			$(".zc").css({
				"display":"block"
			})
		}else if($(".btn").val()=="会员注册"){
			$(".dl").css({
				"display":"block"
			});
			$(".zc").css({
				"display":"none"
			})
		}
	});
	
		//--------------数据库查询-------------
		//----------------------------------登录框设置(模拟后台)-------------------------------
		$(".btn1").click(function(){
			$(".nametxt1").text("");
			$(".pwdtxt1").text("");
			var user0=$(".name1").val();
			console.log(user0);
			//-----------从数据库中查询用户名和密码是否存在----------
			$.get("php/UserDengLu.php",{"userName":$(".name1").val(),
									"userPwd":$(".pwd1").val()
							},function(data){
								console.log(data);
								if(data.indexOf("1")>-1){
									$(".nametxt1").text("");
									$(".pwdtxt1").text("");
									$(".nav .header p .user i").text(user0);
	function  saveCookie(key,value,n){
				document.cookie=encodeURIComponent(key)+"="+encodeURIComponent(value)+";expires="+changeData(n);				
	}
									saveCookie("user",$(".name1").val(),30);
									location="shouye.html";
								}else{
									alert("输入信息有误!")
								}
			});
		})
		//------------------------------注册框设置-------------------------------------
		//-------用户名设置----------
		var fg=0;
		//-----------从数据库中查询用户名是否已经存在-------
		$(".name2").blur(function(){
			$(".nametxt2").text("");
			$.get("php/User.php",{"userName":$(".name2").val()},function(data){
				console.log(data);
				if(data.indexOf("1")>-1){
					$(".nametxt2").text("亲，该用户名已经存在");							
				}else{
					$(".nametxt2").text("");	
				}
			});
		})
		//密码设置
		$(".pwd2").blur(function(){
			$(".pwdtxt2").text("");
			var mypwd=$(".pwd2").val();
			var reg=/^[0-9a-zA-Z][0-9a-zA-Z_]{5,11}$/;//
			if(reg.test(mypwd)){//
				$(".pwdtxt2").text("");
				//密码确认设置
					$(".nextpwd2").blur(function(){
						$(".nextpwdtxt2").text("");
						if($(".nextpwd2").val()==""){
							$(".nextpwdtxt2").text("确认密码不能为空");
							fg++;
						}else if($(".nextpwd2").val()==$(".pwd2").val()&&$(".nextpwd2").val()!=""){
							$(".nextpwdtxt2").text("");
							fg=0;
						}else{
							$(".nextpwdtxt2").text("#请保持与输入密码一致");
							fg++;
						}
					})
			}else if($(".pwd2").val()==""){
				$(".pwdtxt2").text("#密码不能为空");
				fg++;
			}else{
				$(".pwdtxt2").text("#密码由6-12位字母数字下划线组成");
				fg++;
			}
		})
		
		//验证码设置
		//验证码获取(4位)
		var n=parseInt(Math.random()*10000);
		//判断验证的位数
		if(n<1000&&n>100){		//验证码为三位数时
			n=""+0+n;
		}else if(n<100&&n>10){		//验证过吗为两位数时
			n=""+0+0+n;
		}else if(n<10){
			n=""+0+0+0+n;
		}
		$(".yzm2").text(n);
		$(".change").click(function(){
			$(".yzm").val("");
			var n=parseInt(Math.random()*10000);
			//判断验证的位数
			if(n<1000&&n>100){		//验证码为三位数时
				n=""+0+n;
			}else if(n<100&&n>10){		//验证过吗为两位数时
				n=""+0+0+n;
			}else if(n<10){
				n=""+0+0+0+n;
			}
			$(".yzm2").text(n);
		})
		//验证码的输入
		$(".yzm").blur(function(){
			if($(".yzm").val()==$(".yzm2").text()){
				$(".yzmtxt").text("");
			}else{
				$(".yzmtxt").text("#验证码输入错误!")
				fg++;
			}
		})
		//注册提交
		$(".zhuce").click(function(){				
			if(($(".nametxt2").text()=="")&&($(".pwdtxt2").text()=="")&&($(".nextpwdtxt2").text()=="")&&($(".yzmtxt").text()=="")&&($(".name2").val()!="")&&($(".pwd2").val()!="")&&($(".nextpwd2").val()!="")&&($(".yzm").val()!="")){
			//-------------提交到数据库-----------
			//------------点击注册时将注册信息提交到数据库中---------
			$.post("php/zhuce.php",
					{
						"userName":$(".name2").val(),
						"userPwd":$(".pwd2").val()
					},
					function(data){
						alert(data);
//						alert("注册成功！");
						location="shouye.html";
						$(".name2").val("");
						$(".pwd2").val("");
						$(".nextpwd2").val("");
						$(".yzm").val("");
					}
			)
			}else{
				alert("请完善注册信息");
			}
		})
})