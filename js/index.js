$(function(){
//	主页check图标点击切换图标
	$("#main .login form  ul li:last-child img").click(function(){
		if(!($(this).hasClass("active"))){
			this.src="img/00-xin-s_08.png";
			$(this).addClass("active");
		}else{
			this.src="img/00-xin-s_08-06.png";
			$(this).removeClass("active");
		}
	});
//	页面风格切换
	$("#header .color-modal").on("click","span",function(){
			var color=$(this)[0].className.split("-");
			color=color[1];
			$("head link:last-child").attr("href","css/"+color+".css");
			var imgsrc=[];
			$(".checkOutpage li img").each(function(){
				var imgsrc=$(this).attr("src").split("-");
				var imgsrc1=imgsrc[0];
				var imgsrc2=color+"."+imgsrc[1].split(".")[1]
				imgsrc=imgsrc1+"-"+imgsrc2;
				$(this).attr("src",imgsrc);
			});
	});
//	登录页面

	function getUers(){
		var users=[];
		for(var i=0;i<10;i++){
			users.push("Admin"+(i+1));
		}
		var usersfrag=document.createDocumentFragment();
		$.each(users, function(i,item) {
			$(usersfrag).append("<li class='lf txtcenter'><span>"+item+"</span></li>");
		});
		$("#logIn .unamedialog ul.w940").html("").append(usersfrag);
	}
//	点击输入用户名时弹出用户名选择框
	$("#username").focus(function(){
		getUers();
		$("#logIn .unamedialog").fadeIn();
	});
	
	$("#logIn .unamedialog").on("click","ul li span",function(){
		var uname=$(this).html();
		$("#username").val(uname);
		if(window.localStorage.getItem(uname)){
			$("#check").addClass("active").attr("src","img/00-xin-s_08.png");
			$("#userpass").val(window.localStorage.getItem(uname));
		}else{
			$("#check").removeClass("active").attr("src","img/00-xin-s_08-06.png");
			$("#userpass").val("");
		}
		$("#logIn .unamedialog").fadeOut();
	});
	$("#logIn .enterbtns").on("click","ul li",function(){
		if($("#username").val()){
			if(!isNaN($(this).html())){
				$("#userpass").val($("#userpass").val()+$(this).html());
			}else if($(this).hasClass("correct")){
				$("#userpass").val("");
			}
		}
		
	});
//	堂食外带切换
	$(".diancanleft ul.mingxi").on("click","li",function(){
		if($(this).hasClass("change")){	
			if(!($(this).hasClass("active"))){
				
				$(".diancanleft ul.mingxi li.active").removeClass("active");
				$(this).addClass("active");
			}
		}
		
	});
	
//	获取菜品详细内容
	function foodInfo(urlstr){
		$.ajax({
			type:"get",
			url:urlstr,
			dataType:"json",
			async:true,
			success: function(data){
	  			var data=JSON.parse(data).foodinfos;	
				var infofrag=document.createDocumentFragment();
				//菜单列表显示
						$.each(data, function(i,item){
								$(infofrag).append("<li id="+item.ID+" class='lf'><p class='foodname'>"+item.FoodName+"</p><p class='foodprice'>￥"+item.Price.toFixed(2)+"</p></li>");
						});
						$("#order .diancanright .dishinner").html("").append(infofrag);
					
				$("#order .diancanright .dishouterin").scrollTop(0);
				$("#order .diancanleft div.lists").each(function(i,item){
					var count=$(this).children().children("li.count").html();
					var iD=$(this).attr("id").substring(0,$(this).attr("id").length-1);
					$("#"+iD).addClass("active").append("<p class='selectIcon'>"+count+"</p>");
				});
				
				if($("#order .diancanright ul.dishinner").height()>470){
					$("#order .diancanright div.top").css("background","rgba(200,200,200,0.5)");
					$("#order .diancanright div.top").show();
					$("#order .diancanright div.bottom").show();
					$("#order .diancanright div.dishouter").css({"padding":"35px 0px"});
				}else{
					$("#order .diancanright div.top").hide();
					$("#order .diancanright div.bottom").hide();
					$("#order .diancanright div.dishouter").css({"padding":"0px"});
				}
				$("#wellcome").fadeOut();
				$("#loading").hide();
			}

		});


	}
//	点击菜品上下滚动条滚动菜品
$("#order .diancanright div.dishpage").click(function(){
	if($(this).hasClass("top")){
		$("#order .diancanright .dishouterin").animate({
			"scrollTop":$("#order .diancanright .dishouterin").scrollTop()-470+"px"
		},500);
	}else{
		$("#order .diancanright .dishouterin").animate({
			"scrollTop":$("#order .diancanright .dishouterin").scrollTop()+470+"px"
			},500);
	}
		
});
$("#order .diancanright .dishouterin").scroll(function(){
	if($(this).scrollTop()>$("#order .diancanright .dishouterin .dishinner").height()-470){
		$("#order .diancanright div.bottom").css("background","rgba(200,200,200,0.5)");
			$("#order .diancanright div.top").css("background","rgba(255,255,255,0.5)");
	}else if($(this).scrollTop()==0){
				$("#order .diancanright div.top").css("background","rgba(200,200,200,0.5)");
				$("#order .diancanright div.bottom").css("background","rgba(255,255,255,0.5)");
	}else{
		$("#order .diancanright div.bottom").css("background","rgba(255,255,255,0.5)");
		$("#order .diancanright div.top").css("background","rgba(255,255,255,0.5)");
	}
});
	

//	获取菜品菜单
	function  getFood(){
		$.ajax({
			type:"get",
			dataType:"json",
			url:"http://xjucan.com/api/api/WebDinner/GetMenuInfo?shopid=29",
			async:true,
			success:function(data){
				var data=JSON.parse(data);
				var menufrag=document.createDocumentFragment();
				$.each(data, function(i,item){
					$(menufrag).append("<li id="+item.ID+" class='lf'>"+item.FoodName+"</li>");
				});
				$("#order .diancanright .contain .menu").html("").append(menufrag);
				$("#order .diancanright .contain .menu li:first-child").addClass("active");
				$("#order .diancanright .contain .menu").css("width",data.length*82+"px");
			}
		});
		$("#header .nav li:first-child").addClass("active");
//		获取菜单列表
		foodInfo("http://xjucan.com/api/api/WebDinner/GetFoodInfo?typeid=68c1767e-fd6d-4cba-919b-095c2d3f4c28&shopid=29");	
	}
//	
//	
	//登录页点击登录按钮页面跳转
	$("#loginBtn a").click(function(){
//		从后台获取用户名与密码是否匹配的返回信息
//	var message=$("#myForm").serialize();
//	$.ajax({
//		type:"post",
//		url:"",
//		async:true,
//		data:message
//	});
	var msg="success";
	if(msg=="success"){
		$("#wellcome").fadeIn();
		$("#logIn").removeClass("active");
		//		判断用户是否记住密码
		if($("#check").hasClass("active")){
			window.localStorage.setItem($("#username").val(),$("#userpass").val());
		}else if(!($("#check").hasClass("active"))){
			window.localStorage.clear($("#username").val());
		}
		
		$("#username").val("");
		$("#userpass").val("");
		getFood();
		$("#content").addClass("active");
	}
	
	});

//	页头菜单点击切换
	$("#header .nav").on("click","li",function(){
		if(!($(this).hasClass("active"))){
			if($(this).index()==0){
				getFood();
			}
			var idx=$(this).index();
			$("#header .nav li.active").removeClass("active");
			$(this).addClass("active");
			$("#content .maincontent>div").each(function(){
				if($(this).index()==idx){
					$("#content .maincontent>div.active").removeClass("active");
					$(this).addClass("active");
				}
			})
		}
	});
	
	
	
	//点击菜单按钮切换菜单内容
	$("#order .diancanright .menu").on("click","li",function(){
		if(!($(this).hasClass("active"))){
			$("#loading").show();
			$("#order .diancanright .menu li.active").removeClass("active");
			$(this).addClass("active");	
			foodInfo("http://xjucan.com/api/api/WebDinner/GetFoodInfo?typeid=68c1767e-fd6d-4cba-919b-095c2d3f4c28&shopid=29");
		}
	});
	
//	通过购物车计算总价
	function totlePrice(){
		var totle=0;
		$("#order .diancanleft div.lists").each(function(){
			var price=parseFloat($(this).find("li.price").html());
			var count=parseFloat($(this).find("li.count").html());
			totle+=price*count;
			
		});
		$("#order .diancanleft .orderfooter span").html(totle.toFixed(2));
	}
//	购物车添加菜品
	function cartlist(str){
		if(!($(str).hasClass("active"))){
			$(str).addClass("active").append("<p class='selectIcon'>1</p>");
			$("#order .diancanleft .orderlists").append('<div id="'+$(str).attr("id")+'s" class="lists clear"><ul class="lists-item  clear"><li class="down lf"><img src="img/01-xin-s_72.png" alt="" /></li><li class="lf list-number canclick">'+($(".diancanleft div.lists").length+1)+'</li><li class="lf dishname canclick">'+$(str).find("p.foodname").html()+'</li><li class="lf price canclick">'+$(str).find("p.foodprice").html().slice(1)+'</li><li class="lf count canclick">'+$(str).children("p.selectIcon").html()+'</li><li class="lf delete"><img src="img/01-xin-s_65.png" alt="" /></li></ul></div>');
			
		}else{
			$(str).children("p.selectIcon").html(parseInt($(str).children("p.selectIcon").html())+1);
			$(str+"s li.count").html($(str).children("p.selectIcon").html());
		}
		totlePrice();
	}
	
	//	点击菜品购物车出现相应菜品
	$("#order .diancanright").on("click","ul.dishinner li",function(){
		var str="#"+$(this).attr("id");
		cartlist(str);
		var me=this;
		$(this).addClass("animated pulse");
		$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(me).removeClass("animated pulse");
		});

			
	});

