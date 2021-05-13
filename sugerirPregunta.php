<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/sugerirPregunta.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Sugerir pregunta</h1>
        </div>
        <div id='tabla'>
            <table>
                <tr>
                    <th>Pregunta</th>
                    <th>Estado</th>
                </tr>
                <tr>
                    <td>¿Preguntaaa?</td>
                    <td>Aceptado</td>
                </tr>
                <tr>
                    <td>¿Preguntaaa?</td>
                    <td>Aceptado</td>
                </tr>
                <tr>
                    <td>¿Preguntaaa?</td>
                    <td>Aceptado</td>
                </tr>
                <tr>
                    <td>¿Preguntaaa?</td>
                    <td>Aceptado</td>
                </tr>
            </table>
        </div>
    </div>
    <?php
        pie();
    ?>
</body>
</html>
