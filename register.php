<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/loginRegister.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "comun.php";
        encabezado();
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Crear una cuenta</h1>
        </div>
        <div id='centro'>
            <form id="formulario" action="registerComprobar.php" method="post">
                <div>
                    <label for="email">Correo electrónico: </label>
                    <input type="email" name="email" id="email">
                    <label for="username">Usuario: </label>
                    <input type="text" name="username" id="username">
                    <label for="password">Contraseña: </label>
                    <input type="password" name="password" id="password">
                    <label for="repassword">Repetir contraseña: </label>
                    <input type="password" name="repassword" id="repassword">
                    <label for="birthdate">Fecha de nacimiento: </label>
                    <input type="date" name="birthdate" id="birthdate">
                    <input type="submit" value="Registrar">
                </div>
            </form>
            <div class="floatClear"></div>
        </div>
    </div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\register.js"></script>
</body>
</html>
