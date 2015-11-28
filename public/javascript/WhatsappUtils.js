window.whatsappUtils = {
    corsWindow: undefined,
    jQueryInit: false,
    whatsappAPIInit: false,
    lastReqID: 0,
    requestSomethingCB: []
};

function loadjQuery() {
    if (typeof jQuery === 'undefined' || !whatsappUtils.jQueryInit) {
        var jQueryScript = document.createElement('script');
        jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
        document.head.appendChild(jQueryScript);
        whatsappUtils.jQueryInit = true;
    }
}
function loadWhatsappUtils() {
    if (!whatsappUtils.corsWindow) {
        whatsappUtils.corsWindow = window.open('http://localhost:3000/', '_blank', 'width=100,height=100');
        whatsappUtils.corsWindow.blur();
        window.focus();
    }
}

function requestSomething(settings) {
    var url = settings.url,
        callback = settings.callback,
        method = settings.method || 'get';
    loadWhatsappUtils();
    whatsappUtils.requestSomethingCB.push(callback);
    whatsappUtils.corsWindow.postMessage(JSON.stringify({
        requestType: 1,
        requestURL: url,
        method: method,
        lastReqID: whatsappUtils.lastReqID
    }), '*');
    whatsappUtils.lastReqID++;
}

loadjQuery();
loadWhatsappUtils();

setTimeout(function () {
    requestSomething({
        url: 'http://teamfreehugs.github.io/js/URI.js',
        callback: function (e) {
            window.URI = window.eval('function getURI(){' + e + '\nreturn URI;}; getURI();');
        },
        method: 'get'
    });
    requestSomething({
        url: 'http://localhost:3000/javascript/WhatsappAPI.js',
        callback: function (e) {
            window.initWhatsappAPI = window.eval('function getInit(){' + e + '\nreturn init;}; getInit();');
        }
    });
}, 3000);


addEventListener('message', function (e) {
    try {
        var data = JSON.parse(e.data);
        whatsappUtils.requestSomethingCB[parseInt(data.id)](data.response);
    } catch (e1) {
        console.log(e1);
    }
});


window.onbeforeunload = function () {
    whatsappUtils.corsWindow.close();
};