//点击购物车菜品前的下拉按钮弹出备注框
$("#order .diancanleft .orderlists").on("click","div.lists ul.lists-item li.down",function(){
	 $("input").removeAttr("checked");
	$(".bzdialog").addClass("animated fadeInRightBig").show();
	$(".bzdialog").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(".bzdialog").removeClass("animated fadeInRightBig");
		});
	var iD=$(this).parent("ul").parent("div").attr("id");
//	点击确定按钮
	$("#order .bzdialoginner .bzbtn li").click(function(){ 
		if(($(this).hasClass("bzconfirm"))&&$("#bzitem input:checked").length){
			if(!($("#"+iD).children("div.bz").length)){
				$("#"+iD).append("<div class='bz'><p class='lf'><span>备注</span></p><ul class='bzlist lf'></ul></div>");
				$("#bzitem input:checked").each(function(i,item){
					$("#"+iD+" div.bz ul.bzlist").append("<li class='lf txtcenter'>"+$(item).parent("label").text().trim()+"</li>")
				});
			}else{
				$("#"+iD+" div.bz ul.bzlist").html("");
			$("#bzitem input:checked").each(function(i,item){
				$("#"+iD+" div.bz ul.bzlist").append("<li class='lf txtcenter'>"+$(item).parent("label").text().trim()+"</li>")
			});
			}
		}
			$(".bzdialog").addClass("animated fadeOutLeftBig");
	$(".bzdialog").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(".bzdialog").removeClass("animated fadeOutLeftBig").hide();
		});

	});
});
//点击购物车列表删除按钮删除该菜品
$("#order .diancanleft").on("click","div.lists ul.lists-item li.delete",function(){
	var iD=$(this).parent("ul").parent("div.lists").attr("id");
	iD=$(this).parent("ul").parent("div.lists").attr("id").substring(0,iD.length-1);
	$("#"+iD).removeClass("active").children("p.selectIcon").remove();
	$(this).parent("ul").parent("div.lists").remove();
	$("#order .diancanleft div.lists ul.lists-item li.list-number").each(function(i,item){
		$(this).html($(this).parent("ul.lists-item").parent("div.lists").index()+1);
	});
	totlePrice();
});

