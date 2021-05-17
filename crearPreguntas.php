<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/crearPreguntas.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Crear Preguntas</h1>
        </div>
        <div id='centro'>

            <div class="selectWindow">
                <div>
                    <h3 id='esp'>Español</h3>
                </div>
                <div>
                    <h3 id='eng'>Inglés</h3>
                </div>
            </div>
            <div class="floatClear"></div>

            <div id="es" class='window'>
                <label for="preguntaes">Pregunta: </label>
                <input type="text" name="preguntaes" id="preguntaes">

                <label for="correctaes">Respuesta correcta: </label>
                <input type="text" name="correctaes" id="correctaes">

                <label for="incorrectaes">Respuestas incorrectas: </label>
                <input type="text" name="incorrectaes1" id="incorrectaes1"/>
                <input type="text" name="incorrectaes2" id="incorrectaes2"/>
                <input type="text" name="incorrectaes3" id="incorrectaes3"/>
            </div>

            <div id="en" class='window'>
                <p>bastante xd todo</p>
            </div>
            <!-- 
            <label for="categoria">Categoría: </label>
            <label for="imagen">Imagen: </label>

            <div>
                <label for="preguntaen">Pregunta (Inglés): </label>
            </div>

            <div>
                <label for="correctaes">Respuesta correcta (Español): </label>
                <label for="correctaes">Respuesta correcta (Inglés): </label>
            </div>
            -->

        </div>
    </div>
    <div class="floatClear"></div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\crearPreguntas.js"></script>
</body>
</html>
