/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	//
	require('box');
	//上传
	require.async('upload', function(Uploader) {
		$('.uploadCert').each(function(i, trigger) {
			var certPlace = $(trigger).parents('.form-group').find('.certPlace');
			//初始图片
			var imgUrl = certPlace.next('input.imgUrl');
			if(imgUrl.val()){
				certPlace.addClass('withImg').html('<img src="' + seajs.root + '/img/downloadimage/ '+ imgUrl.val() + '"/>')
			};
			
			(function(certPlace) {
				new Uploader({
					trigger: trigger,
					name: 'file',
					change: function(file) {
						var accept = /image\/(jpg|jpeg)/;
						var size = file[0].size / 1024 / 1024;
						if (size > 10 || !accept.test(file[0].type)) {
							return $.box.msg('图片限制小于10M，jpg格式！', {
								color: 'warning',
								delay: 2000
							})
						};
						//自动提交
						this.submit();
					},
					action: seajs.root + "/user/certificates/file",
					progress: function(event, position, total, percent) {
						console.log('已上传 ' + position + '/' + total + ' ' + percent + '%')
					},
					success: function(response) {
						if (response.split) {
							response = $.parseJSON(response)
						}
						if (response.path) {
							var _img = '<img src="' + seajs.root + '/img/downloadimage/'+response.path + '"/>';
							certPlace.html(_img).addClass('withImg').parent().find('.Validform_wrong').remove();
							imgUrl.val(response.path);
						} else {
							$.box.msg('服务端异常！', {
								color: 'warning',
								delay: 2000
							})
						}
					}
				});
			})(certPlace)
		})
	});
	//清除
	$('.clearCert').on('click', function() {
		var certPlace = $(this).parents('.form-group').find('.certPlace');
		console.log(certPlace)
		certPlace.removeClass('withImg').empty().next('input.imgUrl').val('');
	});
	//日期选择
	require('datepicker');
	$('.datePicker').each(function(){
		$(this).datepicker({
			language: 'zh-CN',
			autohide: true,
			hide: function(e) {
				setTimeout(function() {
					vf.check(false, e.currentTarget);
				}, 0);
			}
		});
	});
	//验证
	require('validform');
	var vf = $('#certForm').Validform({
		tiptype: 2, 
		ajaxPost: true,
		type: seajs.develop ? 'get' : 'post',
		url: seajs.root + '/user/certificates/uploadfiles',
		callback: function(res) {
			if(res.status==='y'){
				$.box.msg('修改成功', {
					delay: 2000,
					onclose:function(){
						location.reload()
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