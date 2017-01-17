/**
 * name: common
 * version: v3.0.2
 * update: ie8 .opc0 显示bug
 * date: 2016-08-02
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');

	if (base.browser.ie < 8) {
		alert('您的浏览器版本过低，请升级或使用chrome、Firefox等高级浏览器！');
	}
	//屏蔽ie78 console未定义错误
	if (typeof console === 'undefined') {
		console = {
			log: function() {},
			warn: function() {}
		}
	};
	/*
	 * 常用工具
	 */
	//返回顶部
	$('body').on('click', '.gotop', function() {
		$('html,body').stop(1).animate({
			scrollTop: '0'
		}, 300);
		return false
	});
	//关闭当前页
	$('body').on('click', '.closewin', function() {
		window.opener = null;
		window.open("", "_self");
		window.close()
	});
	//打印当前页
	$('body').on('click', '.print', function() {
		window.print()
	});

	//textarea扩展max-length
	$('textarea[max-length]').on('change blur keyup', function() {
		var _val = $(this).val(),
			_max = $(this).attr('max-length');
		if (_val.length > _max) {
			$(this).val(_val.substr(0, _max));
		};
	});
	//延时显示
	if (base.browser.ie < 9) {
		$('.opc0').css('filter', 'unset')
	} else {
		$('.opc0').animate({
			'opacity': '1'
		}, 160);
	}

	// placeholder
	$('input, textarea').placeholder();

	//计数器
	$('body').on('click', '.amount-control .amount-up', function(e) {
		e.preventDefault();
		var $inp = $(this).parent().find('.amount-input'),
			val = parseFloat($inp.val()) ? parseFloat($inp.val()) : 0,
			max = Infinity;
		if($inp.attr('maxsale')!==undefined){
			max = parseFloat($inp.attr('maxsale')) ? parseFloat($inp.attr('maxsale')) : 0
		};
		if (max == 0 || max > val) {
			$inp.val(val + 1);
		} 
	}).on('click', '.amount-control .amount-down', function(e) {
		e.preventDefault();
		var $inp = $(this).parent().find('.amount-input'),
			val = parseFloat($inp.val()) ? parseFloat($inp.val()) : 0,
			min = parseFloat($inp.attr('minsale')) ? parseFloat($inp.attr('minsale')) : 1;
		if (val > min) {
			$inp.val(val - 1);
		}
	}).on('keyup', '.amount-control .amount-input', function() {
		var val = parseFloat($(this).val(), 10);
		if (!val) {
			$(this).val(0);
		} else {
			$(this).val(val);
		}
	}).on('blur', '.amount-control .amount-input', function() {
		var $inp = $(this).parent().find('.amount-input'),
			max = Infinity,
			val = parseFloat($(this).val()),
			min = parseFloat($inp.attr('minsale')) ? parseFloat($inp.attr('minsale')) : 1;
		if($inp.attr('maxsale')!==undefined){
			max = parseFloat($inp.attr('maxsale')) ? parseFloat($inp.attr('maxsale')) : 0
		};
		if (val < min) {
			$(this).val(min);
		};
		if (val > max) {
			$(this).val(max);
		};
	});
	
	/*
	 * 输出
	 */
	module.exports = {
		demo: function() {
			console.log('hello ' + base.getType());
		}
	}

	/*
	 * 站内公用
	 */
	


})