!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Clip=e():t.Clip=e()}(self,(function(){return(()=>{var t={757:(t,e,n)=>{t.exports=n(666)},666:t=>{var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,n){return t[e]=n}}function c(t,e,n,r){var i=e&&e.prototype instanceof v?e:v,a=Object.create(i.prototype),o=new j(r||[]);return a._invoke=function(t,e,n){var r=f;return function(i,a){if(r===u)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw a;return C()}for(n.method=i,n.arg=a;;){var o=n.delegate;if(o){var s=z(o,n);if(s){if(s===b)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=u;var d=l(t,e,n);if("normal"===d.type){if(r=n.done?h:p,d.arg===b)continue;return{value:d.arg,done:n.done}}"throw"===d.type&&(r=h,n.method="throw",n.arg=d.arg)}}}(t,n,o),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var f="suspendedStart",p="suspendedYield",u="executing",h="completed",b={};function v(){}function m(){}function g(){}var y={};y[a]=function(){return this};var w=Object.getPrototypeOf,_=w&&w(w(T([])));_&&_!==n&&r.call(_,a)&&(y=_);var x=g.prototype=v.prototype=Object.create(y);function I(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(i,a,o,s){var d=l(t[i],t,a);if("throw"!==d.type){var c=d.arg,f=c.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(f).then((function(t){c.value=t,o(c)}),(function(t){return n("throw",t,o,s)}))}s(d.arg)}var i;this._invoke=function(t,r){function a(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(a,a):a()}}function z(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,z(t,n),"throw"===n.method))return b;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return b}var i=l(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,b;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,b):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,b)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function F(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function T(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){for(;++i<t.length;)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:C}}function C(){return{value:e,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,m.displayName=d(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,d(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},I(k.prototype),k.prototype[o]=function(){return this},t.AsyncIterator=k,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new k(c(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},I(x),d(x,s,"Generator"),x[a]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(F),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var d=r.call(o,"catchLoc"),c=r.call(o,"finallyLoc");if(d&&c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(d){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,b):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),F(n),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;F(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),b}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r={};return(()=>{"use strict";function t(t,e,n,r,i,a,o){try{var s=t[a](o),d=s.value}catch(t){return void n(t)}s.done?e(d):Promise.resolve(d).then(r,i)}function e(e){return function(){var n=this,r=arguments;return new Promise((function(i,a){var o=e.apply(n,r);function s(e){t(o,i,a,s,d,"next",e)}function d(e){t(o,i,a,s,d,"throw",e)}s(void 0)}))}}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(r,{default:()=>m});var o=n(757),s=n.n(o);function d(t,e){var n,r,i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),a=[];if(e=e||i.length,t)for(n=0;n<t;n++)a[n]=i[0|Math.random()*e];else for(a[8]=a[13]=a[18]=a[23]="-",a[14]="4",n=0;n<36;n++)a[n]||(r=0|16*Math.random(),a[n]=i[19==n?3&r|8:r]);return a.join("")}function c(t){return document.querySelector(t)}function l(t){return t="string"==typeof t?t:b(t),new Promise((function(e){var n=new Image;n.src=t,n.onload=function(){e(n)}}))}function f(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"file.png",n=t.split(","),r=n[0].match(/:(.*?);/)[1],i=atob(n[1]),a=i.length,o=new Uint8Array(a);a--;)o[a]=i.charCodeAt(a);var s=new File([o],"".concat(e),{type:r});return s}function p(t){var e=t.url,n=t.fileName,r=t.width,i=t.height,a=n.split(".")[n.split(".").length-1];return a=a.replace("jpg","jpeg"),new Promise((function(t){var o=new Image;o.src=e,o.crossOrigin="Anonymous",o.onload=function(){var e=document.createElement("canvas"),s=e.getContext("2d");e.width=r,e.height=i,s.drawImage(o,0,0,o.width,o.height,0,0,r,i),t({file:f(e.toDataURL("image/".concat(a),1),n),err:null})},o.onerror=function(e){t({file:null,err:e})}}))}function u(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=e.split(".")[e.split(".").length-1];return r=r.replace("jpg","jpeg"),new Promise((function(i){var a=new Image;a.src=t,a.crossOrigin="Anonymous",a.onload=function(){var t=document.createElement("canvas"),o=t.getContext("2d");t.width=n.swidth||a.width,t.height=n.sheight||a.height,t.sx=n.sx||0,t.sy=n.sy||0,o.drawImage(a,t.sx,t.sy,t.width,t.height,0,0,t.width,t.height),i({file:f(t.toDataURL("image/".concat(r),1),e),err:null})},a.onerror=function(t){i({file:null,err:t})}}))}function h(t){var e=Math.floor(Math.log(t)/Math.log(2));e<1&&(e=0);var n=Math.floor(e/10);return(t/=Math.pow(2,10*n)).toString().length>t.toFixed(2).toString().length&&(t=t.toFixed(2)),t+" "+["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][n]}function b(t){var e=null;return void 0!==window.createObjectURL?e=window.createObjectURL(t):void 0!==window.webkitURL?e=window.webkitURL.createObjectURL(t):void 0!==window.URL&&(e=window.URL.createObjectURL(t)),e}function v(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,!1)[e]}var m=function(){function t(e){var n=e.el,r=e.Files,i=e.isFile,o=e.zoom;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"element",void 0),a(this,"params",void 0),a(this,"isFile",void 0),a(this,"zoom",void 0),a(this,"zoomSize",void 0),a(this,"cacheFiles",void 0),a(this,"fileImgs",void 0),a(this,"fileId",void 0),a(this,"size",void 0),this.element="string"==typeof n?c(n):n,this.params={left:0,top:0,width:0,height:0,currentX:0,currentY:0,flag:!1,kind:"drag"},this.zoom=!!o,this.isFile=!!i,this.cacheFiles={},this.fileImgs={},this.fileId="",this.size={w:0,h:0,byte:0},this.template(),this.zoomSize={width:c(".img-wrap_3648808d57fd4b339435b32b99625a86").getBoundingClientRect().width-40,height:c(".img-wrap_3648808d57fd4b339435b32b99625a86").getBoundingClientRect().height-46},this.clipInit(r)}var n,r,o,f,m,g;return n=t,(r=[{key:"sizeUpdate",value:function(){c(".size-x_3648808d57fd4b339435b32b99625a86").value=c("#clip_3648808d57fd4b339435b32b99625a86").offsetLeft-c("#main-img_3648808d57fd4b339435b32b99625a86").offsetLeft,c(".size-y_3648808d57fd4b339435b32b99625a86").value=c("#clip_3648808d57fd4b339435b32b99625a86").offsetTop-20,c(".size-w_3648808d57fd4b339435b32b99625a86").value=parseInt(v(c("#clip_3648808d57fd4b339435b32b99625a86"),"width")),c(".size-h_3648808d57fd4b339435b32b99625a86").value=parseInt(v(c("#clip_3648808d57fd4b339435b32b99625a86"),"height"))}},{key:"clipInit",value:(g=e(s().mark((function t(e){var n,r,i,a,o,l,f,p,u=this;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=this,c(".clip-loading_3648808d57fd4b339435b32b99625a86>i").style.width="0%",r=0;case 3:if(!(r<e.length)){t.next=19;break}return c(".clip-loading_3648808d57fd4b339435b32b99625a86>i").style.width="".concat((s=r+1,h=e.length,0==s||0==h?0:Math.round(s/h*1e4)/100),"%"),i="tab_"+d(16,16),t.next=8,n.urlToFile(e[r],n.isFile);case 8:if(a=t.sent,o=a.file,!a.err){t.next=14;break}return console.warn("图像资源加载失败 ".concat(a.err.path[0].currentSrc,"\n请检查该资源的Access-Control-Allow-Origin响应头信息\nClip已忽略该资源")),n.LoadFailed(a.err.path[0].currentSrc),t.abrupt("continue",16);case 14:n.fileImgs[i]=o,n.cacheFiles[i]=o;case 16:r++,t.next=3;break;case 19:if(c(".clip-mask_3648808d57fd4b339435b32b99625a86").style.display="none","{}"!==JSON.stringify(n.fileImgs)){t.next=24;break}return n.interrupt(),console.warn("可加载资源数量不足，已停止程序执行。"),t.abrupt("return");case 24:for(p in l=c(".files-tab_3648808d57fd4b339435b32b99625a86"),f="",n.fileImgs)f+='<img src="'.concat(b(n.fileImgs[p]),'" id="').concat(p,'" />');l.innerHTML=f,Array.from(l.childNodes).map((function(t){t.onclick=function(){n.fileId=t.id,c("#main-img_3648808d57fd4b339435b32b99625a86").src=t.src,n.resetTool(100,100),n.infoUpdate()}})),l.childNodes[0].onclick(),n.infoUpdate(),n.resetTool(100,100),n.sizeUpdate(),c(".size-y_3648808d57fd4b339435b32b99625a86").oninput=function(t){return n.setSize.call(n,"size-y_3648808d57fd4b339435b32b99625a86",t.target.value)},c(".size-x_3648808d57fd4b339435b32b99625a86").oninput=function(t){return n.setSize.call(n,"size-x_3648808d57fd4b339435b32b99625a86",t.target.value)},c(".size-w_3648808d57fd4b339435b32b99625a86").oninput=function(t){return n.setSize.call(n,"size-w_3648808d57fd4b339435b32b99625a86",t.target.value)},c(".size-h_3648808d57fd4b339435b32b99625a86").oninput=function(t){return n.setSize.call(n,"size-h_3648808d57fd4b339435b32b99625a86",t.target.value)},c("#clip-back_3648808d57fd4b339435b32b99625a86").onclick=function(){n.fileImgs[u.fileId]=n.cacheFiles[n.fileId],n.infoUpdate()},c("#clip-save_3648808d57fd4b339435b32b99625a86").onclick=function(){var t=[];for(var e in n.fileImgs)t.push(n.fileImgs[e]);n.submit(t)},n.clipReload(),n.drawImageFun(),this.moveinit();case 42:case"end":return t.stop()}var s,h}),t,this)}))),function(t){return g.apply(this,arguments)})},{key:"submit",value:function(){}},{key:"LoadFailed",value:function(){}},{key:"interrupt",value:function(){}},{key:"setSize",value:function(t,e){var n=this;"size-x_3648808d57fd4b339435b32b99625a86"===t?(n.params.left=parseInt(e)+20+"px",c("#clip_3648808d57fd4b339435b32b99625a86").style.left=parseInt(e)+20+"px"):"size-y_3648808d57fd4b339435b32b99625a86"===t?(n.params.top=parseInt(e)+20+"px",c("#clip_3648808d57fd4b339435b32b99625a86").style.top=parseInt(e)+20+"px"):"size-w_3648808d57fd4b339435b32b99625a86"===t?(n.params.width=parseInt(e)+"px",c("#clip_3648808d57fd4b339435b32b99625a86").style.width=parseInt(e)+"px"):"size-h_3648808d57fd4b339435b32b99625a86"===t&&(n.params.height=parseInt(e)+"px",c("#clip_3648808d57fd4b339435b32b99625a86").style.height=parseInt(e)+"px")}},{key:"urlToFile",value:(m=e(s().mark((function t(e,n){var r,i,a,o;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=this,i=null,a=n?b(e):e,o=n?e.name:e.split("/")[e.split("/").length-1],!r.zoom){t.next=10;break}return t.next=7,p({url:a,fileName:o,width:r.zoomSize.width,height:r.zoomSize.height});case 7:i=t.sent,t.next=13;break;case 10:return t.next=12,u(a,o);case 12:i=t.sent;case 13:return t.abrupt("return",i);case 14:case"end":return t.stop()}}),t,this)}))),function(t,e){return m.apply(this,arguments)})},{key:"infoUpdate",value:(f=e(s().mark((function t(){var e,n,r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=(e=this).fileImgs[e.fileId],t.next=4,l(n);case 4:r=t.sent,c("#"+e.fileId).src=r.src,c("#main-img_3648808d57fd4b339435b32b99625a86").src=r.src,c("#file-pixel_3648808d57fd4b339435b32b99625a86").innerText=r.naturalWidth+"*"+r.naturalHeight,c("#file-byte_3648808d57fd4b339435b32b99625a86").innerText=h(n.size);case 9:case"end":return t.stop()}}),t,this)}))),function(){return f.apply(this,arguments)})},{key:"resetTool",value:function(t,e){c("#clip_3648808d57fd4b339435b32b99625a86").style.left="20px",c("#clip_3648808d57fd4b339435b32b99625a86").style.top="20px",c("#clip_3648808d57fd4b339435b32b99625a86").style.width=t+"px",c("#clip_3648808d57fd4b339435b32b99625a86").style.height=e+"px",this.params.left="20px",this.params.top="20px",this.params.width=t+"px",this.params.height=e+"px"}},{key:"moveDragFun",value:function(t,e,n){var r=this;r.params.width=v(e,"width"),r.params.height=v(e,"height"),r.params.left=v(e,"left"),r.params.top=v(e,"top"),t.onmousedown=function(i){r.params.flag=!0;var a=i||window.event;r.params.currentX=a.clientX,r.params.currentY=a.clientY,t.onselectstart=function(){return!1},a.stopPropagation(),document.onmousemove=function(t){if(r.params.flag){var i=t.clientX,a=t.clientY,o=i-r.params.currentX,s=a-r.params.currentY;r.sizeUpdate(),"leftTop"===n?(e.style.left=parseInt(r.params.left)+o+"px",e.style.width=parseInt(r.params.width)-o+"px",e.style.top=parseInt(r.params.top)+s+"px",e.style.height=parseInt(r.params.height)-s+"px"):"rightTop"===n?(e.style.top=parseInt(r.params.top)+s+"px",e.style.height=parseInt(r.params.height)-s+"px",e.style.width=parseInt(r.params.width)+o+"px"):"rightBot"===n?(e.style.width=parseInt(r.params.width)+o+"px",e.style.height=parseInt(r.params.height)+s+"px"):"topCenter"===n?(e.style.top=parseInt(r.params.top)+s+"px",e.style.height=parseInt(r.params.height)-s+"px"):"botCenter"===n?e.style.height=parseInt(r.params.height)+s+"px":"rightCenter"===n?e.style.width=parseInt(r.params.width)+o+"px":"leftCenter"===n?(e.style.left=parseInt(r.params.left)+o+"px",e.style.width=parseInt(r.params.width)-o+"px"):"leftBot"===n?(e.style.left=parseInt(r.params.left)+o+"px",e.style.width=parseInt(r.params.width)-o+"px",e.style.height=parseInt(r.params.height)+s+"px"):(e.style.left=parseInt(r.params.left)+o+"px",e.style.top=parseInt(r.params.top)+s+"px"),document.onmouseup=function(){r.params.flag=!1,r.params.left=v(e,"left"),r.params.top=v(e,"top"),r.params.width=v(e,"width"),r.params.height=v(e,"height"),document.onmousemove=null}}}}}},{key:"drawImageFun",value:(o=e(s().mark((function t(){var n,r=this;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=this,c("#clip-determine_3648808d57fd4b339435b32b99625a86").onclick=e(s().mark((function t(){var e,i,a,o,d,l,f;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c("#main-img_3648808d57fd4b339435b32b99625a86"),i=parseInt(n.params.left)-e.offsetLeft,a=parseInt(n.params.top)-e.offsetTop,o=parseInt(n.params.width),d=parseInt(n.params.height),l=n.fileImgs[n.fileId].name,t.next=8,u(e.src,l,{sx:i,sy:a,swidth:o,sheight:d});case 8:f=t.sent,n.fileImgs[n.fileId]=f.file,r.infoUpdate(),n.resetTool(o,d);case 12:case"end":return t.stop()}}),t)})));case 2:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})},{key:"clipReload",value:function(){var t=this;c("#clip-reload_3648808d57fd4b339435b32b99625a86").onclick=function(){var n=document.createElement("input");n.type="file",n.accept="image/png,image/jpeg,image/webp",n.onchange=function(){var n=e(s().mark((function e(n){var r,i;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.urlToFile.call(t,n.target.files[0],!0);case 2:if(r=e.sent,i=r.file,!r.err){e.next=8;break}return t.LoadFailed(res.err.path[0].currentSrc),e.abrupt("return");case 8:t.fileImgs[t.fileId]=i,t.cacheFiles[t.fileId]=i,t.infoUpdate();case 11:case"end":return e.stop()}}),e)})));return function(t){return n.apply(this,arguments)}}(),n.click()}}},{key:"moveinit",value:function(){this.moveDragFun(c("#mask_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"clip"),this.moveDragFun(c("#leftTop_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"leftTop"),this.moveDragFun(c("#leftBot_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"leftBot"),this.moveDragFun(c("#rightTop_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"rightTop"),this.moveDragFun(c("#rightBot_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"rightBot"),this.moveDragFun(c("#topCenter_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"topCenter"),this.moveDragFun(c("#botCenter_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"botCenter"),this.moveDragFun(c("#rightCenter_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"rightCenter"),this.moveDragFun(c("#leftCenter_3648808d57fd4b339435b32b99625a86"),c("#clip_3648808d57fd4b339435b32b99625a86"),"leftCenter")}},{key:"template",value:function(){this.element.innerHTML='<div id="clip-tailoring_3648808d57fd4b339435b32b99625a86">\n\n    <div class="clip-mask_3648808d57fd4b339435b32b99625a86">\n        <div class="clip-loading_3648808d57fd4b339435b32b99625a86">\n            <i></i>\n        </div>\n    </div>\n\n    <div class="files-tab_3648808d57fd4b339435b32b99625a86">\n    </div>\n\n    <div class="utils_3648808d57fd4b339435b32b99625a86">\n        <div class="child-size_3648808d57fd4b339435b32b99625a86">\n            <span>X：</span>\n            <input class="size-x_3648808d57fd4b339435b32b99625a86" type="number" />\n        </div>\n\n        <div class="child-size_3648808d57fd4b339435b32b99625a86">\n            <span>Y：</span>\n            <input class="size-y_3648808d57fd4b339435b32b99625a86" type="number" />\n        </div>\n\n        <div class="child-size_3648808d57fd4b339435b32b99625a86">\n            <span>W：</span>\n            <input class="size-w_3648808d57fd4b339435b32b99625a86" type="number" />\n        </div>\n\n        <div class="child-size_3648808d57fd4b339435b32b99625a86">\n            <span>H：</span>\n            <input class="size-h_3648808d57fd4b339435b32b99625a86" type="number" />\n        </div>\n        <div class="child-pixel_3648808d57fd4b339435b32b99625a86">\n            <span>P：</span>\n            <span id="file-pixel_3648808d57fd4b339435b32b99625a86"></span>\n        </div>\n        <div class="child-pixel_3648808d57fd4b339435b32b99625a86">\n            <span>S：</span>\n            <span id="file-byte_3648808d57fd4b339435b32b99625a86"></span>\n        </div>\n\n        <div class="clip-btns_3648808d57fd4b339435b32b99625a86">\n            <div class="clip-child_3648808d57fd4b339435b32b99625a86" id="clip-reload_3648808d57fd4b339435b32b99625a86">\n                <span>重载</span>\n            </div>\n            <div class="clip-child_3648808d57fd4b339435b32b99625a86" id="clip-determine_3648808d57fd4b339435b32b99625a86">\n                <span>裁剪</span>\n            </div>\n            <div class="clip-child_3648808d57fd4b339435b32b99625a86" id="clip-back_3648808d57fd4b339435b32b99625a86">\n                <span>回退</span>\n            </div>\n            <div class="clip-child_3648808d57fd4b339435b32b99625a86" id="clip-save_3648808d57fd4b339435b32b99625a86">\n                <span>保存</span>\n            </div>\n        </div>\n    </div>\n    <div class="img-wrap_3648808d57fd4b339435b32b99625a86">\n        <div id="clip_3648808d57fd4b339435b32b99625a86">\n            <div id="mask_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="leftTop_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="rightTop_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="leftBot_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="rightBot_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="leftCenter_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="rightCenter_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="topCenter_3648808d57fd4b339435b32b99625a86"></div>\n            <div id="botCenter_3648808d57fd4b339435b32b99625a86"></div>\n        </div>\n        <img id="main-img_3648808d57fd4b339435b32b99625a86" ondragstart="return false" src="" />\n    </div>\n</div>'}}])&&i(n.prototype,r),t}()})(),r.default})()}));