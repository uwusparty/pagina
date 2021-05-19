$(document).ready(function()
{
    var limite = 8;
    var idUsuario = -99;
    var categoriaSel = "All";
    //Llenamos el Select con Options que van a ser las categorías de las preguntas de la base de datos de mongo
    $.ajax
    (
        {
            type: "get",
            url: "http://192.168.6.218:8080/trivialmi/questions/categories",
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
                        url: "http://192.168.6.218:8080/trivialmi/questions/id/"+idUsuario+"/category/All/quantity",
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
                        url: "http://192.168.6.218:8080/trivialmi/questions/id/"+idUsuario+"/limit/"+limite,
                        success: function (response1)
                        {
                            var arrayDatos = response1.data;
                            for (let index = 0; index < arrayDatos.length; index++)
                            {
                                var element = arrayDatos[index];
                                var insertarFila = "";
                                insertarFila += "<tr>";
                                    insertarFila += "<td>";
                                        insertarFila += element.question.en;
                                    insertarFila += "</td>";
                                    insertarFila += "<td>";
                                        insertarFila += devolverNombreEstado(element.status);
                                    insertarFila += "</td>";
                                insertarFila += "</tr>";
                                $('tbody').append(insertarFila);
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
                url: "http://192.168.6.218:8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/quantity",
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
                }
            }
        );

        $.ajax
        (
            {
                type: "get",
                url: "http://192.168.6.218:8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/0",
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";
                    console.log(datosRecibidos);

                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr>";
                            datosTabla += "<td>";
                                datosTabla += datosRecibidos[i].question.en;
                            datosTabla += "</td>";
                            datosTabla += "<td>";
                                datosTabla += devolverNombreEstado(datosRecibidos[i].status);
                            datosTabla += "</td>";
                        datosTabla += "</tr>";
                    }
                    $('tbody').html(datosTabla);
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
                url: "http://192.168.6.218:8080/trivialmi/questions/id/"+idUsuario+"/category/"+categoriaSel+"/limit/"+limite+"/offset/"+offset,
                success: function (response)
                {
                    var datosRecibidos = response.data;
                    var datosTabla = "";

                    for (let i = 0; i < datosRecibidos.length; i++)
                    {
                        datosTabla += "<tr>";
                            datosTabla += "<td>";
                                datosTabla += datosRecibidos[i].question.en;
                            datosTabla += "</td>";
                            datosTabla += "<td>";
                                datosTabla += devolverNombreEstado(datosRecibidos[i].status);
                            datosTabla += "</td>";
                        datosTabla += "</tr>";
                    }
                    $('tbody').html(datosTabla);
                }
            }
        );
    });

    function devolverNombreEstado(numEstado)
    {
        var nombreEstado = null;
        if(numEstado == 1)
        {
            nombreEstado = "Aceptada";
        }
        else if(numEstado == 0)
        {
            nombreEstado = "Pendiente";
        }
        else if(numEstado == -1)
        {
            nombreEstado = "Rechazada";
        }
        return nombreEstado;
    }
});
