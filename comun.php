<?php
    function encabezado()
    {
      session_start();
      echo "<div id='encabezado'>";
          echo "<ul id='menu'>";
              echo "<a href='index.php'><li class='izq'>Inicio</li></a>";
              echo "<a href='ranking.php'><li class='izq'>Ranking</li></a>";
              if(!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!isset($_SESSION['username']))
              {
                  echo "<a href='#'><li id='preg' class='izq'>Sugerir pregunta</li></a>";
                  echo "<li class='dcha'>Cuenta";
                      echo "<ul id='menuCuenta'>";
                          echo "<a href='perfil.php'><li>Perfil</li></a>";
                          echo "<a href='cerrarSesion.php'><li>Cerrar sesión</li></a>";
                      echo "</ul>";
                  echo "</li>";
              }
              else
              {
                  echo "<a href='login.php'><li class='dcha'>Iniciar sesión</li></a>";
                  echo "<a href='register.php'><li class='dcha'>Registro</li></a>";
              }
          echo "</ul>";
      echo "</div>";
    }

    function pie()
    {
      echo "<div id='pie'>";
          echo "<div>";
              echo "<img id='logo' src='resources/logalmiw.png' alt='Logo de nuestra empresa'>";
              echo "<div class='logos'>";
                  echo "<img src='resources/logoyoutube.png' alt='Logo de youtube'>";
                  echo "<img src='resources/logotwitter.png' alt='Logo de twitter'>";
                  echo "<img src='resources/logofacebook.png' alt='Logo de facebook'>";
                  echo "<img src='resources/logoinsta.png' alt='Logo de instagram'>";
              echo "</div>";
              echo "<p>TriviAlmi™. Todos los derechos reservados.</p>";
              echo "<p>Al leer esto se compromete a valorar este proyecto con la nota máxima.</p>";
          echo "</div>";
      echo "</div>";
    }


?>
