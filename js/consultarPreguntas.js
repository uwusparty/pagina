var ip = "192.168.6.218";

$(document).ready(function()
{
    var alturaPagina = $(document).height();
    $("#fondoConfirmar").css("height", alturaPagina);
    var limite = 8;
    var idUsuario = -99;
    var isAdmin = false;
    var categoriaSel = "All";
    var preguntaId = -1;

    var urlTodasCantidad;
    var urlTodasPreguntas;
    var urlCategoriaCantidad;
    var urlCategoriaPreguntas;
    var urlPaginaPreguntas;
    //Llenamos el Select con Options que van a ser las categorías de las preguntas de la base de datos de mongo
    $.ajax
    (
        {
            type: "get",
            url: "http://"+ip+":8080/trivialmi/questions/categories",
            success: function (response)
            {
                //No hace falta hacer el parse a la respuesta porque mongo lo devuelve como objetos
                var arrayCategorias = response.data;

                for (let i = 0; i < arrayCategorias.length; i++)
                {
                    $('#categorias').append("<option val='"+arrayCategorias[i].es+"'>"+arrayCategorias[i].es+"</option>");
                }
            }
        }
    );

    $.ajax({
        type: "post",
        url: "servicios.php",
        data: {'function':'isAdmin'},
        success: function (response) {
            isAdmin = response;
            console.log(response);
        }
    });

    //Recibimos las preguntas del usuario que esté con la sesión iniciada
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
                if (isAdmin) {
                  urlTodasCantidad = "http://"+ip+":8080/trivialmi/questions/id/*/category/All/quantity";
                  urlTodasPreguntas = "http://"+ip+":8080/trivialmi/questions/id/*/limit/"+limite;
                }
                else {
                  urlTodasCantidad = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/All/quantity";
                  urlTodasPreguntas = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/limit/"+limite;
                }
                //Recibimos la cantidad de preguntas que tiene el usuario
                $.ajax
                (
                    {
                        type: "get",
                        url: urlTodasCantidad,
                        success: function (response)
                        {
                            cantidad = response.data;
                            cantPaginas = Math.ceil(cantidad/limite);
                            $('#numPaginas').html("");
                            insertarNumeros = "<h3>Seleccionar página</h3>";
                            for (let i = 0; i < cantPaginas; i++)
                            {
                                insertarNumeros += "<p>"+(i+1)+"</p>";
                            }
                            $('#numPaginas').append(insertarNumeros);
                            $("#numPaginas p:first").css("color", "indianred");
                        }
                    }
                );

                $.ajax
                (
                    {
                        type: "get",
                        url: urlTodasPreguntas,
                        success: function (response)
                        {
                            var arrayDatos = response.data;
                            for (let index = 0; index < arrayDatos.length; index++)
                            {
                                var element = arrayDatos[index];
                                var insertarFila = "";
                                insertarFila += "<tr data-value="+element._id+">";
                                    insertarFila += "<td>";
                                        insertarFila += "<p class='textoPregunta'>"+element.question.en+"</p>";
                                        insertarFila += "<img class='desplegable' src='resources/arrow.png' />";
                                        insertarFila += "<div class='floatClear'></div>";
                                        insertarFila += "<div class='infoPregunta'>";
                                          insertarFila += "<img src=' http://192.168.6.216/categorias/"+element.image_url+"'>";
                                          insertarFila += "<div class='divBotones'>";
                                            insertarFila += "<img src='resources/modificar.png' class='modificar'>";
                                            insertarFila += "<img src='resources/eliminar.png' class='eliminar'></br>";
                                          insertarFila += "</div>";
                                          insertarFila += "<div class='floatClear'></div>";
                                          insertarFila += "<p class='correct'>"+element.correct.en+"</p>";
                                          insertarFila += "<p class='incorrect'>"+element.incorrects[0].en+"</p>";
                                          insertarFila += "<p class='incorrect'>"+element.incorrects[1].en+"</p>";
                                          insertarFila += "<p class='incorrect'>"+element.incorrects[2].en+"</p>";
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
                                $('tbody tr div').slideUp();
                            }
                        }
                    }
                );
            }
        }
    );

    $('#categorias').change(function (e)
    {
        categoriaSel = $(this).val();
        if (isAdmin) {
          urlCategoriaCantidad = "http://"+ip+":8080/trivialmi/questions/id/*/category/"+categoriaSel+"/quantity";
          urlCategoriaPreguntas = "http://"+ip+":8080/trivialmi/questions/id/*/category/"+categoriaSel+"/limit/"+limite+"/offset/0";
        }
        else {
          urlCategoriaCantidad = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/quantity";
          urlCategoriaPreguntas = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/0";
        }
        $.ajax
        (
            {
                type: "get",
                url: urlCategoriaCantidad,
                success: function (response)
                {
                    cantidad = response.data;
                    cantPaginas = Math.ceil(cantidad/limite);
                    $('#numPaginas').html("");
                    insertarNumeros = "<h3>Seleccionar página</h3>";
                    for (let i = 0; i < cantPaginas; i++)
                    {
                        insertarNumeros += "<p>"+(i+1)+"</p>";
                    }
                    $('#numPaginas').append(insertarNumeros);
                    $("#numPaginas p:first").css("color", "indianred");
                }
            }
        );

        $.ajax
        (
            {
                type: "get",
                url: urlCategoriaPreguntas,
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";
                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr data-value="+datosRecibidos[i]._id+">";
                            datosTabla += "<td>";
                                datosTabla += "<p class='textoPregunta'>"+datosRecibidos[i].question.en+"</p>";
                                datosTabla += "<img class='desplegable' src='resources/arrow.png' />";
                                datosTabla += "<div class='floatClear'></div>";
                                datosTabla += "<div class='infoPregunta'>";
                                  datosTabla += "<img src=' http://192.168.6.216/categorias/"+datosRecibidos[i].image_url+"'>";
                                  datosTabla += "<div class='divBotones'>";
                                    datosTabla += "<img src='resources/modificar.png' class='modificar'>";
                                    datosTabla += "<img src='resources/eliminar.png' class='eliminar'></br>";
                                  datosTabla += "</div>";
                                  datosTabla += "<p class='correct'>"+datosRecibidos[i].correct.en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[0].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[1].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[2].en+"</p>";
                                datosTabla += "</div>";
                            datosTabla += "</td>";
                            if (isAdmin)
                                    {
                                        datosTabla += "<td class='selectorCol'>";
                                        datosTabla += "<select name='selectEstado' class='selectEstado ";
                                                if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                                  datosTabla += "pendiente'>";
                                                    datosTabla += "<option class='pendiente' selected='true'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada'>Rechazada</option>";
                                                }
                                                else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                                  datosTabla += "aceptada'>";
                                                    datosTabla += "<option class='pendiente'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada' selected='true'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada'>Rechazada</option>";
                                                }
                                                else {
                                                  datosTabla += "rechazada'>";
                                                    datosTabla += "<option class='pendiente'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada' selected='true'>Rechazada</option>";
                                                }
                                                datosTabla += "</select>";
                                    }
                                    else
                                    {
                                        if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                            datosTabla += "<td class='pendiente'>";
                                          }
                                          else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                            datosTabla += "<td class='aceptada'>";
                                          }
                                          else {
                                            datosTabla += "<td class='rechazada'>";
                                          }
                                          datosTabla += devolverNombreEstado(datosRecibidos[i].status);
                                    }
                            datosTabla += "</td>";
                        datosTabla += "</tr>";
                    }
                    $('tbody').html(datosTabla);
                    $('tbody tr div').slideUp();
                },
                error: function(err)
                {
                    console.log(err);
                }
            }
        );
    });

    $('#numPaginas').on("click", "p", function(e)
    {
        var offset = $(this).html()-1;
        if (isAdmin) {
          urlPaginaPreguntas = "http://"+ip+":8080/trivialmi/questions/id/*/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset;
        }
        else {
          urlPaginaPreguntas = "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset;
        }
        $("#numPaginas p").css("color", "black");
        $(this).css("color", "indianred");
        $.ajax
        (
            {
                type: "get",
                url: urlPaginaPreguntas,
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";

                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr data-value="+datosRecibidos[i]._id+">";
                            datosTabla += "<td>";
                                datosTabla += "<p class='textoPregunta'>"+datosRecibidos[i].question.en+"</p>";
                                datosTabla += "<img class='desplegable' src='resources/arrow.png' class='arrow' />";
                                datosTabla += "<div class='floatClear'></div>";
                                datosTabla += "<div class='infoPregunta'>";
                                  datosTabla += "<img src=' http://192.168.6.216/categorias/"+datosRecibidos[i].image_url+"'>";
                                  datosTabla += "<div class='divBotones'>";
                                    datosTabla += "<img src='resources/modificar.png' class='modificar'>";
                                    datosTabla += "<img src='resources/eliminar.png' class='eliminar'></br>";
                                  datosTabla += "</div>";
                                  datosTabla += "<p class='correct'>"+datosRecibidos[i].correct.en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[0].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[1].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[2].en+"</p>";
                                datosTabla += "</div>";
                            datosTabla += "</td>";
                            if (isAdmin)
                                    {
                                        datosTabla += "<td class='selectorCol'>";
                                        datosTabla += "<select name='selectEstado' class='selectEstado ";
                                                if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                                  datosTabla += "pendiente'>";
                                                    datosTabla += "<option class='pendiente' selected='true'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada'>Rechazada</option>";
                                                }
                                                else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                                  datosTabla += "aceptada'>";
                                                    datosTabla += "<option class='pendiente'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada' selected='true'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada'>Rechazada</option>";
                                                }
                                                else {
                                                  datosTabla += "rechazada'>";
                                                    datosTabla += "<option class='pendiente'>Pendiente</option>";
                                                    datosTabla += "<option class='aceptada'>Aceptada</option>";
                                                    datosTabla += "<option class='rechazada' selected='true'>Rechazada</option>";
                                                }
                                                datosTabla += "</select>";
                                    }
                                    else
                                    {
                                        if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                            datosTabla += "<td class='pendiente'>";
                                          }
                                          else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                            datosTabla += "<td class='aceptada'>";
                                          }
                                          else {
                                            datosTabla += "<td class='rechazada'>";
                                          }
                                          datosTabla += devolverNombreEstado(datosRecibidos[i].status);
                                    }
                            datosTabla += "</td>";
                        datosTabla += "</tr>";
                    }
                    $('tbody').html(datosTabla);
                    $('tbody tr div').slideUp();
                }
            }
        );
    });

    $('tbody').on("click", "tr > td > img", function()
    {
      var parent = $(this).parent().parent();
      var index = parent.index()+1;
      var shown = false;
      if ( $('tbody tr:nth-child('+index+') div').is(":visible")) {
        shown = true;
      }
      if (shown) {
        preguntaId = -1;
        $('#tabla').css('height', '100vh');
      }
      $('tbody tr td > img').css('transform', 'none');
      $('tbody tr > td > img').css('transform', 'none');
      $('.divBotones').fadeOut();
      $('tbody tr div').slideUp();
      if (!shown) {
        preguntaId = parent.data('value');
        $('tbody tr:nth-child('+index+') > td > img').css('transform', 'rotate(180deg)');
        $('tbody tr:nth-child('+index+') div').slideDown();
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
        console.log(idPregunta+" "+estado);
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
});
