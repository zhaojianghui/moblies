require(['../../config'],function(){
	require(['jquery','login'],function($,login){
		$(function(){
	// 登陆页姓名格式验证
	    $("#name1").blur(function(){
	    	 $(".node").html("");
	    	 var oName = $("#name").val(); 
	    	 var reg = /^\w{6,20}$/;
	    	 if(!reg.test(oName)){	    
	    	 	$(".node").html("请输入6-20位字符的账户名") ;
	    	 }
	    })

    // 登录页密码格式验证

	    $("#password").blur(function(){
	    	 $(".node").html("");
	    	 var opassword = $("#password").val() ;
	    	 var reg = /^\w{6,20}$/ ;
	    	 if(!reg.test(opassword)){
                $(".node").html("请输入6-20位任意字符的密码") ;	 	    	
	    	 }
	    	 
	    }) 

	   
      // 显示密码
        $("#xianshi").click(function(){
        	  if($("#xianshi").attr("checked") == "checked"){
		         $("#password").attr("type","password")
		         $("#xianshi").removeAttr("checked")
		     }else{
		     	  $("#password").attr("type","text")
		     	 $("#xianshi").attr("checked","checked")
		     }

        })

     // 注册
      
      $("#btn1").click(function(){

        var user1 = $("#name1").val() ;
	    var password1 = $("#password").val();

	    $.ajax({
	    	url:"http://datainfo.duapp.com/shopdata/userinfo.php",
	    	type:"POST",
	    	data:{
	    		   status:"login",
	    		   userID:user1,
	    		   password:password1
	    	},
	    	success:function(res){
	    		   $(".node").html("");console.log(res)
                   res = Number(res) ;
                   switch(res){
                   	case 0:$(".node").html("用户不存在") ;break;
                   	
                   	case 2:$(".node").html("用户名与密码不符") ;break;
                   	default:$(".node").html("登陆成功,3秒后自动跳转列表页面") ; 
                   		   localStorage.setItem('userID',user1);
                   	       setTimeout(function(){ window.location.href = "list.html"},3000);break;
                   }
	    	},

	    	
	    })


      })


      $("#btn2").click(function(){
      	    window.location.href = "reg.html";
      })
      	       
    
})
	})
})
