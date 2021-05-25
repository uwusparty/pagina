<?php
  session_start();
  include "funciones.php";
  if (strpos($_POST['username'], "@")) {
    $datos = loginCorreo($_POST['username'], $_POST['password']);
  }
  else {
    $datos = loginNombre($_POST['username'], $_POST['password']);
  }
  if(sizeof($datos) == 0)
  {
    header("location: login.php?err=".$_POST['username']);
  }
  else
  {
    $_SESSION['id_user'] = $datos['id_user'];
    $_SESSION['username'] = $datos['username'];
    $_SESSION['pfp'] = $datos['pfp'];
    $_SESSION['id_rol'] = $datos['id_rol'];
    header("location: index.php");
  }
 ?>
