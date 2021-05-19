<?php
    include "funciones.php";
    session_start();
    $nombreImagen = str_replace(".", "", str_replace(" ", "", microtime()));
    var_dump($nombreImagen);
    
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

     

    //header("location: perfil.php");
?>
