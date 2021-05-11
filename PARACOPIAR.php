<?php
function bbdd()
{
    $mysqli = new mysqli("localhost", "admin", "Almi123", "topbbdd");
    if ($mysqli->connect_errno)
    {
        printf("Conexión fallida: %s\n", $mysqli->connect_error);
        exit();
    }  

    //Línea para que se muestren las tildes
    $mysqli->set_charset("utf8");
    return $mysqli;
}

function registro($usuario, $contrasena, $nombre, $apellido, $email)
{
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("INSERT INTO usuario (usuario, contrasena, nombre, apellido, email) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $usuario, $contrasena, $nombre, $apellido, $email);
    $stmt->execute();
    $mysqli->close();
    return id_actual($usuario);
}

function id_actual($usuario)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT id_usuario FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    
    $id_usuario = -1;

    $stmt->bind_result($id_usuario);
    $resultado = array();

    if($stmt->fetch())
    {
        $resultado = array(
            'id_usuario' => $id_usuario
        );
    }

    $mysqli->close();
    return $resultado;
}

function sesion($usuario, $contrasena)
{
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?");
    $stmt->bind_param("ss", $usuario, $contrasena);
    $stmt->execute();
    $id_usuario = -1;
    $usuario = "";
    $contrasena = "";
    $nombre = "";
    $apellido = "";
    $email = "";
    $stmt->bind_result($id_usuario, $usuario, $contrasena, $nombre, $apellido, $email);

    $resultado = array();

    if($stmt->fetch())
    {
        $resultado = array(
            'id_usuario' => $id_usuario,
            'usuario' => $usuario,
            'contrasena' => $contrasena,
            'nombre' => $nombre,
            'apellido' => $apellido,
            'email' => $email
        );
    }

    $mysqli->close();
    return $resultado;
}

function noticia($titulo, $resumen, $texto, $imagen, $tags)
{
    $idNot = -1;
    $idTag = -1;
    //session_start();
    $mysqli = bbdd();
    $stmt=$mysqli->prepare("INSERT INTO noticia (titulo, texto, imagen, resumen, id_usuario) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $titulo, $texto, $imagen, $resumen, $_SESSION['id_usuario']);
    $stmt->execute();
    $idNot = mysqli_insert_id($mysqli);
    $stmt->free_result();

    $tags = str_replace(" ", "", explode(",", strtolower($_POST['tags'])));
    $cantidadTags = sizeof($tags);
    for ($i=0; $i < $cantidadTags; $i++)
    { 
        $tagSel = $tags[$i];
        //Miro a ver si existe el tag
        $sentencia = $mysqli->prepare("SELECT id_tag FROM tags WHERE nombre_tag = ?");
        $sentencia->bind_param("s", $tagSel);
        $sentencia->execute();
        $sentencia->bind_result($respuesta);
        
        //Si no existe lo creamos
        if(!$sentencia->fetch())
        {
            $insertar = $mysqli->prepare("INSERT INTO tags (nombre_tag) VALUES (?)");
            $insertar->bind_param("s", $tagSel);
            $insertar->execute();
            $idTag = mysqli_insert_id($mysqli);
            $insertar->free_result();
        }
        //Si existe, nos guardamos el ID
        else
        {
            $idTag = $respuesta;
        }

        $sentencia->free_result();

        //Ahora que el tag existe si o si, lo insertamos en noticias_tag        
        $sentencia = $mysqli->prepare("INSERT INTO noticia_tag (id_noticia, id_tag) VALUES (?, ?)");
        $sentencia->bind_param("ii", $idNot, $idTag);
        $sentencia->execute();
        $sentencia->free_result();
    }

    $mysqli->close();
}

function mostrarNoticias()
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT titulo, imagen, resumen, id_usuario, fecha, id_noticia FROM noticia ORDER BY fecha DESC LIMIT 5");
    $stmt->execute();

    $titulo = "";
    $imagen = "";
    $resumen = "";
    $id_usuario = -1;
    $fecha = "";
    $id_noticia = -1;
    $stmt->bind_result($titulo, $imagen, $resumen, $id_usuario, $fecha, $id_noticia);

    $noticia = array();

    //Poner while cuando devuelven más de un resultado
    while($stmt->fetch())
    {
        $noticia = array(
            'titulo' => $titulo,
            'imagen' => $imagen,
            'resumen' => $resumen,
            'id_usuario' => $id_usuario,
            'fecha' => $fecha,
            'id_noticia' => $id_noticia
        );
        $noticias[] = $noticia;
    }

    $mysqli->close();
    return $noticias;
}

function noticia_id($id_noticia)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT titulo, imagen, id_usuario, DATE_FORMAT(fecha, '%Y-%m-%d %H:%i') as fecha, texto, resumen FROM noticia WHERE id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();

    $titulo = "";
    $imagen = "";
    $id_usuario = -1;
    $fecha = "";
    $texto = "";
    $resumen = "";

    $stmt->bind_result($titulo, $imagen, $id_usuario, $fecha, $texto, $resumen);

    $noticia = array();

    if($stmt->fetch())
    {
        $noticia = array(
            'titulo' => $titulo,
            'imagen' => $imagen,
            'id_usuario' => $id_usuario,
            'fecha' => $fecha,
            'texto' => $texto,
            'resumen' => $resumen
        );
    }

    $mysqli->close();
    return $noticia;
}

