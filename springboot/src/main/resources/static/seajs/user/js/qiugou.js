/**
 * blank
 */
define(function(require) {
  var $ = require('jquery');
  var com = require('./common');
  require('box');
  require('validform');
  var datepicker = require('My97DatePicker');

  //信息表单
  $('#form1').Validform({
    tiptype: 3, //1：弹出；其他：输入框后插入
    ajaxPost: true,
    url: seajs.root + '/purchaseinfo/sava',
    callback: function(res) {
    	if(res.status==='y'){
				window.location.reload();
		}else if(res.msg){
			$.box.msg(res.msg,{
				color:'warning',
				delay:2000
			})
		}
    }
  });

  function detail(purchaseinfoId){
	  alert(purchaseinfoId);
  }
  
  $('.boxqiugouzenjia').on('click', function() {
    $.box($('.qiugouinfo'), {
      width: 900,
      title: '求购信息发布'
    });
  })
    //查看详情
  $('.ckxq_btn').on('click', function() {
    var infoid = $(this).data('infoid');
    $.ajax({
      url: seajs.api.supplierByInfoId,
      type: seajs.develop ? 'get' : 'post',
      data: {
        "infoid": infoid
      },
      dataType: "json",
      success: function(data) {
        if (data.status === "y") {
        	pageCallBack(data);

          $.box($('#ckxq'), {
            width: 400,
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
  
  var pageCallBack = function(data){
	 
	  var trHtml = "",
      datalist = data.datas;
	 console.log(datalist);
    $('#ckxq').find('tbody').empty();
    if (!datalist || datalist.length === 0) {
      trHtml += "<tr><td colspan='100'>没有相关数据</td></tr>";
    } else {
      for (var i = 0; i < datalist.length; i++) {
      	trHtml += "<tr>";
      	if(datalist[i].status==1){
				   trHtml += "<tr><td>"+ datalist[i].supplierPrice +"</td><td>"+ datalist[i].purchaserName +"</td><td><span>已确认</span></td></tr>";

				}else{
		           trHtml += "<tr><td>" + datalist[i].supplierPrice + "</td><td>" + datalist[i].purchaserName + "</td><td><input type='button' class='sb' value='确认此报价'  data-purchaserinfoId='" + datalist[i].purchaserinfoId +"'   data-supplierPrice='" + datalist[i].supplierPrice +"'></td></tr>";
				}
        trHtml += "</tr>";
      }
    }
    $('#ckxq').find('tbody').append(trHtml);
  }


  $('#birthdaystr').on('click', function() {
    datepicker();
  });


  //查看详情
  $('.boxckxq').on('click', function() {
    var infoid = $(this).data('infoid');
    //console.log(seajs.api.supplierByInfoId)
    $.ajax({
      url: seajs.api.supplierByInfoId,
      type: seajs.develop ? 'get' : 'post',
      data: {
        "infoid": infoid
      },
      dataType: "json",
      success: function(data) {
    	  console.log(data);
        if (data.status === "y") {
          var trHtml = "",
            datalist = data.datas;
          $('#ckxq').find('tbody').empty();
          if (!datalist || datalist.length === 0) {
            trHtml += "<tr><td colspan='100'>没有相关数据</td></tr>";
          } else {
            for (var i = 0; i < datalist.length; i++) {
            	console.log(datalist[i]);
              trHtml += "<tr>";
              //trHtml += "<td><input type='checkbox' name='checkbox' id='checkbox' value="+data[i].order.orderId+"></td>";
              trHtml += "<tr><td>" +  + "</td><td>" + datalist[i].purchaserName + "</td><td><input type='button' class='sb' value='确认此报价'  data-supplierPrice='" + datalist[i].supplierPrice + "' data-purchaserinfoId='" + datalist[i].purchaserinfoId + "'></td></tr>";
              trHtml += "</tr>";
            }
          }
          $('#ckxq').find('tbody').append(trHtml);

          $.box($('#ckxq'), {
            width: 400,
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
  
  //确认报价
  $('#ckxq').on('click', '.sb', function() {
  
    var _supplierPrice = $(this).data('supplierprice');
     var _purchaserinfoId = $(this).data('purchaserinfoid');
     alert(_supplierPrice+"    "+_purchaserinfoId);
    $.ajax({
      type: seajs.develop ? 'get' : 'post',
      url: seajs.api.updatePrice,
      data: {
        purchaserinfoId: _purchaserinfoId,
        status: 1,
        price: _supplierPrice
      },
      success: function(data) {
        if (data.status = 'y') {
          window.location.reload();
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $.box.msg("与服务器断开连接，请稍后重试！", {
          delay: 2e3
        });
      }
    });

  });

});