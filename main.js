import "./scripts/frisk.js";

alert(/android|iphone|ipad|ipod/i.test(navigator.userAgent) ? 'mobile' : 'pc');
