/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	require('box');
	require('validform');
	var datepicker = require('My97DatePicker');

	$('body').on('click','.ckxq_btn',function(){
		var planid = $(this).data('planid');
		initprice(planid);
	}).on('click','.boxckxq',function(){
		var priceid = $(this).data('priceid');
		conform(priceid);
	});
	//确认报价
	var conform = function(purchasingPriceId){
		$.ajax({
			url : seajs.api.confirmPrice,
			data : {
				purchasingPriceId : purchasingPriceId
			},
			dataType : 'json',
			cache: false,//不保存缓存
			success : function(res) {
				if (res != null) {
					dep(res.plan.purchasingBatchcode,1);
					initprice(res.plan.purchasingPlanId);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	}
	//初始化报价信息
	var initprice = function(purchasingPlanId){
		$.ajax({
			url : seajs.api.lookPrice,
			data : {
				purchasingPlanId : purchasingPlanId
			},
			cache: false,//不保存缓存
			dataType : 'json',
			success : function(res) {
				if (res.status === 'y') {
					detailFunc(res);
					$.box($('#ckxq'), {
						width : 900,
						title : '采购商',
						onclose:function(){
							$.box.hide();
						}
					});
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	}
	// 模板
	var etpl = require('etpl');
	var listrender = etpl.compile($('#orderListTemp').val());
	var detailrender = etpl.compile($('#detail').val());
	var pagerender = etpl.compile($('#pageTemp').val());
	var renderFunc = function(data) {
		var _list = listrender(data);
		$('#listView').html(_list);
		renderPage(data);
	};
	var detailFunc =function(data){
		var _list = detailrender(data);
		$('#pricedetail').html(_list);
	};
	
	// 变色
	$('.cgxq_onetr').on('click', function() {
		var trs = $('.qgtab_or tr');// 获取所有的 tr

		$.each(trs, function(index, item) {

			$(item).css("background-color", "");// 先把把的tr颜色都置空
		});
		$(this).css("background-color", "#dddddd");// 让当前的元素颜色变为灰
		$('#cgxq_one').css("display", "");
		var batchCode = $(this).data('id');
		dep(batchCode,1);

	});
	var bat;
	var dep = function(purchasingBatchcode,pages){
		bat = purchasingBatchcode;
		$.ajax({
			url : seajs.api.purchasingplanDetail,
			data : {
				purchasingBatchcode : purchasingBatchcode,
				pages:pages
			},
			cache: false,//不保存缓存
			dataType : 'json',
			success : function(res) {
				if (res.status === 'y') {
					renderFunc(res);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color : 'warning',
						delay : 2000
					})
				}
			}
		})
	}
	  require.async('upload', function(Uploader) {
		    var uploader = new Uploader({
		      trigger: '#selectFile',
		      name: 'file',
		      action: seajs.api.uploadFile,
		      progress: function(event, position, total, percent) {
		        console.log('已上传 ' + position + '/' + total + ' ' + percent + '%')
		      },
		     
		      change: function(file){
		    	  uploader.submit();
		      },
		    
		      success: function(response) {
		    	 window.location.reload();
		        console.log('上传完成')
		      }
		    });
		  })
		  //js分页
		  var renderPage = function(data) {
			if (!$.isPlainObject(data.pageInfo) || !(data.pageInfo.number+1) || !data.pageInfo.totalPages) {
				return console.warn('页码数据有误！');
			};
			var showNum;
			if(data.pageInfo.totalPages >5){
				 showNum = 5;		//显示页数
			}else{
				 showNum = data.pageInfo.totalPages;
			}
			var holder = '...';		//省略号
			var pageData = $.extend({
				number: null,
				totalPages: null,
				isFirst: null,
				isLast: null,
				pages: []
			}, data.pageInfo);
			var showStart,
				showEnd,
				i,
				_;
			if((pageData.number+1) <= showNum){
				showStart = 1;
			}else if(pageData.totalPages - (pageData.number+1) >= showNum){
				showStart = pageData.number+1
			}else {
				showStart = pageData.totalPages - showNum + 1
			};
			showEnd = showStart + showNum - 1;

			for (i = showStart; i <= showEnd; i++) {
				_ = {
					num: i,
					to: i
				};
				if ((pageData.number+1) == i) {
					_.active = true
				};
				pageData.pages.push(_);
			};
			if(showStart > showNum){
				pageData.pages.splice(0,0,{
					num: holder,
					to: (pageData.number+1) - showNum
				})
			};
			if (pageData.totalPages > showEnd) {
				pageData.pages.push({
					num: holder,
					to: showEnd + 1
				});
			};
			pageData.isFirst = ((pageData.number+1) == 1);
			pageData.isLast = ((pageData.number+1) == pageData.totalPages);
			var _page = pagerender(pageData);
			$('#pageView').html(_page).on('click','a',function(){
				var num = $(this).data('to');
				dep(bat,num);
			});
		};
	
});