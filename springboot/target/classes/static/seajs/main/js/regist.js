/**
 * index
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com = require('./common');

	require('validform');
	$('#form1').Validform({
		tiptype: 2, //1：弹出；其他：输入框后插入
		ajaxPost: true,
		url: seajs.api.accountRegist,		
		callback: function(res) {
			if(res.status === 'y'){
				location.href = seajs.root + '/system/regist1';
			}else{
				$.box.msg(res,{
					color:'warning',
					delay:2000
				})
			}
		}
	});
	$('#mobile').on('blur',function(){
		var phone = $('#mobile').val();
		$('#random').attr('name',phone);
	});
	//发送验证码
	var timeout = 60, 
		intv,
		state = function(o){
			if(timeout){
				$(o).text(--timeout + '秒后重发');
			}else{
				clearInterval(intv);
				timeout = 60;
				$(o).removeClass('unable').text('重发验证码');
			}
		};
	$('#sendcode').on('click',function(e){
		var phone = $('#mobile').val();
		if(phone){
			var that = this;
			if($(that).hasClass('unable')){
				e.preventDefault();
				return null;
			}
			$(that).addClass('unable');
			intv = setInterval(function(){
				state(that);
			},1000);
			sendrandom();
		}else{
			alert("请填写手机号！");
		}
	});
   var sendrandom = function(){
	   var phone = $('#mobile').val();
	   $.ajax({
			url: seajs.api.sendRandom,
			dataType: 'json',
			data:{"phone" : phone},
		    success: function(data) {
				if (data.status === "y") {
//					$.box.msg("发送成功", {
//						delay: 2e3
//					});
				};
			 },
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$.box.msg("与服务器断开连接，请稍后重试！", {
				delay: 2e3
			});
		}
		});
   }
});