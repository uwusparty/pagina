<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/consultarPreguntas.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
        if (isset( $_SESSION["id_user"] ) == false)
        {
          header("location: index.php");
        }
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Preguntas</h1>
        </div>
        <div id='filtros'>
            <label for="categorias">Categorias: </label>
            <select name="categorias" id="categorias">
                <option value="All">Todas</option>
            </select>
        </div>
        <div id='tabla'>
            <div id="numPaginas">
                <h3>Seleccionar página</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Pregunta</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <div class="floatClear"></div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\consultarPreguntas.js"></script>
</body>
</html>
