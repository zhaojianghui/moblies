require(['../../config'],function(){
	require(['jquery','reg'],function($,reg){
		$(function(){
	$(".node").html("");
	var passToo = false ;
	// 注册页姓名格式验证
	    $("#name").blur(function(){
	    	 $(".node").html("");
	    	 var oName = $("#name").val(); 
	    	 var reg = /^\w{6,20}$/;
	    	 if(!reg.test(oName)){
	    
	    	 	$(".node").html("请输入6-20位字符的账户名") ;
	    	 }
	    })

    // 注册页密码格式验证
        var pa = 0 ;
	    $("#pass").blur(function(){
	    	 $(".node").html("");
	    	 var oPass = $("#pass").val() ;
	    	 var reg = /^\w{6,20}$/ ;
	    	 if(!reg.test(oPass)){
                $(".node").html("请输入6-20位任意字符的密码") ;	 
	    	 }else{
	    	 	pa = $("#pass").val() ;
	    	 	//console.log(pa) 
	    	 }
	    	 
	    }) 

	    // 注册页确认密码验证
	    $("#passTo").blur(function(){
	    	 $(".node").html("");
	    	 var oPassTo = $("#passTo").val() ;
	    	 if(!(pa==oPassTo)){
                $(".node").html("请再次输入密码") ;
	    	 }else{
                 passToo = true ;
	    	 }
	    })
     

     // 登录
     
     $("#btn").click(function(){

     	if(passToo){

        var user = $("#name").val() ;
	    var password = $("#pass").val();

	    $.ajax({
	    	url:"http://datainfo.duapp.com/shopdata/userinfo.php",
	    	type:"POST",
	    	data:{
	    		   status:"register",
	    		   userID:user,
	    		   password:password
	    	},
	    	success:function(res){
	    		   $(".node").html("");
                   res = Number(res) ;
                   switch(res){
                   	case 0:$(".node").html("用户重名") ;break;
                   	case 1:$(".node").html("注册成功,3秒后自动跳转登陆页面") ;
                   	       setTimeout(function(){ window.location.href = "login.html"},3000);break;
                   	case 2:$(".node").html("数据库报错") ;break;
                   }
	    	},

	    	error:function(){
	    		alert("服务器故障");
	    	}
	    })

     	}else{
     		$(".node").html("");
            $(".node").html("请确认密码") ;
     	}


     }) 
     $('.return').click(function(){
     	window.location.href="login.html";
     })
})

	})
})