function noticia_id_tag($id_noticia)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT noticia_tag.id_tag, tags.nombre_tag FROM noticia_tag INNER JOIN tags ON tags.id_tag = noticia_tag.id_tag WHERE id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();
    $stmt->bind_result($idTag, $nombreTag);

    $tag = array();
    $tags = array();

    while($stmt->fetch())
    {
        $tag = array(
            "idTag" => $idTag,
            "nombreTag" => $nombreTag
        );
        $tags[] = $tag;
    }

    $mysqli->close();
    return $tags;
}

function nombre_autor($id_autor)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT nombre, apellido FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $id_autor);
    $stmt->execute();

    $nombre = "";
    $apellido = "";

    $stmt->bind_result($nombre, $apellido);

    $autor = array();

    if($stmt->fetch())
    {
        $autor = array(
            'nombre' => $nombre,
            'apellido' => $apellido
        );
    }

    $mysqli->close();
    return $autor;
}


function todas_noticias()
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT id_noticia, titulo, texto, imagen, resumen, fecha FROM noticia ORDER BY fecha DESC");
    $stmt->execute();

    $id_noticia = -1;
    $titulo = "";
    $texto = "";
    $imagen = "";
    $resumen = "";
    $fecha = "";

    $stmt->bind_result($id_noticia, $titulo, $texto, $imagen, $resumen, $fecha);
    
    $noticia = array();

    while($stmt->fetch())
    {
        $noticia = array(
            'id_noticia' => $id_noticia,
            'titulo' => $titulo,
            'texto' => $texto,
            'imagen' => $imagen,
            'resumen' => $resumen,
            'fecha' => $fecha
        );
        $noticias[] = $noticia;
    }

    $mysqli->close();
    return $noticias;
}

function modificar($id_noticia, $titulo, $texto, $imagen, $resumen, $tags)
{
    //Update noticia -----
    //Miro si los tags existen, si no existen los creo
    //Quito las relaciones que no sean necesarias de noticia_tag
    //Añado las relaciones necesarias de noticia_tag

    $mysqli = bbdd();
    $stmt = $mysqli->prepare("UPDATE noticia SET titulo = ?, texto = ?, imagen = ?, resumen = ? WHERE id_noticia = ?");
    $stmt->bind_param("ssssi", $titulo, $texto, $imagen, $resumen, $id_noticia);
    $stmt->execute();
    $stmt->free_result();

    //Pongo los tags recibidos en un array
    $arrayTagsRecibidos = explode(",", str_replace(" ", "", strtolower($tags)));

    //Los datos para el bind_param
    $datos = str_repeat("s", sizeof($arrayTagsRecibidos));

    //Preparo las interrogaciones para la sentencia preparada
    $interrogaciones = substr(str_repeat("?,", sizeof($arrayTagsRecibidos)), 0, -1);

    //Tags existentes en la base de datos
    $tagsExisten = array();

    //Miro a ver si existen los tags
    $sqlselect = "SELECT nombre_tag FROM tags WHERE nombre_tag IN (". $interrogaciones .")";
    $stmt = $mysqli->prepare($sqlselect);
    $stmt->bind_param($datos, ...$arrayTagsRecibidos);
    $stmt->execute();
    $stmt->bind_result($nombre);
    while($stmt->fetch())
    {
        $tagsExisten[] = $nombre;
    }

    //Me guardo en tagsCrear los tags que no existan en la bbdd
    $tagsCrear = array_diff($arrayTagsRecibidos, $tagsExisten);
    $interrogacionesInsert = substr(str_repeat("(?),", sizeof($tagsCrear)), 0, -1);
    $tagsCrearCantidad = str_repeat("s", sizeof($tagsCrear));

    //Solo va a entrar aquí cuando haya algún tag que crear
    if($tagsCrear != null)
    {
        $insertar = $mysqli->prepare("INSERT INTO tags (nombre_tag) VALUES " . $interrogacionesInsert);
        $insertar->bind_param($tagsCrearCantidad, ...$tagsCrear);
        $insertar->execute();
        $insertar->free_result();
    }

    //Cogemos todos los id de los tags recibidos para crear la relación
    //Hacemos la misma select de arriba pero en vez de eligiendo los nombres, eligiendo los ID (ahora ya existen todos los tags que el usuario nos ha pasado)
    $tagsId = array();
    $stmt = $mysqli->prepare("SELECT id_tag FROM tags WHERE nombre_tag IN (". $interrogaciones .")");
    $stmt->bind_param($datos, ...$arrayTagsRecibidos);
    $stmt->execute();
    $stmt->bind_result($id);
    while($stmt->fetch())
    {
        $tagsId[] = $id;
    }
    $stmt->free_result();
    
    //Para no complicarme tanto, voy a borrar todas las relaciones que tenga la noticia y voy a insertarlas de 0
    $stmt = $mysqli->prepare("DELETE FROM noticia_tag WHERE id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();
    $stmt->free_result();

    //Ahora inserto todo
    $dobleInterrogacion = substr(str_repeat("(?, ?),", sizeof($tagsId)), 0, -1);
    $idNoticiaRepetido = explode(",", substr(str_repeat($id_noticia.",", sizeof($tagsId)), 0, -1));
    $datosId = str_repeat("ii", sizeof($tagsId));
    $arrayParam = array();

    for ($i=0; $i < sizeof($tagsId) ; $i++)
    { 
        $arrayParam[] = $idNoticiaRepetido[$i];
        $arrayParam[] = $tagsId[$i];
    }

    $stmt = $mysqli->prepare("INSERT INTO noticia_tag (id_noticia, id_tag) VALUES " . $dobleInterrogacion);
    $stmt->bind_param($datosId, ...$arrayParam);
    $stmt->execute();
    $stmt->free_result();

    $mysqli->close();
}

function borrarNoticia($id_noticia)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("DELETE FROM noticia WHERE id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();
    $stmt->close();
}

function usuarioExiste($usuarioRec)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT usuario FROM usuario WHERE usuario = ?");
    $stmt->bind_param("s", $usuarioRec);
    $stmt->execute();

    $usuarioComprobado = "";

    $stmt->bind_result($usuarioComprobado);
    
    $devolver = false;

    if($stmt->fetch())
    {
      $devolver = true;
    }

    $mysqli->close();
    return $devolver;
}

