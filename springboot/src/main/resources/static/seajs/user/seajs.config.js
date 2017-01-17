/*
* seajs.config.pc
*/
seajs.develop = false;
// 模块根路径
seajs.root = seajs.develop ? '/code' : '/lhzsmp'; 
//seajs.root = seajs.develop ? '/code' : 'http://www.sdlhzs.com'; 
// api管理
seajs.api = {
	//设置默认地址
	editDefault:seajs.develop ? seajs.root + '' : seajs.root + '/user/editdefault',
	//添加/修改收货地址（参数有id为修改，无id为添加）
	saveAddr: seajs.develop ? seajs.root + '' : seajs.root + '/user/savaAddress',
	//获取收货地址
	getAddr: seajs.develop ? seajs.root + '' : seajs.root + '/user/init',
	//删除收货地址
	delAddress: seajs.develop ? seajs.root + '' : seajs.root + '/user/deladdressId',
	//获取省
	getProvince: seajs.develop ? seajs.root + '' : seajs.root + '/companyinfo/init',
	//获取市
	getCitys: seajs.develop ? seajs.root + '' : seajs.root + '/companyinfo/init',
	//获取区
	getDistricts: seajs.develop ? seajs.root + '' : seajs.root + '/companyinfo/initDistricts',
	//快速下单提交
	submitQuickOrder: seajs.develop ? seajs.root + '' : seajs.root + '/user/submitquickorder',	
	//快速下单删除
	delQuickOrder:seajs.develop ? seajs.root + '' : seajs.root + '/quickorder/delquickorder',
	//取消收藏		
	delCollection:seajs.develop ? seajs.root + '' : seajs.root + '/user/collection/del',
	//求购信息查询报价信息
	supplierByInfoId:seajs.develop ? seajs.root + '' : seajs.root + '/supplierprice/findbyinfoid',
	//确认报价		
	updatePrice:seajs.develop ? seajs.root + '' : seajs.root + '/purchaseinfo/update',
	//供应信息查询报价信息
	purchaserByinfoid:seajs.develop ? seajs.root + '' : seajs.root + '/supplyorder/findbyinfoid',
	//更新供应商品的报价信息状态
	updateStatus:seajs.develop ? seajs.root + '' : seajs.root + '/supplyorder/updatestatus',
	//订单查询
	findbydataReception : seajs.develop ? seajs.root + '/test/findbydataReception.json' : seajs.root + '/user/findbydataReception',
	//查询订单审核状态
	findbypurchaserAndstatus :seajs.develop ? seajs.root + '' : seajs.root + '/user/findbypurchaserAndstatus',
	//公司信息初始化
	initCompanyinfo:seajs.develop ? seajs.root + '' : seajs.root + '/user/initcompany',
	//保存公司信息
	savacompanyInformation:seajs.develop ? seajs.root + '' : seajs.root + '/user/savacompanyInformation',
	//获取采购计划详情
	purchasingplanDetail:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplan/findall',		
	//查看报价信息
	lookPrice:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplanprice/findbypurchasingprice',
	//确认报价
	confirmPrice:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplanprice/updatestatus',
	//上传文件
	uploadFile:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplan/uploadfile'	,
	//查询商品信息		
	findallgood:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplan/findallgood',
	//报价
	savePrice:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplanprice/save',		
	//搜索商品
	searchGoods:seajs.develop ? seajs.root + '' : seajs.root + '/system/admin/purchasingplan/searchgood',		
};

seajs.config({
	base: seajs.root + "/static/temp/modules",
	paths: {
		"js" : seajs.root + "/static/temp/user/js",
		"lib": seajs.root + "/static/temp/user/lib"
	},
	alias: {
		"audio"		     : "audio/audio",
		"copy"		     : "copy/ZeroClipboard",
		"flv"		     : "flv/flv",
		"hook"	 	     : "hook/hook",
		"jquery" 	     : "jquery/1/jquery.js",
		"validform"      : "validform/validform",
		"My97DatePicker" : "My97DatePicker/WdatePicker",
		"raty"		     : "raty/raty",
		"upload"         : "upload/upload",
		"makethumb"      : "upload/makethumb",
		"localResizeIMG" : "upload/localResizeIMG",
		"video"		     : "video/video",
		"webuploader"    : "webuploader/webuploader",
		// localstorage缓存
		"seajs-localcache" : "seajs/seajs-localcache",
		// debug
		"seajs-debug" : "seajs/seajs-debug"
	},
	preload:['manifest','seajs-localcache'],
    localcache:{
        timeout: 30000
    },
    comboExcludes: /jquery\.js/ 	// 从 combo 中排除掉 jquery.js 
});