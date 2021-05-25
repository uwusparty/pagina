$(document).ready(function ()
{
    $.ajax
    (
        {
        type: "post",
        url: "servicios.php",
        data: {'function':"top10suma"},
        success: function (response)
        {
            usuarios = $.parseJSON(response);
            console.log(usuarios);
            var insertarHTML = "";

            for (let index = 0; index < usuarios.length; index++)
            {
                insertarHTML+= "<tr>";
                    insertarHTML+= "<td>";
                        insertarHTML+= usuarios[index].username
                    insertarHTML+= "</td>";
                    insertarHTML+= "<td>";
                        insertarHTML+= usuarios[index].totalPuntos
                    insertarHTML+= "</td>";
                    insertarHTML+= "<td>";
                        insertarHTML+= usuarios[index].numPartidas
                    insertarHTML+= "</td>";
                insertarHTML+= "</tr>";
            }

            $('tbody').html(insertarHTML);
        }
    });

    $('#categorias').change(function (e)
    {
        console.log($(this).val());
    });
});