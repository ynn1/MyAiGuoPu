//获得cookie
function getCookie(key){
	var data=decodeURI(document.cookie).replace(/\s/g,"").split(";");
//	var data=document.cookie.split(";");
//	console.log(data);
	for(var i=0;i<data.length;i++){
		if(data[i].split("=")[0]==key){
			return data[i].split("=")[1];					
		}
	}
}
//存cookie
function changeData(n){
	var d=new Date();
	d.setDate(d.getDate()+n);
	return d;
}
function  saveCookie(key,value,n){
	document.cookie=encodeURIComponent(key)+"="+encodeURIComponent(value)+";expires="+changeData(n);				
}
//删除cookie
function deleteCookie(key){
	saveCookie(key,"",-1);
}