$(document).ready(function ()
{
    $.ajax
    (
        {
            type: "get",
            url: "http://192.168.6.218:8080/trivialmi/questions/categories",
            success: function (response)
            {
                categorias = response.data;
                console.log(categorias);

                $('#categoriaes').append("<option id='removees'></option>");
                for (let i = 0; i < categorias.length; i++)
                {
                    $('#categoriaes').append("<option>"+categorias[i].es+"</option>");
                }

                $('#categoriaen').append("<option id='removeen'></option>");
                for (let i = 0; i < categorias.length; i++)
                {
                    $('#categoriaen').append("<option>"+categorias[i].en+"</option>");
                }
            }
        }
    );

    $('#categoriaes').change(function(e)
    {
        $("#categoriaen").prop('selectedIndex', $("#categoriaes").prop('selectedIndex'));
        $('#removees').remove();
        $('#removeen').remove();
    });

    $('#categoriaen').change(function()
    {
        $("#categoriaes").prop('selectedIndex', $("#categoriaen").prop('selectedIndex'));
        $('#removees').remove();
        $('#removeen').remove();
    });

    $('.selectWindow div').click(function(e)
    {
        $(this).parent().children('div').children('h3').css("color", "black");
        $(this).children('h3').css("color", "indianred");
        var selectedWindow = $(this).children('h3').attr('id');

        if(selectedWindow == 'esp')
        {
            $('#es').clearQueue();
            $('#en').fadeOut(function()
            {
                $('#es').fadeIn();
            });
        }
        else if(selectedWindow == 'eng')
        {
            $('#en').clearQueue();
            $('#es').fadeOut(function()
            {
                $('#en').fadeIn();
            });
        }
    });

    $('#enviar').click(function(e)
    {
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

        if($('#imagen').prop("files")[0] == null)
        {
            htmlError = "<p>Imagen relacionada con la pregunta no seleccionada.</p>";
            $("#formError").append(htmlError); 
            enviar = false;
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
                        console.log(idUsuario);

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
                            "image_url": $('#imagen').val(),
                            "correct": {
                                "en": $('#correctaen').val(),
                                "es": $('#correctaes').val(),
                                "times": 0
                            },
                            "incorrects": [
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
                                type: "post",
                                url: "http://192.168.6.218:8080/trivialmi/questions/create",
                                data: jsonPregunta,
                                success: function (response)
                                {
                                    console.log(response);
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