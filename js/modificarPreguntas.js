$(document).ready(function ()
{
    //var ip = ""+ip+"";
    var ip = "88.7.26.83";
    var url = window.location.href;
    var idPregunta = url.substring(url.search("id=")+3, url.length);
    $.ajax
    (
        {
            type: "get",
            url: "http://"+ip+":8080/trivialmi/questions/categories",
            success: function (response)
            {
                categorias = response.data;
                for (let i = 0; i < categorias.length; i++)
                {
                    $('#categoriaes').append("<option>"+categorias[i].es+"</option>");
                }

                for (let i = 0; i < categorias.length; i++)
                {
                    $('#categoriaen').append("<option>"+categorias[i].en+"</option>");
                }

                $.ajax
                (
                    {
                        type: "get",
                        url: "http://"+ip+":8080/trivialmi/questions/"+idPregunta,
                        success: function (response)
                        {
                            var datos = response.data;

                            $('#categoriaen :selected').text(datos.category.en);
                            $('#categoriaes :selected').text(datos.category.es);

                            $('#preguntaen').val(datos.question.en);
                            $('#preguntaes').val(datos.question.es);

                            var nombreImagen = datos.image_url.substring(datos.image_url.search("/")+1, datos.image_url.search(".jpg"));
                            console.log(nombreImagen);

                            $('#imagenname').val(nombreImagen);

                            $('#correctaen').val(datos.correct.en);
                            $('#correctaes').val(datos.correct.en);

                            $('#incorrectaen1').val(datos.incorrects[0].en);
                            $('#incorrectaes1').val(datos.incorrects[0].es);

                            $('#incorrectaen2').val(datos.incorrects[1].en);
                            $('#incorrectaes2').val(datos.incorrects[1].es);

                            $('#incorrectaen3').val(datos.incorrects[2].en);
                            $('#incorrectaes3').val(datos.incorrects[2].es);
                        }
                    }
                );
            }
        }
    );

    $('#categoriaes').change(function(e)
    {
        $("#categoriaen").prop('selectedIndex', $("#categoriaes").prop('selectedIndex'));
    });

    $('#categoriaen').change(function()
    {
        $("#categoriaes").prop('selectedIndex', $("#categoriaen").prop('selectedIndex'));
    });

    $('.selectWindow div').click(function(e)
    {
        $(this).parent().children('div').children('h3').css("color", "black");
        $(this).children('h3').css("color", "indianred");
        var selectedWindow = $(this).children('h3').attr('id');
        $('#es').finish();
        $('#en').finish();
        if(selectedWindow == 'esp')
        {
            $('#en').fadeOut(100, function()
            {
                $('#es').fadeIn();
            });
        }
        else if(selectedWindow == 'eng')
        {
            $('#es').fadeOut(100, function()
            {
                $('#en').fadeIn();
            });
        }
    });

    $('form').submit(function (e)
    {
        var formulario = this;
        e.preventDefault();
        var enviar = true;
        var htmlError = "";
        $("#formError").html("");
        //Controlo todos los inputs en los que el usuario escribe
        $('.window').children('input[type="text"]').each(function()
        {
            if($(this).val().trim() == "")
            {
                $(this).css("background", "red");
                enviar = false;
            }
            else
            {
                $(this).css("background", "white");
            }
        });

        if(!enviar)
        {
            htmlError = "<p>Faltan campos por rellenar.</p>";
            $("#formError").append(htmlError);
        }

        if($("#categoriaes :selected").text() == "")
        {
            htmlError = "<p>Categoría no seleccionada.</p>";
            $("#formError").append(htmlError);
            enviar = false;
        }

        var nombre_imagen = "";
        if($('#categoriaes').val().includes(" "))
        {
            nombre_imagen = $('#categoriaes').val().toLowerCase().substring(0, $('#categoriaes').val().toLowerCase().indexOf(" ", 0))+"/"+$('#imagenname').val()+".jpg";
        }
        else
        {
            nombre_imagen = $('#categoriaes').val().toLowerCase()+"/"+$('#imagenname').val()+".jpg"
        }

        if(enviar)
        {
            $.ajax
            (
                {
                    type: "post",
                    url: "servicios.php",
                    data: {'function':'getCurrentId'},
                    success: function (response)
                    {
                        var idUsuario = $.parseJSON(response);

                        jsonPregunta =
                        {
                            "category":
                            {
                                "en": $('#categoriaen :selected').text(),
                                "es": $('#categoriaes :selected').text()
                            },
                            "question": {
                                "en": $('#preguntaen').val(),
                                "es": $('#preguntaes').val()
                            },
                            "id_author": idUsuario,
                            "status": -1,
                            "image_url": nombre_imagen,
                            "correct": {
                                "en": $('#correctaen').val(),
                                "es": $('#correctaes').val(),
                                "times": 0
                            },
                            "incorrects":
                            [
                                {
                                    "en": $('#incorrectaen1').val(),
                                    "es": $('#incorrectaes1').val(),
                                    "times": 0
                                },
                                {
                                    "en": $('#incorrectaen2').val(),
                                    "es": $('#incorrectaes2').val(),
                                    "times": 0
                                },
                                {
                                    "en": $('#incorrectaen3').val(),
                                    "es": $('#incorrectaes3').val(),
                                    "times": 0
                                }
                            ]
                        }

                        $.ajax
                        (
                            {
                                type: "put",
                                url: "http://"+ip+":8080/trivialmi/questions/edit/id/"+idPregunta,
                                data: jsonPregunta,
                                success: function (response)
                                {
                                    if($('#imagen').prop("files")[0] != null)
                                    {
                                        formulario.submit();
                                    }
                                    else
                                    {
                                        $(location).attr('href', 'consultarPreguntas.php');
                                    }
                                },
                                error: function (err)
                                {
                                    console.log(err);
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});
