/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	//
	require('box');
	var mainDom = $('#collectionList');
	var doDel = function(id) {
		$.ajax({
			url: seajs.api.delCollection,
			data:{goodsId:id},
			dataType: 'json',
			success: function(res) {
				if (res.status === 'y') {
					window.location.reload();
				} else if (res.msg) {
					$.box.msg(res.msg, {
						color: 'warning',
						delay: 2000
					})
				}
			}
		})
	};

	mainDom.on('click', '.cancel', function() {
		var id = $(this).parents('li').data('proid');
		if (id) {
			var boxId = $.box.confirm('确定取消收藏？', function() {
				doDel(id);
				$.box.hide(boxId);
			})
		}
	});



});