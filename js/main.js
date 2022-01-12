function getDateTime(){
	var work= new Worker('work.js');
	work.onmessage= function (e) {
		console.log(e.data);
	}
work.postMessage('nihao')
}
$(function(){
	$(".btn").click(function(){
		alert("jquery点击事件");
	});
}); 