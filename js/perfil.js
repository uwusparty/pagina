$(document).ready(function()
{
  var previousUsername = $("#username").val();
  var previousBirthdate = $("#birthdate").val();
  var previousPassword = $("#password").val();
  $("#formulario").submit(function()
  {
    var formulario = this;
    var username = $("#username").val();
    var birthdate = $("#birthdate").val();
    var password = $("#password").val();
    if ($("#submit").val() == "Editar perfil") {
      event.preventDefault();
      $("#submit").val("Guardar cambios");
      $("#formulario :input:not(:last)").prop("disabled", false);
    }
    else if (username == previousUsername && birthdate == previousBirthdate && password == previousPassword) {
      event.preventDefault();
      $("#submit").val("Editar perfil");
      $("#formulario :input:not(:last)").prop("disabled", true);
    }
    else {
      var fallo = false;
      var htmlError = "";
      $("#formError").html("");
      if (username = "a") {

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
    }
  });
});
