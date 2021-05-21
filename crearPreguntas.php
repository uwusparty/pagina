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
        if (isset( $_SESSION["id_user"] ) == false)
        {
          header("location: index.php");
        }
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Crear Preguntas</h1>
        </div>
        <?php
            if(isset($_GET['sc']))
            {
                echo "<p id='correcto'>Pregunta sugerida correctamente. Espere a que un administrador la acepte/rechace.</p>";
            }
        ?>
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

            <form id='formPreguntas' method='post' action='crearPreguntasComprobar.php' enctype="multipart/form-data">
                <div id="es" class='window'>
                    <label for="categoriaes">Categoría: </label>
                    <select name="categoriaes" id="categoriaes"></select>

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
                    <label for="categoriaen">Category: </label>
                    <select name="categoriaen" id="categoriaen"></select>

                    <label for="preguntaen">Question: </label>
                    <input type="text" name="preguntaen" id="preguntaen">

                    <label for="correctaen">Correct answer: </label>
                    <input type="text" name="correctaen" id="correctaen">

                    <label for="incorrectaen">Wrong answers: </label>
                    <input type="text" name="incorrectaen1" id="incorrectaen1"/>
                    <input type="text" name="incorrectaen2" id="incorrectaen2"/>
                    <input type="text" name="incorrectaen3" id="incorrectaen3"/>
                </div>

                <div id='noCambia'>
                    <label for="imagen">Imagen: </label>
                    <input type='file' name='imagen' id='imagen' accept='image/*'>
                    <input type="hidden" id='imagenname' name='imagenname' value='<?=$nombreImagen = str_replace(".", "", str_replace(" ", "", microtime()));?>'>
                    <input type="submit" value="Enviar pregunta" id='enviar'>
                    <!-- <button id='enviar'>Enviar pregunta</button> -->
                    <div id="formError"></div>
                </div>
            </form>
            <div class="floatClear"></div>
        </div>
    </div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\crearPreguntas.js"></script>
</body>
</html>
