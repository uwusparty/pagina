$(document).ready(function ()
{
    peticionAjax("top10suma");

    $('#categorias').change(function (e)
    {
        peticionAjax($(this).val());
    });
});

function peticionAjax(nombreFuncion)
{
    $.ajax
    (
        {
        type: "post",
        url: "servicios.php",
        data: {'function':nombreFuncion},
        success: function (response)
        {
            datos = $.parseJSON(response);
            cambiarDatosTabla(datos);
        }
    });
}

function cambiarDatosTabla(datos)
{
    var insertarHTML = "";

    for (let index = 0; index < datos.length; index++)
    {
        insertarHTML+= "<tr>";
            insertarHTML+= "<td>";
                insertarHTML+= datos[index].username;
            insertarHTML+= "</td>";
            insertarHTML+= "<td>";
                insertarHTML+= datos[index].totalPuntos;
            insertarHTML+= "</td>";
            insertarHTML+= "<td>";
                insertarHTML+= datos[index].numPartidas;
            insertarHTML+= "</td>";
        insertarHTML+= "</tr>";
    }

    $('tbody').html(insertarHTML);
}