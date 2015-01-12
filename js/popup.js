var link_pre = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L|1&chl=";
var mode = "single";
var user_name = "tinnocui";

//本地目录、域名定义
var settings = {
	"移动端活动本地":{
		root:"F:\\dev_branches\\ui_static",
		domain:"http://ui.tenpay.com/ui_static",
		er_code:"true"
	},
	"移动端活动TID":{
		root:"F:\\dev_branches",
		domain:"http://tid.tenpay.com",
		er_code:"true"
	}/*,
	"移动端活动ptmp":{
		root:"F:\\dev_branches",
		domain:"http://ptmp.kf0309.3g.qq.com",
		er_code:"true"
	},
	"会员PC本地":{
		root:"F:\\dev_branches\\vip\\htdocs\\ui_static\\vip",
		domain:"http://vip.tenpay.com",
		er_code:"true"
	}
	,
	"build tool":{
		root:"F:\\dev_branches\\build_tool\\dev\\htdocs",
		domain:"http://action.tenpay.com",
		er_code:"false"
	}*/
}

$(".btn-code").click(function(){
	var path = $("#input_link").val();
	$(".area-li").addClass("hide");
	$(".code-area").removeClass("hide");
	$("#code_img").attr("src",link_pre + path);
});

$(".btn-quick").click(function(){
	var file_path = $("#input_link").val();
	var items = '<li><p><a href="{setting_link}" target="_blank" title="{setting_link}">{setting_name}</a></p>{er_img}</li>';
	var er_img = '<img width="150" height="150" src="' + link_pre + '{setting_link}">';
	var string = "";
	$(".area-li").addClass("hide");

	for(var name in settings){
		var flag = settings[name].er_code;
		if(file_path.indexOf(settings[name].root) != -1){
			var link = settings[name].domain + file_path.replace(settings[name].root,"").replace(/\\/g,"\/");
			if(flag == "true"){
				var temp_er_img = er_img.replace("{setting_link}",link);
				string +=  items.replace(/{setting_link}/g,link).replace("{setting_name}",name).replace("{er_img}",temp_er_img);
			}
			else if(flag == "false"){
				string +=  items.replace(/{setting_link}/g,link).replace("{setting_name}",name).replace("{er_img}","");
			}
		}
		
	}
	$(".quick-area ul").html(string);

	$(".quick-area").removeClass("hide");
});

$(".btn-many").click(function(){
	$(".area-li").addClass("hide");

	var array = $("#input_many").val().split(/\n/g);
	var frameStr = '<fieldset><legend>{setting_name}</legend>{links}</fieldset>',
		temp_link = '<p><a href="{link}" title="{link}" target="_blank">{link}</a></p>';
	var sumString = "";

	for(var name in settings){
		var string = "";
		var flag = settings[name].er_code;
		var fd_str = frameStr.replace("{setting_name}",name);
		var hasLink = false;

		for (var i = 0; i < array.length; i++) {
			if(array[i].indexOf(settings[name].root) != -1){
				hasLink = true;
				var link = settings[name].domain + array[i].replace(settings[name].root,"").replace(/\\/g,"\/");
				string += temp_link.replace(/{link}/g,link) + "\n";
			}
		}
		if (hasLink) {
			sumString += fd_str.replace("{links}",string);
		}
		else {
			sumString += fd_str.replace("{links}","<p>文件路径无对应链接...</p>");
		}
		
	}
	$(".many-area").html(sumString);
	$(".many-area").removeClass("hide");
});

$(".btn-ex").click(function(){
	$(".btn-ex span").toggleClass('on');
	$(".area-li").addClass("hide");
	if (mode == "single") {
		$(".line-single").addClass("hide");
		$(".link-input input").addClass("hide");
		$(".line-many").removeClass("hide");
		$(".link-input textarea").removeClass("hide");
		mode = "many";
	}
	else{
		$(".line-many").addClass("hide");
		$(".link-input textarea").addClass("hide");
		$(".line-single").removeClass("hide");
		$(".link-input input").removeClass("hide");
		mode = "single";
	}
});