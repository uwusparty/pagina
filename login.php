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
            <h1>Iniciar sesión</h1>
        </div>
        <div id='centro'>
            <form id="formulario" action="loginComprobar.php" method="post">
                <div>
                    <?php
                        echo "<label for='username'>Usuario o correo electrónico: </label>";
                        echo "<input type='text' name='username' id='username'";
                        if (isset($_GET['err']) == true) {
                          echo "value='".$_GET['err']."'";
                        }
                        echo ">";
                        echo "<label for='password'>Contraseña: </label>";
                        echo "<input type='password' name='password' id='password'>";
                        if (isset($_GET['err']) == true) {
                            echo "<div id='formError'>";
                                echo "<p>La combinación del usuario y la contraseña no coinciden con ninguna cuenta existente.</p>";
                            echo "</div>";
                        }
                     ?>
                    <input type="submit" value="Iniciar sesión">
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
