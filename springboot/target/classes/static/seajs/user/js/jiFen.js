/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com=require('./common');
	
	require('box');
	//
	require('datepicker');
	$('.datestrs').datepicker({
	  language: 'zh-CN'
	});

    require('datepicker');
	$('.dateends').datepicker({
	  language: 'zh-CN'
	});
	
	var nowdate=new Date();
	var pre=new Date();
	pre.setMonth(nowdate.getMonth());
	pre.setMonth(pre.getMonth()-1);
	var startDate = $('#datestrs').val() || (pre.getFullYear() + '-' + (getZero(pre.getMonth()+1)) + '-' +getZero(pre.getDate()));
	var endDate = $('#dateends').val() || nowdate.getFullYear() + '-' + (getZero(nowdate.getMonth() + 1)) + '-' + getZero(nowdate.getDate());
	$('#datestrs').val(startDate);
	$('#dateends').val(endDate);
	
	function getZero(mothOrDate){
		if(mothOrDate<10){
			return "0"+mothOrDate;
		}
		
		return mothOrDate
	}
	
});