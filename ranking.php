<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/ranking.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Ranking</h1>
        </div>
        <div id='tabla'>
            <div id="numPaginas">
                <h3>Filtrar por:</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Puntuación</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <?php
        pie();
    ?>
</body>
</html>
