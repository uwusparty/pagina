$(document).ready(function()
{
  var filtroMayus = new RegExp('[A-Z]');
  var filtroMinus = new RegExp('[a-z]');
  var filtroNums = new RegExp('[0-9]');
  var email = "";
  var posArroba = -1;
  var posPunto = -1;
  var username = "";
  var password = "";
  var repassword = "";
  var birthdate = "";
  var curDate = Date.now();

  //  EMAIL
  $("#email").on('input', function()
  {
    email = $(this).val();
    posArroba = email.indexOf('@');
    posPunto = email.indexOf('.');
    if (posArroba > 0 && posPunto > 0)
    {
      $("#email").css("background-color", "white");
    }
  });
  $("#email").focusout(function()
  {
    if (posArroba <= 0 || posPunto <= 0)
    {
      $("#email").css("background-color", "red");
    }
  });

  //  USERNAME
  $("#username").on('input', function()
  {
    username = $(this).val();
    if (username != "" && !username.match("@"))
    {
      $("#username").css("background-color", "white");
    }
  });
  $("#username").focusout(function()
  {
    if (username == "" || username.match("@"))
    {
      $("#username").css("background-color", "red");
    }
  });

  //  PASSWORD
  $("#password").on('input', function()
  {
    password = $(this).val();
    if(password.match(filtroMayus) && password.match(filtroMinus) && password.match(filtroNums) && !password.match(" ") && password.length >= 8)
    {
      $("#password").css("background-color", "white");
    }
  });
  $("#password").focusout(function()
  {
    if(!password.match(filtroMayus) || !password.match(filtroMinus) || !password.match(filtroNums) || password.match(" ") || password.length < 8)
    {
      $("#password").css("background-color", "red");
    }
  });

  //  REPASSWORD
  $("#repassword").on('input', function()
  {
    repassword = $(this).val();
    if(repassword == password)
    {
      $("#repassword").css("background-color", "white");
    }
  });
  $("#repassword").focusout(function()
  {
    if(repassword != password)
    {
      $("#repassword").css("background-color", "red");
    }
  });

  //  BIRTHDATE
  $("#birthdate").on("change textInput input", function()
  {
    birthdate = new Date($(this).val());
    if (birthdate > curDate)
    {
      $("#birthdate").css("background-color", "red");
    }
    if (!Date.parse(birthdate)) {
      birthdate = "";
    }
  });

  //  SUBMIT
  $("#formulario").submit(function()
  {
    var formulario = this;
    var fallo = false;
    var htmlError = "";
    $("#formError").html("");
    if (posArroba <= 0 || posPunto <= 0)
    {
      fallo = true;
      htmlError = "<p>-La dirección de correo debe tener como mínimo una arroba y un punto.</p>";
      $("#formError").append(htmlError);
    }
    if (username == "" || username.match("@")) {
      fallo = true;
      if (username == "") {
        htmlError = "<p>-El usuario no puede quedar vacío.</p>";
      }
      else {
        htmlError = "<p>-El usuario no puede contener @.</p>";
      }
      $("#formError").append(htmlError);
    }
    if(!password.match(filtroMayus) || !password.match(filtroMinus) || !password.match(filtroNums) || password.match(" ") || password.length < 8)
    {
      fallo = true;
      htmlError = "<p>-La contraseña debe contener como mínimo una minúscula, una mayúscula, un número y tener una longitud de 8 carácteres o superior.</p>";
      $("#formError").append(htmlError);
    }
    if(repassword != password)
    {
      fallo = true;
      htmlError = "<p>-Las contraseñas no coinciden.</p>";
      $("#formError").append(htmlError);
    }
    if (birthdate > curDate || birthdate == "" ) {
      fallo = true;
      if (birthdate > curDate) {
        htmlError = "<p>-La fecha no puede ser superior a la de hoy.</p>";
      }
      else if (birthdate == "") {
        htmlError = "<p>-La fecha no puede quedar vacía.</p>";
      }
      $("#formError").append(htmlError);
    }
    if (fallo) {
      event.preventDefault();
    }
    else {
      var correoDisponible = false;
      var nombreDisponible = false;
      event.preventDefault();
      var parametros = {'function':'getUsuarioByCorreo','correo':email};
      $.ajax(
      {
        data: parametros,
        url:'servicios.php',
        type:'post',
        success:function(response)
        {
          console.log("HOLIIIII");
          var usuario = $.parseJSON(response);
          if (usuario.username != null) {
            htmlError = "<p>-El correo introducido no está disponible.</p>";
            $("#formError").append(htmlError);
            $("#email").css("background-color", "red");
          }
          else { // correo disponible
            correoDisponible = true;
            if (nombreDisponible) {
              formulario.submit();
            }
          }
        },
        error: function(error)
        {
          console.log(error);
        }
      });
      var parametros = {'function':'getUsuarioByNombre','username':username};
      $.ajax(
      {
        data: parametros,
        url:'servicios.php',
        type:'post',
        success:function(response)
        {
          console.log(response);
          var usuario = $.parseJSON(response);
          if (usuario.username != null) {
            htmlError = "<p>-El nombre de usuario introducido no está disponible.</p>";
            $("#formError").append(htmlError);
            $("#username").css("background-color", "red");
          }
          else { // correo disponible
            nombreDisponible = true;
            if (correoDisponible) {
              formulario.submit();
            }
          }
        },
        error: function(error)
        {
          console.log(error);
        }
      });
    }
  });
});
