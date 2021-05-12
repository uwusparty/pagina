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
            <p> EL PERFIL ESTARÍA AQUI </p>
            <?php
            ?>
        </div>
    </div>
    <?php
        pie();
    ?>
</body>
</html>
