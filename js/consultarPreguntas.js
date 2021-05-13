$(document).ready(function()
{
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
                console.log(response);
                var recibido = $.parseJSON(response);
                $.ajax
                (
                    {
                        type: "get",
                        url: "http://192.168.6.218:8080/trivialmi/questions/id/"+recibido,
                        success: function (response1)
                        {
                            //var respuesta = $.parseJSON(response1);
                            var arrayDatos = response1.data;
                            console.log(response1.data);
                            for (let index = 0; index < arrayDatos.length; index++) {
                                var element = arrayDatos[index];
                                var insertarFila = "";
                                insertarFila += "<tr>";
                                    insertarFila += "<td>";
                                        insertarFila += element.question.en;
                                    insertarFila += "</td>";
                                    insertarFila += "<td>";
                                        if(element.status == 1)
                                        {
                                            insertarFila += "Aceptada";
                                        }
                                        else if(element.status == 0)
                                        {
                                            insertarFila += "Pendiente";
                                        }
                                        else if(element.status == -1)
                                        {
                                            insertarFila += "Rechazada";
                                        }
                                    insertarFila += "</td>";
                                insertarFila += "</tr>";
                                $('#tabla table').append(insertarFila);
                            }
                        }
                    }
                );
            }
        }
    );
});