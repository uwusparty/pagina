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

        if(!enviar)
        {
            e.preventDefault();
        }
    });
});