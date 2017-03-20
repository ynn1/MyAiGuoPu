$(".center li").mouseenter(function(){
	$(this).addClass("active");
})
$(".center li").mouseleave(function(){
	$(this).removeClass("active");
})
$(".center li:eq(0)").click(function(){
	location="shouye.html";
});
$(".center li:eq(1)").click(function(){
	location="Fruit.html";
});
$(".center li:eq(2)").click(function(){
	location="shengxian.html";
});
$(".center li:eq(3)").click(function(){
	location="gift.html";
});
$(".center li:eq(4)").click(function(){
	location="zhuce.html";
})
$(".nav-right .jr").click(function(){
	if($(".shopCar .add:has(li)")){
		$(".nav-right .shopCar").css({
			"display":"block"
		});
	}else{
		console.log("购物车中还没有商品，快去添加吧!")
	}
})
$(".shopCar i").click(function(){
	$(".nav-right .shopCar").css({
		"display":"none"
	});
})
$(".header p .user").mouseenter(function(){
	$(".header p .user i").css({
		"display":"block"
	})
})
$(".header p .user").mouseleave(function(){
	$(".header p .user i").css({
		"display":"none"
	})
})
//获得cookie
function getCookie(key){
	var data=decodeURI(document.cookie).replace(/\s/g,"").split(";");
	for(var i=0;i<data.length;i++){
		if(data[i].split("=")[0]==key){
			return data[i].split("=")[1];					
		}
	}
}
var user1=getCookie("user");
$(".nav .header p .user i").text(user1);
//删除cookie
function deleteCookie(key){
	saveCookie(key,"",-1);
}
//window.close=function(){
//	deleteCookie("user");
//}
//$(window).unload(function(){
//	deleteCookie("user");
//})
