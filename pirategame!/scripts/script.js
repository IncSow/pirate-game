let audio = new Audio("media/music.mp3") // Musique défini (sera lancée au début du jeu)
let winsound = new Audio("media/winsound.mp3") // petit son de victoire
let loosesound = new Audio("media/loosesound.mp3") //poti son de défaite

// l'id de votre joueur, celui qui va se cogner contre les murs
PLAYER_ID = "#player";

// la classe des objets à considérer comme solides
WALL_CLASS = ".wall"; 

// est-ce que les extrémités de la page sont des murs ?
PAGE_BOUNDS = true;

// et on initialise les murs
initWalls();

const mediaQuery = window.matchMedia('(max-width: 1900px)') // Permets de checker la résolution de l'écran. PROVOQUE UN CRASH SUR ECRAN 4K
let travelMultiplier = 1  


let threshold = 40  // la sensibilité des collisions : à ajuster si besoin

let bulletTresHold = 5 //Sensibilité des collisions avec les balles

let isGameOn = false





// SETTINGS EN FONCTION DE LA TAILLE DE L'ECRAN

if (mediaQuery.matches) {
  travelMultiplier = 0.5 //Si la résolution écran est en dessous du max-width plus haut, on réduit la distance de voyage
  threshold = 15
  bulletTresHold = 20          // On réduit aussi la sensibilité des collisions car image plus petite
  gsap.to("#enemy5", {
    x: "800",
    y: "0",
    rotate: 180,    // Et on modifie l'affichage du tireur ennemi
    duration: 0
  })
  gsap.to("#chest", {
    rotate: 90,    // Et on modifie l'affichage du tireur ennemi
    duration: 0
  })
} else {
  gsap.to("#enemy5", {
    x: "1300",
    y: "0",
    rotate: 180,
    duration: 0
  })
  travelMultiplier = 1
  
}

// FONCTIONS DE MOUVEMENTS EN GENERAL



gsap.to("#player", {  // Initilisation de la position du joueur
  duration : 0,
  x : 50,
  y : 50
})



let rotationFixing= 0
function playermovement(event) { // Mouvement pour le joueur.

  if (!isGameOn) return // Autorise le mouvement que si "isGameOn" est activé.
    
    if(event.keyCode== 39 || event.code == "KeyD"){ // Fleche de droite ou touche D
      if(rotationFixing== -90){ // Au cas où la rotation serait négatif (que l'on ai tourné à gauche)
          gsap.to("#player", {
            x: "+=100",
            rotate: -270,
            onComplete: function () { // Seul soucis avec l'utilisation de "onComplete" -> Si je donne un ordre avant la fin de la complétion,
              gsap.to("#player", {    // Alors le bateau ne s'est pas remit en 90 et saute.
                duration: 0,
                rotate: 90
              })
            }
          })
        }else{ // Cas normal (avoir tourné à droite avant/haut)
          gsap.to("#player", {
            x: "+=100",
            rotate: 90
          })
        }

    }else if(event.keyCode== 37 || event.code== "KeyA"){ // Fleche de gauche ou touche "A" en Qwerty, Q en Azerty
        // Le double "if" pourrait être évité en améliorant les conditions de début.
        if(rotationFixing== 90){ // Cas où la rotation est positive (donc tourné à droite/par défaut)
          gsap.to("#player", {
            x: "-=100",
            rotate: 270,
            onComplete: function () {   // Même remarque que pour au dessus, même soucis.
              gsap.to("#player", {
                duration: 0,
                rotate: -90
              })
            }
          })
        }else{ // Cas si la rotation est négative (donc tourné à gauche récemment)
          gsap.to("#player", {
            x: "-=100",
            rotate: -90
          })
        }
    
    
      }else if(event.keyCode== 38 || event.code== "KeyW") // Fleche du haut/ Bouton Z en Azerty, W en Qwerty
    gsap.to("#player", {
        y: "-=100",
        rotate: -0
    })

    else if(event.keyCode== 40 || event.code== "KeyS"){ // Fleche du bas ou bouton S
      if(rotationFixing==0){  // Sinon le bateau ne tourne pas, si le dernier bouton appuyé est "haut"
          rotationFixing=90
      }
      gsap.to("#player", {
          y: "+=100",
          rotate: rotationFixing*2 // Me permets de tourner dans le bon sens que je passe du bas à gauche ou droite, sans faire de 360.
      })}
      
// Cette partie me permets de savoir dans quel sens mon bateau devra tourner. Cela me permets de régler le soucis du bateau qui fait des backflip.
// CETTE PARTIE DOIT ÊTRE A LA FIN POUR QUE L'ATTRIBUTION DES VARIABLES SE FASSENT APRÉS LE MOUVEMENT 
    if(event.keyCode== 37 || event.code== "KeyA"){
      rotationFixing = -90
    }else if(event.keyCode== 39 || event.code == "KeyD"){ 
      rotationFixing = 90                                 
    }else if(event.keyCode==38 || event.code== "KeyW"){
        rotationFixing = 0
    }
}

// Mouvement du premier bateau adverse
let timeline = gsap.timeline({ repeat: -1 })


