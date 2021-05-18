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
                    //$('#categoriaes').append("<option>"+categorias[i].es+"</option>");
                    $('#categoriaes').append("<option>"+categorias[i]+"</option>");
                }

                $('#categoriaen').append("<option id='removeen'></option>");
                for (let i = 0; i < categorias.length; i++)
                {
                    //$('#categoriaen').append("<option>"+categorias[i].en+"</option>");
                    $('#categoriaen').append("<option>"+categorias[i]+"</option>");
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
});