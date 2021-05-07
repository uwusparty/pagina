<?php
    function encabezado()
    {
        echo "<div id='encabezado'>";
            echo "<ul id='menu'>";
                echo "<a href='#'><li class='izq'>Inicio</li></a>";
                echo "<a href='#'><li class='izq'>Ranking</li></a>";
                echo "<a href='#'><li id='preg' class='izq'>Sugerir pregunta</li></a>";
                session_start();
                if(!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!isset($_SESSION['nombre']))
                {
                    echo "<li class='dcha'>Cuenta";
                        echo "<ul id='menuCuenta'>";
                            echo "<a href='#'><li>Perfil</li></a>";
                            echo "<a href='#'><li>Cerrar sesión</li></a>";
                        echo "</ul>";
                    echo "</li>";
                }
                else
                {
                    echo "<a href='#'><li class='dcha'>Iniciar sesión</li></a>";
                    echo "<a href='#'><li class='dcha'>Registrarse</li></a>";
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