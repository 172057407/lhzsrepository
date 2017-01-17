/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	//
	require('box');

	var mainDOM = $('.u_content'),
		check_all = $('#chgys'),
		check_item = mainDOM.find('input[name="check"]'),
		orderData = [],
		resetList = function() {
			check_all.prop('checked', false).trigger('change')
		},
		setData = function() {
			orderData.length = 0;
			check_item.each(function(i, e) {
				if (e.checked) {
					_quickorderId = $(e).parents('tr').data('goodsid');
					_price = $(e).parents('tr').children('td').eq(5).text();
					_goodNum = $(e).parents('tr').find('.amount-input').val();
					orderData.push({
						quickorderId: _quickorderId,
						goodsNum: _goodNum,
						price: _price
					});
				}
			});
		};

	check_all.on('change', function() {
		var _ischecked = $(this).prop('checked');
		check_item.each(function(i, e) {
			e.checked = _ischecked
		});
		setData();
	});
	check_item.on('change', function() {
		var _allchecked = true,
		    _quickorderId,
		    _price,
			_goodNum;
		orderData.length = 0;
		check_item.each(function(i, e) {
			if (!e.checked) {
				return _allchecked = false;
			}
		});
		check_all.prop('checked', _allchecked);
		setData();
	});

	mainDOM.on('click', '.suborder', function() {
		if (!orderData.length) {
			return $.box.msg('未选择商品！', {
				color: 'warning',
				delay: 2000
			});
		};
		$.ajax({
			url: seajs.api.submitQuickOrder,
			type: seajs.develop ? 'get' : 'post',
			data:JSON.stringify(orderData),
			dataType: "json",
			contentType: "application/json",
			success: function(res) {
				if (res.status === 'y') {
					$.box.alert("订购成功，请等待审核！");
					resetList()
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color: 'warning',
						delay: 2000
					})
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$.box.msg("网络异常！", {
					color: 'danger',
					delay: 2000
				})
			}
		});

	}).on('click', '.dodel', function() {
		var _quickorderId = $(this).parents('tr').data('goodsid');
		if (_quickorderId) {
			$.ajax({
				url: seajs.api.delQuickOrder,
				type: seajs.develop ? 'get' : 'post',
				data: {
					quickorderId: _quickorderId
				},
				dataType: "json",
				success: function(res) {
					if (res.status === 'y') {
						window.location.reload();
					} else if (res.msg) {
						$.box.msg(res.msg, {
							color: 'warning',
							delay: 2000
						})
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$.box.msg("网络异常！", {
						color: 'danger',
						delay: 2000
					})
				}
			});
		} else {
			console.warn('tr标签未正确输出data-goodsid')
		}
	});


});