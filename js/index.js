
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};


function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}


function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
      
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();


function AjaxReq(urlReq, dataSubmit, controlView="wraperInmuebles", load=true, callback){
    callback = callback || function(){};
    $.ajax({
      method: "POST"
      ,url: urlReq
      ,data: dataSubmit
    })
      .done(function( rsp) {
        let $control = $( "#" + controlView );
        if(load){
          $control.html( rsp );
        }
        callback(rsp, $control);
      })
      .fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}

$(document).ready(()=> {

    var insertOptions = function(rsp, control){ $(control).append(rsp).material_select(); };
    AjaxReq("back/Ciudades_List.php", {}, "selectCiudad", false, insertOptions);
    AjaxReq("back/tipos_List.php", {}, "selectTipo", false, insertOptions);

    $("#submitButton").click((event)=>{
      event.preventDefault();
      let filtroAply = true;
      let filtroCiudad = $("#selectCiudad").val();
      let filtroTipo = $("#selectTipo").val();
      let filtroPrecioIni = $("#rangoPrecio").val().split(";")[0];
      let filtroPrecioFin = $("#rangoPrecio").val().split(";")[1];
      AjaxReq("back/dataShow.php", {fAply: filtroAply
                                    ,fCiudad: filtroCiudad
                                    ,fTipo: filtroTipo
                                    ,fPrecioIni: filtroPrecioIni
                                    ,fPrecioFin: filtroPrecioFin
                                  });
    });

    $("#mostrarTodos").click((event)=>{
      let filtroPrecioIni = $("#rangoPrecio").val().split(";")[0];
      let filtroPrecioFin = $("#rangoPrecio").val().split(";")[1];
      AjaxReq("back/dataShow.php", {
        fPrecioIni: filtroPrecioIni
        ,fPrecioFin: filtroPrecioFin
      });
    });

  });
