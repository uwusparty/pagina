$(document).ready(function()
{
  var alturaPagina = $(document).height();
  $("#fondoConfirmar").css("height", alturaPagina);
  var previousUsername = $("#username").val();
  var previousBirthdate = new Date($("#birthdate").val());
  var previousPassword = $("#password").val();
  var filtroMayus = new RegExp('[A-Z]');
  var filtroMinus = new RegExp('[a-z]');
  var filtroNums = new RegExp('[0-9]');
  var curDate = Date.now();
  $("#formulario").submit(function()
  {
    var formulario = this;
    var username = $("#username").val();
    var birthdate = new Date($("#birthdate").val());
    var password = $("#password").val();
    var pfp = $("#pfp").val();
    if ($("#submit").val() == "Editar perfil") {
      event.preventDefault();
      $("#submit").val("Guardar cambios");
      $("#formulario :not(#submit, #eliminar)").prop("disabled", false);
    }
    else if (username == previousUsername && birthdate.getTime() == previousBirthdate.getTime() && password == previousPassword && pfp == "") {
      event.preventDefault();
      $("#submit").val("Editar perfil");
      $("#formulario :not(#submit, #eliminar)").prop("disabled", true);
    }
    else {
      var fallo = false;
      var htmlError = "";
      if (username == "" || username.match("@"))
      {
        fallo = true;
        if (username == "") {
          htmlError += "<p>-El usuario no puede quedar vacío.</p>";
        }
        else {
          htmlError += "<p>-El usuario no puede contener @.</p>";
        }
      }
      if (birthdate > curDate || birthdate == "" )
      {
        fallo = true;
        if (birthdate > curDate) {
          htmlError += "<p>-La fecha no puede ser superior a la de hoy.</p>";
        }
        else if (birthdate == "") {
          htmlError += "<p>-La fecha no puede quedar vacía.</p>";
        }
      }
      if(!password.match(filtroMayus) || !password.match(filtroMinus) || !password.match(filtroNums) || password.match(" ") || password.length < 8)
      {
        fallo = true;
        htmlError = "<p>-La contraseña debe contener como mínimo una minúscula, una mayúscula, un número y tener una longitud de 8 carácteres o superior.</p>";
      }
      if (fallo) {
        event.preventDefault();
      }
      $("#formError").html(htmlError);
    }
  });

  $('#eliminar').on("click", function(e)
  {
    $('#confirmar').toggle();
    $('#fondoConfirmar').toggle();
  });

  $('#confirmar').on("click", "button:first", function(e)
  {
    $.ajax
    (
        {
            type: "post",
            url: "servicios.php",
            data: {'function':'deleteUsuario'},
            dataType : 'json',
            success: function (response)
            {
                idUsuario = $.parseJSON(response);
                console.log(idUsuario);
                $(location).attr('href', 'cerrarSesion.php');
            }
        }
    );
  });

  $('#confirmar').on("click", "button:not(:first)", function(e)
  {
    $('#confirmar').toggle();
    $('#fondoConfirmar').toggle();
  });
});
