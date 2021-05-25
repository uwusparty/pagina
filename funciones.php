<?php
function bbdd()
{
    $ip = "192.168.6.216";
    //$ip = "88.7.26.83";
    //En el servidor de mariadb hemos cambiado /etc/mysql/mariadb.conf.d/50-server.cnf
    $mysqli = new mysqli($ip, "almi", "Almi123", "trivialmi");
    if ($mysqli->connect_errno)
    {
        printf("Conexión fallida: %s\n", $mysqli->connect_error);
        exit();
    }

    //Línea para que se muestren las tildes
    $mysqli->set_charset("utf8");
    return $mysqli;
}

function registro($email, $username, $password, $birthdate)
{
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("INSERT INTO users (email, username, password, birthdate) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $username, $password, $birthdate);
    $stmt->execute();

    $datos = array
    (
        "id_user" => $mysqli->insert_id,
        "username" => $username,
        "pfp" => "resources/pfp.png",
        "id_rol" => 1
    );

    $mysqli->close();
    return $datos;
}

function getUsuarioByCorreo($mail)
{
  $mysqli = bbdd();
  $stmt=$mysqli->prepare("SELECT id_user, email, username, password, birthdate, pfp FROM users WHERE email = ?");
  $stmt->bind_param("s", $mail);
  $stmt->execute();
  $id_user = -1;
  $email = "";
  $username = "";
  $password = "";
  $birthdate = "";
  $pfp = "";
  $stmt->bind_result($id_user, $email, $username, $password, $birthdate, $pfp);

  $resultado = array();

  if($stmt->fetch())
  {
      $resultado = array(
          'id_user' => $id_user,
          'email' => $email,
          'username' => $username,
          'password' => $password,
          'birthdate' => $birthdate,
          'pfp' => $pfp
      );
  }
  $mysqli->close();
  return $resultado;
}

function getUsuarioByNombre($name)
{
  $mysqli = bbdd();
  $stmt=$mysqli->prepare("SELECT id_user, email, username, password, birthdate, pfp FROM users WHERE username = ?");
  $stmt->bind_param("s", $name);
  $stmt->execute();
  $id_user = -1;
  $email = "";
  $username = "";
  $password = "";
  $birthdate = "";
  $pfp = "";
  $stmt->bind_result($id_user, $email, $username, $password, $birthdate, $pfp);

  $resultado = array();

  if($stmt->fetch())
  {
      $resultado = array(
          'id_user' => $id_user,
          'email' => $email,
          'username' => $username,
          'password' => $password,
          'birthdate' => $birthdate,
          'pfp' => $pfp
      );
  }
  $mysqli->close();
  return $resultado;
}


function loginCorreo($mail, $pw)
{
  $mysqli = bbdd();
  $stmt=$mysqli->prepare("SELECT id_user, email, username, password, birthdate, pfp, id_rol FROM users WHERE email = ? AND password = ?");
  $stmt->bind_param("ss", $mail, $pw);
  $stmt->execute();
  $id_user = -1;
  $id_rol = -1;
  $email = "";
  $username = "";
  $password = "";
  $birthdate = "";
  $pfp = "";
  $stmt->bind_result($id_user, $email, $username, $password, $birthdate, $pfp, $id_rol);

  $resultado = array();

  if($stmt->fetch())
  {
      $resultado = array(
          'id_user' => $id_user,
          'email' => $email,
          'username' => $username,
          'password' => $password,
          'birthdate' => $birthdate,
          'pfp' => $pfp,
          'id_rol' => $id_rol
      );
  }
  $mysqli->close();
  return $resultado;
}

function loginNombre($name, $pw)
{
  $mysqli = bbdd();
  $stmt=$mysqli->prepare("SELECT id_user, email, username, password, birthdate, pfp, id_rol FROM users WHERE username = ? AND password = ?");
  $stmt->bind_param("ss", $name, $pw);
  $stmt->execute();
  $id_user = -1;
  $id_rol = -1;
  $email = "";
  $username = "";
  $password = "";
  $birthdate = "";
  $pfp = "";
  $stmt->bind_result($id_user, $email, $username, $password, $birthdate, $pfp, $id_rol);

  $resultado = array();

  if($stmt->fetch())
  {
      $resultado = array(
          'id_user' => $id_user,
          'email' => $email,
          'username' => $username,
          'password' => $password,
          'birthdate' => $birthdate,
          'pfp' => $pfp,
          'id_rol' => $id_rol
      );
  }
  $mysqli->close();
  return $resultado;
}

function modificar($username, $birthdate, $password, $pfp, $id_user)
{
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("UPDATE users SET username=?, birthdate=?, password=?, pfp=? WHERE id_user = ?");
    $stmt->bind_param("ssssi", $username, $birthdate, $password, $pfp, $id_user);
    $stmt->execute();

    $datos = array
    (
        "username" => $username,
        "pfp" => $pfp
    );

    $mysqli->close();
    return $datos;
}

function deleteUsuario($id_user)
{
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("DELETE FROM users WHERE id_user = ?");
    $stmt->bind_param("i", $id_user);
    $stmt->execute();

    $mysqli->close();
    return 1;
}
