/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com=require('./common');
	//
	require('box');
	//验证
	require('validform');
	var loginForm = $('#infoForm').Validform({
		tiptype: 2, 
		ajaxPost: true,
		type: seajs.develop ? 'get' : 'post',
		url: seajs.api.savacompanyInformation,
		beforeSubmit:function(){
			$('#province').removeAttr('disabled');
			$('#city').removeAttr('disabled');
			$('#area').removeAttr('disabled');
		},
		callback: function(res) {
			if(res.status==='y'){
				window.location.reload();
			}else if(res.msg){
				$.box.msg(res.msg,{
					color:'warning',
					delay:2000
				})
			}
		}
	});
	
	var init = function(){
		var loading = $.box.msg('加载中...');
		$.ajax({
			url: seajs.api.initCompanyinfo,
			dataType: 'json',
			success: function(res) {
				if (res.status === 'y') {
					initdata(res.data);
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color: 'warning',
						delay: 2000
					})
				}
			}
		}).always(function() {
			$.box.hide(loading);
			$('body').scrollTop(0);
		});
	}
	
	var initdata =function(com){
		$('#infoForm').find('#addressinput').val(com.address)
				.end().find('#companyname').val(com.companyName)
				.end().find('#mobileinput').val(com.contactsPhone)
				.end().find('#telinput').val(com.foxphone)
				.end().find('#contatcts').val(com.contacts)
				.end().find('#contactsEmil').val(com.contactsEmil)
				.end().find('#province option').each(function(i, e) {
					if ($(e).text() === com.province) {
						$(e).prop('selected', true).parent().trigger('change');
						if(com.status === 1){
						   $('#province').attr('disabled','disabled');
						}
						return false;
					}
				})
				.end().find('#city option').each(function(i, e) {
					if ($(e).text() === com.city) {
						$(e).prop('selected', true).parent().trigger('change');
						if(com.status === 1){
						   $('#city').attr('disabled','disabled');
						}
						return false;
					}
				})
				.end().find('#area option').each(function(i, e) {
					if ($(e).text() === com.area) {
						$(e).prop('selected', true);
						if(com.status === 1){
						   $('#area').attr('disabled','disabled');
						}
						return false;
					}
				});
	}
	init();
});