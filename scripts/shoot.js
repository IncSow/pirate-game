// Tout le code ici ne concerne QUE les tirs ennemis et les collisions avec ces derniers


let bulletTravel= "-=500" // Distance de tir par défaut
let hasShot = false // Explicite, utilisé pour éviter une erreur dans la console


if (mediaQuery.matches) {
    bulletTravel= "-=250"
}



function fire() {


  hasShot = true;

  // setTimeout(() =>{
  //   hasShot = false    Ancien code utilisé pour que "hasShot" prenne la valeur false après. 
  // },490);              J'ai tellement galeré à trouver cette solution que je la laisse par fierté. 


  let shot = document.createElement("div");
  shot.classList.add("shot");
  shot.id =("bullet")
  enemy5.appendChild(shot); // Je crée une nouvelle div avec l'id "bullet" et la class "shot"


  // animation du boulet qui est tiré par le canon
  gsap.to(shot, {
    duration: 0.5,
    y: bulletTravel,
    onComplete: function () { // Lorsque la fonction a fini de s'executer, delete la div "shot" et repasse "hasShot" en "false"
      shot.remove();          // Pas besoin de s'embêter avec un Timeout.......
      hasShot=false
    },
  });
  }



function checkShot(div1, div2) { // Fonction qui check les collisions
  let rect1 = div1.getBoundingClientRect();
  let rect2 = div2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left + bulletTresHold ||
    rect1.left > rect2.right - bulletTresHold ||
    rect1.bottom < rect2.top + bulletTresHold ||
    rect1.top > rect2.bottom - bulletTresHold
  );
  }
  
function checkShotCon() { // Fait checker si il y a une collision entre le tir
  if(hasShot== true){ // Cette condition permets d'éviter des erreurs dans la console quand la div "shot" n'existe pas encore/a été delete.
    let isCollision = checkCollision(player, bullet);
      if (isCollision) {
        looseGame()
    }
  }
};

setInterval(checkShotCon, 250)
setInterval(fire, 2000)
  