//点击已选菜品弹出输入数量框
$("#order .orderlists").on("click",".lists .lists-item li.canclick",function(){
	$(this).parent().parent().addClass("active");
	$("#order .dishCount-outer").show();
	
})
$("#order .dishCount-outer .dishCount-confirm").click(function(){
	if($("#order .dishCount-outer input").val()>0){
		var ids=$("#order .orderlists div.lists.active").attr("id");
		var str="#"+(ids.slice(0,ids.length-1));
		$(str).children("p.selectIcon").html($("#order .dishCount-outer input").val());
		$(str+"s li.count").html($(str).children("p.selectIcon").html());
		totlePrice();
		$("#order .dishCount-outer").hide();
		$("#order .dishCount-outer input").val("");
	}else if($("#order .dishCount-outer input").val()=="0"){
		$("#order .dishCount-outer>p").fadeIn();
		window.setTimeout(function(){
			$("#order .dishCount-outer>p").fadeOut();
		},2000);
	}else{
		$("#order .dishCount-outer").hide();
	}
});
$("#order .dishCount-outer .dishCount-cancel").click(function(){
	$("#order .dishCount-outer").hide();
	$("#order .dishCount-outer input").val("");
});
$("#header .nav li,#order .footbtns li").click(function(){
	$("#order .dishCount-outer").hide();
	$("#order .dishCount-outer input").val("");
});
//软键盘输入
$("#order .dishCount-outer .enterKey").on("click","li",function(){
	if($(this).hasClass("clearAll")){
		$("#order .dishCount-outer input").val("");
	}else{
		$("#order .dishCount-outer input").val($("#order .dishCount-outer input").val()+$(this).children().html());
	}
	
});