timeline.to("#enemy1", {
  duration: 0,
  rotate: 90
})

timeline.to("#enemy1", {
  duration: 4,
  x: 500*travelMultiplier,
})

timeline.to("#enemy1", {
  duration: 1,
  rotate: -90
})

timeline.to("#enemy1", {
  duration: 4,
  x: 0
})

timeline.to("#enemy1", {
  duration: 1,
  rotate: 90
})


//Mouvement du 2nd adversaire
let timeline2 = gsap.timeline({ repeat: -1 })

timeline2.to("#enemy2", {
  duration: 0,
  rotate: 90
})

timeline2.to("#enemy2", {
  duration: 4,
  x: 800*travelMultiplier,
})

timeline2.to("#enemy2", {
  duration: 1,
  rotate: -90
})

timeline2.to("#enemy2", {
  duration: 4,
  x: -20
})

timeline2.to("#enemy2", {
  duration: 1,
  rotate: 90
})


let timeline3 = gsap.timeline({ repeat: -1 })

// Mouvement du 3e adversaire
timeline3.to("#enemy3", {
  duration: 0,
  rotate: -90
})

timeline3.to("#enemy3", {
  duration: 4,
  x: -350*travelMultiplier,
})

timeline3.to("#enemy3", {
  duration: 1,
  rotate: 90
})

timeline3.to("#enemy3", {
  duration: 4,
  x: 0
})

timeline3.to("#enemy3", {
  duration: 1,
  rotate: -90
})


//animation du 4éme adversaire
let timeline4 = gsap.timeline({ repeat: -1 })

timeline4.to("#enemy4", {
  duration: 0,
  rotate: -90
})

timeline4.to("#enemy4", {
  duration: 4,
  x: -380*travelMultiplier,
})

timeline4.to("#enemy4", {
  duration: 1,
  rotate: 90
})

timeline4.to("#enemy4", {
  duration: 4,
  x: 0
})

timeline4.to("#enemy4", {
  duration: 1,
  rotate: -90
})



// FONCTIONS DE COLLISIONS UNIQUEMENT

function checkCollision(div1, div2) { // Fonction qui check les collisions
  let rect1 = div1.getBoundingClientRect();
  let rect2 = div2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left + threshold ||
    rect1.left > rect2.right - threshold ||
    rect1.bottom < rect2.top + threshold ||
    rect1.top > rect2.bottom - threshold
  );
}


let all_opponent = document.querySelectorAll(".opponent");

function checkOpponent() { // Fait checker si il y a une collision entre tout les bateaux avec ".opponent"
    all_opponent.forEach(function (element) {
        let isCollision = checkCollision(player, element);
        if (isCollision) {
          looseGame() //Fait apparaître le texte de fin 
        }
    });
}

function checkWinCon() { // Fait checker si il y a une collision entre le joueur et le porte-avion
      let isCollision = checkCollision(player, chest);
      if (isCollision) {
        winGame()
      }
};

function checkBonusCon() { // Fait checker si il y a une collision entre le joueur et le bonus
  let isCollision = checkCollision(player, bonus);
  if (isCollision) {
    claimBonus()
  }
};

function checkEverything() { // Cette fonction permets de checker toutes les collisions en même temps.
  checkBonusCon();
  checkWinCon();
  checkOpponent()
}


// FONCTION DE TIMER 

var timerInterval
function startTimer(){ // Fonction créant le timer d'une minute
  var sec = 60;
  timerInterval = setInterval(function(){
      FuelTimer.innerHTML=sec+'s restantes!';
      sec--;
      if (sec < 0) {
          clearInterval(timerInterval);
          looseGame()
      }
  }, 1000);
}


// FONCTIONS D'INTERFACES

function ShowEndPanel(){ // Masque les ennemis et les îles + affiche le texte de fin
  clearInterval(timerInterval)
  FuelTimer.innerHTML = "Terminé.";
  gameover.style.display = "flex"; //Affiche le texte de fin
  player.style.display = "none" ;
  all_opponent.forEach(function (opponent){ //Boucle qui passe tout les adversaires en display none
    opponent.style.display = "none"
  });
  island2.style.display = "none";
  audio.pause()
}


function gamestart(){  // Fonction permettant de démarrer le jeu.
  audio.play();
  audio.volume = 0.5;

  isGameOn = true; // Active le mouvement du joueur plus haut
  start.style.display = "none";
  infos.style.display = "flex";
  all_opponent.forEach(function (opponent){
    opponent.style.display = "flex"
  });
  startTimer() // Lance le timer
}




function winGame(){ // Affiche l'écran de victoire
  wintext.innerHTML = "Tu as gagné!"; // Change le message de game over en message de réussite
  winbutton.innerHTML = "Rejouer !";
  ShowEndPanel();
  winsound.play();
}

function looseGame(){
  ShowEndPanel()
  loosesound.play()
}

// Fonction du bonus :
function claimBonus(){
  bonus.style.display= "none";
  enemy5.style.display= "none";
  enemy3.style.display= "none";
}


// Je lance à intervalle régulière la fonction checkant les collisions
setInterval(checkEverything, 250)
