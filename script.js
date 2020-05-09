let points = 0;
let life = 3;
let gamePaused = false;

//variables for sound//
let monstersFX = document.querySelector("#monsterFX");
let scoreFX = document.querySelector("#scoreFX");
let explosionFX = document.querySelector("#explosionFX");
let shakingFX = document.querySelector("#shakingFX");
let bgMusic = document.querySelector("#bgmusic");
let gameOverFX = document.querySelector("#gameoverFX");
let gameCompleteFX = document.querySelector("#gamecompleteFX");
let muted = false;
let soundVolume = .8;

//variables for characters and UI//
let bomb = document.querySelector("#bomb1");
let timeBar = document.querySelector("#time_board");
let settingButton = document.querySelector("#settings_icon");
let sliderInput = document.querySelector("#sliderInput");
let volume = document.querySelector("#volume");

window.addEventListener("load", startScreen );

function startScreen() {
    document.querySelector("#start_screen").classList.remove("hide");
    
     document.querySelector("#game").classList.remove("shake");
   
    showStartScreen();
}

function showStartScreen() {
   
    console.log("showStartScreen");
    document.querySelector("#game").classList.add("hide"); document.querySelector(".start_button").classList.add("pulse");
    document.querySelector(".start_button").addEventListener("click", hideStartScreen); 
    
    document.querySelector("#gameover").classList.add("hide");
    
     document.querySelector("#levelcomplete").classList.add("hide");
     
}

function hideStartScreen() {
   
    
     document.querySelector("#game").classList.remove("hide");
     document.querySelector("#start_screen").classList.add("hide");
    
     
    
   /* muteSoundContainer.addEventListener("click", 
   
   soundMute);*/
    settingButton.addEventListener("click", settings);
    
       
  
    start();
      
  
}



function soundMute() {
    console.log("soundMute");
    if(bgMusic.muted == false) {
        bgMusic.muted = true;
          document.querySelector("#sound_button").classList.add("soundstop");
       
    }
    else {
        bgMusic.muted = false;
         document.querySelector("#sound_button").classList.remove("soundstop");
       
   
    }
}



function start() {
    bgMusic.addEventListener("ended", playBackgroundMusic);
      points = 0;
    document.querySelector("#score_count").textContent = points;
    
    life =3;
     document.querySelector("#heart_1").classList.add("active_heart");
     document.querySelector("#heart_2").classList.add("active_heart");
     document.querySelector("#heart_3").classList.add("active_heart");
    
    
    passing();
    time();
    playBackgroundMusic();
}

function settings() {
    console.log(settings);
    document.querySelector("#monster1").classList.add("pause");
    document.querySelector("#monster2").classList.add("pause");
    document.querySelector("#monster3").classList.add("pause");
    document.querySelector("#monster4").classList.add("pause");
    document.querySelector("#monster5").classList.add("pause");
    document.querySelector("#monster6").classList.add("pause");
      bomb.classList.add("pause");
     timeBar.querySelector("#time_board .sprite2").classList.add("pause");
    
    /* displaysettingscreen*/
    
    document.querySelector("#settingsScreen").style.visibility = "visible";
    
    /*mutrSound*/
    document.querySelector("#sound_button").addEventListener("click", soundMute);
     document.querySelector("#sound_button").classList.add("pulse");
    document.querySelector("#musicFX").addEventListener("click", toggleMusicFX);
    
      document.querySelector("#musicFX").classList.add("pulse");
    document.querySelector("#close_button").addEventListener("click", closeSettings);
    
     document.querySelector("#close_button").classList.add("pulse");
    sliderInput.addEventListener("input", slideBar);
     
}
function slideBar(){
    console.log("slider");
    volume.innerHTML = sliderInput.value;
    soundVolume = sliderInput.value/100;
    bgMusic.volume = sliderInput.value/100;
}
function closeSettings() {
    console.log("closeSettings");
       document.querySelector("#monster1").classList.remove("pause");
    document.querySelector("#monster2").classList.remove("pause");
    document.querySelector("#monster3").classList.remove("pause");
    document.querySelector("#monster4").classList.remove("pause");
    document.querySelector("#monster5").classList.remove("pause");
    document.querySelector("#monster6").classList.remove("pause");
      bomb.classList.remove("pause");
     timeBar.querySelector("#time_board .sprite2").classList.remove("pause");
    
     document.querySelector("#settingsScreen").style.visibility = "hidden";
    
}
function toggleMusicFX() {
    console.log("toggleMusicFX");
    
if(muted == false) {
    muted = true;
     document.querySelector("#musicFX").classList.add("soundstop");
   
    
}
    else{
        muted = false;
        
         document.querySelector("#musicFX").classList.remove("soundstop");
         
    }
}

