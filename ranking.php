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
            <div id='filtros'>
                <label for="categorias">Mostrar: </label>
                <select name="categorias" id="categorias">
                    <option value="top10suma">Puntuación total</option>
                    <option value="top10partidasjugadas">Partidas jugadas</option>
                    <option value="top10avg">Puntación media</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Puntuación</th>
                        <th>Núm. Partidas</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\ranking.js"></script>
</body>
</html>
