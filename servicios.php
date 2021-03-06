<?php

if(isset($_SERVER['HTTP_ORIGIN']))
{
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");
}
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
{
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
header('Content-Type: application/JSON');

$function = $_POST['function'];
include 'funciones.php';
if($function == 'getUsuarioByCorreo')
{
  $usuario = getUsuarioByCorreo($_POST['correo']);
  $usuarioJson = json_encode($usuario, JSON_UNESCAPED_UNICODE);
  echo $usuarioJson;
}
else if ($function == 'getUsuarioByNombre')
{
  $usuario = getUsuarioByNombre($_POST['username']);
  $usuarioJson = json_encode($usuario, JSON_UNESCAPED_UNICODE);
  echo $usuarioJson;
}
else if($function == 'getCurrentId')
{
    session_start();
    echo $_SESSION['id_user'];
}
else if($function == 'isAdmin')
{
    session_start();
    if ($_SESSION['id_rol'] == 2)
    {
        echo true;
    }
    else
    {
        echo false;
    }
}
else if($function == 'deleteUsuario')
{
    session_start();
    deleteUsuario($_SESSION['id_user']);
    echo 1;
}
else if($function == 'top10suma')
{
    $top = getTop10Suma();
    $topDevolver = json_encode($top, JSON_UNESCAPED_UNICODE);
    echo $topDevolver;
}
else if($function == 'top10avg')
{
    $top = getTop10Avg();
    $topDevolver = json_encode($top, JSON_UNESCAPED_UNICODE);
    echo $topDevolver;
}
else if($function == 'top10partidasjugadas')
{
    $top = getTop10PartidasJugadas();
    $topDevolver = json_encode($top, JSON_UNESCAPED_UNICODE);
    echo $topDevolver;
}

?>
