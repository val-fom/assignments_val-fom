!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t,n){"use strict";function r(){var e=new Date,t=e.getSeconds();t<10&&(t="0"+t);var n=e.getMinutes();n<10&&(n="0"+n);var r=e.getHours();return r<10&&(r="0"+r),r+":"+n+":"+t}var o=document.querySelector("#current-time");setInterval(function(){o.innerHTML=r()},1e3)},function(e,t){}]);