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
	
//主要内容滑屏切换
$("#header .nav li").click(function(){
	if(!($("#main .maincontent").hasClass("active"))){
		if(!($(this).hasClass("active"))){
			var idx=$(this).index()+1;
			var preidx=$("#header .nav li.active").index();
			$("#main .maincontent").addClass("active");
			$("header .nav").attr("disabled","true");
			if(idx>preidx){
				$("#header .nav li.active").removeClass("active");
				$("#main .maincontent>div:first-child").after($("#order-page"+idx));
				$("#main .maincontent").animate({"left":"-100%"},500,function(){
					$("#main .maincontent").append($("#main .maincontent>div:first-child"));
					$("#main .maincontent").css("left","0");
					$("#main .maincontent").removeClass("active");
					$("header .nav").attr("disabled","false");
				});
			}else{
				$("#main .maincontent>div:first-child").before($("#order-page"+idx));
				$("#main .maincontent").css("left","-100%");
				$("#main .maincontent").animate({"left":"0"},500,function(){
					$("#main .maincontent").removeClass("active");
					$("header .nav").attr("disabled","false");
				});
			}
			
		}	
	}else{
		return false;
	}
	
});
//设置按钮点击下拉
$("#setUp div.down-up div.txtcenter a").click(function(e){
	e.preventDefault();
	if($(this).hasClass("active")){
		autoup();
	}else{
		$("#setUp").animate({
		"top":"0"
		},500,function(){
			
		}.bind(this));
		$(this).addClass("active");
		$(this).animate({
			"top":"-50px"
		},500);
	}
	
});
function autoup(){
	$("#setUp").animate({
			"top":"-125px"
		},500,function(){
			$("#setUp div.down-up a").removeClass("active");
			$("#setUp ul.setitem").css("left","-200px");
		});
		$("#setUp div.down-up a").animate({
			"top":"0px"
		},500);
}
//点击风格切换或退出系统
$("#setUp ul.setitem li.main-style li").click(function(){
	if($(this).hasClass("style-change")){
		$("#setUp ul.setitem").animate({
			"left":"0"
		},500);
	}else{
		$("#setUp ul.setitem").animate({
			"left":"-400px"
		},500);
	}
});
$("#header .nav,#content .maincontent").click(function(){
		if($("#setUp div.down-up a").hasClass("active")){
			autoup();
		}
	}
);
//	页面风格切换
	$("#setUp .color-modal").on("click","li",function(){
			var color=$(this)[0].className.split("-");
			color=color[1];
			$("head link:last-child").attr("href","css/"+color+".css");
			var imgsrc=[];
			$(".checkOutpage li img").each(function(){
				var me=this;
				pining(me,color);
			});
			var me=$("#setUp div.back-text img");
			pining(me,color);
	});
	function pining(me,color){
		var imgsrc=$(me).attr("src").split("-");
		var imgsrc1=imgsrc[0];
		var imgsrc2=color+"."+imgsrc[1].split(".")[1]
		imgsrc=imgsrc1+"-"+imgsrc2;
		$(me).attr("src",imgsrc);
	}
	
