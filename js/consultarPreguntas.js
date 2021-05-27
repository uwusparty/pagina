var ip = "192.168.6.218";

$(document).ready(function()
{
    var alturaPagina = $(document).height();
    $("#fondoConfirmar").css("height", alturaPagina);
    var limite = 8;
    var idUsuario = -99;
    var isAdmin = false;
    var idiomaSel = "es";
    var categoriaSel = "All";
    var cantidad = 0;
    var cantPaginas = 0;
    var offset = 0;
    var preguntaId = -1;

    var urlCategorias;
    var urlCantidad;
    var urlPreguntas;

    $.ajax
    (
        {
            type: "post",
            url: "servicios.php",
            data: {'function':'getCurrentId'},
            dataType : 'json',
            success: function (response)
            {
                idUsuario = $.parseJSON(response);
                //Comprobamos si el usuario es un administrador o un usuario
                $.ajax({
                    type: "post",
                    url: "servicios.php",
                    data: {'function':'isAdmin'},
                    success: function (response) {
                        isAdmin = response;
                        inicializar();
                        actualizar();
                    }
                });
            }
        }
    );


    $('#idioma').change(function()
    {
      idiomaSel = $(this).val();
      actualizar();
    });

    $('#categorias').change(function (e)
    {
        categoriaSel = $(this).val();
        offset = 0;
        actualizar();
    });

    $('#numPaginas').on("click", "p", function(e)
    {
        if ($(this).text() == '<<') {
          offset = 0;
        }
        else if ($(this).text() == '<') {
          offset -= 1;
        }
        else if ($(this).text() == '>') {
          offset += 1;
        }
        else if ($(this).text() == '>>') {
          offset = cantPaginas-1;
        }
        else {
          return;
        }
        actualizar();
    });

    $('tbody').on("click", "tr > td .desplegable", function()
    {
      var pregunta = $(this).parent();
      var parent = $(this).parent().parent().parent();
      var index = parent.index()+1;
      var shown = false;
      if ( $('tbody tr:nth-child('+index+') .infoPregunta').is(":visible")) {
        shown = true;
      }
      if (shown) {
        preguntaId = -1;
        $('#tabla').css('height', '100vh');
      }
      $('tbody tr > td .desplegable').css('transform', 'none');
      $('tbody tr > td .desplegable').css('transform', 'none');
      $('.divBotones').fadeOut();
      $('tbody tr .infoPregunta').slideUp( function(){
        $('this .textoPregunta').css('height','100%');
      });
      if (!shown) {
        preguntaId = parent.data('value');
        $('tbody tr:nth-child('+index+') > td .desplegable').css('transform', 'rotate(180deg)');
        $('tbody tr:nth-child('+index+') .textoPregunta').css('height','4vh');
        $('tbody tr:nth-child('+index+') .infoPregunta').slideDown();
        $('#tabla').css('height', '140vh');
        $('.divBotones').hide();
        $('.divBotones').fadeIn();
        alturaPagina = $(document).height();
        $("#fondoConfirmar").css("height", alturaPagina);
      }
    });

    $('tbody').on("click", ".modificar", function()
    {
      if (preguntaId != -1) {
        $(location).attr('href', 'crearPreguntas.php?id='+preguntaId);
      }
    });

    $('tbody').on("click", ".eliminar", function()
    {
      $('#confirmar').toggle();
      $('#fondoConfirmar').toggle();
      if (preguntaId == -2) {
        $(location).attr('href', 'crearPreguntas.php?id='+preguntaId);
      }
    });

    $('#confirmar').on("click", "button:first", function(e)
    {
      $.ajax
      (
          {
              type: "delete",
              url: "http://"+ip+":8080/trivialmi/questions/delete",
              data: {'id':preguntaId},
              dataType : 'json',
              success: function ()
              {
                  $(location).attr('href', 'consultarPreguntas.php?sc=1');
              }
          }
      );
    });

    $('#confirmar').on("click", "button:not(:first)", function(e)
    {
      $('#confirmar').toggle();
      $('#fondoConfirmar').toggle();
    });

    $(document).on('change','.selectEstado',function()
    {
        var parent = $(this).parent().parent();
        var idPregunta = parent.data('value');
        var estado = $(this).val();
        $(this).removeClass();
        $(this).addClass("selectEstado");
        if (estado == "Pendiente") {
          estado = -1;
          $(this).addClass("pendiente");
        }
        else if (estado == "Aceptada") {
          estado = 1;
          $(this).addClass("aceptada");
        }
        else {
          estado = 0;
          $(this).addClass("rechazada");
        }
        $.ajax
        (
            {
                type: "put",
                url: "http://"+ip+":8080/trivialmi/questions/status",
                data: {"id":idPregunta,"status":estado}
            }
        );
    });

    function devolverNombreEstado(numEstado)
    {
        var nombreEstado = null;

        if(numEstado == -1)
        {
            nombreEstado = "Pendiente";
        }
        else if(numEstado == 0)
        {
            nombreEstado = "Rechazada";
        }
        else if(numEstado == 1)
        {
            nombreEstado = "Aceptada";
        }
        return nombreEstado;
    }

    function inicializar()
    {
      if (isAdmin) {
        urlCategorias = "http://"+ip+":8080/trivialmi/questions/categories/id/*";
      }
      else {
        urlCategorias = "http://"+ip+":8080/trivialmi/questions/categories/id/"+idUsuario;
      }
      //Recibimos las categorías que tiene el usuario
      $.ajax
      (
          {
              type: "get",
              url: urlCategorias,
              success: function (response)
              {
                  //No hace falta hacer el parse a la respuesta porque mongo lo devuelve como objetos
                  var arrayCategorias = response.data;
                  $('#categorias').html("<option value='All'>Todas</option>");
                  for (let i = 0; i < arrayCategorias.length; i++)
                  {
                      $('#categorias').append("<option value='"+arrayCategorias[i].es+"'>"+arrayCategorias[i].es+"</option>");
                  }
              }
          }
      );
    }

    function actualizar()
    {
        if (isAdmin) {
          urlCantidad = "http://"+ip+":8080/trivialmi/questions/id/*/category/"+categoriaSel+"/quantity";
          urlPreguntas = "http://"+ip+":8080/trivialmi/questions/id/*/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset;
        }
        else {
          urlCantidad = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/quantity";
          urlPreguntas = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset;
        }

        //Recibimos la cantidad de preguntas que tiene el usuario
        $.ajax
        (
            {
                type: "get",
                url: urlCantidad,
                success: function (response)
                {
                    cantidad = response.data;
                    cantPaginas = Math.ceil(cantidad/limite);
                    $('#numPaginas').html("");
                    insertarNumeros = "<h3>Seleccionar página</h3>";
                    if (offset > 0) {
                      insertarNumeros += "<p><<</p>";
                      insertarNumeros += "<p><</p>";
                    }
                    else {
                      insertarNumeros += "<p>||</p>";
                      insertarNumeros += "<p>|</p>";
                    }
                    insertarNumeros += "<p>"+(offset+1)+"</p>";

                    if (offset < cantPaginas-1) {
                      insertarNumeros += "<p>></p>";
                      insertarNumeros += "<p>>></p>";
                    }
                    else {
                      insertarNumeros += "<p>|</p>";
                      insertarNumeros += "<p>||</p>";
                    }
                    $('#numPaginas').append(insertarNumeros);
                    $("#numPaginas p:nth-child(4)").css("color", "indianred");
                    $("#numPaginas p:nth-child(4)").css("cursor", "auto");
                    $("#numPaginas p:nth-child(4)").css("font-weight", "bold");
                }
            }
        );

        $.ajax
        (
            {
                type: "get",
                url: urlPreguntas,
                success: function (response)
                {
                    $('tbody').html('');
                    var arrayDatos = response.data;
                    for (let index = 0; index < arrayDatos.length; index++)
                    {
                        var element = arrayDatos[index];
                        var insertarFila = "";
                        insertarFila += "<tr data-value="+element._id+">";
                            insertarFila += "<td>";
                                insertarFila += "<div class='textoPregunta'>";
                                    if (idiomaSel == "en") {
                                      insertarFila += "<p>"+element.question.en+"</p>";
                                    }
                                    else {
                                      insertarFila += "<p>"+element.question.es+"</p>"
                                    }
                                    insertarFila += "<img class='desplegable' src='resources/arrow.png' />";
                                insertarFila += "</div>";
                                insertarFila += "<div class='floatClear'></div>";
                                insertarFila += "<div class='infoPregunta'>";
                                  insertarFila += "<img src=' http://192.168.6.216/categorias/"+element.image_url+"'>";
                                  insertarFila += "<div class='divBotones'>";
                                    insertarFila += "<img src='resources/modificar.png' class='modificar'>";
                                    insertarFila += "<img src='resources/eliminar.png' class='eliminar'></br>";
                                  insertarFila += "</div>";
                                  insertarFila += "<div class='floatClear'></div>";
                                  if (idiomaSel == "en") {
                                      insertarFila += "<p class='correct'>"+element.correct.en+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[0].en+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[1].en+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[2].en+"</p>";
                                  }
                                  else {
                                      insertarFila += "<p class='correct'>"+element.correct.es+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[0].es+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[1].es+"</p>";
                                      insertarFila += "<p class='incorrect'>"+element.incorrects[2].es+"</p>";
                                  }

                                insertarFila += "</div>";
                            insertarFila += "</td>";
                            if (isAdmin)
                            {
                                insertarFila += "<td class='selectorCol'>";
                                    insertarFila += "<select name='selectEstado' class='selectEstado ";
                                        if (devolverNombreEstado(element.status) == 'Pendiente') {
                                          insertarFila += "pendiente'>";
                                            insertarFila += "<option class='pendiente' selected='true'>Pendiente</option>";
                                            insertarFila += "<option class='aceptada'>Aceptada</option>";
                                            insertarFila += "<option class='rechazada'>Rechazada</option>";
                                        }
                                        else if (devolverNombreEstado(element.status) == 'Aceptada') {
                                          insertarFila += "aceptada'>";
                                            insertarFila += "<option class='pendiente'>Pendiente</option>";
                                            insertarFila += "<option class='aceptada' selected='true'>Aceptada</option>";
                                            insertarFila += "<option class='rechazada'>Rechazada</option>";
                                        }
                                        else {
                                          insertarFila += "rechazada'>";
                                            insertarFila += "<option class='pendiente'>Pendiente</option>";
                                            insertarFila += "<option class='aceptada'>Aceptada</option>";
                                            insertarFila += "<option class='rechazada' selected='true'>Rechazada</option>";
                                        }
                                    insertarFila += "</select>";
                            }
                            else
                            {
                                if (devolverNombreEstado(element.status) == 'Pendiente') {
                                    insertarFila += "<td class='pendiente'>";
                                  }
                                  else if (devolverNombreEstado(element.status) == 'Aceptada') {
                                    insertarFila += "<td class='aceptada'>";
                                  }
                                  else {
                                    insertarFila += "<td class='rechazada'>";
                                  }
                                  insertarFila += devolverNombreEstado(element.status);
                            }
                            insertarFila += "</td>";
                        insertarFila += "</tr>";
                        $('tbody').append(insertarFila);
                        $('tbody tr .infoPregunta').slideUp( function(){
                          $('this .textoPregunta').css('height','100%');
                        });
                    }
                }
            }
        );
    }
});
