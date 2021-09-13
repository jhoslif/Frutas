let jugando = false;
let puntaje;
let vidas;
let movimiento;
let accion;
let frutas = ["apple", "banana", "cherry", "grapes", "mango", "orange", "peach", "pera", "pine", "watermelon"];
$(function () {
    //Inicio Juego
    
    $("#inicioreset").click(function () {
        if (jugando == true) {
            //Recarga la Pagina
            location.reload();
        } else {
            //alert('prueba');
            comenzar();
            jugando = true;
            puntaje = 0;
            $("#valorpuntaje").html(puntaje);
            //Mostrar cuadro de las vidas
            $("#vidas").show();
            vidas = 3;
            generarVidas();
            //Ocultar el game over
            $("gameover").hide();
            $("#inicioreset").html("Reiniciar Juego")
            
        }
    });
    function generarVidas() {
        $("#vidas").empty();
        for (let i = 0; i < vidas; i++) {
            $("#vidas").append('<img src="imagenes/heart.png" class="vida">')
        }
    }
    function comenzar() {
        generarFruta();
        $("#fruta").css({'left':Math.round(Math.random()*550),'top':-50});
        $("#fruta").show();
        movimiento=1+Math.round(Math.random()*5);
        accion=setInterval(function(){        
            //mover la fruta hacia abajo
            $("#fruta").css({'top':$("#fruta").position().top+movimiento})
            if($("#fruta").position().top> $("#contenedorfrutas").position().top+400){  
                
                if(vidas>1){  
                    finalizar();      
                    comenzar();
                    vidas--;
                    generarVidas();
                }else{
                    jugando=false;
                    $("#inicioreset").html("Iniciar Juego");
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over</p><p>Tu puntaje es: '+puntaje+'</p>');
                    $("#vidas").hide();
                    finalizar();
                }
            }
        },10);
        
    }
    function generarFruta(){
        $("#fruta").attr('src','imagenes/'+frutas[Math.round(Math.random()*9)]+'.png');
    }
    function finalizar(){
        clearInterval(accion);
        $('#fruta').hide();
    }
$("#fruta").mouseover(function(){
    puntaje++;
    $("#ValorPuntaje").html(puntaje);
    $("#Sonido")[0].play();
    clearInterval(accion);
    $("#fruta").hide("explode",100);
    setTimeout(comenzar,500);
})
})