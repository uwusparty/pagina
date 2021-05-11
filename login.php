<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Iniciar sesión en TriviAlmi</h1>
        </div>
        <div id='centro'>
            <form action="#" method="post">
                <div>
                    <label for="username">Usuario o correo electrónico: </label>
                    <input type="text" name="username" id="username">
                    <label for="password">Contraseña: </label>
                    <input type="password" name="password" id="password">
                    <input type="button" value="Iniciar sesión">
                </div>
            </form>
            <div class="floatClear"></div>
        </div>
    </div>
    <?php
        pie();
    ?>
</body>
</html>