function playBackgroundMusic() {
    bgMusic.play();
    bgMusic.volume = soundVolume;
}

function passing() {
    console.log("passing");
    document.querySelector("#monster1").classList.add("passing_left");
    document.querySelector("#monster1").addEventListener("click", clickMonster);

    document.querySelector("#monster2").classList.add("passing_left");

    document.querySelector("#monster2").classList.add("speed2");

    document.querySelector("#monster2").addEventListener("click", clickMonster);

    document.querySelector("#monster3").classList.add("passing_left");
    document.querySelector("#monster3").classList.add("speed3");

    document.querySelector("#monster3").addEventListener("click", clickMonster);


    document.querySelector("#monster4").classList.add("passing_left");
    document.querySelector("#monster4").classList.add("speed5");
    document.querySelector("#monster4").addEventListener("click", clickMonster);

    document.querySelector("#monster5").classList.add("passing_left");
    document.querySelector("#monster5").classList.add("speed6");

    document.querySelector("#monster5").addEventListener("click", clickMonster);

    document.querySelector("#monster6").classList.add("passing_left");
    document.querySelector("#monster6").classList.add("speed1");

    document.querySelector("#monster6").addEventListener("click", clickMonster);



    bomb.classList.add("passing_left");
    bomb.addEventListener("click", clickBomb);
    
    
    
 

}

function clickMonster() {
    console.log("clickMonster");

    let monster = this;

    scorePoint();
    monster.removeEventListener("click", clickMonster);
    monster.classList.add("pause");
    monster.querySelector(".sprite").classList.add("disappear");
    monster.addEventListener("animationend", restartMonster);
    
    if (!muted) {
        monstersFX.play();
        monstersFX.volume = soundVolume;
    }


}

function scorePoint() {
    console.log("scorePoint");
    points++;
    console.log("your points has changed to");
    console.log(points);
    document.querySelector("#score_count").textContent = points;
    if(!muted) {
        scoreFX.play();
        scoreFX.volume = soundVolume;
    }

}

function restartMonster() {
    console.log("restartMonster");

    let monster = this;
    monster.classList.remove("passing_left");
    monster.offsetHeight;
    monster.classList.add("passing_left");
    monster.classList.remove("pause");
    monster.querySelector(".sprite").classList.remove("disappear");
    monster.addEventListener("click", clickMonster);
}

function clickBomb() {
    console.log("clickBomb");

    bomb.removeEventListener("click", clickBomb);
    bomb.classList.add("pause");
    bomb.querySelector(".sprite").classList.add("explode");
    document.querySelector("#game").classList.remove("shake");
    bomb.addEventListener("animationend", explode);
 
    if(!muted) {
            explosionFX.play();
        explosionFX.volume = soundVolume;
}

}

function explode() {
    console.log("shakeScreen");
    loseLife();
    document.querySelector("#game").classList.add("shake");
    document.querySelector("#game").addEventListener("animationend", restartBomb);
   if(!muted) {
        shakingFX.play();
       shakingFX.volume = soundVolume;
   }

}

