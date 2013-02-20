// this global variable is where all the script goes so that
// it doesn't polute the global namespace
var MYAPP = MYAPP || {};

MYAPP.subsonic = (function(){
var baseUrl, glob, param, req;

glob = {};

baseUrl = 'http://by.subsonic.org/rest/';

param = '.view?u=brian&p=home&v=1.8.0&c=digidj&f=jsonp&callback=?';

console.log('get music folders');

glob.queryMethod = 'getIndexes';

glob.url = baseUrl + glob.queryMethod + param;

console.log(glob.url);

req = $.ajax;

({
  url: glob.url,
  dataType: 'jsonp'
});

req.done(function(d) {
  var context, html, source, template;
  source = $("#track-content").html();
  template = Handlebars.compile(source);
  $(d['subsonic-response']['indexes']['index']).each(function() {
    return console.log(($('this').artist));
  });
  context = {
    title: this.artist.name,
    link: "track"
  };
  html = template(context);
  if (this.artist.name !== void 0) return $('.tracks ul').append(html);
});

})

MYAPP.events = (function(){

  console.log('bind events')
})


MYAPP.run = (function() {
	// create the Kendo UI Mobile application
    MYAPP.app = new kendo.mobile.Application(document.body, { transition: "slide" });
    //MYAPP.subsonic()
    console.log('run')
});

// this is called when the intial view shows. it prevents the flash
// of unstyled content (FOUC)
MYAPP.show = (function() {
	$(document.body).show();
});

// this function runs at startup and attaches to the 'deviceready' event
// which is fired by PhoneGap when the hardware is ready for native API
// calls. It is self invoking and will run immediately when this script file is
// loaded.
(function() {
    if (navigator.userAgent.indexOf('Browzr') > -1) {
        // blackberry
        setTimeout(MYAPP.run, 250)
    } else {
        // attach to deviceready event, which is fired when phonegap is all good to go.
        document.addEventListener('deviceready', MYAPP.run, false);
    }
})();
