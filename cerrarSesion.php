<?php
  session_start();
  unset($_SESSION['id_user']);
  unset($_SESSION['username']);
  unset($_SESSION['pfp']);
  header("location: index.php");
 ?>
