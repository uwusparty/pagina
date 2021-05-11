<?php
function bbdd()
{
    $ip = "192.168.6.216";
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
    $mysqli->close();

    $datos = array
    (
        "id_user" => mysql_insert_id(),
        "username" => $username,
        "pfp" => "resources/pfp.png"
    );

    return $datos;
}