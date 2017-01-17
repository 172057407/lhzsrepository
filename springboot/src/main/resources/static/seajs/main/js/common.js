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
	$('body').on('click', '.gotop', function(e) {
		e.preventDefault();
		$('html,body').stop(1).animate({
			scrollTop: '0'
		}, 300);
		return false
	}).on('click', '.addfavorite', function(e) {
		e.preventDefault();
		var sURL = "http:&#47;&#47;" + document.domain + "&#47;",
			sTitle = document.title;
		try {
			window.external.addFavorite(sURL, sTitle)
		} catch (e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "")
			} catch (e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加")
			}
		}
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
	require.async('bdshare', function(bdshare) {
		bdshare()
	});

	/*
	 * 站内公用
	 */
	//行业分类效果
	var $nav_menu = $('.nav_menu');
	if (!$nav_menu.hasClass('unable')) {
		$nav_menu.on('mouseenter', '._T', function() {
			$nav_menu.find('._toggle').show();
		}).on('mouseleave', function() {
			$nav_menu.find('._toggle').hide();
		});
	};
	if ($('.sideBar').length) {
		//右侧返回顶部按需显示
		var $gotop = $('.gotop');
		var $win = $(window);
		var gotop = base.throttle(function() {
			if ($win.scrollTop() > 100) {
				$gotop.addClass('show')
			} else {
				$gotop.removeClass('show');
			}
		});
		$win.on('scroll', gotop);
		//右侧购物车
		var etpl = require('etpl');
		var cartPopRender = etpl.compile($('#quickCartTemp').val());
		var $quickCart = $('#quickCart');
		$quickCart.on('click', '._clo', function() {
			$quickCart.removeClass('show');
		});
		$(document).on('click', function(e) {
			if (!$quickCart.find(e.target).length) {
				$quickCart.removeClass('show');
			}
		});
		//检测登陆
		var isLogin = false;
		var checkSideCartNum = function() {
			$.ajax({
				url: seajs.api.checkLog,
				dataType: 'text',
				cache: false,
			}).done(function(res) {
				isLogin = ($.trim(res) === 'true');
				if (isLogin) {
					//请求购物车件数
					$.ajax({
						url: seajs.api.getPopCart,
						dataType: 'json',
						cache: false,
					}).done(function(res) {
						var cartnum = res.count < 100 ? res.count : '99+';
					    $('.cart_num').text(cartnum);
					});
				}
			});
		};
		$('#shopCart').on('click', function(e) {
			e.stopPropagation();
			if ($quickCart.hasClass('show')) {
				return $quickCart.removeClass('show')
			};
			if (isLogin === 'false') {
				location.href = seajs.root + "/system/login";
			} else {
				$quickCart.addClass('show');
				$.ajax({
					url: seajs.api.getPopCart,
					dataType: 'json',
					cache: false,
				}).done(function(res) {
					var html = cartPopRender(res);
					$quickCart.find('.quick_cart_main').html(html);
				})
			}
		});
		$('.btn-block').on('click',function(){
			location.href = seajs.root + '/car/init';
		});
		checkSideCartNum()
	};

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
		checkSideCartNum: checkSideCartNum
	}

})