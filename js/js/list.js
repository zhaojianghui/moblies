require(['../../config'],function(){
	require(['jquery','list'],function($,list){
	    var current='1';
	    var Odata=[];
	    getData();
		$('.shopping').click(function(){
			//console.log(1)
			$(this).addClass('active').siblings().removeClass('active');
		    current=$(this).attr('data-classID');
		    getData(current);
		    //console.log(current)
	    })
		$('.list-item').click(function(){
			var index=$(this).index();
			//console.log($(this).index())
			$(this).addClass('active').siblings().removeClass('active');
			if(index==2){
				window.location.href="shoppingCat.html";
			}
			if(index==3){
				window.location.href="user.html"
			}
			if(index==4){
				window.location.href="reward.html"
			}
		})
		function getData(){
			$.getJSON('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&classID='+current,function(data){
			     console.log(data);
			      Odata=data;
			     var con='';
			     for(var i=0;i<data.length;i++){
			     	con+=`<li>
	<a href="javascript:;" data-id="${data[i].goodsID}"><img src="${data[i].goodsListImg}" alt="" /></a>
								<p>${data[i].goodsName}</p>
								<p>
									<span>¥${data[i].price}</span>
									<span>¥999</span>
								</p>
					     </li>`
			     }
			     $('.shoping-item').html(con);
			    
		})
		}
		$(".toshopCart").click(function(){
			window.location.href="shoppingCat.html"
		})
		$('.shoping-item').on('click','a',function(){
			var id=$(this).attr('data-id');
			console.log(id);
			var prodata={};
			for(var i=0;i<Odata.length;i++){
            //通过循环，找到当前点击的商品的数据
            if(Odata[i].goodsID==id) {
                prodata = Odata[i];
                break;
            }
           }
            var proHistory = JSON.parse(localStorage.getItem("proHistory")||'[]');
            for(var i=0;i<proHistory.length;i++){

	           if(proHistory[i].goodsID==id){
	               //循环判断，数组里面如果有商品的id ==当前添加的商品id
	               proHistory.splice(i,1) //删除
           }
        }
         //把当前点击的商品信息添加到   历史记录里面
        proHistory.unshift(prodata);
        localStorage.setItem("proHistory",JSON.stringify(proHistory))
	    window.location.href="shopping-data.html?goodsID="+id;
		})
		
		
	})
})