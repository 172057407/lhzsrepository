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
	var loginForm = $('#changePwForm').Validform({
		tiptype: 2, 
		ajaxPost: true,
		type: seajs.develop ? 'get' : 'post',
		url: seajs.root + '/user/updatePassword',
		callback: function(res) {
			if(res.status === 'y'){
				$.box.msg('修改成功，请重新登录',{
					delay:2000,
					onclose:function(){
						location.href = seajs.root + '/system/login'
					}
				})
			}else if(res.msg){
				$.box.msg(res.msg,{
					color:'warning',
					delay:2000
				})
			}
		}
	});

	
});