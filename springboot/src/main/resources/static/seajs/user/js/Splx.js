/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com=require('./common');
	 require('box');
	//
	require('datepicker');
	$('.datestrs').datepicker({
	  language: 'zh-CN'
	});

    require('datepicker');
	$('.dateends').datepicker({
	  language: 'zh-CN'
	});


	//查看详情
 $('.splx_ckxqbtn').on('click', function() {
    var infoid = $(this).data('infoid');
    console.log(seajs.api.supplierByInfoId)
    $.ajax({
      url: seajs.api.supplierByInfoId,
      type: seajs.develop ? 'get' : 'post',
      data: {
        "infoid": infoid
      },
      dataType: "json",
      success: function(data) {
        if (data.status === "Y") {
          var trHtml = "",
            datalist = data.data;
          $('#splxxqa').find('tbody').empty();
          if (!datalist || datalist.length === 0) {
            trHtml += "<tr><td colspan='100'>没有相关数据</td></tr>";
          } else {
            for (var i = 0; i < datalist.length; i++) {
              trHtml += "<tr>";
              //trHtml += "<td><input type='checkbox' name='checkbox' id='checkbox' value="+data[i].order.orderId+"></td>";
              trHtml += "<tr><td>" + datalist[i].supplierPrice + "</td><td>" + datalist[i].purchaserName + "</td><td><input type='button' class='sb' value='确认此报价'  data-supplierPrice='" + datalist[i].supplierPrice + "' data-purchaserinfoId='" + datalist[i].purchaserinfoId + "'></td></tr>";
              trHtml += "</tr>";
            }
          }
          $('#splxxqa').find('tbody').append(trHtml);

          $.box($('#splxxqa'), {
            width: 1000,
            title: '全部报价'
          });
        };
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $.box.msg("与服务器断开连接，请稍后重试！", {
          delay: 2e3
        });
      }
    });

	
});