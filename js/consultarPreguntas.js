var ip = "88.7.26.83";

$(document).ready(function()
{
    var limite = 8;
    var idUsuario = -99;
    var isAdmin = false;
    var categoriaSel = "All";
    var preguntaId = -1;
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

                //Recibimos la cantidad de preguntas que tiene el usuario
                $.ajax
                (
                    {
                        type: "get",
                        url: "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/All/quantity",
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
                        url: "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/limit/"+limite,
                        success: function (response1)
                        {
                            var arrayDatos = response1.data;
                            for (let index = 0; index < arrayDatos.length; index++)
                            {
                                var element = arrayDatos[index];
                                var insertarFila = "";
                                insertarFila += "<tr data-value="+element._id+">";
                                    insertarFila += "<td>";
                                        insertarFila += element.question.en;
                                        insertarFila += "<img src='resources/arrow.png' />";
                                        insertarFila += "<div class='floatClear'></div>";
                                        insertarFila += "<div class='infoPregunta'>";
                                          insertarFila += "<img src=' http://192.168.6.216/categorias/"+element.image_url+"'>";
                                          insertarFila += "<div class='modificar'>";
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
                                        insertarFila += "<td>";
                                            insertarFila += "<select name='selectEstado' id='selectEstado' value='3'>";
                                                if (devolverNombreEstado(element.status) == 'Pendiente') {
                                                    insertarFila += "<option selected='true'>Pendiente</option>";
                                                    insertarFila += "<option>Aceptada</option>";
                                                    insertarFila += "<option>Rechazada</option>";
                                                }
                                                else if (devolverNombreEstado(element.status) == 'Aceptada') {
                                                    insertarFila += "<option>Pendiente</option>";
                                                    insertarFila += "<option selected='true'>Aceptada</option>";
                                                    insertarFila += "<option>Rechazada</option>";
                                                }
                                                else {
                                                    insertarFila += "<option>Pendiente</option>";
                                                    insertarFila += "<option>Aceptada</option>";
                                                    insertarFila += "<option selected='true'>Rechazada</option>";
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
        $.ajax
        (
            {
                type: "get",
                url: "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/quantity",
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
                url: "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/0",
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";
                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr data-value="+datosRecibidos[i]._id+">";
                            datosTabla += "<td>";
                                datosTabla += datosRecibidos[i].question.en;
                                datosTabla += "<img src='resources/arrow.png' />";
                                datosTabla += "<div class='floatClear'></div>";
                                datosTabla += "<div class='infoPregunta'>";
                                  datosTabla += "<img src=' http://192.168.6.216/categorias/"+datosRecibidos[i].image_url+"'>";
                                  datosTabla += "<img src='resources/modificar.png' class='modificar'></br>";
                                  datosTabla += "<p class='correct'>"+datosRecibidos[i].correct.en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[0].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[1].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[2].en+"</p>";
                                datosTabla += "</div>";
                            datosTabla += "</td>";
                            if (isAdmin)
                                    {
                                        datosTabla += "<td>";
                                        datosTabla += "<select name='selectEstado' id='selectEstado'>";
                                                if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                                    datosTabla += "<option selected='true'>Pendiente</option>";
                                                    datosTabla += "<option>Aceptada</option>";
                                                    datosTabla += "<option>Rechazada</option>";
                                                }
                                                else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                                    datosTabla += "<option>Pendiente</option>";
                                                    datosTabla += "<option selected='true'>Aceptada</option>";
                                                    datosTabla += "<option>Rechazada</option>";
                                                }
                                                else {
                                                    datosTabla += "<option>Pendiente</option>";
                                                    datosTabla += "<option>Aceptada</option>";
                                                    datosTabla += "<option selected='true'>Rechazada</option>";
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
        $("#numPaginas p").css("color", "black");
        $(this).css("color", "indianred");
        $.ajax
        (
            {
                type: "get",
                url: "http://"+ip+":8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset,
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";

                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr data-value="+datosRecibidos[i]._id+">";
                            datosTabla += "<td>";
                                datosTabla += datosRecibidos[i].question.en;
                                datosTabla += "<img src='resources/arrow.png' class='arrow' />";
                                datosTabla += "<div class='floatClear'></div>";
                                datosTabla += "<div class='infoPregunta'>";
                                  datosTabla += "<img src=' http://192.168.6.216/categorias/"+datosRecibidos[i].image_url+"'>";
                                  datosTabla += "<img src='resources/modificar.png' class='modificar'></br>";
                                  datosTabla += "<p class='correct'>"+datosRecibidos[i].correct.en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[0].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[1].en+"</p>";
                                  datosTabla += "<p class='incorrect'>"+datosRecibidos[i].incorrects[2].en+"</p>";
                                datosTabla += "</div>";
                            datosTabla += "</td>";
                            if (isAdmin)
                                    {
                                        datosTabla += "<td>";
                                        datosTabla += "<select name='selectEstado' id='selectEstado' value='3'>";
                                                if (devolverNombreEstado(datosRecibidos[i].status) == 'Pendiente') {
                                                    datosTabla += "<option selected='true'>Pendiente</option>";
                                                    datosTabla += "<option>Aceptada</option>";
                                                    datosTabla += "<option>Rechazada</option>";
                                                }
                                                else if (devolverNombreEstado(datosRecibidos[i].status) == 'Aceptada') {
                                                    datosTabla += "<option>Pendiente</option>";
                                                    datosTabla += "<option selected='true'>Aceptada</option>";
                                                    datosTabla += "<option>Rechazada</option>";
                                                }
                                                else {
                                                    datosTabla += "<option>Pendiente</option>";
                                                    datosTabla += "<option>Aceptada</option>";
                                                    datosTabla += "<option selected='true'>Rechazada</option>";
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
      $('tbody tr div').slideUp();
      $('tbody tr td > img').css('transform', 'none');
      $('tbody tr > td > img').css('transform', 'none');
      if (shown) {
        preguntaId = -1;
        $('tbody tr:nth-child('+index+') div').slideUp();
        $('#tabla').css('height', '100vh');
      }
      else {
        preguntaId = parent.data('value');
        $('tbody tr:nth-child('+index+') > td > img').css('transform', 'rotate(180deg)');
        $('tbody tr:nth-child('+index+') div').slideDown();
        $('#tabla').css('height', '140vh');
      }
    });

    $('tbody').on("click", ".modificar", function()
    {
      if (preguntaId != -1) {
        $(location).attr('href', 'crearPreguntas.php?id='+preguntaId);
      }
    });

    $(document).on('change','#selectEstado',function()
    {
        var parent = $(this).parent().parent();
        var idPregunta = parent.data('value');
        var estado = $(this).val();
        console.log(idPregunta+" "+estado);
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