function loseLife() {
    console.log("loseLife");
    console.log("you have life");
    console.log(life);
    life--;
    document.querySelector("#heart .active_heart").classList = life;
    console.log("you have " + life + " life left");
}

function restartBomb() {
    console.log("restartBomb1");
    document.querySelector("#game").removeEventListener("animationend", restartBomb);

    bomb.classList.remove("passing_left");
    bomb.classList.offsetHeight;
    bomb.classList.add("passing_left");

    bomb.classList.remove("pause");
    bomb.querySelector(".sprite").classList.remove("explode");

    bomb.addEventListener("click", clickBomb);
    if (life == 0) {
        gameOver();
        bgMusic.removeEventListener("ended", playBackgroundMusic);
         
    }
   


}

function gameOver() {
    console.log("gameOver");
    
    gameOverFX.play();
    
   /*animationstopped*/ document.querySelector("#monster1").classList.remove("passing_left");
    document.querySelector("#monster2").classList.remove("passing_left");
    document.querySelector("#monster3").classList.remove("passing_left");
    document.querySelector("#monster4").classList.remove("passing_left");
    document.querySelector("#monster5").classList.remove("passing_left");
    document.querySelector("#monster6").classList.remove("passing_left");

    document.querySelector("#bomb1").classList.remove("passing_left");

    timeBar.querySelector("#time_board .sprite2").classList.remove("timeend");
    
    /*gameoverscreen animations*/
    document.querySelector(".tryagain_button").classList.add("pulse");
     
     document.querySelector(".tryagain_button").addEventListener("click", restartGame);
    
    document.querySelector(".home_button").classList.add("pulse");
     document.querySelector(".home_button").addEventListener("click", startScreen);
    
    document.querySelector("#display_score").textContent = points;
    document.querySelector("#gameover").classList.add("show_screen");
   
    /*gameoverHideFuncitions*/
     document.querySelector("#gameover").classList.remove("hide");
    bgMusic.pause();
   
 

}

function time() {
    console.log("time");
    timeBar.querySelector("#time_board .sprite2").classList.add("timeend");

    timeBar.addEventListener("animationend", countDownComplete);
}

function countDownComplete() {
    console.log("countDownComplete");

    timeBar.removeEventListener("animationend", countDownComplete);
    document.querySelector("#monster1").classList.remove("passing_left");
    document.querySelector("#monster2").classList.remove("passing_left");
    document.querySelector("#monster3").classList.remove("passing_left");
    document.querySelector("#monster4").classList.remove("passing_left");
    document.querySelector("#monster5").classList.remove("passing_left");
    document.querySelector("#monster6").classList.remove("passing_left");

    document.querySelector("#bomb1").classList.remove("passing_left");

    timeBar.querySelector("#time_board .sprite2").classList.remove("timeend");
    bgMusic.removeEventListener("ended", playBackgroundMusic);

    gameComplete();
}

function gameComplete() {
    console.log("gameComplete");
    gameCompleteFX.play();
    document.querySelector(".play_again").classList.add("pulse");

    document.querySelector(".play_again").addEventListener("click", restartGame);
    
     document.querySelector("#display_score_gamecomplete").textContent = points;
    document.querySelector("#levelcomplete").classList.add("show_screen");
    
    document.querySelector(".home_button2").classList.add("pulse");
    
    document.querySelector(".home_button2").addEventListener("click", startScreen);
   
    document.querySelector("#levelcomplete").classList.remove("hide");
    bgMusic.pause();
    

}

function restartGame() {
    console.log("restart game");
     document.querySelector("#gameover").classList.add("hide");
    
     document.querySelector("#levelcomplete").classList.add("hide");
    document.querySelector(".tryagain_button").removeEventListener("click", restartGame);
    
    start();
      
    life =3;
    document.querySelector("#heart_1").classList.add("active_heart");
     document.querySelector("#heart_2").classList.add("active_heart");
     document.querySelector("#heart_3").classList.add("active_heart");
    
}
