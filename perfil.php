<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="stylesheet" href="css/comun.css">
    <link rel="stylesheet" href="css/perfil.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <?php
        include "funciones.php";
        include "comun.php";
        encabezado();
        if (isset( $_SESSION["id_user"] ) == false)
        {
          header("location: index.php");
        }
    ?>
    <div id='cuerpo'>
        <div id='portada'>
            <h1>Perfil</h1>
        </div>
        <div id='centro'>
            <form id="formulario" action="perfilComprobar.php" method="post" enctype="multipart/form-data">
              <?php
                $usuario = getUsuarioByNombre($_SESSION['username']);
                echo "<div id='divPfp'>";
                  echo "<img src='resources/pfp";
                  if ($usuario['pfp']) {
                    echo "/".$usuario['pfp'];
                  }
                  else {
                    echo ".png";
                  }
                  echo "' alt='' id='imgPfp'>";
                  echo "<input type='file' name='pfp' id='pfp' accepts='image/*' disabled>";
                echo "</div>";
                echo "<div id='divText'>";
                  echo "<label for='username'>Nombre de usuario: </label>";
                  echo "<input type='text' name='username' id='username' value='".$usuario['username']."' disabled><br>";
                  echo "<label for='birthdate'>Fecha de nacimiento: </label>";
                  echo "<input type='date' name='birthdate' id='birthdate' value='".$usuario['birthdate']."' disabled><br>";
                  echo "<label for='password'>Contraseña: </label>";
                  echo "<input type='password' name='password' id='password' value='".$usuario['password']."' disabled><br>";
                  echo "<div id='formError'></div>";
                  echo "<input type='submit' value='Editar perfil' id='submit'>";
                echo "</div>";
              ?>
              <div class="floatClear"></div>
            </form>
        </div>
    </div>
    <?php
        pie();
    ?>
    <script src="js\jquery-3.6.0.min.js"></script>
    <script src="js\perfil.js"></script>
</body>
</html>
