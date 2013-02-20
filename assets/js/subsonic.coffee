  glob = {}
  baseUrl = 'http://by.subsonic.org/rest/'
  param = '.view?u=brian&p=home&v=1.8.0&c=digidj&f=jsonp&callback=?'
  console.log 'get music folders'
  glob.queryMethod = 'getIndexes'
  glob.url = baseUrl + glob.queryMethod + param
  console.log glob.url
  req = $.ajax
  url:glob.url
  dataType:'jsonp'

  req.done (d) ->
    source   = $("#track-content").html()
    template = Handlebars.compile(source)

    $(d['subsonic-response']['indexes']['index']).each ->
      console.log ($('this').artist)

    context = {
      title: @artist.name
      link: "track"
    }

    html = template(context)
    $('.tracks ul').append html if @artist.name != undefined