//点击返回或清空按钮清空购物车

function deletedishs(){
	$("#order .diancanright ul.dishinner li.active").removeClass("active").children("p.selectIcon").remove();
	$("#order .diancanleft .orderlists").html("");
	totlePrice();
}
$("#order .diancanright .footbtns").on("click","li",function(){
	if($(this).hasClass("back")){
		deletedishs();
		$("#content").removeClass("active");
		$("#logIn").addClass("active");
	}else if($(this).hasClass("clearAll")){
		deletedishs();
	}
	
});
//结账
$("#order .diancanright .footbtns li.jzbtn").click(function(){
	$("#content").removeClass("active");
	$("#bill").addClass("active");
});
$("#bill .subconfirm-btn").click(function(){
	$("#order .diancanright ul.dishinner li.active").removeClass("active").children("p.selectIcon").remove();
	$("#order .diancanleft .orderlists").html("");
	totlePrice();
	$("#content").addClass("active");
	$("#bill").removeClass("active");
	
});

//单品反结算
$("#order-list .orderlists").on("click",".lists",function(){
	$("#order-list .orderlists .lists.active").removeClass("active");
	$(this).addClass("active");
	$("#order-list .fanjiesuan-outer").show();
});
	function fanjiesuan(){
		$("#order-list .fanjiesuan-outer").hide();
		$("#order-list .fanjiesuan-outer input").val("");
		$("#order-list .fanjiesuan-outer>div.fanjiesuan-price").hide();
		$("#order-list .fanjiesuan-outer>div.fanjiesuan-pass").show();
	}
$("#order-list .fanjiesuan-outer p").on("click","button",function(){
	if($(this).hasClass("fjs-cancel")){
		fanjiesuan();
	}else if($(this).hasClass("fjs-confirm")){
		$("#order-list .fanjiesuan-outer>div.fanjiesuan-price").show();
		$("#order-list .fanjiesuan-outer>div.fanjiesuan-pass").hide();
	}else if($(this).hasClass("fjspri-confirm")){
		fanjiesuan();
	}
});

//订单反结算
$("#order-list .orderHead .mingxi li a").click(
	function(){
		$("#order-list .fanjiesuan-outer").show();
	}
	
);
	//交班
//点击按钮页面跳转
$("#jiaobanMain").on("click",".jbbtns li button",function(){
	if($(this).parent().hasClass("jbjl")){
		$("#jiaoban div.active").removeClass("active");
		$("#jiaobanRecord").addClass("active");
	}else if($(this).parent().hasClass("jbls")){
		$("#jiaoban div.active").removeClass("active");
		$("#jiaobanliushui").addClass("active");
	}
});

$(".jbR-foot-cancel").on("click","button",function(){
	$("#jiaoban div.active").removeClass("active");
	$("#jiaobanMain").addClass("active");
});

});