//退出系统
$("#setUp div.last-item button").click(function(e){
	e.preventDefault();
	if($(this).hasClass("quit-confirm")){
		$("#content-outer").animate({
			"left":"0"
		},500,function(){
			$("#main .maincontent>div:first-child").before($("#order-page1"));
			$("#main .maincontent").css("left","0");
			$("#header ul.nav li.active").removeClass("active");
			$("#header ul.nav li:first-child").addClass("active");
			autoup();
		});		
	}
	$("#setUp ul.setitem").animate({
			"left":"-200px"
		},500);
});
$("#setUp ul.setitem li div.back-text img").click(function(){
	$("#setUp ul.setitem").animate({
		"left":"-200px"
	},500);
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
			timeout:500,
			async:true,
			success: function(data){
	  			var data=JSON.parse(data).foodinfos;	
				var infofrag=document.createDocumentFragment();
				//菜单列表显示
						$.each(data, function(i,item){
								$(infofrag).append("<li id="+item.ID+" class='lf'><p class='foodname'>"+item.FoodName+"</p><p class='foodprice'>￥"+item.Price.toFixed(2)+"</p></li>");
						});
						$("#order-page1 .diancanright .dishinner").html("").append(infofrag);
					
				$("#order-page1 .diancanright .dishouterin").scrollTop(0);
				$("#order-page1 .diancanleft div.lists").each(function(i,item){
					var count=$(this).children().children("li.count").html();
					var iD=$(this).attr("id").substring(0,$(this).attr("id").length-1);
					$("#"+iD).addClass("active").append("<p class='selectIcon'>"+count+"</p>");
				});
				
				if($("#order-page1 .diancanright ul.dishinner").height()>470){
					$("#order-page1 .diancanright div.top").css("background","rgba(200,200,200,0.5)");
					$("#order-page1 .diancanright div.top").show();
					$("#order-page1 .diancanright div.bottom").show();
					$("#order-page1 .diancanright div.dishouter").css({"padding":"35px 0px"});
				}else{
					$("#order-page1 .diancanright div.top").hide();
					$("#order-page1 .diancanright div.bottom").hide();
					$("#order-page1 .diancanright div.dishouter").css({"padding":"0px"});
				}
				$("#wellcome").fadeOut();
				$("#loading").hide();
			},
			complete:function(){
				if(status=="timeout"){
					foodInfo(urlstr);
					 $("#loading").show();
				}
			}

		});


	}
//	点击菜品上下滚动条滚动菜品
$("#order-page1 .diancanright div.dishpage").click(function(){
	if($(this).hasClass("top")){
		$("#order-page1 .diancanright .dishouterin").animate({
			"scrollTop":$("#order-page1 .diancanright .dishouterin").scrollTop()-470+"px"
		},500);
	}else{
		$("#order-page1 .diancanright .dishouterin").animate({
			"scrollTop":$("#order-page1 .diancanright .dishouterin").scrollTop()+470+"px"
			},500);
	}
		
});
$("#order-page1 .diancanright .dishouterin").scroll(function(){
	if($(this).scrollTop()>$("#order-page1 .diancanright .dishouterin .dishinner").height()-470){
		$("#order-page1 .diancanright div.bottom").css("background","rgba(200,200,200,0.5)");
			$("#order-page1 .diancanright div.top").css("background","rgba(255,255,255,0.5)");
	}else if($(this).scrollTop()==0){
				$("#order-page1 .diancanright div.top").css("background","rgba(200,200,200,0.5)");
				$("#order-page1 .diancanright div.bottom").css("background","rgba(255,255,255,0.5)");
	}else{
		$("#order-page1 .diancanright div.bottom").css("background","rgba(255,255,255,0.5)");
		$("#order-page1 .diancanright div.top").css("background","rgba(255,255,255,0.5)");
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
				$("#order-page1 .diancanright .contain .menu").html("").append(menufrag);
				$("#order-page1 .diancanright .contain .menu li:first-child").addClass("active");
				$("#order-page1 .diancanright .contain .menu").css("width",data.length*82+"px");
			}
		});
		$("#header .nav li:first-child").addClass("active");
//		获取菜单列表
		foodInfo("http://xjucan.com/api/api/WebDinner/GetFoodInfo?typeid=68c1767e-fd6d-4cba-919b-095c2d3f4c28&shopid=29");	
	}
  
  
  
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
		$("#wellcome").show();
		//		判断用户是否记住密码
		if($("#check").hasClass("active")){
			window.localStorage.setItem($("#username").val(),$("#userpass").val());
		}else if(!($("#check").hasClass("active"))){
			window.localStorage.clear($("#username").val());
		}
		$("#content-outer").css("left","-100%");
		$("#username").val("");
		$("#userpass").val("");
		getFood();
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
	$("#order-page1 .diancanright .menu").on("click","li",function(){
		if(!($(this).hasClass("active"))){
			$("#order-page1 .diancanright .menu li.active").removeClass("active");
			$(this).addClass("active");	
			foodInfo("http://xjucan.com/api/api/WebDinner/GetFoodInfo?typeid=68c1767e-fd6d-4cba-919b-095c2d3f4c28&shopid=29");
		}
	});
	
