/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	require('box');

	require('zoom');
	$('.prodt_bimg').zoom()


	$('.prodt_simgs').find('li').on('click', function(event) {
		var _src = $(this).find('img').attr('src');
		$(this).addClass('cur').siblings('li').removeClass('cur')
		$('.prodt_bimg').find('img').attr({
			"src": _src,
			"zoom": _src
		});
	}).first().trigger('click');


	//选项卡
	require('tab');
	$('.productbright').tab({
		conts: '.tab-pane'
	});

	//收藏
	var productId = $('#productId').val();
	$('#pro_fav').on('click', function() {
		$.ajax({
			url: "../user/collection/add",
			type: "Post",
			data: {
				"productId": productId
			},
			dataType: "json",
			success: function(data) {
				if (data == "success") {
					$.box.msg("收藏成功",{delay:2e3});
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$.box.msg("与服务器断开连接，请稍后重试！",{delay:2e3});
			}
		});
	});


   //加入购物车
	var funParabola=require('parabola')
	

	// 元素以及其他一些变量
	var eleFlyElement = document.querySelector("#flyItem"),
		eleShopCart = document.querySelector("#shopCart");
	var numberItem = parseInt($('.cart_num').text());
	// 抛物线运动
	var myParabola = funParabola(eleFlyElement, eleShopCart, {
		speed: 400, //抛物线速度
		curvature: 0.0008, //控制抛物线弧度
		complete: function() {
			var num=$('.amount-input').val();
			eleFlyElement.style.visibility = "hidden";
			$.ajax({
			url: seajs.api.addCart,
			type: "Post",
			data: {
				"productId": productId,
				"num": num
			},
			cache: false,
			dataType: "json",
			success: function(data) {
				if (data.status === "y") {
					$.box.msg("添加成功",{delay:2e3});
				}
				//更新右侧边栏
				com.checkSideCartNum();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$.box.msg("与服务器断开连接，请稍后重试！",{delay:2e3});
			}
		});

			
		}
	});
	// 绑定点击事件
	if (eleFlyElement && eleShopCart) {

		[].slice.call(document.getElementsByClassName("btnCart")).forEach(function(button) {
			button.addEventListener("click", function(event) {
				// 滚动大小
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
				eleFlyElement.style.left = event.clientX + scrollLeft + "px";
				eleFlyElement.style.top = event.clientY + scrollTop + "px";
				eleFlyElement.style.visibility = "visible";

				// 需要重定位
				myParabola.position().move();
			});
		});
	}
	var recode=$("#recodeId").val();
	if(recode){ //专题用模板二的时候如果没有关联商品的时候要提示一个还要把购物车隐藏
		$(".jh_gwc").hide();
		$(".sl_or").hide();
		alert("没有关联商品请联系客服关联商品");
	};


});