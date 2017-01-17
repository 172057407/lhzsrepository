/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');
	//
	
	var datepicker = require('My97DatePicker');
	
	var pre = new Date();
	
	var nowdate=new Date();
	pre.setMonth(nowdate.getMonth());
	pre.setMonth(pre.getMonth()-1);
	var startDate = $('#txtBeginDate').val() || (pre.getFullYear() + '-' + (bigTen(pre.getMonth()+1)) + '-' +bigTen(pre.getDate()));
	var endDate = $('#txtEndDate').val() || nowdate.getFullYear() + '-' + (bigTen(nowdate.getMonth() + 1)) + '-' + bigTen(nowdate.getDate());
	$('#birthdaystr').val(startDate).on('click', function() {
		datepicker();
	});
	$('#birthdayend').val(endDate).on('click', function() {
		datepicker();
	});
	
	function bigTen(num){
		if(num<10){
			return '0'+num;
		}else{
			return num;
		}
	}
	//模板
	var etpl = require('etpl');
	var listrender = etpl.compile($('#orderListTemp').val());
	var pagerender = etpl.compile($('#pageTemp').val());
	var renderFunc = function(data) {
		var _list = listrender(data);
		$('#listView').html(_list);
		renderPage(data);
	};

	var renderPage = function(data) {
		console.log(data);
		if (!$.isPlainObject(data.pageInfo) || !data.pageInfo.number || !data.pageInfo.totalPages) {
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
		if(pageData.number <= showNum){
			showStart = 1;
		}else if(pageData.totalPages - pageData.number >= showNum){
			showStart = pageData.number
		}else {
			showStart = pageData.totalPages - showNum + 1
		};
		showEnd = showStart + showNum - 1;

		for (i = showStart; i <= showEnd; i++) {
			_ = {
				num: i,
				to: i
			};
			if (pageData.number == i) {
				_.active = true
			};
			pageData.pages.push(_);
		};
		if(showStart > showNum){
			pageData.pages.splice(0,0,{
				num: holder,
				to: pageData.number - showNum
			})
		};
		if (pageData.totalPages > showEnd) {
			pageData.pages.push({
				num: holder,
				to: showEnd + 1
			});
		};
		pageData.isFirst = (pageData.number == 1);
		pageData.isLast = (pageData.number == pageData.totalPages);
		var _page = pagerender(pageData);
		$('#pageView').html(_page).on('click','a',function(){
			var num = $(this).data('to');
			if(num){
				$('#page').val(num);
				$('#orderListForm').submit();
			}
		});
	};

	//表单验证
	require('box');
	require('validform');
	var loadingbox;
	var loginForm = $('#orderListForm').Validform({
		ajaxPost: true,
		url: seajs.api.findbydataReception,
		type: seajs.develop ? 'get' : 'post',
		beforeSubmit:function(){
			loadingbox = $.box.msg('正在加载...');
		},
		callback: function(res) {
			if (res.status === 'y') {
				renderFunc(res);
			} else if (res.msg) {
				$.box.msg(res.msg, {
					color: 'warning',
					delay: 2000
				})
			};
			$.box.hide(loadingbox)
		}
	});

	var initPage = isNaN(Number(location.hash.substr(1))) ? Number(location.hash.substr(1)) : 1 ;
	$('#page').val(initPage);

	$('#orderListForm').submit();
	
	$('.check').on('click',function(){
		var status = $(this).data('check');
		var objSelect = $('.OrderStatus');
		for( var i =0;i<objSelect[0].options.length;i++){
			if(objSelect[0].options[i].value == status){
				objSelect[0].options[i].selected = true;
			}
		}
		$('#orderListForm').submit();
	});
});