/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com = require('./common');
	//
	require('box');
	var etpl = require('etpl');
	var addressListRender = etpl.compile($('#addressListTemp').val());
	var addressList = $('#addressList');
	//加载地址列表
	var init = function() {
		var loading = $.box.msg('加载中...');
		$.ajax({
			url: seajs.api.getAddr,
			dataType: 'json',
			success: function(res) {
				if (res.status === 'y') {
					var _addr = addressListRender(res);
					addressList.html(_addr);
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
		$('#addressForm').find('#idinput').val('')
			.end().get(0).reset();
		initCitys()
	};

	//添加地址验证
	require('validform');
	var loginForm = $('#addressForm').Validform({
		tiptype: 2,
		ajaxPost: true,
		type: seajs.develop ? 'get' : 'post',
		url: seajs.api.saveAddr,
		beforeSubmit: function() {
			if (!$.trim($('#mobileinput').val()) && !$.trim($('#telinput').val())) {
				$.box.msg('手机号和固定电话至少填写一项！', {
					color: 'warning',
					delay: 2000
				});
				return false;
			}
			
		},
		callback: function(res) {
			if (res.status === 'y') {
				$.box.msg('添加成功', {
					delay: 2000,
					onclose: function() {
						init();
					}
				})
			} else if (res.msg) {
				$.box.msg(res.msg, {
					color: 'warning',
					delay: 2000
				})
			}
		}
	});
	$('#isdefault').on('click',function(){
		if($('#isdefault').attr('checked')){
			$('#isdefault').val(1);
		}else{
			$('#isdefault').val(0);
		}
	});
	//事件绑定
	addressList.on('click', '._del', function(e) {
		e.preventDefault();
		var id = $(this).data('id'),
			boxId,
			loading;
		if (id) {
			boxId = $.box.confirm('确定删除吗？', function() {
				$.box.hide(boxId);
				loading = $.box.msg('操作中...');
				$.ajax({
					url: seajs.api.delAddress,
					type: seajs.develop ? 'get' : 'post',
					data: {
						addressId: id
					},
					success: function(res) {
						if (res.status === 'y') {
							$.box.msg('删除成功！', {
								delay: 1000,
								onclose: function() {
									init();
								}
							})
						} else if (res.msg) {
							$.box.msg(res.msg, {
								color: warning,
								delay: 2000
							})
						}
					}
				}).always(function() {
					$.box.hide(loading)
				});
			})
		}
	}).on('click', '._edit', function(e) {
		e.preventDefault();
		var oAddr,
			loading,
			oDom = $(this).parents('tr');
		if (oDom.data('id')) {
			oAddr = {
				name: oDom.find('._name').text(),
				id: oDom.data('id'),
				province: oDom.find('._province').text(),
				city: oDom.find('._city').text(),
				area: oDom.find('._area').text(),
				address: oDom.find('._address').text(),
				mobile: oDom.find('._mobile').text(),
				telphone: oDom.find('._telphone').text(),
				zip: oDom.find('._zip').text(),
				default: oDom.hasClass('isDefault')
			};
			$.each(oAddr, function(k, v) {
				if (v.split) {
					oAddr[k] = $.trim(v)
				}
			});
			$('#addressForm').find('#idinput').val(oAddr.id)
				.end().find('#nameinput').val(oAddr.name)
				.end().find('#addressinput').val(oAddr.address)
				.end().find('#isdefault').prop('checked', oAddr.default)
				.end().find('#mobileinput').val(oAddr.mobile)
				.end().find('#telinput').val(oAddr.telphone)
				.end().find('#zipinput').val(oAddr.zip)
				.end().find('#province option').each(function(i, e) {
					if ($(e).text() === oAddr.province) {
						$(e).prop('selected', true).parent().trigger('change');
						return false;
					}
				})
				.end().find('#city option').each(function(i, e) {
					if ($(e).text() === oAddr.city) {
						$(e).prop('selected', true).parent().trigger('change');
						return false;
					}
				})
				.end().find('#area option').each(function(i, e) {

					if ($(e).text() === oAddr.area) {
						$(e).prop('selected', true);
						return false;
					}
				});
		}
	}).on('click', '._default', function(e) {
		e.preventDefault();
		var id = $(this).data('id'),
			loading;
		if ($(this).data('id')) {
			loading = $.box.msg('操作中...');
			$.ajax({
				url: seajs.api.editDefault,
				type: seajs.develop ? 'get' : 'post',
				data: {
					id: id
				},
				success: function(res) {
					if (res.status === 'y') {
						$.box.msg('设置成功！', {
							delay: 1000,
							onclose: function() {
								init();
							}
						})
					} else if (res.msg) {
						$.box.msg(res.msg, {
							color: warning,
							delay: 2000
						})
					}
				}
			}).always(function() {
				$.box.hide(loading)
			});
		}
	});

	//省市区级联
	var getCitys = function(cb) {
		if (window.localStorage && localStorage.citiesData) {
			typeof(cb) === 'function' && cb($.parseJSON(localStorage.citiesData))
		} else {
			$.ajax({
				url: seajs.api.getCitys,
				dataType: 'html'
			}).always(function(res) {
				if (typeof($.parseJSON(res)) === 'object') {
					if (window.localStorage) {
						localStorage.setItem('citiesData', res);
					};
					typeof(cb) === 'function' && cb($.parseJSON(res))
				} else {
					$.box.msg('城市数据获取失败', {
						color: 'danger',
						delay: 2000
					})
				}
			})
		}
	};

	var initCitys = function() {
		getCitys(function(res) {
			var datas = res,
				provinceDOM = '<option>请选择省份</option>',
				cityDOM = '<option>请选择城市</option>',
				areaDOM = '<option>请选择地区</option>',
				$province = $('#province'),
				$city = $('#city'),
				$area = $('#area'),
				cityData,
				areaData;

			$.each(datas, function(i, e) {
				provinceDOM += ('<option value="' + e.name + '" data-index="' + i +'">' + e.name + '</option>')
			});
			$province.html(provinceDOM).on('change', function() {
				var _index = $(this).find('option:selected').data('index');
				cityData = datas[_index].city;
				cityDOM = '<option>请选择城市</option>';
				$area.empty();
				$.each(cityData, function(i, e) {
					cityDOM += ('<option value="' + e.name + '" data-index="' + i +'">' + e.name + '</option>')
				});
				$city.html(cityDOM).on('change', function() {
					var _index = $(this).find('option:selected').data('index');
					areaData = cityData[_index].area;
					areaDOM = '<option>请选择地区</option>';
					$.each(areaData, function(i, e) {
						areaDOM += ('<option value="' + e.name + '" data-index="' + i +'">' + e.name + '</option>')
					});
					$area.html(areaDOM)
				})
			});
		});
	};

	initCitys();
	init();

});