function getTags()
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT * FROM tags");
    $stmt->execute();
    $stmt->bind_result($id_tag, $nombre_tag);

    $tag = array();

    while($stmt->fetch())
    {
        $tag = array(
            'id_tag' => $id_tag,
            'nombre_tag' => $nombre_tag
        );

        $tags[] = $tag;
    }

    $mysqli->close();
    return $tags;
}

function getFechasPorTag($id_rec)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT DISTINCT fecha from noticia inner join noticia_tag on noticia_tag.id_noticia = noticia.id_noticia WHERE noticia_tag.id_tag = ?");
    $stmt->bind_param("i", $id_rec);
    $stmt->execute();
    $stmt->bind_result($fecha);
    
    $fechaArray = array();

    while($stmt->fetch())
    {
        $fecha = date("Y-m-d", strtotime($fecha));
        $fechaArray = array(
            'fecha' => $fecha
        );

        $fechas[] = $fechaArray;
    }

    $mysqli->close();
    return $fechas;
}

function getNoticiasPorFecha($fecha, $tag)
{   
    $fecha = $fecha."%";
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT noticia.id_noticia, titulo FROM noticia inner join noticia_tag on noticia_tag.id_noticia = noticia.id_noticia WHERE noticia_tag.id_tag = ? AND noticia.fecha LIKE ?");
    $stmt->bind_param("is", $tag, $fecha);
    $stmt->execute();
    $stmt->bind_result($id_noticia, $titulo);
    
    $noticia = array();
    $noticias = array();

    while($stmt->fetch())
    {
        $noticia = array(
            'id_noticia' => $id_noticia,
            'titulo' => $titulo
        );

        $noticias[] = $noticia;
    }

    $mysqli->close();
    return $noticias;
}

function getNoticiasID($id_noticia)
{
    $mysqli = bbdd();
    $stmt = $mysqli->prepare("SELECT noticia.titulo, noticia.texto, noticia.imagen, DATE_FORMAT(noticia.fecha, '%Y-%m-%d'), usuario.nombre, usuario.apellido FROM noticia INNER JOIN usuario ON usuario.id_usuario = noticia.id_usuario WHERE noticia.id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();
    $stmt->bind_result($titulo, $texto, $imagen, $fecha, $nombre, $apellido);

    $noticia = array();
    $noticiaCompleta = array();
    
    if($stmt->fetch())
    {
        $noticia = array(
            'titulo' => $titulo,
            'texto' => $texto,
            'imagen' => $imagen,
            'fecha' => $fecha,
            'nombre' => $nombre,
            'apellido' => $apellido
        );
        $noticiaCompleta[] =  $noticia;
    }

    $stmt->free_result();
    $stmt = $mysqli->prepare("SELECT tags.nombre_tag FROM tags INNER JOIN noticia_tag ON noticia_tag.id_tag = tags.id_tag WHERE noticia_tag.id_noticia = ?");
    $stmt->bind_param("i", $id_noticia);
    $stmt->execute();
    $stmt->bind_result($nombre_tag);

    $tags = array();

    while($stmt->fetch())
    {
        $tags[] = $nombre_tag;
    }

    $noticiaCompleta[] = $tags;

    return $noticiaCompleta;
}
?>