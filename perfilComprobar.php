<?php
    //Llamamos a la función registro para registrar un usuario, la función nos devolverá el id del usuario creado
    include "funciones.php";
    session_start();

    $nuevo_nombre = $_SESSION['pfp'];
    if(isset($_FILES['pfp']))
    {
        $temporal = $_FILES['pfp']['tmp_name'];
        $nombre_archivo = $_FILES["pfp"]["name"];

        $nuevo_nombre = $_SESSION['id_user'] . ".jpg";

        $carpeta = "resources/pfp/";
        $destinoPHP = $carpeta . $nuevo_nombre;
        move_uploaded_file($temporal, $destinoPHP);
    }
    $datos= modificar($_POST['username'], $_POST['birthdate'], $_POST['password'], $nuevo_nombre, $_SESSION['id_user']);
    $_SESSION['username'] = $datos['username'];
    $_SESSION['pfp'] = $datos['pfp'];
    header("location: perfil.php");
?>
