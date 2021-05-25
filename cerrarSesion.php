<?php
  session_start();
  unset($_SESSION['id_user']);
  unset($_SESSION['username']);
  unset($_SESSION['pfp']);
  unset($_SESSION['id_rol']);
  header("location: index.php");
 ?>
