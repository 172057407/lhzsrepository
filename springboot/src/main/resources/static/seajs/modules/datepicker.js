/*
 * name: datepicker.js
 * version: v1.0.0
 * update: build
 * date: 2016-06-13
 * base: https://github.com/fengyuanchen/datepicker
 */
define('datepicker', function(require, exports, module) {
  "use strict";
  var t = require('jquery');
  seajs.importStyle(".datepicker-container{font-size:12px;line-height:30px;position:fixed;z-index:-1;top:0;left:0;width:210px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;direction:ltr!important;-ms-touch-action:none;touch-action:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.datepicker-container:after,.datepicker-container:before{position:absolute;display:block;width:0;height:0;content:' ';border:5px solid transparent}.datepicker-dropdown{position:absolute;z-index:1;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;border:1px solid #ccc;-webkit-box-shadow:0 3px 6px #ccc;box-shadow:0 3px 6px #ccc}.datepicker-inline{position:static}.datepicker-top-left,.datepicker-top-right{border-top-color:#39f}.datepicker-top-left:after,.datepicker-top-left:before,.datepicker-top-right:after,.datepicker-top-right:before{top:-5px;left:10px;border-top:0}.datepicker-top-left:before,.datepicker-top-right:before{border-bottom-color:#39f}.datepicker-top-left:after,.datepicker-top-right:after{top:-4px;border-bottom-color:#fff}.datepicker-bottom-left,.datepicker-bottom-right{border-bottom-color:#39f}.datepicker-bottom-left:after,.datepicker-bottom-left:before,.datepicker-bottom-right:after,.datepicker-bottom-right:before{bottom:-5px;left:10px;border-bottom:0}.datepicker-bottom-left:before,.datepicker-bottom-right:before{border-top-color:#39f}.datepicker-bottom-left:after,.datepicker-bottom-right:after{bottom:-4px;border-top-color:#fff}.datepicker-bottom-right:after,.datepicker-bottom-right:before,.datepicker-top-right:after,.datepicker-top-right:before{right:10px;left:auto}.datepicker-panel>ul:after,.datepicker-panel>ul:before{display:table;content:' '}.datepicker-panel>ul:after{clear:both}.datepicker-panel>ul{width:102%;margin:0;padding:0}.datepicker-panel>ul>li{float:left;width:30px;height:30px;margin:0;padding:0;list-style:none;cursor:pointer;text-align:center;background-color:#fff}.datepicker-panel>ul>li:hover{background-color:#eee}.datepicker-panel>ul>li.muted,.datepicker-panel>ul>li.muted:hover{color:#999}.datepicker-panel>ul>li.picked,.datepicker-panel>ul>li.picked:hover{background:#39f;color:#fff;border-radius:50%}.datepicker-panel>ul>li.disabled,.datepicker-panel>ul>li.disabled:hover{cursor:default;color:#ccc;background-color:#fff}.datepicker-panel>ul>li[data-view='years prev'],.datepicker-panel>ul>li[data-view='year prev'],.datepicker-panel>ul>li[data-view='month prev'],.datepicker-panel>ul>li[data-view='years next'],.datepicker-panel>ul>li[data-view='year next'],.datepicker-panel>ul>li[data-view='month next'],.datepicker-panel>ul>li[data-view=next]{font-size:18px}.datepicker-panel>ul>li[data-view='month current'],.datepicker-panel>ul>li[data-view='years current'],.datepicker-panel>ul>li[data-view='year current']{width:150px}.datepicker-panel>ul[data-view=years]>li,.datepicker-panel>ul[data-view=months]>li{line-height:52.5px;width:52.5px;height:52.5px}.datepicker-panel>ul[data-view=week]>li,.datepicker-panel>ul[data-view=week]>li:hover{cursor:default;background-color:#fff}.datepicker-hide{display:none}", module.uri);

  function e(t){return j.call(t).slice(8,-1).toLowerCase()}function i(t){return"string"==typeof t}function s(t){return"number"==typeof t&&!isNaN(t)}function a(t){return"undefined"==typeof t}function n(t){return"date"===e(t)}function r(t,e){var i=[];return Array.from?Array.from(t).slice(e||0):(s(e)&&i.push(e),i.slice.apply(t,i))}function h(t,e){var i=r(arguments,2);return function(){return t.apply(e,i.concat(r(arguments)))}}function o(t){return t%4===0&&t%100!==0||t%400===0}function l(t,e){return[31,o(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function d(t){var e,i,s=String(t).toLowerCase(),a=s.match(x);if(!a||0===a.length)throw new Error("Invalid date format.");for(t={source:s,parts:a},e=a.length,i=0;e>i;i++)switch(a[i]){case"dd":case"d":t.hasDay=!0;break;case"mm":case"m":t.hasMonth=!0;break;case"yyyy":case"yy":t.hasYear=!0}return t}function u(e,i){i=t.isPlainObject(i)?i:{},i.language&&(i=t.extend({},u.LANGUAGES[i.language],i)),this.$element=t(e),this.options=t.extend({},u.DEFAULTS,i),this.isBuilt=!1,this.isShown=!1,this.isInput=!1,this.isInline=!1,this.initialValue="",this.initialDate=null,this.startDate=null,this.endDate=null,this.init()}var c=t(window),f=window.document,p=t(f),w=window.Number,m="datepicker",y="click."+m,g="keyup."+m,v="focus."+m,D="resize."+m,k="show."+m,b="hide."+m,$="pick."+m,x=/(y|m|d)+/g,C=/\d+/g,F=/^\d{2,4}$/,S=m+"-inline",M=m+"-dropdown",I=m+"-top-left",V=m+"-top-right",T=m+"-bottom-left",Y=m+"-bottom-right",A=[I,V,T,Y].join(" "),N=m+"-hide",P=Math.min,j=Object.prototype.toString;u.prototype={constructor:u,init:function(){var e=this.options,i=this.$element,s=e.startDate,a=e.endDate,n=e.date;this.$trigger=t(e.trigger||i),this.isInput=i.is("input")||i.is("textarea"),this.isInline=e.inline&&(e.container||!this.isInput),this.format=d(e.format),this.initialValue=this.getValue(),n=this.parseDate(n||this.initialValue),s&&(s=this.parseDate(s),n.getTime()<s.getTime()&&(n=new Date(s)),this.startDate=s),a&&(a=this.parseDate(a),s&&a.getTime()<s.getTime()&&(a=new Date(s)),n.getTime()>a.getTime()&&(n=new Date(a)),this.endDate=a),this.date=n,this.viewDate=new Date(n),this.initialDate=new Date(this.date),this.bind(),(e.autoshow||this.isInline)&&this.show(),e.autopick&&this.pick()},build:function(){var e,i=this.options,s=this.$element;this.isBuilt||(this.isBuilt=!0,this.$picker=e=t(i.template),this.$week=e.find('[data-view="week"]'),this.$yearsPicker=e.find('[data-view="years picker"]'),this.$yearsPrev=e.find('[data-view="years prev"]'),this.$yearsNext=e.find('[data-view="years next"]'),this.$yearsCurrent=e.find('[data-view="years current"]'),this.$years=e.find('[data-view="years"]'),this.$monthsPicker=e.find('[data-view="months picker"]'),this.$yearPrev=e.find('[data-view="year prev"]'),this.$yearNext=e.find('[data-view="year next"]'),this.$yearCurrent=e.find('[data-view="year current"]'),this.$months=e.find('[data-view="months"]'),this.$daysPicker=e.find('[data-view="days picker"]'),this.$monthPrev=e.find('[data-view="month prev"]'),this.$monthNext=e.find('[data-view="month next"]'),this.$monthCurrent=e.find('[data-view="month current"]'),this.$days=e.find('[data-view="days"]'),this.isInline?t(i.container||s).append(e.addClass(S)):(t(f.body).append(e.addClass(M)),e.addClass(N)),this.fillWeek())},unbuild:function(){this.isBuilt&&(this.isBuilt=!1,this.$picker.remove())},bind:function(){var e=this.options,i=this.$element;t.isFunction(e.show)&&i.on(k,e.show),t.isFunction(e.hide)&&i.on(b,e.hide),t.isFunction(e.pick)&&i.on($,e.pick),this.isInput&&(i.on(g,t.proxy(this.keyup,this)),e.trigger||i.on(v,t.proxy(this.show,this))),this.$trigger.on(y,t.proxy(this.show,this))},unbind:function(){var e=this.options,i=this.$element;t.isFunction(e.show)&&i.off(k,e.show),t.isFunction(e.hide)&&i.off(b,e.hide),t.isFunction(e.pick)&&i.off($,e.pick),this.isInput&&(i.off(g,this.keyup),e.trigger||i.off(v,this.show)),this.$trigger.off(y,this.show)},showView:function(t){var e=this.$yearsPicker,i=this.$monthsPicker,s=this.$daysPicker,a=this.format;if(a.hasYear||a.hasMonth||a.hasDay)switch(w(t)){case 2:case"years":i.addClass(N),s.addClass(N),a.hasYear?(this.fillYears(),e.removeClass(N)):this.showView(0);break;case 1:case"months":e.addClass(N),s.addClass(N),a.hasMonth?(this.fillMonths(),i.removeClass(N)):this.showView(2);break;default:e.addClass(N),i.addClass(N),a.hasDay?(this.fillDays(),s.removeClass(N)):this.showView(1)}},hideView:function(){this.options.autohide&&this.hide()},place:function(){var t=this.options,e=this.$element,i=this.$picker,s=p.outerWidth(),a=p.outerHeight(),n=e.outerWidth(),r=e.outerHeight(),h=i.width(),o=i.height(),l=e.offset(),d=l.left,u=l.top,c=parseFloat(t.offset)||10,f=I;u>o&&u+r+o>a?(u-=o+c,f=T):u+=r+c,d+h>s&&(d=d+n-h,f=f.replace("left","right")),i.removeClass(A).addClass(f).css({top:u,left:d,zIndex:parseInt(t.zIndex,10)})},trigger:function(e,i){var s=t.Event(e,i);return this.$element.trigger(s),s},createItem:function(e){var i=this.options,s=i.itemTag,a={text:"",view:"",muted:!1,picked:!1,disabled:!1};return t.extend(a,e),"<"+s+" "+(a.disabled?'class="'+i.disabledClass+'"':a.picked?'class="'+i.pickedClass+'"':a.muted?'class="'+i.mutedClass+'"':"")+(a.view?' data-view="'+a.view+'"':"")+">"+a.text+"</"+s+">"},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillWeek:function(){var e,i=this.options,s=parseInt(i.weekStart,10)%7,a=i.daysMin,n="";for(a=t.merge(a.slice(s),a.slice(0,s)),e=0;6>=e;e++)n+=this.createItem({text:a[e]});this.$week.html(n)},fillYears:function(){var e,i=this.options,s=i.disabledClass||"",a=i.yearSuffix||"",n=t.isFunction(i.filter)&&i.filter,r=this.startDate,h=this.endDate,o=this.viewDate,l=o.getFullYear(),d=o.getMonth(),u=o.getDate(),c=this.date,f=c.getFullYear(),p=!1,w=!1,m=!1,y=!1,g=!1,v="",D=-5,k=6;for(e=D;k>=e;e++)c=new Date(l+e,d,u),g=e===D||e===k,y=l+e===f,m=!1,r&&(m=c.getFullYear()<r.getFullYear(),e===D&&(p=m)),!m&&h&&(m=c.getFullYear()>h.getFullYear(),e===k&&(w=m)),!m&&n&&(m=n.call(this.$element,c)===!1),v+=this.createItem({text:l+e,view:m?"year disabled":y?"year picked":"year",muted:g,picked:y,disabled:m});this.$yearsPrev.toggleClass(s,p),this.$yearsNext.toggleClass(s,w),this.$yearsCurrent.toggleClass(s,!0).html(l+D+a+" - "+(l+k)+a),this.$years.html(v)},fillMonths:function(){var e,i=this.options,s=i.disabledClass||"",a=i.monthsShort,n=t.isFunction(i.filter)&&i.filter,r=this.startDate,h=this.endDate,o=this.viewDate,l=o.getFullYear(),d=o.getDate(),u=this.date,c=u.getFullYear(),f=u.getMonth(),p=!1,w=!1,m=!1,y=!1,g="";for(e=0;11>=e;e++)u=new Date(l,e,d),y=l===c&&e===f,m=!1,r&&(p=u.getFullYear()===r.getFullYear(),m=p&&u.getMonth()<r.getMonth()),!m&&h&&(w=u.getFullYear()===h.getFullYear(),m=w&&u.getMonth()>h.getMonth()),!m&&n&&(m=n.call(this.$element,u)===!1),g+=this.createItem({index:e,text:a[e],view:m?"month disabled":y?"month picked":"month",picked:y,disabled:m});this.$yearPrev.toggleClass(s,p),this.$yearNext.toggleClass(s,w),this.$yearCurrent.toggleClass(s,p&&w).html(l+i.yearSuffix||""),this.$months.html(g)},fillDays:function(){var e,i,s,a=this.options,n=a.disabledClass||"",r=a.yearSuffix||"",h=a.monthsShort,o=parseInt(a.weekStart,10)%7,d=t.isFunction(a.filter)&&a.filter,u=this.startDate,c=this.endDate,f=this.viewDate,p=f.getFullYear(),w=f.getMonth(),m=p,y=w,g=p,v=w,D=this.date,k=D.getFullYear(),b=D.getMonth(),$=D.getDate(),x=!1,C=!1,F=!1,S=!1,M=[],I=[],V=[],T=42;for(0===w?(m-=1,y=11):y-=1,e=l(m,y),D=new Date(p,w,1),s=D.getDay()-o,0>=s&&(s+=7),u&&(x=D.getTime()<=u.getTime()),i=e-(s-1);e>=i;i++)D=new Date(m,y,i),F=!1,u&&(F=D.getTime()<u.getTime()),!F&&d&&(F=d.call(this.$element,D)===!1),M.push(this.createItem({text:i,view:"day prev",muted:!0,disabled:F}));for(11===w?(g+=1,v=0):v+=1,e=l(p,w),s=T-(M.length+e),D=new Date(p,w,e),c&&(C=D.getTime()>=c.getTime()),i=1;s>=i;i++)D=new Date(g,v,i),F=!1,c&&(F=D.getTime()>c.getTime()),!F&&d&&(F=d.call(this.$element,D)===!1),I.push(this.createItem({text:i,view:"day next",muted:!0,disabled:F}));for(i=1;e>=i;i++)D=new Date(p,w,i),S=p===k&&w===b&&i===$,F=!1,u&&(F=D.getTime()<u.getTime()),!F&&c&&(F=D.getTime()>c.getTime()),!F&&d&&(F=d.call(this.$element,D)===!1),V.push(this.createItem({text:i,view:F?"day disabled":S?"day picked":"day",picked:S,disabled:F}));this.$monthPrev.toggleClass(n,x),this.$monthNext.toggleClass(n,C),this.$monthCurrent.toggleClass(n,x&&C).html(a.yearFirst?p+r+" "+h[w]:h[w]+" "+p+r),this.$days.html(M.join("")+V.join(" ")+I.join(""))},click:function(e){var i,s,a,n,r,h,o=t(e.target),l=this.viewDate;if(e.stopPropagation(),e.preventDefault(),!o.hasClass("disabled"))switch(i=l.getFullYear(),s=l.getMonth(),a=l.getDate(),h=o.data("view")){case"years prev":case"years next":i="years prev"===h?i-10:i+10,r=o.text(),n=F.test(r),n&&(i=parseInt(r,10),this.date=new Date(i,s,P(a,28))),this.viewDate=new Date(i,s,P(a,28)),this.fillYears(),n&&(this.showView(1),this.pick("year"));break;case"year prev":case"year next":i="year prev"===h?i-1:i+1,this.viewDate=new Date(i,s,P(a,28)),this.fillMonths();break;case"year current":this.format.hasYear&&this.showView(2);break;case"year picked":this.format.hasMonth?this.showView(1):this.hideView();break;case"year":i=parseInt(o.text(),10),this.date=new Date(i,s,P(a,28)),this.viewDate=new Date(i,s,P(a,28)),this.format.hasMonth?this.showView(1):this.hideView(),this.pick("year");break;case"month prev":case"month next":s="month prev"===h?s-1:"month next"===h?s+1:s,this.viewDate=new Date(i,s,P(a,28)),this.fillDays();break;case"month current":this.format.hasMonth&&this.showView(1);break;case"month picked":this.format.hasDay?this.showView(0):this.hideView();break;case"month":s=t.inArray(o.text(),this.options.monthsShort),this.date=new Date(i,s,P(a,28)),this.viewDate=new Date(i,s,P(a,28)),this.format.hasDay?this.showView(0):this.hideView(),this.pick("month");break;case"day prev":case"day next":case"day":s="day prev"===h?s-1:"day next"===h?s+1:s,a=parseInt(o.text(),10),this.date=new Date(i,s,a),this.viewDate=new Date(i,s,a),this.fillDays(),"day"===h&&this.hideView(),this.pick("day");break;case"day picked":this.hideView(),this.pick("day")}},clickDoc:function(t){for(var e,i=t.target,s=this.$trigger[0];i!==f;){if(i===s){e=!0;break}i=i.parentNode}e||this.hide()},keyup:function(){this.update()},getValue:function(){var t=this.$element,e="";return this.isInput?e=t.val():this.isInline?this.options.container&&(e=t.text()):e=t.text(),e},setValue:function(t){var e=this.$element;t=i(t)?t:"",this.isInput?e.val(t):this.isInline?this.options.container&&e.text(t):e.text(t)},show:function(){this.isBuilt||this.build(),this.isShown||this.trigger(k).isDefaultPrevented()||(this.isShown=!0,this.$picker.removeClass(N).on(y,t.proxy(this.click,this)),this.showView(this.options.startView),this.isInline||(c.on(D,this._place=h(this.place,this)),p.on(y,this._clickDoc=h(this.clickDoc,this)),this.place()))},hide:function(){this.isShown&&(this.trigger(b).isDefaultPrevented()||(this.isShown=!1,this.$picker.addClass(N).off(y,this.click),this.isInline||(c.off(D,this._place),p.off(y,this._clickDoc))))},update:function(){this.setDate(this.getValue(),!0)},pick:function(t){var e=this.$element,i=this.date;this.trigger($,{view:t||"",date:i}).isDefaultPrevented()||(this.setValue(i=this.formatDate(this.date)),this.isInput&&e.trigger("change"))},reset:function(){this.setDate(this.initialDate,!0),this.setValue(this.initialValue),this.isShown&&this.showView(this.options.startView)},getMonthName:function(e,i){var n=this.options,r=n.months;return t.isNumeric(e)?e=w(e):a(i)&&(i=e),i===!0&&(r=n.monthsShort),r[s(e)?e:this.date.getMonth()]},getDayName:function(e,i,n){var r=this.options,h=r.days;return t.isNumeric(e)?e=w(e):(a(n)&&(n=i),a(i)&&(i=e)),h=n===!0?r.daysMin:i===!0?r.daysShort:h,h[s(e)?e:this.date.getDay()]},getDate:function(t){var e=this.date;return t?this.formatDate(e):new Date(e)},setDate:function(e,s){var a=this.options.filter;if(n(e)||i(e)){if(e=this.parseDate(e),t.isFunction(a)&&a.call(this.$element,e)===!1)return;this.date=e,this.viewDate=new Date(e),s||this.pick(),this.isBuilt&&this.fillAll()}},setStartDate:function(t){(n(t)||i(t))&&(this.startDate=this.parseDate(t),this.isBuilt&&this.fillAll())},setEndDate:function(t){(n(t)||i(t))&&(this.endDate=this.parseDate(t),this.isBuilt&&this.fillAll())},parseDate:function(t){var e,s,a,r,h,o,l=this.format,d=[];if(n(t))return new Date(t.getFullYear(),t.getMonth(),t.getDate());if(i(t)&&(d=t.match(C)||[]),t=new Date,s=t.getFullYear(),a=t.getDate(),r=t.getMonth(),e=l.parts.length,d.length===e)for(o=0;e>o;o++)switch(h=parseInt(d[o],10)||1,l.parts[o]){case"dd":case"d":a=h;break;case"mm":case"m":r=h-1;break;case"yy":s=2e3+h;break;case"yyyy":s=h}return new Date(s,r,a)},formatDate:function(t){var e,i,s,a,r,h=this.format,o="";if(n(t))for(o=h.source,i=t.getFullYear(),a={d:t.getDate(),m:t.getMonth()+1,yy:i.toString().substring(2),yyyy:i},a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,e=h.parts.length,r=0;e>r;r++)s=h.parts[r],o=o.replace(s,a[s]);return o},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(m)}},u.LANGUAGES={},u.DEFAULTS={autoshow:!1,autohide:!1,autopick:!1,inline:!1,container:null,trigger:null,language:"",format:"mm/dd/yyyy",date:null,startDate:null,endDate:null,startView:0,weekStart:0,yearFirst:!1,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",mutedClass:"muted",pickedClass:"picked",disabledClass:"disabled",template:'<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',offset:10,zIndex:1e3,filter:null,show:null,hide:null,pick:null},u.setDefaults=function(e){t.extend(u.DEFAULTS,t.isPlainObject(e)&&e)},u.other=t.fn.datepicker,t.fn.datepicker=function(e){var s,n=r(arguments,1);return this.each(function(){var a,r,h=t(this),o=h.data(m);if(!o){if(/destroy/.test(e))return;a=t.extend({},h.data(),t.isPlainObject(e)&&e),h.data(m,o=new u(this,a))}i(e)&&t.isFunction(r=o[e])&&(s=r.apply(o,n))}),a(s)?this:s},t.fn.datepicker.Constructor=u,t.fn.datepicker.languages=u.LANGUAGES,t.fn.datepicker.setDefaults=u.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=u.other,this}

  t.fn.datepicker.languages['zh-CN'] = {
    format: 'yyyy-mm-dd',
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekStart: 1,
    yearFirst: true,
    yearSuffix: '年'
  };
});