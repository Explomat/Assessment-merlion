var Promise = require('es6-promise').Promise;
var AJAX_TIME_OVER = 10000;

module.exports = {

    getXmlHttp: function(){
        var xmlHttp;
        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (err) { xmlHttp = false; }
        }
        if (!xmlHttp && typeof(XMLHttpRequest) != 'undefined')
            xmlHttp = new XMLHttpRequest();
        return xmlHttp;
    },

    sendRequest: function(url, data, isSync, xmlHttpRequest, requestType) {
        return new Promise(function(resolve, reject){
            if (!url)
                reject(Error("Unknown url"));
            xmlHttp = xmlHttpRequest || this.getXmlHttp();
            requestType = requestType || 'GET';
            isSync = isSync || true;

            xmlHttp.open(requestType, url, isSync);
            xmlHttp.onreadystatechange = function() {
              if (xmlHttp.readyState == 4) {
                if (timeout)
                    clearTimeout(timeout);

                if(xmlHttp.status == 200){
                   resolve(xmlHttp.responseText);
                }
                else {
                    console.log(xmlHttp.status);
                    reject(xmlHttp.statusText || "Ajax request error");
                }
              }
            };

            xmlHttp.send(data || null);

            if (isSync){
                var timeout = setTimeout( function(){ 
                    xmlHttp.abort();
                    reject("Ajax request time over");
                }, AJAX_TIME_OVER);
            }
        }.bind(this));
    }
}     
