<?php
    function encabezado()
    {
        echo "<div id='encabezado'>";
            echo "<ul id='menu'>";
                echo "<a href='#'><li class='izq'>Inicio</li></a>";
                echo "<a href='#'><li class='izq'>Ranking</li></a>";
                echo "<a href='#'><li id='preg' class='izq'>Sugerir pregunta</li></a>";
                session_start();
                if(!isset($_SESSION['nombre']))
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


    
?>