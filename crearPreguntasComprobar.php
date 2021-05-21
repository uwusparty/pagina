<?php
$ftp_server = "192.168.6.216";
$ftp_user_name = "subirimagenes";
$ftp_user_pass = "Almi123";
$source_file = $_FILES['imagen']['tmp_name'];
$nombreImagen = $_POST['imagenname'];

if(strpos($_POST['categoriaes'], " ") !== false)
{
    $categoria = strtolower(substr($_POST['categoriaes'], 0, strpos($_POST['categoriaes'], " ")));
}
else
{
    $categoria = strtolower($_POST['categoriaes']);

}
$destination_file = "./categorias/".$categoria."/".$nombreImagen.".jpg";

// set up basic connection
$conn_id = ftp_connect($ftp_server);
ftp_pasv($conn_id, true); 

// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass); 
ftp_chdir($conn_id, '/home/uwusparty/Escritorio/juego');
var_dump(ftp_rawlist($conn_id, "."));

// check connection
if ((!$conn_id) || (!$login_result)) { 
    echo "FTP connection has failed!";
    echo "Attempted to connect to $ftp_server for user $ftp_user_name"; 
    exit; 
} else {
    echo "Connected to $ftp_server, for user $ftp_user_name";
}

// upload the file
$upload = ftp_put($conn_id, $destination_file, $source_file); 

// check upload status
if (!$upload)
{ 
    echo "FTP upload has failed!";
} else {
    echo "Uploaded $source_file to $ftp_server as $destination_file";
}

// close the FTP stream 
ftp_close($conn_id);
header("location: crearPreguntas.php?sc=1");
?>