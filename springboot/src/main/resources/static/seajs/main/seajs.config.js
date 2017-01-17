/*
* seajs.config.pc
*/
seajs.develop = false;
// 模块根路径
seajs.root = seajs.develop ? '/code' : ''; 
//seajs.root = seajs.develop ? '/code' : 'http://www.sdlhzs.com'; 
// api管理
seajs.api = {
	//检测登录
	checkLog: seajs.develop ? seajs.root + '' : seajs.root + '/system/isLogin',
	//找回密码
	findPassword:seajs.develop ? seajs.root + '' : seajs.root + '/findpassword/repassword'		
};

seajs.config({
	base: seajs.root + "/seajs/modules",
	paths: {
		"js" : seajs.root + "/seajs/main/js",
		"lib": seajs.root + "/seajs/main/lib"
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