//	通过购物车计算总价
	function totlePrice(){
		var totle=0;
		$("#order-page1 .diancanleft div.lists").each(function(){
			var price=parseFloat($(this).find("li.price").html());
			var count=parseFloat($(this).find("li.count").html());
			totle+=price*count;
			
		});
		$("#order-page1 .diancanleft .orderfooter span").html(totle.toFixed(2));
	}
//	购物车添加菜品
	function cartlist(str){
		if(!($(str).hasClass("active"))){
			$(str).addClass("active").append("<p class='selectIcon'>1</p>");
			$("#order-page1 .diancanleft .orderlists").append('<div id="'+$(str).attr("id")+'s" class="lists clear"><ul class="lists-item  clear"><li class="down lf"><img src="img/01-xin-s_72.png" alt="" /></li><li class="lf list-number canclick">'+($(".diancanleft div.lists").length+1)+'</li><li class="lf dishname canclick">'+$(str).find("p.foodname").html()+'</li><li class="lf price canclick">'+$(str).find("p.foodprice").html().slice(1)+'</li><li class="lf count canclick">'+$(str).children("p.selectIcon").html()+'</li><li class="lf delete"><img src="img/01-xin-s_65.png" alt="" /></li></ul></div>');
			
		}else{
			$(str).children("p.selectIcon").html(parseInt($(str).children("p.selectIcon").html())+1);
			$(str+"s li.count").html($(str).children("p.selectIcon").html());
		}
		totlePrice();
	}
	
	//	点击菜品购物车出现相应菜品
	$("#order-page1 .diancanright").on("click","ul.dishinner li",function(){
		var str="#"+$(this).attr("id");
		cartlist(str);
		var me=this;
		$(this).addClass("animated pulse");
		$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(me).removeClass("animated pulse");
		});

			
	});

//点击购物车菜品前的下拉按钮弹出备注框
$("#order-page1 .diancanleft .orderlists").on("click","div.lists ul.lists-item li.down",function(){
	 $("input").removeAttr("checked");
	$(".bzdialog").addClass("animated fadeInRightBig").show();
	$(".bzdialog").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(".bzdialog").removeClass("animated fadeInRightBig");
		});
	var iD=$(this).parent("ul").parent("div").attr("id");
