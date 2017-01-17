/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');

	require('validform');
	$('#loginForm').Validform({
		tiptype: 2, //1：弹出；其他：输入框后插入
		ajaxPost: true,
		url: seajs.api.accountLogin,	
		callback: function(res) {
			if(res.msg === 'success'){
				location.href =seajs.root + res.url;
			}else{
				$.box.msg(res.msg,{
					color:'warning',
					delay:2000
				})
				ref();
			}
		}
	});
	$('#captcha').on('click',function(){
		var nsrc = $('#captcha').attr('src') + "?" + (new Date().getTime());
         $('#captcha').attr('src', nsrc);
	});
	var ref = function(){
		var nsrc = $('#captcha').attr('src') + "?" + (new Date().getTime());
		$('#captcha').attr('src', nsrc);
	}
});