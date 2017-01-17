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
		url: '/test/ajax.php',		
		callback: function(res) {

		}
	});



});