<?php
    //Llamamos a la función registro para registrar un usuario, la función nos devolverá el id del usuario creado 
    include "funciones.php";
    $datos= registro($_POST['email'], $_POST['username'], $_POST['password'], $_POST['birthdate']);
    session_start();
    $_SESSION['id_user'] = $datos['id_user'];
    $_SESSION['username'] = $datos['username'];
    $_SESSION['pfp'] = $datos['pfp'];
    header("location: index.php");
?>