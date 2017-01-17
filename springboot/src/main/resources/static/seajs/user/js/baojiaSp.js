/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	require('box');
	require('validform');
	var datepicker = require('My97DatePicker');

	// 模板
	var etpl = require('etpl');
	var detailrender = etpl.compile($('#orderListTemp').val());
	var detailFunc = function(data) {
		var _list = detailrender(data);
		$('#listView').html(_list);
	};
	$('.baojiaxq').on('click', function() {
		var info = $(this).data('infoid');
		$('#batchcode').val(info);
		findallgood(info);
		$.box($('#ckxq'), {
			width : 900,
			height : 500,
			title : '报价详情'
		});
	});
	var findallgood = function(info) {
		$.ajax({
			url : seajs.api.findallgood,
			data : {
				batchCode : info
			},
			cache: false,//不保存缓存
			dataType : 'json',
			success : function(res) {
				if (res.status === 'y') {
					detailFunc(res);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	}
	// 点击报价详情委托事件
	/*window.onload = function() {
		var oUl = document.getElementById("listView");
		var aLi = oUl.getElementsByTagName("a");
		oUl.onclick = function(ev) {
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement;
			if (target.nodeName.toLowerCase() == "a") {
				var that = target;
				var index;
				for (var i = 0; i < aLi.length; i++)
					if (aLi[i] === target)
						index = i;
				if (index >= 0)
					var price = target.parentElement.parentNode.children[5].children[0].value
				var purchasingPlanId = target.id;
				saveprice(price, purchasingPlanId);
			}
		}
	}*/
	$('#listView').on('click','.cgqrbj_btn',function(){
		var purchasingPlanId =$(this).data('infoid');
		var price = $(this).parent().parent().find('.fbbj_money').val();
		saveprice(price, purchasingPlanId);
	});
	var saveprice = function(goodprice, purchasingPlanId) {
		$.ajax({
			url : seajs.api.savePrice,
			data : {
				goodprice : goodprice,
				purchasingPlanId : purchasingPlanId
			},
			dataType : 'json',
			cache: false,//不保存缓存
			success : function(res) {
				if (res.status === 'y') {
					detailFunc(res);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	}
	$('#search').on('click', function() {
		var goodsName = $('#goodsName').val();
		var purchasingBatchcode =$('#batchcode').val();
	 	$.ajax({
			url : seajs.api.searchGoods,
			data : {
				goodsName : goodsName,
				purchasingBatchcode : purchasingBatchcode
			},
			cache: false,//不保存缓存
			dataType : 'json',
			success : function(res) {
				if (res.status === 'y') {
					detailFunc(res);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	});
});