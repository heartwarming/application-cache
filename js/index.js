//here is your code...
$('.um-back').off().on('click', function () {
	summer.closeWin();
})
window.onload = function () {
	getData();
};

//构造控件实例
var listview = UM.listview("#listview");

listview.on("pullDown", function(sender) {
    //这里可以处理长按事件
    getData();
    sender.refresh();
});

function getData(){
	var param = {};
	$.ajax({
		type : "get",
		url : "https://api.github.com/emojis",
		data : param,
		dataType:"json",
		success:function(data){
	        callBackSuc(data);
		},
		error:function(data){
			callBackErr();//+$summer.jsonToStr(data));
		}
	});
}
function getNowFormatDate() {
    var date = new Date();
    var seperator2 = ":";
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
function callBackSuc(data){
	alert("请求成功")
	//Knockout绑定
	var time = getNowFormatDate();
	var jsonArray = [{
		"sender" : "集团IT服务台",
		"img" : "img/org1.png",
		"msgNum" : 0,
		"lastMsg" : "因无线网络后台故障，暂停服务。",
		"lastTime" : time
	}, {
		"sender" : "集团行政部",
		"img" : "img/org2.png",
		"msgNum" : 4,
		"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
		"lastTime" : time
	}, {
		"sender" : "集团人力资源部",
		"img" : "img/org3.png",
		"msgNum" : 5,
		"lastMsg" : "各位同仁，跟据国务院发布的放假安排，2016年元旦、春节放假安排如下。",
		"lastTime" : time
	}];
	var content = $summer.byId('list-content');
    //doT的内容
    var tpl = $summer.byId('template').text;
    //doT的填充
    var tempFn = doT.template(tpl);
    content.innerHTML = tempFn(jsonArray);
	//将数据存储到localStorage , 这里是简单举例，每次拉取之后都更新下存储。  也可以根据需要，做好比较之后再做存储
	summer.setStorage('data',jsonArray);
}
function callBackSuc1(data){
	alert("请求成功")
	//Knockout绑定
	var time = getNowFormatDate();
	 
	
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);
	
	//将数据存储到localStorage , 这里是简单举例，每次拉取之后都更新下存储。  也可以根据需要，做好比较之后再做存储
	summer.setStorage('data',jsonArray);
}

function callBackErr(){
	// 必须先要有过一次成功的读取
	alert("请求失败，从本地读取数据填充");
	
	var data = summer.getStorage("data");
	var content = $summer.byId('list-content');
	//doT的内容
	var tpl = $summer.byId('template').text;
	//doT的填充
	var tempFn = doT.template(tpl);
	content.innerHTML = tempFn(data);
}