$(function(){
	$(".nav").load("nav.html");
	//
	setTimeout(function(){
		$(".nav .center li:eq(0)").removeClass("active");
	},30)
	$(".footer").load("footer.html");
	//------------------------------------动态创建内容-------------------------------
	//---------------数据库中获得数据--------------
	let htmlStr="<ul>";
	$.get("php/getGoodsList.php",function(data){
//		console.log(data);
//		console.log(typeof(data));
		var res=eval(data);
		console.log(res);
		for(var i=0;i<res.length;i++){
		htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[i].goodsImg+"' class='"+res[i].goodsId+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[i].goodsDesc+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[i].goodsName+"</a><br /><a href='###'>￥"+res[i].goodsPrice+"元</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[i].goodsId+"'/></a></dd></dl></li>";
		}
		htmlStr+="</ul>";
		$(".containerCenter").append(htmlStr);
		xiaoguo();
		//-------------点击选择内容------------
		var a;
		var x;
		$(".containerTop a").click(function(){
			$(".containerCenter").text("");
			let htmlStr="<ul>";
			//-----------按点击的内容选择商品-------
			for(var i=0;i<res.length;i++){
				a=res[i].goodsType;
				if($(this).hasClass(a)){
					x=i;
					htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[x].goodsImg+"' class='"+res[x].goodsId+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[x].goodsDesc+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[x].goodsName+"</a><br /><a href='###'>￥"+res[x].goodsPrice+"元</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[x].goodsId+"'/></a></dd></dl></li>";
				}
				//----------点击全部时---------
				if($(this).hasClass("all")){
					htmlStr+="<li><dl><dt class='dt2'><img src='img/"+res[i].goodsImg+"' class='"+res[i].goodsId+"'/><span class='wrap2'>会员专享</span><p><marquee>"+res[i].goodsDesc+"</marquee></p></dt><dd><div class='ddleft'><a href='###'>"+res[i].goodsName+"</a><br /><a href='###'>￥"+res[i].goodsPrice+"元</a></div><a href='###'><img src='img/car.jpg' width='36' class='"+res[i].goodsId+"'/></a></dd></dl></li>";
				}
			}
			htmlStr+="</ul>";
			$(".containerCenter").append(htmlStr);
			xiaoguo();
		})
	})
	//------------内容效果封装函数----------------
	function xiaoguo(){
		//--------鼠标移到图片上-------
		$(".container ul dl dt").mouseenter(function(){
			//-------图片放大-------
			$(this).children("img").animate({
				"width":"300px"
			})
			//-----滚动文字出现-----
			$(this).children("p").animate({
				"bottom":"0"
			})
		});
		//--------鼠标移开--------
		$(".container ul dl dt").mouseleave(function(){
			$(this).children("img").animate({
				"width":"275px"
			})
			$(this).children("p").animate({
				"bottom":"-60px"
			})
			$(".container ul dl dt p i").animate({
				"left":"0px"
			})
		});
		//-----------------------点击跳转效果-------------------------------
		var User=$(".nav .header p .user i").text();
		$.get("php/getGoodsList.php",function(data){
			var res=eval(data);
			var a;
			var x;
			//-------------------------点击添加到购物车-------------------------------
			$(".container ul dl dd a img").click(function(){
//				console.log($(".nav .header p .user i").text());
//				console.log(User);
//				console.log($(".nav .shopCar .add li .id").text());  
//				var ss=$(".nav .shopCar .add li");
////				console.log(ss.length);
//				for(var k=0;k<ss.length;k++){
////					console.log(ss[k]);
//					var oli=ss[k];
//					console.log(oli);
//					
//				}
				//----没有登录时-----
				if(User==""){
					$(".nav .nofile0").css({
						"display":"block"
					})
				}else{//----用户已经登录时---
					for(var i=0;i<res.length;i++){
						a=res[i].goodsId;
						if($(this).hasClass(a)){
							x=i;
							let htmlStr='<li><img src="img/'+res[x].goodsImg+'" width="100" height="100" class="'+res[x].goodsId+'"/><div class="right"><h2 class="title">'+res[x].goodsName+'</h2><br /><p class="jiage">价格:'+res[x].goodsPrice+'</p><p class="id">'+res[x].goodsId+'</p><input type="button" class="jian" value="-"/><input  type="text" value="1" class="num"/><input type="button" class="jia" value="+"/><a href="###" class="del">删除</a></div></li>';
							$(".nav .shopCar .add").append(htmlStr);
					//--------------将商品添加到购物车（数据库中）addShoppingCart.php--------------
							$.get("php/addShoppingCart.php",
									{
										"goodsName":res[x].goodsName,
										"vipName":User,
										"goodsId":res[x].goodsId,
										"goodsCount":"1"
									},
									function(data){
										//--------加入购物车时提示信息出现-----------
										$(".nav .shopping").css({
											"display":"block"
										})
										//----------一秒过后提示信息消失---------
										setTimeout(function(){
											$(".nav .shopping").css({
												"display":"none"
											})
										},1000);
							})
							//----------------------------------------
							//-------点击删除购物车中的商品--------
							$(".del").click(function(){
								//-------1.从界面删除---
								$(this).parents("li").detach();
								let id0=$(this).prev(".id").text();
								//-------2.数据库中删除-----
								$.get("php/deleteGoods.php",
									{
										"vipName":User,
										"goodsId":id0
									},
									function(data){
										console.log(data);
								})
							})
							
						}
					}
					//-------------购物车中数量加减------------------
					$(".nav .shopCar .add li").off("click");
					$(".nav .shopCar .add li").on("click",".jia",function(){
						let num0=$(this).prev(".num").val();
						num0++;
						$(this).prev(".num").val(num0)
					})
					$(".nav .shopCar .add li").on("click",".jian",function(){
						let num0=$(this).next(".num").val();
						if(num0>0){
							num0--;
							$(this).next(".num").val(num0)
						}
					});
					$(".nav .shopCar .add .num").blur(function(){
						if($(this).val()<0){
							$(this).val(0);
							var num2=$(this).val();
							num2=num2.replace(/\D/,"1"); // \D 所有非数字的字符
							$(this).val(num2);
						}
					});
				}
			})
			//--------------------------添加购物车结束-------------------
		});
	
//---------------------------------跳转到商品详情界面---------------------------------------
		$.get("php/getGoodsList.php",function(data){
			var res=eval(data);
			var x;
			var a;
			$(".containerCenter li dt img").click(function(){
				$(".container").text("");
				for(var i=0;i<res.length;i++){
					a=res[i].goodsId;
					if($(this).hasClass(a)){
						x=i;
						let containerCenter='<p class="fanhui"><a href="###">返回&lt;&lt;</a></p><div class="containerLeft"><ul class="containerLeftMin"><li class="active"><img src="img/'+res[x].goodsImg+'" width="50"/></li><li><img src="img/'+res[x].goodsImg+'" width="50"/></li><li><img src="img/'+res[x].goodsImg+'" width="50"/></li></ul><div class="containerLeftMax"><img src="img/'+res[x].goodsImg+'" /></div></div><div class="containerRight"><p><h2>'+res[x].goodsName+'</h2></p><p>果园价:'+res[x].goodsPrice+'</p><p>规格:</p><p>配送至:<select><option>北京</option><option>上海</option><option>天津</option><option>深圳</option><option>西安</option></select></p><p>数量:<input type="button" class="delate" value="-"/><input type="text" class="txt" /><input type="button" class="add" value="+"/></p><p><input type="button" class="buy" value="立即购买"/><input type="button" class="car" value="加入购物车"/></p><div class="containerRightBottom"><p>商品编号:'+res[x].goodsId+'</p><p>备注:'+res[x].goodsDesc+'</p></div></div><div class="containerBottom"><p class="sp"><span class="spjj">商品简介</span><span class="gkpl">顾客评论</span></p><ul class="jianjie"><div class="jianjie2"><img src="img/'+res[x].goodsImg+'" width="500"/><img src="img/'+res[x].goodsImg+'" width="500"/><img src="img/'+res[x].goodsImg+'" width="500"/><img src="img/'+res[x].goodsImg+'" width="500"/></div><div class="gkpl2"></div></ul><textarea class="talking"></textarea></div>';
						$(".container").append(containerCenter);
					//---------------点击添加到购物车-------------
					$(".container .containerRight .car").click(function(){
						let htmlStr='<li><img src="img/'+res[x].goodsImg+'" width="100" height="100" class="'+res[x].goodsId+'"/><div class="right"><h2 class="title">'+res[x].goodsName+'</h2><br /><p class="jiage">价格:'+res[x].goodsPrice+'</p><p class="id"></p><input type="button" class="jian" value="-"/><input  type="text" value="1" class="num"/><input type="button" class="jia" value="+"/><a href="###" class="del">删除</a></div></li>';
						$(".nav .shopCar .add").append(htmlStr);
						//--------------将商品添加到后台------------
					
					//--------------将商品添加到购物车（数据库中）addShoppingCart.php--------------
					let count0=$(".nav .shopCar .add li .num").val();
//					.val();
					console.log(count0);
						$.get("php/addShoppingCart.php",
								{
									"goodsName":res[x].goodsName,
									"vipName":User,
									"goodsId":res[x].goodsId,
									"goodsCount":"1"
								},
								function(data){
									//--------加入购物车时提示信息出现-----------
									$(".nav .shopping").css({
										"display":"block"
									})
									//----------一秒过后提示信息消失---------
									setTimeout(function(){
										$(".nav .shopping").css({
											"display":"none"
										})
									},1000);
						})
						//----------------------------------------
						//-------点击删除-------
						//-------点击删除购物车中的商品--------
						$(".del").click(function(){
							//-------1.从界面删除---
							$(this).parents("li").detach();
							let id0=$(this).prev(".id").text();
							//-------2.数据库中删除-----
							$.get("php/deleteGoods.php",
								{
									"vipName":User,
									"goodsId":id0
								},
								function(data){
									console.log(data);
							})
						})
					})
					//-------------购物车中数量加减------------------
					$(".nav .shopCar .add li").off("click");
					$(".nav .shopCar .add li").on("click",".jia",function(){
						let num0=$(this).prev(".num").val();
						num0++;
						$(this).prev(".num").val(num0)
					})
					$(".nav .shopCar .add li").on("click",".jian",function(){
						let num0=$(this).next(".num").val();
						if(num0>0){
							num0--;
							$(this).next(".num").val(num0)
						}
					});
					$(".nav .shopCar .add .num").blur(function(){
						if($(this).val()<0){
							$(this).val(0);
							var num2=$(this).val();
							num2=num2.replace(/\D/,"1"); // \D 所有非数字的字符
							$(this).val(num2);
						}
					});
					//---------------添加购物车结束-------------
					//-----点击返回上个界面----
						$(".container .fanhui").click(function(){
							location="http://127.0.0.1:8020/AiGuoPu02/gift.html";
						})
						var m=0;
						var timer;
						//将准备展示的图片地址存放在数组imgsrc中
						var imgsrc=["img/"+res[x].goodsImg+"","img/"+res[x].goodsImg+"","img/"+res[x].goodsImg+""];
						function autoplay(){
							timer=setInterval (function(){
								m++;
								if(m==3){
									m=0;
								}
								$("#box .container .containerLeftMax img").attr({"src":imgsrc[m]});
								for(var i=0;i<imgsrc.length;i++){
									oli[i].className="";
								}
								oli[m].className="active";
							},1000)	
						}
						autoplay();
//						//鼠标移上停止播放，移下继续播放
						$(".containerLeftMin li").mouseenter(function(){
							clearInterval(timer);
						})
						$(".containerLeftMin li").mouseleave(function(){
							autoplay();
						})
						$(".containerLeftMax img").mouseenter(function(){
							clearInterval(timer);
						})
						$(".containerLeftMax img").mouseleave(function(){
							autoplay();
						})
//						//----------------------右边大图跟随左边图片变化----------------
						var container1=document.getElementById("box").getElementsByClassName("container")[0];
						var oli=container1.getElementsByClassName("containerLeftMin")[0].getElementsByTagName("li");
						for(var k=0;k<oli.length;k++){
							oli[k].index=k;
							oli[k].onmouseover=function(){
								for(var j=0;j<oli.length;j++){
									oli[j].className="";
								}
								this.className="active";
								m=this.index;
								$(".containerLeftMax img").attr({"src":imgsrc[m]});
							}
						}
					}	//---------
				}
				//-------------商品详情部分数量加减------------------
					var num3=$(".container .containerRight .txt").val();
					$(".container .containerRight .add").click(function(){
						num3++;
			//			console.log(num);
						$(".container .containerRight .txt").val(num3);
					});
					$(".container .containerRight .delate").click(function(){
						if(num3>0){
							num3--;
							$(".container .containerRight .txt").val(num3);
						}
					});
					$(".container .containerRight .txt").blur(function(){
						if($(".container .containerRight .txt").val()<0){
							$(".container .containerRight .txt").val(0);
						}
						var num4=$(".container .containerRight .txt").val();
						num4=num4.replace(/\D/,"1"); // \D 所有非数字的字符
						$(".container .containerRight .txt").val(num4);
						num=num4;
					});
				//-------------数量加减结束--------------
				
				//--------------------商品简介与顾客评论区---------------
					//-----------点击顾客评论（gkpl）----------
					$(".container .containerBottom .gkpl").click(function(){
						//------------商品简介隐藏---------
						$(".container .containerBottom .jianjie .jianjie2").css({
							"display":"none"
						})
						//---------评论框出现------
						$(".container .containerBottom .talking").css({
							"display":"block"
						})
						//---------顾客评论界面出现------
						$(".container .containerBottom .jianjie .gkpl2").css({
							"display":"block"
						})
						//------------评论框设计---------	
						$(".container .containerBottom .talking").blur(function(){
							//-----------发表评论-----------
							let otxt=$(".container .containerBottom .talking").val();
							let htmlStr="<li style='line-height:14px;height:50px;border-bottom:solid 1px #ccc'>"+otxt+"</li>";
							$(".container .containerBottom .jianjie .gkpl2").append(htmlStr);
							$(".container .containerBottom .talking").val("");
						})
					})
					//------------点击商品简介（spjj）------------
					$(".container .containerBottom .spjj").click(function(){
						//----------商品简介界面出现--------
						$(".container .containerBottom .jianjie .jianjie2").css({
							"display":"block"
						})
						//------------顾客评论区隐藏-------
						$(".container .containerBottom .jianjie .gkpl2").css({
							"display":"none"
						})
						$(".container .containerBottom .talking").css({
							"display":"none"
						})
					})
				//---------------商品简介与顾客评论区结束------------
			})
		})
	}
	//--------------(xiaoguo)效果封装函数结束-------------
})