//	点击确定按钮
	$("#order-page1 .bzdialoginner .bzbtn li").click(function(){ 
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
$("#order-page1 .diancanleft").on("click","div.lists ul.lists-item li.delete",function(){
	var iD=$(this).parent("ul").parent("div.lists").attr("id");
	iD=$(this).parent("ul").parent("div.lists").attr("id").substring(0,iD.length-1);
	$("#"+iD).removeClass("active").children("p.selectIcon").remove();
	$(this).parent("ul").parent("div.lists").remove();
	$("#order-page1 .diancanleft div.lists ul.lists-item li.list-number").each(function(i,item){
		$(this).html($(this).parent("ul.lists-item").parent("div.lists").index()+1);
	});
	totlePrice();
});

//点击已选菜品弹出输入数量框
$("#order-page1 .orderlists").on("click",".lists .lists-item li.canclick",function(){
	if($("#order-page1 .orderlists .lists.active").length==0){
		$(this).parent().parent().addClass("active");
		$("#order-page1 .dishCount-outer").show();
	}
	
});
$("#order-page1 .dishCount-outer .dishCount-confirm").click(function(e){
	e.preventDefault();
	if($("#order-page1 .dishCount-outer input").val()>0){
		var ids=$("#order-page1 .orderlists div.lists.active").attr("id");
		var str="#"+(ids.slice(0,ids.length-1));
		$(str).children("p.selectIcon").html(parseInt($("#order-page1 .dishCount-outer input").val()));
		$(str+"s li.count").html($(str).children("p.selectIcon").html());
		totlePrice();
		$("#order-page1 .dishCount-outer").hide();
		$("#order-page1 .orderlists .lists.active").removeClass("active");
		$("#order-page1 .dishCount-outer input").val("");
	}else if($("#order-page1 .dishCount-outer input").val()=="0"){
		$("#order-page1 .dishCount-outer>p").fadeIn();
		window.setTimeout(function(){
			$("#order-page1 .dishCount-outer>p").fadeOut();
		},2000);
	}else{
		$("#order-page1 .dishCount-outer").hide();
		$("#order-page1 .orderlists .lists.active").removeClass("active");
	}
});
$("#order-page1 .dishCount-outer .dishCount-cancel").click(function(e){
	e.preventDefault();
	$("#order-page1 .dishCount-outer").hide();
	$("#order-page1 .orderlists .lists.active").removeClass("active");
	$("#order-page1 .dishCount-outer input").val("");
});
$("#header .nav li,#order-page1 .footbtns li").click(function(){
	$("#order-page1 .dishCount-outer").hide();
	$("#order-page1 .orderlists .lists.active").removeClass("active");
	$("#order-page1 .dishCount-outer input").val("");
});
//软键盘输入
$("#order-page1 .dishCount-outer .enterKey").on("click","li",function(){
	if($(this).hasClass("clearAll")){
		$("#order-page1 .dishCount-outer input").val("");
	}else if(($(this).hasClass("xiaoshu")&&($("#order-page1 .dishCount-outer input").val().indexOf(".")==-1))||($(this).hasClass("numer")&&($("#order-page1 .dishCount-outer input").val().indexOf(".")!=-1)&&(($("#order-page1 .dishCount-outer input").val().split("."))[1].length<2))||($(this).hasClass("numer")&&($("#order-page1 .dishCount-outer input").val().indexOf(".")==-1))){
			$("#order-page1 .dishCount-outer input").val($("#order-page1 .dishCount-outer input").val()+$(this).children().html());
		}
	
});

//点击返回或清空按钮清空购物车

function deletedishs(){
	$("#order-page1 .diancanright ul.dishinner li.active").removeClass("active").children("p.selectIcon").remove();
	$("#order-page1 .diancanleft .orderlists").html("");
	totlePrice();
}
$("#order-page1 .diancanright .footbtns").on("click","li",function(){
	if($(this).hasClass("back")){
		deletedishs();
		$("#content-outer").animate({"left":"0"},500);
	}else if($(this).hasClass("clearAll")){
		deletedishs();
	}
	
});
//结账
function jiezhang(selVal){		
		if(selVal){
			$("#bill .billcontent .billRight .subtotle .subtotle-con li.youh span.subprice").html( $("#bill .billcontent .billLeft .enter-price .keyboard .jeinput select").find("option:selected").text());
			if(selVal.toString().indexOf(".")!=-1){
				var yingshou=(selVal*$("#bill .billcontent .billRight .subtotle .subtotle-con li.zongje span.subprice").html()/10).toFixed(2);
				$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html(yingshou);
			}else{
				var yingshou=($("#bill .billcontent .billRight .subtotle .subtotle-con li.zongje span.subprice").html()-selVal).toFixed(2);
				if(yingshou<=0){
					$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html("0.00");
				}else{
					$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html(yingshou);
				}
				
			}
	}else{
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.youh span.subprice").html("0.00");
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html(sessionStorage.getItem("orderTotle"));
	}
}
function zhaoling(){
	var inputV=$("#bill li.shisje-input input").val();
	if(inputV){
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.shisje span.subprice").html(parseFloat(inputV).toFixed(2));
	}else{
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.shisje span.subprice").html("0.00");
	}
	var zhaol=parseFloat($("#bill .billcontent .billRight .subtotle .subtotle-con li.shisje span.subprice").html())-parseFloat($("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html());
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.zhaol span.subprice").html(zhaol.toFixed(2));
}
$("#order-page1 .diancanright .footbtns li.jzbtn").click(function(){
	if($("#order-page1 .diancanleft .orderfooter span").html()>0){
		sessionStorage.setItem("orderTotle",$("#order-page1 .diancanleft .orderfooter span").html());
		$("#content-outer").animate({"left":"-200%"},500);
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.zongje span.subprice").html(sessionStorage.getItem("orderTotle"));
		$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html(sessionStorage.getItem("orderTotle"));
	}
	
});
//优惠选择
$("#bill .billcontent .billLeft .enter-price .keyboard .jeinput select").change(function(){
			var selVal=$(this).val();
			jiezhang(selVal);
			zhaoling();
		});

//实收金额输入框
$("#bill ul.enterKey").on("click","li",function(){
	if($(this).hasClass("clearAll")){
		$("#bill li.shisje-input input").val("");
	}else if($("#bill .shortcutbtn li.active").length){
			$("#bill .shortcutbtn li.active").removeClass("active");
			$("#bill li.shisje-input input").val("");
			$("#bill li.shisje-input input").val($("#bill li.shisje-input input").val()+$(this).children().html());
	}else if(($(this).hasClass("xiaoshu")&&($("#bill li.shisje-input input").val().indexOf(".")==-1))||($(this).hasClass("numer")&&($("#bill li.shisje-input input").val().indexOf(".")!=-1)&&(($("#bill li.shisje-input input").val().split("."))[1].length<2))||($(this).hasClass("numer")&&($("#bill li.shisje-input input").val().indexOf(".")==-1))){
			$("#bill li.shisje-input input").val($("#bill li.shisje-input input").val()+$(this).children().html());
	}
	zhaoling();
});
//快捷实收金额输入

$("#bill .shortcutbtn li").click(function(){
	$(this).addClass("active");
	$("#bill li.shisje-input input").val(parseFloat($(this).html()));
	zhaoling();
});


$("#bill .subconfirm-btn,#bill .subcancel-btn").click(function(){
	deletedishs();
	$("#bill .billcontent .billRight .subtotle .subtotle-con li.yingsje span.subprice").html("0.00");
	$("#bill li.shisje-input input").val("");
	$("#bill .billcontent .billLeft .enter-price .keyboard .jeinput select").val("");
	var selVal=$("#bill .billcontent .billLeft .enter-price .keyboard .jeinput select").val();
	jiezhang(selVal);
	zhaoling();
	sessionStorage.clear("orderTotle");
	$("#content-outer").animate({"left":"-100%"},500);
});
//网络取餐
//处理状态选择
$("#order-page2 .dishlist .checkOutbtns li").click(function(){
	if(!($(this).hasClass("active"))){
		$("#order-page2 .dishlist .checkOutbtns li.active").removeClass("active");
		$(this).addClass("active");
	}
});

$("#order-page2 .dishlist .checkOut-lists").on("click","ul.checkOut-list",function(){
	if(!($(this).hasClass("active"))){
		$("#order-page2 .dishlist .checkOut-lists ul.checkOut-list.active").removeClass("active");
		$(this).addClass("active");
	}
});



//反结算
$("#order-page3 .dishlist .checkOut-lists").on("click",".checkOut-list",function(){
	if(!($(this).hasClass("action"))){
		$("#order-page3 .dishlist .checkOut-lists .checkOut-list.active").removeClass("active");
		$(this).addClass("active");
	}
});

//单品反结算
$("#order-page3 .orderlists").on("click",".lists",function(){
	if($("#order-page3 .orderlists .lists.active").length==0){
		$(this).addClass("active");
		$("#order-page3 .fanjiesuan-outer").show();
	}
	
});
	function fanjiesuan(){
		$("#order-page3 .fanjiesuan-outer").hide();
		$("#order-page3 .fanjiesuan-outer input").val("");
		$("#order-page3 .fanjiesuan-outer>div.fanjiesuan-price").hide();
		$("#order-page3 .fanjiesuan-outer>div.fanjiesuan-pass").show();
		$("#order-page3 .fanjiesuan-outer>p").removeClass("warning").html("输入反结算密码与金额！");
	}
$("#order-page3 .fanjiesuan-outer p").on("click","button",function(e){
	e.preventDefault();
	if($(this).hasClass("fjs-cancel")){
		fanjiesuan();
		$("#order-page3 .orderlists .lists.active").removeClass("active");
	}else if($(this).hasClass("fjs-confirm")){
		if(!($("#order-page3 .fanjiesuan-outer .fanjiesuan-pass input").val())){
			$("#order-page3 .fanjiesuan-outer>p").addClass("warning").html("密码不能为空，请重新输入！");
		}else{
			$("#order-page3 .fanjiesuan-outer>div.fanjiesuan-price").show();
			$("#order-page3 .fanjiesuan-outer>div.fanjiesuan-pass").hide();
			$("#order-page3 .fanjiesuan-outer>p").removeClass("warning").html("输入反结算密码与金额！");
		}
		
	}else if($(this).hasClass("fjspri-confirm")){
		if(!($("#order-page3 .fanjiesuan-outer .fanjiesuan-price input").val())){
			$("#order-page3 .fanjiesuan-outer>p").addClass("warning").html("反结算金额不能为空，请重新输入！");
		}else{
				var acprice=$("#order-page3 .dishlist .checkOut-lists .checkOut-list.active li.shishou").html();
				if(acprice<$("#order-page3 .fanjiesuan-outer .fanjiesuan-price input").val()){
					$("#order-page3 .fanjiesuan-outer>p").addClass("warning").html("反结算金额不能大于实收金额，请重新输入！");
				}else{
					fanjiesuan();
					$("#order-page3 .orderlists .lists.active").removeClass("active");
		}
			
		}
		
	}
});

//订单反结算
$("#order-page3 .orderHead .mingxi li a").click(
	function(){
		if($("#order-page3 .lists.active").length==0){
			$("#order-page3 .fanjiesuan-outer").show();
		}
		
	}
	
);
//反结算软键盘输入
$("#order-page3 ul.enterKey li").click(function(){
	var me=this;
	$("#order-page3 div.fanjiesuan-outer>div").each(function(){
		if($(this).css("display")=="block"){
			if($(me).hasClass("clearAll")){
				$(this).find("input").val("");
				
			}else if((!$(me).hasClass("clearAll"))&&$(me).hasClass("fanjiesuan-pass")){
				$(this).find("input").val($(this).find("input").val()+$(me).children().html());
			}else if(($(me).hasClass("xiaoshu")&&($(this).find("input").val().indexOf(".")==-1))||($(me).hasClass("numer")&&($(this).find("input").val().indexOf(".")!=-1)&&(($(this).find("input").val().split("."))[1].length<2))||($(me).hasClass("numer")&&($(this).find("input").val().indexOf(".")==-1))){
			$(this).find("input").val($(this).find("input").val()+$(me).children().html());
	}
			
		}
	});
});



	//交班
//点击按钮页面跳转
$("#jiaobanMain").on("click",".jbbtns li button",function(e){
	e.preventDefault();
	if($(this).parent().hasClass("jbjl")){
		$("#order-page4 div.active").removeClass("active");
		$("#jiaobanRecord").addClass("active");
	}else if($(this).parent().hasClass("jbls")){
		$("#order-page4 div.active").removeClass("active");
		$("#jiaobanliushui").addClass("active");
	}
});

$(".jbR-foot-cancel").on("click","button",function(e){
	e.preventDefault();
	$("#jiaoban div.active").removeClass("active");
	$("#jiaobanMain").addClass("active");
});
//新增周转和留存现金软键盘输入
$("#jiaobanMain .jbmsg input").focus(function(){
	if(!$(this).hasClass("active")){
		$("#order-page4 .jbmsg input.active").removeClass("active");
		$(this).addClass("active");
	}
	
});
$("#jiaobanMain ul.enterKey li").click(function(){
		if($(this).hasClass("clearAll")){
			$("#jiaobanMain .jbmsg input.active").val("");
		}else if(($(this).hasClass("xiaoshu")&&($("#jiaobanMain .jbmsg input.active").val().indexOf(".")==-1))||($(this).hasClass("numer")&&($("#jiaobanMain .jbmsg input.active").val().indexOf(".")!=-1)&&(($("#jiaobanMain .jbmsg input.active").val().split("."))[1].length<2))||($(this).hasClass("numer")&&($("#jiaobanMain .jbmsg input.active").val().indexOf(".")==-1))){
			$("#jiaobanMain .jbmsg input.active").val($("#jiaobanMain .jbmsg input.active").val()+$(this).children().html());
		}
	});



});