/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var com=require('./common');
	require('validform');
	require('box');
	//
	  //信息表单
	  $('#form1').Validform({
	    tiptype: 3, //1：弹出；其他：输入框后插入
	    ajaxPost: true,
	    url: seajs.root + '/supplierinfo/sava',
	    callback: function(res) {
	    	if(res.status === 'y'){
				window.location.reload();
			}else if(res.msg){
				$.box.msg(res.msg,{
					color:'warning',
					delay:2000
				})
			}
	    }
	  });
//js
	  var pageCallBack = function(data){
		  var trHtml = "",
	      datalist = data;
        $('#ckxq').find('tbody').empty();
        if (!datalist || datalist.length === 0) {
          trHtml += "<tr><td colspan='100'>没有相关数据</td></tr>";
        } else {
          for (var i = 0; i < datalist.length; i++) {
          	trHtml += "<tr>";
          	if(datalist[i].status==1){
  				   trHtml += "<tr><td>"+ datalist[i].goodsName +"</td><td>"+ datalist[i].purchaserName +"</td><td><span>已确认</span></td></tr>";
  				}else{
  		           trHtml += "<tr><td>" + datalist[i].buyCount + "</td><td>" + datalist[i].purchaserName + "</td><td><input type='button' class='sb' value='确认此报价'  data-supplyOrderId='" + datalist[i].supplyOrderId +"'></td></tr>";
  				}
            trHtml += "</tr>";
          }
        }
        $('#ckxq').find('tbody').append(trHtml);
	  }
    $('.boxgongyingxx').on('click',function(){
      $.box( $('.gongyinginfo'),{
        width: 900,     
        height:500 ,
        title:'供应信息发布'
       });
    })
	
	var datepicker=require('My97DatePicker');
	  $('#birthdaystr').on('click',function(){
	     datepicker();
	  });
	
	$('.boxqgxx').on('click',function(){
      $.box( $('.gyxx'),{
        width: 600,     
        height:400 ,
        title:'全部报价'
       });
    })
   
    //查看详情
  $('.ckxq_btn').on('click', function() {
    var infoid = $(this).data('infoid');
    $.ajax({
      url: seajs.api.purchaserByinfoid,
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
    //确认报价
    $('#ckxq').on('click', '.sb', function() {
    	
      var _supplyOrderId = $(this).data('supplyorderid');
      $.ajax({
        type: seajs.develop ? 'get' : 'post',
        url: seajs.api.updateStatus,
        data: {
        	supplyOrderId: _supplyOrderId,
            status: 1,
        },
        success: function(data) {
          if (data.status = 'y') {
        	  pageCallBack(data);
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