//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// si hacemos clic en inicio / reinicio
document.getElementById("startreset").onclick = function(){
    
    // si estamos jugando
    
    if(playing == true){//Recargar página
        
        location.reload(); 
        
    }else{// si no estamos jugando
        
        
        // cambia el modo a jugar
        
        playing = true;
        
        // establece la puntuación en 0
        
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
     
        // muestra el cuadro de cuenta regresiva 
        
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        // esconde la caja de la cuenta regresiva 
        
        hide("gameOver");
        
        // botón de cambio para restablecer
        document.getElementById("startreset").innerHTML = "Reiniciar el juego";
        
        // iniciar cuenta regresiva
        
        startCountdown();
        
        //genera una nueva pregunta
        
        generateQA();
    }
    
}

// Al hacer clic en un cuadro de respuesta

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){

    // verifica si estamos jugando
    if(playing == true){//si
        if(this.innerHTML == correctAnswer){
        //respuesta correcta
            
            // aumenta la puntuación en 1            
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            // oculta el cuadro incorrecto y muestra el cuadro correcto
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");   
            }, 1000);
            
            //Genera nueva pregunta 
            
            generateQA();
        }else{
        //respuesta incorrecta
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");   
            }, 1000);
        }
    }
}   
}


//funciones

// iniciar contador

function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){// juego terminado
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Juego terminado!</p><p>Tu puntaje es: " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Empezar juego";
        }
    }, 1000);    
}

// detener contador

function stopCountdown(){
    clearInterval(action);   
}

// ocultar un elemento

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

// muestra un elemento

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

// genera preguntas y respuestas múltiples

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; // llena una casilla con la respuesta correcta
    
    // llena otras casillas con respuestas incorrectas
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); // una respuesta incorrecta
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}