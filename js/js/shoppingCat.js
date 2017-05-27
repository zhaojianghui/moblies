
require(['../../config'],function(){
	require(['jquery','shoppingCat'],function($,shoppingCat){
     	    var userID = localStorage.getItem('userID');
			var con='';
			var totalprice=0;
			$.getJSON('http://datainfo.duapp.com/shopdata/getCar.php?callback=?&userID='+userID,function(data){
				for(var i=data.length-1;i>0;i--){
				
				con+=`
				<div class="goods" data-id = "${data[i].goodsID}">
						<div class= "left">
							<img src="${data[i].goodsListImg}" alt="" />
						</div>
						<div class="center">
							<p>ESPRIT: ${data[i].goodsName}</p>
							<p>单价：￥<span class='price'>${data[i].price}</span></p>
							<p class = "number">数量：
								<span class = "reduce">-</span>
								<input type="text" value="1" class="num"/>
								<span class = "plus">+</span>
							</p>
						</div>
						<div class= "right">
							<a href="javascript:;" class="delet">
								<img src="img/9_03.png"/>
							</a>
						</div>
					</div>`
				//console.log(data)
				totalprice +=Number( data[i].price);
				
				$('.priceAll').html('¥'+totalprice);
			}
			    $('.goodsAll').append(con);
			    getTotal();
			})
			
			var goods=$('.goods');
			
			 $(".goodsAll").on("click",".plus",function(){
					 var numb =	Number($(this).parentsUntil(".goods").find("input").val())+1+"";
					 $(this).parentsUntil(".goods").find("input").val(numb);
					 var price=Number($(this).parent().prev().find('.price').html());
					 getTotal();
					 
			})
			$(".goodsAll").on("click",".reduce",function(){
				if(Number($(this).parentsUntil(".goods").find("input").val())>1){
					var numb =	Number($(this).parentsUntil(".goods").find("input").val())-1+"";
			 		$(this).parentsUntil(".goods").find("input").val(numb);
			 		var price=Number($(this).parent().prev().find('.price').html());
			 		getTotal();
					
				}
			
			})
			$(".goodsAll").on("click",".delet",function(){
				//console.log(1)
				var goodsId = $(this).parents(".goods").attr("data-id")
				$(this).parents(".goods").remove();
				$.get('http://datainfo.duapp.com/shopdata/updatecar.php?callback=',{userID:userID,goodsID:goodsId,number:"0"},function(data){
					console.log(data)
					if(data == 1){
						console.log("删除成功")
					}else{
						console.log("删除失败")
					}
					getTotal()
					
				})
				
			})
			function getTotal(){
            //循环计算总金额，和总量
            var totalNumber = 0;
            var totalPrice = 0;
            $('.goodsAll').find(".goods").each(function (index) {
                var number = $(this).find(".num").val();
                var price = $(this).find(".price").html();
                //console.log(number)
                totalNumber+=number*1;
               // console.log(totalNumber)
                totalPrice+=price*number;
            });
			//console.log(totalNumber)
            $('.priceAll').html("¥"+totalPrice);
            $(".goods-tatolnum").html(totalNumber)

        }
		
		  $('.list-item').click(function(){
			var index=$(this).index();
			//console.log($(this).index())
			$(this).addClass('active').siblings().removeClass('active');
			if(index==1){
				window.location.href="list.html"
			}
			if(index==3){
				window.location.href="user.html"
			}
			if(index==4){
				window.location.href="reward.html"
			}
		})
		
		
	  

		
	})
})
