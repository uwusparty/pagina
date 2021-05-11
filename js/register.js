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
    if (username != "")
    {
      $("#username").css("background-color", "white");
    }
  });
  $("#username").focusout(function()
  {
    if (username == "")
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

  });

  //  SUBMIT
  $("#formulario").submit(function()
  {
    var fallo = false;
    if (posArroba <= 0 || posPunto <= 0)
    {
      fallo = true;
    }
    if (username == "") {
      fallo = true;
    }
    if(!password.match(filtroMayus) || !password.match(filtroMinus) || !password.match(filtroNums) || password.match(" ") || password.length < 8)
    {
      fallo = true;
    }
    if(repassword != password)
    {
      fallo = true;
    }
    if (fallo) {
      event.preventDefault();
    }
    else {/*
      var correoDisponible = false;
      var nombreDisponible = false;
      event.preventDefault();
      var parametros = {'function':'getUsuarioByCorreo','email':email};
      $.ajax(
      {
        data: parametros,
        url:'../servicios.php',
        type:'post',
        success:function(response)
        {
          var correo = $.parseJSON(response);
          if (correo != null) {
            $("#email").css("background-color", "red");
            fallo = true;
          }
          else {
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
      var parametros = {'function':'getUsuarioByNombre','nombre':username};
      $.ajax(
      {
        data: parametros,
        url:'../servicios.php',
        type:'post',
        success:function(response)
        {
          var nombre = $.parseJSON(response);
          if (nombre != null) {
            $("#username").css("background-color", "red");
            fallo = true;
          }
          else {
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
      });*/
    }
  });
});
