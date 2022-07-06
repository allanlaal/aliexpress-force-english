// ==UserScript==
// @name         AliExpress Force English
// @namespace    ee.permanent
// @version      1.0
// @url			 https://github.com/allanlaal/aliexpress-force-english
// @description  Auto Redirect to Aliexpress Global site, based on the non-working https://greasyfork.org/en/scripts/404712-aliexpress-in-english-fiz/code
// @author       Allan Laal <allan@laal.ee>
// @match        https://*.aliexpress.com/*
// @match        https://*.ru.aliexpress.com/*
// @match        https://*.aliexpress.ru/*
// @grant        none
// ==/UserScript==
//based on https://useful-faq.livejournal.com/19739856.html
(function() {
    'use strict';
 
     var locCookie = getCookie('aep_usuc_f');
    var locale = gup('b_locale', locCookie);
 

    setCookie('aep_usuc_f','region=EE&site=glo&b_locale=en_US&isb=y&isfm=y&c_tp=EUR',50, ".aliexpress.com");
    setCookie('intl_locale','en_US',50, ".aliexpress.com");
 
    if(window.location.host.indexOf("aliexpress.ru")){
        var newhref = window.location.href.replace("aliexpress.ru", "aliexpress.com");
        window.location.href = newhref;
    }
 
 

	// polyfills:

    function setCookie(cname, cvalue, exdays, site) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        var domain = "";
        if(site)
           domain = ";domain=" + site;
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + domain;
    }
 
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
 
    function gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
 
})();
