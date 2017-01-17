/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com=require('./common');
	//
	require('datepicker');
	$('.datestrs').datepicker({
	  language: 'zh-CN'
	});

    require('datepicker');
	$('.dateends').datepicker({
	  language: 'zh-CN'
	});
	
	goodsFlowInfo=function(fileId){
		var iWidth = 500;
		var iHeight = 500;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
		window.open ('findGoodsFlowInfo?fileId='+fileId,'图片维护','height=600,width=800,top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');

	}
	
});